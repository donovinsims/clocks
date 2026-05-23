import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/terms")({
  head: () => ({
    meta: [
      { title: "Terms of Service — Clockout | Roscoe · Rockford · Beloit" },
      {
        name: "description",
        content:
          "Clockout terms of service. Flat-fee automation installs for owner-operators in Roscoe, Rockford, Beloit, and Northern Illinois.",
      },
    ],
    links: [{ rel: "canonical", href: "https://clockout.io/terms" }],
  }),
  component: Terms,
});

function Terms() {
  return (
    <section className="hero" style={{ minHeight: "auto", paddingBottom: "4rem" }}>
      <article className="letter" style={{ maxWidth: "680px", margin: "0 auto" }}>
        <h1>Terms of Service</h1>
        <p>
          <em>Last updated: May 2026</em>
        </p>

        <h2>Service description</h2>
        <p>
          Clockout provides flat-fee automation installation services for owner-operated local
          businesses. Each project begins with a free 20-minute operations audit. If a fix is
          identified, Clockout builds and installs the system for a flat fee quoted before work
          begins.
        </p>

        <h2>Payment</h2>
        <p>
          Payment is due upon completion of the installation, before system handover. All prices are
          quoted in USD and are known and agreed upon before any work begins.
        </p>

        <h2>Ownership</h2>
        <p>
          Upon full payment, the client owns the installed system outright. No ongoing license fees,
          no platform subscription, no recurring charges required.
        </p>

        <h2>30-day guarantee</h2>
        <p>
          If the installed system hasn't recovered at least 10 hours per week within 30 days of
          going live, Clockout will continue working for free until it does. This guarantee covers
          the specific fix installed — not unrelated business problems.
        </p>

        <h2>Client responsibilities</h2>
        <p>
          The client agrees to: provide reasonable access to information needed for the audit, test
          the system during the install period, and communicate any issues promptly.
        </p>

        <h2>Limitation of liability</h2>
        <p>
          Clockout's liability is limited to the total fee paid for the specific service that gave
          rise to the claim. Clockout is not liable for lost revenue, lost business, or indirect
          damages resulting from system malfunction, missed leads, or automation errors — though we
          will fix any issues promptly.
        </p>

        <h2>Cancellation</h2>
        <p>
          Either party may cancel the free audit at any time with no obligation. If work has begun
          on a paid installation and the client cancels, Clockout may charge for work completed up
          to the cancellation date.
        </p>

        <h2>Governing law</h2>
        <p>
          These terms are governed by the laws of the State of Illinois. Any disputes shall be
          resolved in Winnebago County, Illinois.
        </p>

        <h2>Contact</h2>
        <p>hello@clockout.work · Roscoe, IL</p>
      </article>
    </section>
  );
}
