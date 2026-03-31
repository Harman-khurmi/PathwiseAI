const fs = require("fs");
const path = require("path");

const dirs = ["app", "components"];
const extensions = [".jsx", ".js", ".css"];

// these are the replacements mapping
const replacements = [
  { from: /\[#55C7F1\]/g, to: "brand-primary" },
  { from: /\[#3C71FA\]/g, to: "brand-secondary" },
  { from: /\[#FEFBFC\]/g, to: "brand-light" },
  { from: /\[#011627\]/g, to: "brand-dark" },
  { from: /\[#080D1A\]/g, to: "brand-dark-alt" },
  { from: /rounded-\[32px\]/g, to: "rounded-3xl" },
];

function walkDir(dir) {
  const files = fs.readdirSync(dir);
  for (const file of files) {
    const fullPath = path.join(dir, file);
    if (fs.statSync(fullPath).isDirectory()) {
      if (file !== "node_modules" && file !== ".next") {
        walkDir(fullPath);
      }
    } else {
      if (extensions.some((ext) => fullPath.endsWith(ext))) {
        let content = fs.readFileSync(fullPath, "utf-8");
        let newContent = content;
        for (const { from, to } of replacements) {
          newContent = newContent.replace(from, to);
        }
        if (content !== newContent) {
          fs.writeFileSync(fullPath, newContent, "utf-8");
          console.log(`Updated ${fullPath}`);
        }
      }
    }
  }
}

for (const dir of dirs) {
  if (fs.existsSync(dir)) walkDir(dir);
}
