import fs from "fs";
import path from "path";

// Read slugs from blog-posts.tsx (the single source of truth for post content)
const blogPostsContent = fs.readFileSync(
  path.resolve(process.cwd(), "src/lib/blog-posts.tsx"),
  "utf8",
);

const slugRegex = /slug:\s*"([^"]+)"/g;
const POSTS = [];
let match;

while ((match = slugRegex.exec(blogPostsContent)) !== null) {
  POSTS.push({ slug: match[1] });
}

const staticUrls = [
  { loc: "https://clockout.us/", priority: "1.0" },
  { loc: "https://clockout.us/about", priority: "0.7" },
  { loc: "https://clockout.us/solutions", priority: "0.8" },
  { loc: "https://clockout.us/operator-os", priority: "0.7" },
  { loc: "https://clockout.us/blog", priority: "0.8" },
  { loc: "https://clockout.us/assessment", priority: "0.9" },
  { loc: "https://clockout.us/privacy", priority: "0.3" },
  { loc: "https://clockout.us/terms", priority: "0.3" },
];

const dynamicUrls = POSTS.map((post) => ({
  loc: `https://clockout.us/blog/${post.slug}`,
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
console.log(`Generated sitemap.xml with ${POSTS.length} blog posts from blog-posts.tsx`);
