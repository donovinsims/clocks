import { createFileRoute, Link } from "@tanstack/react-router";
import { LeadBar } from "@/components/LeadBar";
import { BookingButton } from "@/components/BookingModal";
import { blogPosts } from "@/lib/blog-posts";

export const Route = createFileRoute("/blog")({
  head: () => ({
    meta: [
      { title: "Blog — Clockout | Trade-by-Leak Field Notes | Roscoe · Rockford · Beloit" },
      {
        name: "description",
        content:
          "Plain field notes on revenue leaks for HVAC, plumbing, salons, real estate, and other owner-operators in the Roscoe, Rockford, Beloit, and Northern Illinois corridor. Short reads. Practical.",
      },
      {
        property: "og:title",
        content: "Clockout Blog — Trade-by-Leak Field Notes | Roscoe · Rockford · Beloit",
      },
      {
        property: "og:description",
        content:
          "Trade-by-leak notes for local owner-operators. Short reads. Practical. No fluff. Real stories from the Rockford, Roscoe, and Beloit corridor.",
      },
      { property: "og:type", content: "website" },
      { property: "og:locale", content: "en_US" },
      { property: "og:site_name", content: "Clockout" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: "Clockout Blog — Trade-by-Leak Field Notes" },
      {
        property: "og:image",
        content:
          "https://clockout.us/api/og?title=" +
          encodeURIComponent(
            "Clockout Blog — Trade-by-Leak Field Notes | Roscoe · Rockford · Beloit",
          ) +
          "&description=" +
          encodeURIComponent(
            "Trade-by-leak notes for local owner-operators. Short reads. Practical. No fluff. Real stories from the Rockford, Roscoe, and Beloit corridor.",
          ),
      },
      {
        name: "twitter:image",
        content:
          "https://clockout.us/api/og?title=" +
          encodeURIComponent(
            "Clockout Blog — Trade-by-Leak Field Notes | Roscoe · Rockford · Beloit",
          ) +
          "&description=" +
          encodeURIComponent(
            "Trade-by-leak notes for local owner-operators. Short reads. Practical. No fluff. Real stories from the Rockford, Roscoe, and Beloit corridor.",
          ),
      },
      {
        name: "keywords",
        content:
          "owner-operator blog, business automation Roscoe, HVAC automation Rockford, plumbing automation, salon automation, real estate lead routing, auto repair review requests, Northern Illinois business tips, Winnebago County",
      },
    ],
    links: [{ rel: "canonical", href: "https://clockout.us/blog" }],
  }),
  component: Blog,
});

function Blog() {
  return (
    <>
      <section
        className="hero"
        style={{ minHeight: "auto", paddingBottom: "var(--space-2xl)" }}
        aria-labelledby="blog-h"
      >
        <div className="hero__rail">
          <span className="hero__rail-dot" aria-hidden="true" />
          <span>Field notes · trade × leak</span>
        </div>
        <h1 className="hero__display" id="blog-h" style={{ maxWidth: "20ch" }}>
          <span className="hero__line">Plain notes.</span>
          <span className="hero__line">
            <em>Real leaks.</em>
          </span>
        </h1>
        <p
          className="section-note"
          style={{ margin: "var(--space-md) auto 0", textAlign: "center" }}
        >
          Short reads on the operational leaks costing owner-operators money in the Rockford
          corridor.
        </p>
      </section>

      <section className="blog">
        <div className="blog__grid">
          {blogPosts.map((post) => (
            <Link
              key={post.slug}
              to="/blog/$slug"
              params={{ slug: post.slug }}
              className="blog__card"
              aria-label={`${post.trade} — ${post.title}`}
            >
              <p className="blog__tag tnum">
                {post.trade} <span aria-hidden="true">×</span> {post.leak}
              </p>
              <h2 className="blog__h">{post.title}</h2>
              <p className="blog__p">{post.description}</p>
              <span className="blog__more">Read the post →</span>
            </Link>
          ))}
        </div>
      </section>

      <section className="finalcta">
        <div className="finalcta__inner">
          <h2 className="finalcta__h">
            Skip the reading. <em>See the number.</em>
          </h2>
          <p className="finalcta__p">
            Twenty minutes. A written report. The exact leak in dollars.
          </p>
          <BookingButton className="cta cta--primary cta--lg">Book your free audit</BookingButton>
        </div>
      </section>

      <LeadBar />
    </>
  );
}
