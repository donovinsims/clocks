import fs from "fs";
import path from "path";

// Read the blog file to dynamically extract slugs
const blogContent = fs.readFileSync(path.resolve(process.cwd(), "src/routes/blog.tsx"), "utf8");

const slugRegex = /slug:\s*"([^"]+)"/g;
const POSTS = [];
let match;

while ((match = slugRegex.exec(blogContent)) !== null) {
  POSTS.push({ slug: match[1] });
}

const staticUrls = [
  { loc: "https://clockout.io/", priority: "1.0" },
  { loc: "https://clockout.io/about", priority: "0.7" },
  { loc: "https://clockout.io/solutions", priority: "0.8" },
  { loc: "https://clockout.io/operator-os", priority: "0.7" },
  { loc: "https://clockout.io/blog", priority: "0.8" },
  { loc: "https://clockout.io/assessment", priority: "0.9" },
  { loc: "https://clockout.io/privacy", priority: "0.3" },
  { loc: "https://clockout.io/terms", priority: "0.3" },
];

const dynamicUrls = POSTS.map((post) => ({
  loc: `https://clockout.io/blog/${post.slug}`,
  priority: "0.6",
}));

const allUrls = [...staticUrls, ...dynamicUrls];

const xml = `<?xml version="1.0" encoding="UTF-8"?>
<!-- AUTO-GENERATED, DO NOT EDIT -->
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${allUrls.map((url) => `  <url><loc>${url.loc}</loc><priority>${url.priority}</priority></url>`).join("\n")}
</urlset>
`;

fs.writeFileSync(path.resolve(process.cwd(), "public", "sitemap.xml"), xml);
console.log("Generated sitemap.xml with dynamic slugs from blog.tsx");
