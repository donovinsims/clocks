import { createFileRoute, notFound, Link } from "@tanstack/react-router";
import { blogPosts } from "@/lib/blog-posts";
import { LeadBar } from "@/components/LeadBar";
import { BookingButton } from "@/components/BookingModal";

export const Route = createFileRoute("/blog/$slug")({
  head: ({ params }) => {
    const post = blogPosts.find((p) => p.slug === params.slug);
    if (!post) return { meta: [] };
    return {
      meta: [
        { title: `${post.title} — Clockout | Roscoe · Rockford · Beloit` },
        { name: "description", content: post.description },
        { property: "og:title", content: post.title },
        { property: "og:description", content: post.description },
        { name: "twitter:card", content: "summary_large_image" },
      ],
      links: [
        { rel: "canonical", href: `https://clockout.io/blog/${post.slug}` },
      ],
    };
  },
  component: BlogPost,
});

function BlogPost() {
  const { slug } = Route.useParams();
  const post = blogPosts.find((p) => p.slug === slug);
  if (!post) throw notFound();

  return (
    <>
      <section
        className="hero"
        style={{ minHeight: "auto", paddingBottom: "var(--space-2xl)" }}
      >
        <div className="hero__rail">
          <span className="hero__rail-dot" aria-hidden="true" />
          <Link
            to="/blog"
            style={{ color: "var(--color-accent)", textDecoration: "none" }}
          >
            ← Blog
          </Link>
          <span aria-hidden="true"> · </span>
          <span>
            {post.trade} × {post.leak}
          </span>
        </div>
        <h1
          className="hero__display"
          style={{ maxWidth: "24ch", fontSize: "clamp(1.75rem, 4vw, 2.5rem)" }}
        >
          {post.title}
        </h1>
        <p className="section-note" style={{ color: "var(--color-ink-3)" }}>
          {post.date}
        </p>
      </section>

      <section
        className="blog-post"
        style={{ maxWidth: "680px", margin: "0 auto", padding: "0 1.5rem 4rem" }}
      >
        <div className="blog-post__content">{post.content}</div>

        <hr style={{ margin: "3rem 0", borderColor: "var(--color-border)" }} />

        <div style={{ textAlign: "center" }}>
          <h2 style={{ fontSize: "1.25rem", marginBottom: "0.5rem" }}>
            Want to see what <em>your</em> business is leaking?
          </h2>
          <p style={{ color: "var(--color-ink-2)", marginBottom: "1.5rem" }}>
            5 questions. 2 minutes. A dollar figure on your operational leak.
          </p>
          <Link to="/assessment" className="cta cta--primary cta--lg">
            Take the free scorecard
          </Link>
        </div>
      </section>

      <LeadBar />
    </>
  );
}
