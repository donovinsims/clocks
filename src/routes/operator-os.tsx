import { createFileRoute } from "@tanstack/react-router";
import { useEffect } from "react";
import { BookingButton } from "@/components/BookingModal";
import { LeadBar } from "@/components/LeadBar";

export const Route = createFileRoute("/operator-os")({
  head: () => ({
    meta: [
      { title: "Operator OS — Clockout | Message-Based Assistant | Roscoe · Rockford · Beloit" },
      {
        name: "description",
        content:
          "Message-based executive assistant for owner-operators in Roscoe, Rockford, Beloit, and Northern Illinois. Runs on your phone, your number, iMessage by default. No new app. No new login.",
      },
      {
        property: "og:title",
        content: "Operator OS — Message-Based Assistant | Clockout | Roscoe · Rockford · Beloit",
      },
      {
        property: "og:description",
        content:
          "Text-driven assistant on iMessage. Optional Google Voice, Telegram, WhatsApp, Slack. You own it. Serving owner-operators in Rockford, Roscoe, Beloit, and the I-39 corridor.",
      },
      { property: "og:type", content: "website" },
      { property: "og:locale", content: "en_US" },
      { property: "og:site_name", content: "Clockout" },
      { property: "og:image", content: "https://clockout.io/og-image.jpg" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: "Operator OS — Message-Based Assistant | Clockout" },
      { name: "twitter:image", content: "https://clockout.io/og-image.jpg" },
      {
        name: "keywords",
        content:
          "Operator OS, message-based assistant, iMessage assistant, owner-operator tools, business automation Roscoe, Rockford IL small business, Beloit WI automation, executive assistant owner-operator",
      },
    ],
    links: [{ rel: "canonical", href: "https://clockout.io/operator-os" }],
  }),
  component: OperatorOS,
});

function OperatorOS() {
  // Scope the blue theme to this page only by toggling a class on <body>.
  useEffect(() => {
    document.body.classList.add("theme-operator-os");
    return () => {
      document.body.classList.remove("theme-operator-os");
    };
  }, []);

  return (
    <div className="theme-operator-os">
      <section className="hero" id="top" aria-labelledby="oos-h">
        <div className="hero__spotlight" aria-hidden="true" />
        <div className="hero__rail">
          <span className="hero__rail-dot" aria-hidden="true" />
          <span>Operator OS · message-based assistant</span>
        </div>
        <h1 className="hero__display" id="oos-h">
          <span className="hero__line">An assistant</span>
          <span className="hero__line">that lives</span>
          <span className="hero__line">
            <em>in your texts.</em>
          </span>
        </h1>
        <div className="hero__ctas">
          <BookingButton className="cta cta--primary cta--lg">
            See it on a 20-minute call
          </BookingButton>
          <p className="hero__bridge">— or read what it actually does ↓</p>
        </div>
        <div className="hero__stats">
          <div className="hero__stat">
            <span className="hero__stat-num tnum">iMessage</span>
            <span className="hero__stat-label">default channel</span>
          </div>
          <div className="hero__stat">
            <span className="hero__stat-num tnum">Your #</span>
            <span className="hero__stat-label">no new number required</span>
          </div>
          <div className="hero__stat">
            <span className="hero__stat-num tnum">No app</span>
            <span className="hero__stat-label">nothing to install</span>
          </div>
        </div>
      </section>

      <section className="how" aria-labelledby="oos-how-h">
        <header className="section-head">
          <p className="section-eyebrow">
            <span className="num tnum">01</span> · How it runs
          </p>
          <h2 className="section-h" id="oos-how-h">
            You text it. It does the work.
          </h2>
          <p className="section-note">
            Built around how you already operate. From the cab, on a roof, between jobs — you send a
            voice memo or a sentence and the assistant takes it from there.
          </p>
        </header>
        <div className="how__steps">
          <div className="how__step">
            <p className="how__num tnum">01 / Capture</p>
            <h3 className="how__h">Voice memo or text.</h3>
            <p className="how__p">
              "New estimate for Tom on Harrison, furnace, $3,200." Send it. That's the whole input.
            </p>
          </div>
          <div className="how__step">
            <p className="how__num tnum">02 / Sort</p>
            <h3 className="how__h">It files it for you.</h3>
            <p className="how__p">
              The system writes the estimate, logs the lead, schedules the follow-ups, and pings you
              only when it needs a yes or no.
            </p>
          </div>
          <div className="how__step">
            <p className="how__num tnum">03 / Reply</p>
            <h3 className="how__h">One thumb. Done.</h3>
            <p className="how__p">
              You answer "yes" or "send it" the way you already text. No dashboard. No app. No
              calendar app to fight with.
            </p>
          </div>
        </div>
      </section>

      <section className="proof">
        <div className="proof__grid proof__grid--top">
          <div className="proof__copy">
            <p className="section-eyebrow">
              <span className="num tnum">02</span> · Channels
            </p>
            <h2 className="section-h">iMessage by default. The rest are optional.</h2>
            <p>
              You use your own phone and your own number. iMessage is the default because every
              owner-operator already has it open. The rest is there if you want it.
            </p>
            <ul className="proof__list">
              <li>iMessage — default, runs on your existing number</li>
              <li>Free Google Voice number — optional, if you'd rather not give out your cell</li>
              <li>Telegram — optional, if you already live there</li>
              <li>WhatsApp — optional, if your customers do</li>
              <li>Slack — optional, if your crew runs on it</li>
            </ul>
          </div>
          <div className="proof__copy">
            <p className="section-eyebrow">
              <span className="num tnum">03</span> · What it isn't
            </p>
            <h2 className="section-h">Not an app. Not a login.</h2>
            <p>
              No new platform. No new password. Nothing to remember. The assistant is just a contact
              in your phone — you text it the way you text anyone else.
            </p>
            <ul className="proof__list">
              <li>No new app to install</li>
              <li>No new login to remember</li>
              <li>No dashboard you'll never open</li>
              <li>No monthly retainer</li>
              <li>You own the system outright</li>
            </ul>
          </div>
        </div>
      </section>

      <section className="guarantee">
        <div className="guarantee__card">
          <p className="guarantee__eyebrow">The deal</p>
          <h2 className="guarantee__h">
            Flat fee. Installed in a week. <em>Owned by you.</em>
          </h2>
          <p className="guarantee__p">
            Same model as the rest of Clockout. One install, one flat price, no retainer. If it
            doesn't recover 10 hours a week in 30 days, we keep working free until it does.
          </p>
          <BookingButton className="cta cta--primary cta--lg">Book your free audit</BookingButton>
        </div>
      </section>

      <LeadBar />
    </div>
  );
}
