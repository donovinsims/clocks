import { createFileRoute, Link } from "@tanstack/react-router";
import { LeadBar } from "@/components/LeadBar";
import { BookingButton } from "@/components/BookingModal";

export const Route = createFileRoute("/blog")({
  head: () => ({
    meta: [
      { title: "Blog — Clockout | Trade-by-Leak Field Notes | Roscoe · Rockford · Beloit" },
      {
        name: "description",
        content:
          "Plain field notes on revenue leaks for HVAC, plumbing, salons, real estate, and other owner-operators in the Roscoe, Rockford, Beloit, and Northern Illinois corridor. Short reads. Practical.",
      },
      { property: "og:title", content: "Clockout Blog — Trade-by-Leak Field Notes | Roscoe · Rockford · Beloit" },
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
        name: "keywords",
        content:
          "owner-operator blog, business automation Roscoe, HVAC automation Rockford, plumbing automation, salon automation, real estate lead routing, auto repair review requests, Northern Illinois business tips, Winnebago County",
      },
    ],
  }),
  component: Blog,
});

type Post = {
  trade: string;
  leak: string;
  title: string;
  p: string;
  slug?: string;
};

const POSTS: Post[] = [
  {
    trade: "HVAC",
    leak: "Missed Calls",
    title: "HVAC shops in Rockford: every missed call in February is worth $1,400.",
    p: "The math on after-hours emergency calls in the corridor — and the 60-second text-back that catches them.",
  },
  {
    trade: "Plumbing",
    leak: "Estimate Follow-Up",
    title: "Why your plumbing quotes go cold at the 48-hour mark.",
    p: "A three-touch sequence that closes 18–30% of bids you'd otherwise lose to the next call on the list.",
  },
  {
    trade: "Salons",
    leak: "No-Shows",
    title: "Nail salons: the same-day rebook flow that saves Saturday.",
    p: "An empty chair on a Saturday is the most expensive hour you own. Here's how to fill it automatically.",
  },
  {
    trade: "Real Estate",
    leak: "Lead Routing",
    title: "Solo agents in Boone County: the inbound lead triage system.",
    p: "Hot buyers ring. Tire-kickers wait. The simple rule that stops you reacting to every Zillow ping.",
  },
  {
    trade: "Auto Repair",
    leak: "Review Requests",
    title: "How a Rockford shop went 41 → 112 Google reviews in four months.",
    p: "One text. Sent the hour the job ends. Direct link to the Google profile. That's the whole post.",
  },
  {
    trade: "Contractors",
    leak: "Invoice Chasing",
    title: "The polite invoice nudge that gets paid at day 7 instead of day 47.",
    p: "Three messages. Plain English. No app for the customer to download. Stops you doing it at 10 PM.",
  },
  {
    trade: "Landscaping",
    leak: "After-Hours Triage",
    title: "Landscapers: stop reacting to every inbound message at dinner.",
    p: "How to sort emergencies, quotes, and noise so your phone doesn't run your evenings.",
  },
  {
    trade: "Barbershops",
    leak: "Rebooking",
    title: "Barbershops: the rebook text that books the next cut before they leave the chair.",
    p: "Simple, opt-in, owned by you. Climbs revenue per chair by 8–14% without raising prices.",
  },
  {
    trade: "Contractors",
    leak: "Missed Calls",
    title: "Missed-Call Text-Back for Contractors",
    p: "Every missed call is a lead that walked. Here's how a 60-second automated text-back catches them — before they call your competitor.",
    slug: "missed-call-text-back-for-contractors",
  },
  {
    trade: "Business Tools",
    leak: "Platform Comparison",
    title: "Podium vs GoHighLevel for Local Service Businesses",
    p: "Two platforms. One is built for enterprise marketing teams. The other was born for local service operators. Here's which one wins — and why.",
    slug: "podium-vs-gohighlevel-local-service-businesses",
  },
  {
    trade: "Business Tools",
    leak: "Tool Selection",
    title: "Best Automation Tools for Local Service Businesses",
    p: "A grounded tour of the tools that actually move the needle for owner-operators — from $0 setups to full-stack platforms.",
    slug: "best-automation-tools-local-service-businesses",
  },
];

function Blog() {
  return (
    <>
      <section className="hero" style={{ minHeight: "auto", paddingBottom: "var(--space-2xl)" }} aria-labelledby="blog-h">
        <div className="hero__rail">
          <span className="hero__rail-dot" aria-hidden="true" />
          <span>Field notes · trade × leak</span>
        </div>
        <h1 className="hero__display" id="blog-h" style={{ maxWidth: "20ch" }}>
          <span className="hero__line">Plain notes.</span>
          <span className="hero__line"><em>Real leaks.</em></span>
        </h1>
        <p className="section-note" style={{ margin: "var(--space-md) auto 0", textAlign: "center" }}>
          Short reads on the operational leaks costing owner-operators money in the Rockford corridor.
        </p>
      </section>

      <section className="blog">
        <div className="blog__grid">
          {POSTS.map((post) => (
            <Link
              key={post.title}
              to={post.slug ? "/blog/$slug" : "/assessment"}
              params={post.slug ? { slug: post.slug } : undefined}
              className="blog__card"
              aria-label={`${post.trade} — ${post.title}`}
            >
              <p className="blog__tag tnum">
                {post.trade} <span aria-hidden="true">×</span> {post.leak}
              </p>
              <h2 className="blog__h">{post.title}</h2>
              <p className="blog__p">{post.p}</p>
              <span className="blog__more">
                {post.slug ? "Read the post →" : "Get the audit instead →"}
              </span>
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
