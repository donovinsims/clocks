import { blogPosts } from "./src/lib/blog-posts.tsx";

const slugs = blogPosts.map((p) => p.slug);
const blogPostsBySlug = blogPosts.reduce(
  (acc, p) => {
    acc[p.slug] = p;
    return acc;
  },
  {} as Record<string, (typeof blogPosts)[0]>,
);

function runBenchmark() {
  const iterations = 10000000;

  // Array.find
  const startFind = performance.now();
  for (let i = 0; i < iterations; i++) {
    const slug = slugs[i % slugs.length];
    const post = blogPosts.find((p) => p.slug === slug);
  }
  const endFind = performance.now();

  // Record lookup
  const startRecord = performance.now();
  for (let i = 0; i < iterations; i++) {
    const slug = slugs[i % slugs.length];
    const post = blogPostsBySlug[slug];
  }
  const endRecord = performance.now();

  console.log(`Array.find: ${(endFind - startFind).toFixed(2)} ms`);
  console.log(`Record lookup: ${(endRecord - startRecord).toFixed(2)} ms`);
}

runBenchmark();
