import { createFileRoute } from "@tanstack/react-router";
import { LeadBar } from "@/components/LeadBar";
import { BookingButton } from "@/components/BookingModal";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About Clockout | Local Automation Expert | Roscoe · Rockford · Beloit, IL" },
      {
        name: "description",
        content:
          "Why Clockout exists. Written from the Roscoe / Rockford / Beloit corridor. Anti-agency, flat-fee local automation. You own everything. No retainer. No lock-in.",
      },
      { property: "og:title", content: "About Clockout — Local Automation from Roscoe, IL" },
      {
        property: "og:description",
        content:
          "Not an agency. Not a SaaS. A local automation operator from Roscoe, IL who shows up, finds the leak, and installs the fix in a week. Serving Rockford, Beloit, and the I-39 corridor.",
      },
      { property: "og:type", content: "website" },
      { property: "og:locale", content: "en_US" },
      { property: "og:site_name", content: "Clockout" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: "About Clockout — Local Automation from Roscoe, IL" },
      {
        name: "keywords",
        content:
          "about Clockout, business automation Roscoe, Donovin automation expert, local operator Illinois, flat-fee automation, Rockford IL automation, Beloit WI automation, Winnebago County",
      },
    ],
    links: [{ rel: "canonical", href: "https://clockout.io/about" }],
  }),
  component: About,
});

function About() {
  return (
    <>
      <article className="letter">
        <h1>
          A letter to the operators <em>still doing it all.</em>
        </h1>

        <p>
          I live off I-39. I know what it sounds like when your phone rings while you're under a
          hood, or up on a roof in March, or talking to a customer about why the furnace died on a
          Sunday. The phone goes to voicemail. The caller hangs up. They call the next name on the
          list. You never know it happened.
        </p>

        <p>
          I started <strong>Clockout</strong> because I watched too many good operators in Roscoe,
          Loves Park, Machesney, South Beloit, and the neighborhoods around Harrison Avenue quietly
          bleed money to a problem they didn't have time to fix. Not because they were bad at what
          they did. The opposite. They were too busy being good at it.
        </p>

        <h2>What this is</h2>

        <p>
          I find the exact operational leak costing you money. I build the fix. I install it in 3 to
          7 days. You pay a flat price, known upfront. You own the system the day it goes live. No
          retainer. No monthly platform you have to remember to log into. No agency calling you on
          the 1st of the month.
        </p>

        <h2>What this isn't</h2>

        <p>
          It isn't an agency. It isn't SaaS. It isn't a $5,000 a month retainer with a Slack channel
          and a quarterly business review. I'm a local operator. I'll show up at your counter, look
          at your actual phone, your actual estimate pad, your actual schedule, and tell you the
          truth about what it's costing you.
        </p>

        <h2>How I operate</h2>

        <ul>
          <li>Math before pitch. You see the cost of the leak before I quote anything.</li>
          <li>Flat fee, one time. Known before you sign.</li>
          <li>Installed in 3–7 days. Not months. Not "Q3."</li>
          <li>You own the system. Outright. Forever.</li>
          <li>Local only. Northern Illinois corridor. I drive.</li>
          <li>If it doesn't recover 10 hours a week in 30 days, I keep working for free.</li>
        </ul>

        <h2>What I want</h2>

        <p>
          I want the owners in this corridor to stop answering the phone at 9 PM. I want the
          estimates that go cold to get followed up automatically. I want the no-shows to get
          rebooked the same day. I want the reviews to climb. I want your Saturdays back.
        </p>

        <p className="letter__signoff">— Donovin · Roscoe, IL</p>

        <BookingButton className="cta cta--primary cta--lg">Book a 20-minute audit</BookingButton>
      </article>

      <LeadBar />
    </>
  );
}
