import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/privacy")({
  head: () => ({
    meta: [
      { title: "Privacy Policy — Clockout | Roscoe · Rockford · Beloit" },
      {
        name: "description",
        content:
          "Clockout privacy policy. How we collect, use, and protect your information. Serving Roscoe, Rockford, Beloit, and Northern Illinois.",
      },
    ],
    links: [{ rel: "canonical", href: "https://clockout.io/privacy" }],
  }),
  component: Privacy,
});

function Privacy() {
  return (
    <section className="hero" style={{ minHeight: "auto", paddingBottom: "4rem" }}>
      <article className="letter" style={{ maxWidth: "680px", margin: "0 auto" }}>
        <h1>Privacy Policy</h1>
        <p>
          <em>Last updated: May 2026</em>
        </p>

        <h2>What we collect</h2>
        <p>
          When you book an audit or sign up for the checklist, we collect your name and email
          address. That's it. We don't collect browsing behavior, cookies for tracking, or any data
          from your business systems.
        </p>

        <h2>How we use it</h2>
        <p>
          We use your information to send you the audit checklist you requested, follow up about
          your free audit, and communicate about services you ask about. We don't sell your data,
          share it with third parties, or use it for retargeting ads.
        </p>

        <h2>Email communications</h2>
        <p>
          If you subscribe to the checklist, you'll receive the checklist email. That's it. No
          ongoing newsletter, no campaign sequences. You can unsubscribe from any email.
        </p>

        <h2>Data storage</h2>
        <p>
          Your data is stored in ConvertKit (email platform) and accessed only by Clockout. You can
          request deletion at any time by emailing hello@clockout.work.
        </p>

        <h2>Third-party services</h2>
        <p>
          Our booking system uses Cal.com. When you book a call, Cal.com collects the information
          you provide in their booking form. Their privacy policy applies to that transaction.
        </p>

        <h2>Changes</h2>
        <p>
          If this policy changes, we'll update the date at the top. Continued use of the site after
          changes means you accept the updated policy.
        </p>

        <h2>Contact</h2>
        <p>hello@clockout.work · Roscoe, IL</p>
      </article>
    </section>
  );
}
