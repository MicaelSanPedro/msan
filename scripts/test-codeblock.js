const tests = [
  {
    name: "Code block inside numbered list (3 spaces indent)",
    input: "1. **lm-sensors**: Para instalar:\n   ```\n   sudo apt-get install lm-sensors\n   ```\n   Após a instalação:"
  },
  {
    name: "Code block with lang inside numbered list",
    input: "1. **Item**:\n   ```python\n   print('hello')\n   ```\n   Depois execute:\n   ```bash\n   echo done\n   ```"
  },
  {
    name: "Multiple indented code blocks",
    input: "1. **Opção A**:\n   ```\n   cmd1\n   cmd2\n   ```\n\n2. **Opção B**:\n   ```\n   cmd3\n   ```\n\nPronto!"
  },
  {
    name: "Code block at start (no indent)",
    input: "Aqui:\n```python\nprint(1)\n```\nPronto!"
  },
  {
    name: "Mixed indent levels",
    input: "Texto:\n   ```bash\n   echo 1\n   ```\nMais texto\n      ```python\n      print(2)\n      ```\nFim"
  }
];

function parseMarkdown(raw) {
  let text = raw.replace(/\r\n/g, "\n");
  const codeBlocks = [];
  const codeLangs = [];
  text = text.replace(/```\s*(\w*)\n([\s\S]*?)```/g, (_, lang, code) => {
    codeBlocks.push(code.trimEnd());
    codeLangs.push(lang);
    return `%%CODEBLOCK_${codeBlocks.length - 1}%%`;
  });
  text = text.replace(/```\s*(\w*)\n([\s\S]*)$/g, (_, lang, code) => {
    codeBlocks.push(code);
    codeLangs.push(lang || "code");
    return `%%CODEBLOCK_${codeBlocks.length - 1}%%`;
  });
  text = text.replace(/```/g, "");

  const lines = text.split("\n");
  const htmlParts = [];
  let i = 0;

  while (i < lines.length) {
    const line = lines[i];

    // Code block placeholder — FIXED: allow leading/trailing whitespace
    const codeMatch = line.match(/^\s*%%CODEBLOCK_(\d+)%%\s*$/);
    if (codeMatch) {
      const idx = parseInt(codeMatch[1]);
      const lang = codeLangs[idx] || "code";
      htmlParts.push(`[CODEBLOCK idx=${idx} lang=${lang}]`);
      i++; continue;
    }

    // Paragraph collector
    const paraLines = [];
    while (i < lines.length && lines[i].trim() !== "" &&
      !/^#{1,4}\s/.test(lines[i]) &&
      !/^>\s/.test(lines[i]) &&
      !/^[*\-+]\s/.test(lines[i]) &&
      !/^\d+\.\s/.test(lines[i]) &&
      !/^\s*%%CODEBLOCK/.test(lines[i]) &&
      !/^---/.test(lines[i].trim())) {
      paraLines.push(lines[i]);
      i++;
    }
    if (paraLines.length > 0) {
      htmlParts.push(`<p>${paraLines.join(" ")}</p>`);
      continue;
    }

    if (line.trim() === "") { i++; continue; }
    i++;
  }

  return { htmlParts, codeBlocks, codeLangs };
}

let allPass = true;
for (const test of tests) {
  const result = parseMarkdown(test.input);
  const hasPlaceholder = result.htmlParts.some(p => p.includes("%%CODEBLOCK"));
  const hasCodeBlocks = result.htmlParts.some(p => p.includes("[CODEBLOCK"));
  const pass = !hasPlaceholder && hasCodeBlocks;
  if (!pass) allPass = false;
  console.log(`${pass ? "✅" : "❌"} ${test.name}`);
  console.log(`   blocks: ${result.codeBlocks.length} | rendered: ${hasCodeBlocks} | placeholder_leaked: ${hasPlaceholder}`);
  if (hasPlaceholder || !hasCodeBlocks) {
    console.log(`   HTML parts: ${JSON.stringify(result.htmlParts)}`);
  }
}
console.log(`\n${allPass ? "✅ ALL PASS" : "❌ SOME FAILED"}`);
