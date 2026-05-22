import { useCallback, useEffect, useRef, useState } from "react";
import { BookingButton } from "@/components/BookingModal";


function fmt(n: number) {
  return n.toLocaleString("en-US");
}

type Preset = { label: string; missed: number; ticket: number };
const PRESETS: Preset[] = [
  { label: "HVAC company", missed: 18, ticket: 650 },
  { label: "Plumber", missed: 12, ticket: 450 },
  { label: "Auto shop", missed: 22, ticket: 350 },
];

export function CostCalculator() {
  const [missed, setMissed] = useState(15);
  const [ticket, setTicket] = useState(800);
  const [animKey, setAnimKey] = useState(0);
  const [interacted, setInteracted] = useState(false);
  const prevMissed = useRef(missed);
  const prevTicket = useRef(ticket);

  const monthlyLost = missed * ticket;
  const yearlyLost = monthlyLost * 12;

  useEffect(() => {
    if (missed !== prevMissed.current || ticket !== prevTicket.current) {
      setInteracted(true);
      prevMissed.current = missed;
      prevTicket.current = ticket;
      setAnimKey((k) => k + 1);
    }
  }, [missed, ticket]);

  const applyPreset = useCallback((p: Preset) => {
    setMissed(p.missed);
    setTicket(p.ticket);
  }, []);

  return (
    <section className="math" id="math" aria-labelledby="math-h">
      <header className="section-head">
        <p className="section-eyebrow">
          <span className="num tnum">01</span> · The math
        </p>
        <h2 className="section-h" id="math-h">
          Count the leak <em>before</em> you fix it.
        </h2>
        <p className="section-note">
          Most owner-operators in the Rockford corridor miss 10–20 calls a month. 68% of those
          callers never call back. Move the sliders.
        </p>
      </header>

      <div className="math__grid">
        <div className="math__card">
          <div className="math__field">
            <label htmlFor="missed">
              Missed calls per month <span className="val tnum">{missed}</span>
            </label>
            <div className="math__slider-wrap">
              <button
                type="button"
                className="math__btn"
                onClick={() => setMissed((m) => Math.max(1, m - 1))}
                aria-label="Decrease missed calls"
              >
                −
              </button>
              <input
                id="missed"
                type="range"
                min={1}
                max={60}
                value={missed}
                onChange={(e) => setMissed(Number(e.target.value))}
              />
              <button
                type="button"
                className="math__btn"
                onClick={() => setMissed((m) => Math.min(60, m + 1))}
                aria-label="Increase missed calls"
              >
                +
              </button>
            </div>
          </div>

          <div className="math__field">
            <label htmlFor="ticket">
              Average job ticket <span className="val tnum">${fmt(ticket)}</span>
            </label>
            <div className="math__slider-wrap">
              <button
                type="button"
                className="math__btn"
                onClick={() => setTicket((t) => Math.max(200, t - 50))}
                aria-label="Decrease ticket size"
              >
                −
              </button>
              <input
                id="ticket"
                type="range"
                min={200}
                max={2500}
                step={50}
                value={ticket}
                onChange={(e) => setTicket(Number(e.target.value))}
              />
              <button
                type="button"
                className="math__btn"
                onClick={() => setTicket((t) => Math.min(2500, t + 50))}
                aria-label="Increase ticket size"
              >
                +
              </button>
            </div>
          </div>

          <div className="math__presets">
            <span className="math__presets-label">Quick scenarios:</span>
            {PRESETS.map((p) => (
              <button
                key={p.label}
                type="button"
                className="math__preset-btn"
                onClick={() => applyPreset(p)}
              >
                {p.label}
              </button>
            ))}
          </div>

          <div className="math__result">
            <div>
              <p className="math__stat-label">
                Lost / month
              </p>
              <p className="math__stat-num tnum" key={`month-${animKey}`}>
                ${fmt(monthlyLost)}
              </p>
            </div>
            <div>
              <p className="math__stat-label">
                Lost / year
              </p>
              <p className="math__stat-num tnum" key={`year-${animKey}`}>
                ${fmt(yearlyLost)}
              </p>
            </div>
          </div>

          <div className="math__result-cta">
            <BookingButton className="cta cta--primary cta--lg math__cta">
              Book your free audit
            </BookingButton>
            <p className="math__cta-sub">
              20 minutes. No pitch. Written report either way.
            </p>
            <p className="micro-cta">Not ready yet? <a href="#leadbar">Get the free checklist →</a></p>
          </div>
          {interacted && (
            <div className="math__prompt">
              <p className="math__prompt-q">Is this number higher than you expected?</p>
              <div className="math__prompt-btns">
                <BookingButton className="cta cta--primary math__prompt-btn">
                  Yes — book the audit
                </BookingButton>
                <a href="#how" className="cta cta--ghost math__prompt-btn">
                  No — show me how
                </a>
              </div>
            </div>
          )}
        </div>

        <div className="math__sidecards">
          <div className="math__sidecard">
            <p className="label">Industry baseline</p>
            <p className="stat tnum">
              68<em>%</em>
            </p>
            <p className="sub">
              of missed callers never call back. They book the next name on the list.
            </p>
          </div>
          <div className="math__sidecard">
            <p className="label">After-hours admin</p>
            <p className="stat tnum">
              8–12<em>h</em>
            </p>
            <p className="sub">
              The average owner spends this much per week chasing invoices and follow-ups.
            </p>
          </div>
          <div className="math__sidecard">
            <p className="label">Install time</p>
            <p className="stat tnum">
              3–7<em>d</em>
            </p>
            <p className="sub">
              One fix, fixed price, handed over. You own the system the day it goes live.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

export function HowItWorks() {
  return (
    <section className="how" aria-labelledby="how-h">
      <header className="section-head">
        <p className="section-eyebrow">
          <span className="num tnum">02</span> · How it works
        </p>
        <h2 className="section-h" id="how-h">
          Three steps. No agency retainer.
        </h2>
      </header>
      <div className="how__steps">
        <div className="how__step">
          <p className="how__num tnum">01 / Audit</p>
          <h3 className="how__h">Free 20-minute call.</h3>
          <p className="how__p">
            I look at how your phone, your bids, and your follow-ups actually move. You get a written
            ROI report and an effort/impact matrix. No pitch.
          </p>
        </div>
        <div className="how__step">
          <p className="how__num tnum">02 / Install</p>
          <h3 className="how__h">One leak, fixed in 3–7 days.</h3>
          <p className="how__p">
            I build, test, and deploy the system. Flat price, known upfront. Fits how you already
            work — phone calls and text messages.
          </p>
        </div>
        <div className="how__step">
          <p className="how__num tnum">03 / Handover</p>
          <h3 className="how__h">You own it. Forever.</h3>
          <p className="how__p">
            Loom walkthrough. One-page “How It Runs” doc. 30 and 60-day check-ins. No retainer. No
            lock-in. No platform dependency.
          </p>
        </div>
      </div>
    </section>
  );
}

export function IPhoneProof() {
  return (
    <section className="proof" aria-labelledby="proof-h">
      <div className="proof__grid">
        <div className="proof__copy">
          <p className="section-eyebrow">
            <span className="num tnum">03</span> · What it looks like
          </p>
          <h2 className="section-h" id="proof-h">
            Missed call → text reply in 60 seconds.
          </h2>
          <p>
            You're under a truck on Harrison Avenue. The phone rings, goes to voicemail. Before the
            caller closes the screen, they get this:
          </p>
          <ul className="proof__list">
            <li>Replies in under 60 seconds, day or night</li>
            <li>Routes hot leads straight to your text inbox</li>
            <li>Books estimates while you finish the job</li>
            <li>No app. No new software. Runs on your existing number.</li>
          </ul>
        </div>

        <div className="iphone" aria-hidden="true">
          <div className="iphone__screen">
            <div className="iphone__notch" />
            <p className="iphone__time">9:41</p>
            <p className="iphone__date">Tuesday, March 14</p>
            <p className="iphone__bigtime tnum">9:41</p>

            <div className="iphone__notif">
              <div className="iphone__icon iphone__icon--call">📞</div>
              <div className="iphone__notif-body">
                <div className="iphone__notif-row">
                  <span>PHONE · Missed call</span>
                  <span className="tnum">now</span>
                </div>
                <div className="iphone__notif-title">(815) 555-0142</div>
                <div className="iphone__notif-text">Rockford, IL · 14s</div>
              </div>
            </div>

            <div className="iphone__notif">
              <div className="iphone__icon iphone__icon--sms">💬</div>
              <div className="iphone__notif-body">
                <div className="iphone__notif-row">
                  <span>Messages · You</span>
                  <span className="tnum">now</span>
                </div>
                <div className="iphone__notif-title">To: (815) 555-0142</div>
                <div className="iphone__notif-text">
                  Hey — sorry I missed you. I'm on a job. What can I help with? Reply here and I'll
                  book you a slot today.
                </div>
              </div>
            </div>

            <div className="iphone__notif">
              <div className="iphone__icon iphone__icon--sms">💬</div>
              <div className="iphone__notif-body">
                <div className="iphone__notif-row">
                  <span>Messages</span>
                  <span className="tnum">1m</span>
                </div>
                <div className="iphone__notif-title">(815) 555-0142</div>
                <div className="iphone__notif-text">
                  Furnace is out. Can someone come look at it today?
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

const FIXES = [
  {
    n: "Fix 01",
    h: "Missed call text-back",
    p: "Auto-reply to every missed call within 60 seconds. Book the job before the next shop calls back.",
  },
  {
    n: "Fix 02",
    h: "Estimate follow-up",
    p: "Sequenced texts and emails after a quote. 48 hours, 7 days, 14 days. Closes 18–30% of cold bids.",
  },
  {
    n: "Fix 03",
    h: "No-show recovery",
    p: "If a customer no-shows, automated rebook flow runs the same day. Empty slot becomes revenue.",
  },
  {
    n: "Fix 04",
    h: "Review requests",
    p: "Text goes out the hour the job ends. Direct link to your Google profile. Climbs you up the map pack.",
  },
  {
    n: "Fix 05",
    h: "Invoice nudges",
    p: "Polite, automatic chase on unpaid invoices at 7, 14, and 21 days. Stops you doing it at 10 PM.",
  },
  {
    n: "Fix 06",
    h: "After-hours triage",
    p: "Inbound leads get sorted by urgency. Emergencies ring you. Quotes wait. You stop reacting to noise.",
  },
];

export function WhatYouGet() {
  return (
    <section className="fixes" aria-labelledby="fixes-h">
      <header className="section-head">
        <p className="section-eyebrow">
          <span className="num tnum">04</span> · What you get
        </p>
        <h2 className="section-h" id="fixes-h">
          Six fixes. Each one a one-time install.
        </h2>
        <p className="section-note">
          Pick one to start. Most owners do. The math closes the conversation.
        </p>
      </header>
      <div className="fixes__grid">
        {FIXES.map((f) => (
          <div key={f.h} className="fix">
            <p className="fix__num tnum">{f.n}</p>
            <h3 className="fix__h">{f.h}</h3>
            <p className="fix__p">{f.p}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

export function Guarantee() {
  return (
    <section className="guarantee" aria-labelledby="guar-h">
      <div className="guarantee__card">
        <p className="guarantee__eyebrow">The guarantee</p>
        <h2 className="guarantee__h" id="guar-h">
          7 days to install. <em>30 days</em> to put money back in your pocket.
        </h2>
        <p className="guarantee__p">
          We install your system in 7 days. If it doesn't put money back in your pocket within 30 days, we
          keep working for free until it does.
        </p>
        <BookingButton className="cta cta--primary cta--lg">Book your free audit</BookingButton>
        <p className="micro-cta">Not ready yet? <a href="#leadbar">Get the free checklist →</a></p>
      </div>
    </section>
  );
}

const TIERS: Array<{
  type: string;
  h: string;
  price: string;
  priceSuffix?: string;
  sub: string;
  feature: boolean;
  list: string[];
}> = [
  {
    type: "Tier 01",
    h: "Single System Fix",
    price: "$250+",
    priceSuffix: "one-time",
    sub: "One targeted automation. Built and deployed in 3–7 days.",
    feature: false,
    list: [
      "Pick one leak: missed calls, estimates, reviews, no-shows",
      "Fully configured workflow",
      "Loom handover + one-page doc",
      "30 and 60-day check-ins",
      "You own it outright",
    ],
  },
  {
    type: "Tier 02",
    h: "Operations Stack",
    price: "Let's Talk",
    sub: "Three to five workflows. The core after-hours admin, gone.",
    feature: true,
    list: [
      "Bundle of 3–5 workflows",
      "Replaces nightly kitchen-table admin",
      "Same install model. Same handover.",
      "Built around your phone, your CRM, your way of working",
      "Natural next step after Tier 01",
    ],
  },
];


const GUAR = "7-day install. 30-day result guarantee. Owned outright. No retainer.";

export function Pricing() {
  return (
    <section className="pricing" id="pricing" aria-labelledby="pricing-h">
      <header className="section-head">
        <p className="section-eyebrow">
          <span className="num tnum">05</span> · Investment
        </p>
        <h2 className="section-h" id="pricing-h">
          Flat fee. One time. You own it.
        </h2>
        <p className="section-note">
          No agency retainer. No SaaS subscription. Every price is known before you sign.
        </p>
      </header>

      <p className="pricing__stat">
        The average owner in this corridor loses <strong>$144,000</strong> a year to fixable leaks. The fix costs <strong>$250</strong>.
      </p>

      <div className="pricing__grid">
        {TIERS.map((t) => (
          <div key={t.h} className={`tier ${t.feature ? "tier--feature" : ""}`}>
            <p className="tier__type tnum">{t.type}</p>
            <h3 className="tier__h">{t.h}</h3>
            <p className="tier__price tnum">
              {t.price}
              {t.priceSuffix && <small> {t.priceSuffix}</small>}
            </p>
            <p className="tier__sub">{t.sub}</p>
            <ul className="tier__list">
              {t.list.map((l) => (
                <li key={l}>{l}</li>
              ))}
            </ul>
            <BookingButton
              className={`cta ${t.feature ? "cta--primary" : "cta--ghost"} tier__cta`}
            >

              Book your free audit
            </BookingButton>
            <p className="tier__guar">{GUAR}</p>
            <p className="micro-cta">Not ready yet? <a href="#leadbar">Get the free checklist →</a></p>
          </div>
        ))}
      </div>
    </section>
  );
}

const FAQS = [
  {
    q: "Is this AI?",
    a: "Some of the workflows use AI under the hood — speech-to-text on voicemails, smart routing on inbound messages. None of it matters to you. The system answers your phone, replies to your customers, and stays out of your way.",
  },
  {
    q: "What if I already have a CRM?",
    a: "Good. We build around it. Jobber, Housecall Pro, ServiceTitan, plain Google Sheets — doesn't matter. The fix slots into what you already use. You don't change a thing about how you work.",
  },
  {
    q: "What happens after the install?",
    a: "You get a Loom walkthrough, a one-page doc, and 30 and 60-day check-in calls. After that, you own it. No retainer. If you ever want a tweak or a new fix, you call. We quote it the same way.",
  },
  {
    q: "Why local only?",
    a: "Because trust is the bottleneck, not technology. I drive to your shop. I sit at your counter. I look at the actual phone, the actual estimate pad, the actual mess. Roscoe, Rockford, Beloit, Winnebago and Boone County, and the I-39 corridor.",
  },
  {
    q: "What if it doesn't work?",
    a: "We install in 7 days. If it hasn't recovered you at least 10 hours a week in 30 days, we keep working for free until it does. That's the deal.",
  },
  {
    q: "Why no monthly retainer?",
    a: "Because you already pay for too many things every month that don't show up at the job site. The system pays for itself once and runs forever. That's the point.",
  },
];

export function FAQ() {
  return (
    <section className="faq" id="faq" aria-labelledby="faq-h">
      <header className="section-head">
        <p className="section-eyebrow">
          <span className="num tnum">06</span> · Questions
        </p>
        <h2 className="section-h" id="faq-h">
          Honest answers.
        </h2>
      </header>
      <div className="faq__list">
        {FAQS.map((f) => (
          <details key={f.q} className="faq__item">
            <summary>
              <span>{f.q}</span>
              <span className="faq__chev" aria-hidden="true">
                +
              </span>
            </summary>
            <div className="faq__a">
              <p>{f.a}</p>
            </div>
          </details>
        ))}
      </div>
    </section>
  );
}

export function FinalCTA() {
  return (
    <section className="finalcta" aria-labelledby="finalcta-h">
      <div className="finalcta__inner">
        <h2 className="finalcta__h" id="finalcta-h">
          Stop bleeding. <em>Get your evenings back.</em>
        </h2>
        <p className="finalcta__p">
          A 20-minute call. A written report. A number that says what the leak is costing you.
        </p>
        <BookingButton className="cta cta--primary cta--lg">Book your free audit</BookingButton>
        <p className="micro-cta">Not ready yet? <a href="#leadbar">Get the free checklist →</a></p>
        <p className="finalcta__guar">
          7-day install. 30-day guarantee: 10 hours a week back, or we keep working free until it
          lands.
        </p>
      </div>
    </section>
  );
}

export function Hero() {
  const ref = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    let raf = 0;
    const onMove = (e: PointerEvent) => {
      const r = el.getBoundingClientRect();
      const x = e.clientX - r.left;
      const y = e.clientY - r.top;
      if (!raf) {
        raf = requestAnimationFrame(() => {
          el.style.setProperty("--mx", `${x}px`);
          el.style.setProperty("--my", `${y}px`);
          raf = 0;
        });
      }
    };
    el.addEventListener("pointermove", onMove as EventListener);
    return () => el.removeEventListener("pointermove", onMove as EventListener);
  }, []);

  return (
    <section className="hero" id="top" aria-labelledby="hero-h" ref={ref}>
      <div className="hero__spotlight" aria-hidden="true" />

      <div className="hero__rail">
        <span className="hero__rail-dot" aria-hidden="true" />
        <span>Roscoe · Rockford · Beloit — installs done in 3–7 days</span>
      </div>

      <h1 className="hero__display" id="hero-h">
        <span className="hero__line">Stop Losing Jobs to</span>
        <span className="hero__line"><em>Voicemail.</em></span>
      </h1>

      <p className="hero__subhead">
        Contractors miss 3+ calls a week. That&rsquo;s $3,000 in lost revenue.
        Clockout fixes it in 7 days.
      </p>

      <div className="hero__ctas">
        <BookingButton className="cta cta--primary cta--lg">
          Find my revenue leaks — free audit
        </BookingButton>
        <p className="hero__bridge">— or see how it works ↓</p>
        <a href="#math" className="cta cta--ghost">
          <span>See what I'm losing</span>
        </a>
      </div>

      <div className="hero__stats">
        <div className="hero__stat">
          <span className="hero__stat-num tnum">$800–$1,200</span>
          <span className="hero__stat-label">cost per missed call</span>
        </div>
        <div className="hero__stat">
          <span className="hero__stat-num tnum">68%</span>
          <span className="hero__stat-label">never call back</span>
        </div>
        <div className="hero__stat">
          <span className="hero__stat-num tnum">3–7 days</span>
          <span className="hero__stat-label">install + handover</span>
        </div>
      </div>
    </section>
  );
}

export function TrustBar() {
  const names = [
    "Stateline Chamber",
    "BNI Rockford",
    "Winnebago County",
    "Greater Beloit",
    "Roscoe Chamber",
  ];
  return (
    <section className="trust" aria-label="Local trust">
      <div className="trust__inner">
        <span className="trust__label">Local member · IL/WI corridor</span>
        {names.map((n) => (
          <span key={n} className="trust__name">
            {n}
          </span>
        ))}
      </div>
    </section>
  );
}
