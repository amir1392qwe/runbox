/**
 * fix-classnames.js
 *
 * Collapses multi-line JSX className="..." (and class="...") string
 * literals into single-line, whitespace-normalized strings.
 *
 * Why: Turbopack (Next.js 16.2.9) has an inconsistency where multi-line
 * JSX string attributes get whitespace-collapsed differently on the
 * server vs. the client, causing hydration mismatch errors. Writing the
 * className as a single line avoids the bug entirely.
 *
 * Usage (from the project's `src` folder):
 *   node ../fix-classnames.js
 *
 * It walks all .ts/.tsx files, finds className="...multi-line..."
 * attributes, and rewrites them to className="single line, no newlines".
 * Safe to run multiple times (idempotent).
 */

const fs = require("fs");
const path = require("path");

const ROOT = process.cwd();
const exts = new Set([".ts", ".tsx"]);
const skipDirs = new Set(["node_modules", ".next", ".git"]);

let filesChanged = 0;
let totalReplacements = 0;

function walk(dir) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    if (skipDirs.has(entry.name)) continue;
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      walk(full);
    } else if (exts.has(path.extname(entry.name))) {
      processFile(full);
    }
  }
}

function processFile(filePath) {
  const original = fs.readFileSync(filePath, "utf8");
  let replacements = 0;

  // Match className="....." (double quotes) where the content spans
  // multiple lines. Does not touch className={...} expressions/template
  // literals — only plain string-literal attributes.
  const pattern = /className="([^"]*\n[^"]*)"/g;

  const updated = original.replace(pattern, (match, inner) => {
    const collapsed = inner
      .split("\n")
      .map((line) => line.trim())
      .filter((line) => line.length > 0)
      .join(" ")
      .trim();

    replacements++;
    return `className="${collapsed}"`;
  });

  if (replacements > 0) {
    fs.writeFileSync(filePath, updated, "utf8");
    filesChanged++;
    totalReplacements += replacements;
    console.log(
      `Fixed ${replacements} className(s) in ${path.relative(ROOT, filePath)}`
    );
  }
}

walk(ROOT);

console.log("\n--- Done ---");
console.log(`Files changed: ${filesChanged}`);
console.log(`Total className attributes collapsed: ${totalReplacements}`);