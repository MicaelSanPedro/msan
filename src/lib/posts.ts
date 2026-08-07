import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { remark } from "remark";
import remarkGfm from "remark-gfm";
import remarkRehype from "remark-rehype";
import rehypeStringify from "rehype-stringify";
import rehypeSlug from "rehype-slug";

import { codeToHtml } from "shiki";

// @ts-ignore
import { unified } from 'unified';
// @ts-ignore
import remarkParse from 'remark-parse';

export interface PostFrontmatter {
  title: string;
  date: string;
  excerpt: string;
  category: string;
  tags: string[];
  coverImage: string;
  readTime: string;
  featured: boolean;
}

export interface Post {
  slug: string;
  frontmatter: PostFrontmatter;
  contentHtml: string;
}

export interface PostSummary {
  slug: string;
  frontmatter: PostFrontmatter;
}

export interface CategoryCount {
  name: string;
  count: number;
}

export interface TagCount {
  name: string;
  count: number;
}

const postsDirectory = path.join(process.cwd(), "src/content/posts");

function calculateReadTime(content: string): string {
  const wordsPerMinute = 200;
  const words = content.replace(/\s+/g, ' ').trim().split(' ').length;
  const minutes = Math.ceil(words / wordsPerMinute);
  if (minutes < 1) return "1 min";
  return `${minutes} min`;
}

function getMarkdownFiles(): string[] {
  if (!fs.existsSync(postsDirectory)) {
    return [];
  }
  return fs
    .readdirSync(postsDirectory)
    .filter((file) => file.endsWith(".md") || file.endsWith(".mdx"));
}

function parsePostFile(fileName: string): { slug: string; frontmatter: PostFrontmatter; content: string } {
  const filePath = path.join(postsDirectory, fileName);
  const fileContents = fs.readFileSync(filePath, "utf8");
  const { data, content } = matter(fileContents);
  const slug = fileName.replace(/\.mdx?$/, "");

  const frontmatter: PostFrontmatter = {
    title: data.title || "Sem título",
    date: data.date || "",
    excerpt: data.excerpt || "",
    category: data.category || "Geral",
    tags: Array.isArray(data.tags) ? data.tags : [],
    coverImage: data.coverImage || "",
    readTime: calculateReadTime(content),
    featured: Boolean(data.featured),
  };

  return { slug, frontmatter, content };
}

export function getAllPosts(): PostSummary[] {
  const files = getMarkdownFiles();
  const posts = files
    .map((fileName) => {
      const { slug, frontmatter } = parsePostFile(fileName);
      return { slug, frontmatter };
    })
    .sort((a, b) => (a.frontmatter.date > b.frontmatter.date ? -1 : 1));

  return posts;
}

export function getFeaturedPosts(): PostSummary[] {
  return getAllPosts().filter((post) => post.frontmatter.featured).slice(0, 2);
}

export async function getPostBySlug(slug: string): Promise<Post | null> {
  const files = getMarkdownFiles();
  const fileName = files.find((f) => f.replace(/\.mdx?$/, "") === slug);

  if (!fileName) return null;

  const { slug: postSlug, frontmatter, content } = parsePostFile(fileName);

  // Process markdown to HTML with rehype pipeline
  // Using explicit casting to 'any' to bypass Unified type version mismatches in production build
  const processedContent = await (unified() as any)
    .use(remarkParse)
    .use(remarkGfm)
    .use(remarkRehype)
    .use(rehypeSlug)
    .use(rehypeStringify)
    .process(content);
  
  let contentHtml = processedContent.toString();

  // Highlight code blocks with Shiki after basic HTML is generated
  const codeBlockRegex = /<pre><code class="language-([^"]+)">([\s\S]*?)<\/code><\/pre>/g;
  const matches = Array.from(contentHtml.matchAll(codeBlockRegex)) as RegExpExecArray[];

  for (const match of matches) {
    const fullMatch = match[0];
    const lang = match[1];
    const code = match[2].replace(/&lt;/g, '<').replace(/&gt;/g, '>').replace(/&amp;/g, '&');
    
    try {
      const highlighted = await codeToHtml(code, {
        lang: lang,
        theme: 'tokyo-night'
      });
      contentHtml = contentHtml.replace(fullMatch, highlighted);
    } catch (e) {
      console.error(`Failed to highlight ${lang}`, e);
    }
  }

  return {
    slug: postSlug,
    frontmatter,
    contentHtml,
  };
}

export function getPostsByCategory(category: string): PostSummary[] {
  return getAllPosts().filter(
    (post) => post.frontmatter.category.toLowerCase() === category.toLowerCase()
  );
}

export function getAllCategories(): CategoryCount[] {
  const posts = getAllPosts();
  const categoryMap = new Map<string, number>();

  posts.forEach((post) => {
    const cat = post.frontmatter.category;
    categoryMap.set(cat, (categoryMap.get(cat) || 0) + 1);
  });

  return Array.from(categoryMap.entries())
    .map(([name, count]) => ({ name, count }))
    .sort((a, b) => b.count - a.count);
}

export function getAllTags(): TagCount[] {
  const posts = getAllPosts();
  const tagMap = new Map<string, number>();

  posts.forEach((post) => {
    post.frontmatter.tags.forEach((tag) => {
      tagMap.set(tag, (tagMap.get(tag) || 0) + 1);
    });
  });

  return Array.from(tagMap.entries())
    .map(([name, count]) => ({ name, count }))
    .sort((a, b) => b.count - a.count);
}
