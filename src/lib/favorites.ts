const GIST_FILENAME = "techmate-favorites.json";
const GIST_DESCRIPTION = "TechMate Blog Favorites";

interface FavoritesData {
  favorites: string[];
}

interface GistFile {
  filename: string;
  content: string | null;
}

interface GistListItem {
  id: string;
  description: string;
  files: Record<string, GistFile>;
}

/**
 * Find our TechMate gist ID from the list API,
 * then fetch it individually to get file content
 * (the list API does NOT return file content).
 */
async function findGistId(accessToken: string): Promise<string | null> {
  const res = await fetch("https://api.github.com/gists?per_page=100", {
    headers: { Authorization: `Bearer ${accessToken}`, Accept: "application/vnd.github.v3+json" },
  });
  if (!res.ok) {
    console.error("[findGistId] GitHub API error:", res.status, res.statusText);
    return null;
  }
  const gists: GistListItem[] = await res.json();
  const gist = gists.find(
    (g) => g.description === GIST_DESCRIPTION && g.files[GIST_FILENAME]
  );
  return gist?.id || null;
}

/**
 * Fetch a single gist by ID — this returns file content.
 */
async function fetchGistById(accessToken: string, gistId: string): Promise<{ id: string; data: FavoritesData } | null> {
  const res = await fetch(`https://api.github.com/gists/${gistId}`, {
    headers: { Authorization: `Bearer ${accessToken}`, Accept: "application/vnd.github.v3+json" },
  });
  if (!res.ok) {
    console.error("[fetchGistById] GitHub API error:", res.status, res.statusText);
    return null;
  }
  const gist: GistListItem = await res.json();
  const file = gist.files[GIST_FILENAME];
  if (!file?.content) {
    console.error("[fetchGistById] File found but content is null/empty");
    return null;
  }
  try {
    const data: FavoritesData = JSON.parse(file.content);
    return { id: gist.id, data };
  } catch (error) {
    console.error("[fetchGistById] Failed to parse JSON:", error);
    return null;
  }
}

/**
 * Find our gist and fetch its content.
 */
async function getGist(accessToken: string): Promise<{ id: string; data: FavoritesData } | null> {
  try {
    const gistId = await findGistId(accessToken);
    if (!gistId) return null;
    return await fetchGistById(accessToken, gistId);
  } catch (error) {
    console.error("[getGist] Error:", error);
    return null;
  }
}

async function createGist(accessToken: string, data: FavoritesData): Promise<string | null> {
  try {
    const res = await fetch("https://api.github.com/gists", {
      method: "POST",
      headers: { Authorization: `Bearer ${accessToken}`, Accept: "application/vnd.github.v3+json" },
      body: JSON.stringify({
        description: GIST_DESCRIPTION,
        public: false,
        files: { [GIST_FILENAME]: { content: JSON.stringify(data) } },
      }),
    });
    if (!res.ok) {
      console.error("[createGist] GitHub API error:", res.status, res.statusText);
      return null;
    }
    const gist = await res.json();
    return gist.id;
  } catch (error) {
    console.error("[createGist] Error:", error);
    return null;
  }
}

async function updateGist(accessToken: string, gistId: string, data: FavoritesData): Promise<boolean> {
  try {
    const res = await fetch(`https://api.github.com/gists/${gistId}`, {
      method: "PATCH",
      headers: { Authorization: `Bearer ${accessToken}`, Accept: "application/vnd.github.v3+json" },
      body: JSON.stringify({
        files: { [GIST_FILENAME]: { content: JSON.stringify(data) } },
      }),
    });
    return res.ok;
  } catch (error) {
    console.error("[updateGist] Error:", error);
    return false;
  }
}

export async function getFavorites(accessToken: string): Promise<string[]> {
  const gist = await getGist(accessToken);
  return gist ? gist.data.favorites : [];
}

export async function toggleFavorite(accessToken: string, slug: string): Promise<boolean> {
  const gist = await getGist(accessToken);
  const favorites: string[] = gist ? gist.data.favorites : [];
  const index = favorites.indexOf(slug);
  if (index > -1) {
    favorites.splice(index, 1);
  } else {
    favorites.push(slug);
  }
  const data: FavoritesData = { favorites };
  let success = false;
  if (gist) {
    success = await updateGist(accessToken, gist.id, data);
  } else {
    const newId = await createGist(accessToken, data);
    success = !!newId;
  }
  if (!success) {
    console.error("[toggleFavorite] Failed to save favorites to Gist");
    return index > -1;
  }
  return index === -1;
}
