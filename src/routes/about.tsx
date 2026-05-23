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
          I grew up in Roscoe. Went to Hononegah, played three sports, won a NIC-10 MVP, and got a
          baseball scholarship to NIU. Graduated with a degree in Business Communication.
        </p>

        <p>
          My summers weren't internships. They were 5 AM with the Winnebago County Highway
          Department, learning what real work looked like from people who didn't have a word for
          work ethic because they just called it showing up.
        </p>

        <p>
          After college I moved to Chicago and into tech. At Uber, I worked in Product Operations
          across the US and Canada — major sports, music, and festival events, the kind of volume
          where a small process failure becomes a real business problem fast. At Walgreens, I helped
          push new digital products into a national retail operation. What I took from both: when
          the volume gets high, the business runs on systems. Not manual follow-up. Not memory.
        </p>

        <p>Then I came back home.</p>

        <p>
          I started Clockout because I watched operators in Roscoe, Loves Park, Machesney, South
          Beloit, and around Winnebago County bleed money to the same problems I spent years solving
          for much bigger companies. Not because they were bad at what they did. Because they were
          too good — too busy on the job to run the office.
        </p>

        <p>
          I've never run a local business. I won't pretend I know what it feels like to juggle the
          field, the phone, the estimate, the follow-up, and the customer all at once. But I know
          what operational leaks look like. And I know what plugging them looks like.
        </p>

        <h2>What this is</h2>

        <p>
          I find the exact leak costing you money. Build the fix. Install it in 3 to 7 days. Flat
          price, known upfront. You own the system the day it goes live. No retainer. No monthly
          platform to remember to log into. No agency calling on the 1st.
        </p>

        <h2>What this isn't</h2>

        <p>
          Not an agency. Not SaaS. Not a $5,000/month retainer with a Slack channel and a quarterly
          business review. I grew up here, work here, drive here. When something breaks, you're not
          emailing a ticket.
        </p>

        <h2>How I work</h2>

        <ul>
          <li>Math before pitch. You see the cost of the leak before I quote anything.</li>
          <li>Flat fee, one time. Known before you sign.</li>
          <li>Installed in 3–7 days. Not months. Not "Q3."</li>
          <li>You own it. Outright. Forever.</li>
          <li>Local only. Northern Illinois corridor. I drive.</li>
        </ul>

        <h2>The guarantee</h2>

        <p>
          If the system doesn't recover 10 hours a week within 30 days, I keep working until it
          does. Free. That's not a marketing line. It's how I intend to run this.
        </p>

        <h2>What I want</h2>

        <p>
          I want the owners in this corridor to stop answering the phone at 9 PM. I want the
          estimates that go cold to get followed up automatically. I want no-shows rebooked the same
          day. Reviews climbing. Saturdays back.
        </p>

        <p>
          I built these systems for companies doing hundreds of millions. Now I'm building them for
          the people who actually deserve them.
        </p>

        <p className="letter__signoff">— Donovin · Roscoe, IL</p>

        <BookingButton className="cta cta--primary cta--lg">Book a 20-minute audit</BookingButton>
      </article>

      <LeadBar />
    </>
  );
}
