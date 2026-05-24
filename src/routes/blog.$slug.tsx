import { createFileRoute, notFound, Link } from "@tanstack/react-router";
import { blogPostsBySlug } from "@/lib/blog-posts";
import { LeadBar } from "@/components/LeadBar";

// Map human-readable dates to ISO 8601 for schema/OG tags
function toISODate(date: string): string {
  const map: Record<string, string> = {
    "January 2026": "2026-01-01T00:00:00Z",
    "February 2026": "2026-02-01T00:00:00Z",
    "March 2026": "2026-03-01T00:00:00Z",
    "April 2026": "2026-04-01T00:00:00Z",
    "May 2026": "2026-05-01T00:00:00Z",
    "June 2026": "2026-06-01T00:00:00Z",
    "July 2026": "2026-07-01T00:00:00Z",
    "August 2026": "2026-08-01T00:00:00Z",
    "September 2026": "2026-09-01T00:00:00Z",
    "October 2026": "2026-10-01T00:00:00Z",
    "November 2026": "2026-11-01T00:00:00Z",
    "December 2026": "2026-12-01T00:00:00Z",
  };
  return map[date] ?? "2026-01-01T00:00:00Z";
}

// Generate relevant keywords per post based on trade/leak/title
function toKeywords(post: { trade: string; leak: string; title: string; slug: string }): string {
  const base = [
    post.trade.toLowerCase(),
    post.leak.toLowerCase(),
    "local service business automation",
    "Clockout",
    "Roscoe IL",
    "Rockford IL",
    "Beloit WI",
    "flat-fee automation",
    "owner-operator",
  ];

  const extras: Record<string, string[]> = {
    "missed-call-text-back-for-contractors": [
      "missed call text back",
      "contractor automation",
      "SMS reply missed call",
      "HVAC missed call",
      "plumbing lead recovery",
      "auto reply missed call",
    ],
    "podium-vs-gohighlevel-local-service-businesses": [
      "Podium vs GoHighLevel",
      "GoHighLevel local business",
      "Podium local service",
      "CRM for contractors",
      "marketing automation comparison",
      "local business CRM",
    ],
    "best-automation-tools-local-service-businesses": [
      "best automation tools",
      "local service business software",
      "contractor automation tools",
      "small business automation 2026",
      "workflow automation for trades",
      "service business software",
    ],
  };

  return [...base, ...(extras[post.slug] ?? [])].join(", ");
}

export const Route = createFileRoute("/blog/$slug")({
  head: ({ params }) => {
    const post = blogPostsBySlug[params.slug];
    if (!post) return { meta: [] };

    const isoDate = toISODate(post.date);
    const keywords = toKeywords(post);
    const canonicalUrl = `https://clockout.us/blog/${post.slug}`;
    const ogImage = `https://clockout.us/api/og?title=${encodeURIComponent(post.title)}&description=${encodeURIComponent(post.description)}`;

    return {
      meta: [
        { title: `${post.title} — Clockout | Roscoe · Rockford · Beloit` },
        { name: "description", content: post.description },
        { name: "keywords", content: keywords },
        { property: "og:type", content: "article" },
        { property: "og:title", content: post.title },
        { property: "og:description", content: post.description },
        { property: "og:locale", content: "en_US" },
        { property: "og:site_name", content: "Clockout" },
        { property: "article:published_time", content: isoDate },
        { property: "article:author", content: "Donovin" },
        { property: "article:section", content: post.trade },
        { name: "twitter:card", content: "summary_large_image" },
        { name: "twitter:title", content: post.title },
        { property: "og:image", content: ogImage },
        { name: "twitter:image", content: ogImage },
      ],
      links: [{ rel: "canonical", href: canonicalUrl }],
      scripts: [
        {
          type: "application/ld+json",
          children: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "BlogPosting",
            headline: post.title,
            description: post.description,
            datePublished: isoDate,
            dateModified: isoDate,
            url: canonicalUrl,
            keywords: keywords,
            image: ogImage,
            author: {
              "@type": "Person",
              name: "Donovin",
            },
            publisher: {
              "@type": "Organization",
              name: "Clockout",
              url: "https://clockout.us",
            },
            mainEntityOfPage: {
              "@type": "WebPage",
              "@id": canonicalUrl,
            },
            breadcrumb: {
              "@type": "BreadcrumbList",
              itemListElement: [
                {
                  "@type": "ListItem",
                  position: 1,
                  name: "Home",
                  item: "https://clockout.us",
                },
                {
                  "@type": "ListItem",
                  position: 2,
                  name: "Blog",
                  item: "https://clockout.us/blog",
                },
                {
                  "@type": "ListItem",
                  position: 3,
                  name: post.title,
                  item: canonicalUrl,
                },
              ],
            },
          }),
        },
      ],
    };
  },
  component: BlogPost,
});

function BlogPost() {
  const { slug } = Route.useParams();
  const post = blogPostsBySlug[slug];
  if (!post) throw notFound();

  return (
    <>
      <section className="hero" style={{ minHeight: "auto", paddingBottom: "var(--space-2xl)" }}>
        <div className="hero__rail">
          <span className="hero__rail-dot" aria-hidden="true" />
          <Link to="/blog" style={{ color: "var(--color-accent)", textDecoration: "none" }}>
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

      <article
        className="blog-post"
        style={{ maxWidth: "680px", margin: "0 auto", padding: "0 1.5rem 4rem" }}
      >
        <div
          className="blog-post__content"
          dangerouslySetInnerHTML={{ __html: post.htmlContent }}
        />

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
      </article>

      <LeadBar />
    </>
  );
}
