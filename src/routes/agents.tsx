import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { FinalCTA } from "@/components/sections";
import { LeadBar } from "@/components/LeadBar";
import { BookingButton } from "@/components/BookingModal";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";

export const Route = createFileRoute("/agents")({
  head: () => ({
    meta: [
      { title: "Agents — Clockout | 12 Automations for Owner-Operators | Roscoe · Rockford · Beloit" },
      {
        name: "description",
        content:
          "Twelve targeted agents for owner-operators in Roscoe, Rockford, Beloit, and Northern Illinois. Missed-call rescue, cold-bid resurrection, no-show recovery, review machine, invoice chaser, nightly digest and more.",
      },
      { property: "og:title", content: "Agents — 12 Automations for Owner-Operators | Clockout" },
      {
        property: "og:description",
        content:
          "Twelve named agents. Each one plugs a specific revenue leak. Installed in 3–7 days. You own them outright. Serving Roscoe, Rockford, Beloit, and the Winnebago/Boone County corridor.",
      },
      { property: "og:type", content: "website" },
      { property: "og:locale", content: "en_US" },
      { property: "og:site_name", content: "Clockout" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: "Agents — 12 Automations for Owner-Operators | Clockout" },
      {
        name: "keywords",
        content:
          "business automation services, missed call text-back, estimate follow-up automation, no-show recovery, review request system, invoice nudge, after-hours triage, Roscoe automation, Rockford small business, Beloit WI",
      },
    ],
  }),
  component: Agents,
});

type Agent = {
  num: string;
  name: string;
  channel: string;
  payoff: string;
  jawDrop: string;
  does: string;
  steps: string[];
  result: string;
  why: string;
};

const AGENTS: Agent[] = [
  {
    num: "01",
    name: "Ghost Closer",
    channel: "SMS",
    payoff: "A missed call turns into a booked job while you are unreachable.",
    jawDrop:
      "They're under a sink. Their phone rings, they can't grab it. By the time they surface 8 minutes later, the lead has already received a text, replied, and is booked on the calendar — all without them touching anything.",
    does: "Auto-texts missed calls, qualifies the lead, and books the appointment.",
    steps: [
      "Trigger: missed call detected via Twilio webhook.",
      "System looks up caller in CRM/Supabase — new lead vs existing customer.",
      "If new: sends a personalized SMS (\"Hey, this is [Business], sorry we missed you — what can we help with?\").",
      "Reply is parsed with LLM to classify job type, urgency, and location.",
      "If qualified: quotes a ballpark, asks for availability, and writes the appointment to the calendar.",
    ],
    result:
      "Owner gets a Telegram/SMS summary: \"New HVAC lead booked for Thursday 9AM. Job: furnace tune-up, Roscoe. Revenue est: $185.\"",
    why: "Captures valuable leads instantly while you are busy on-site.",
  },
  {
    num: "02",
    name: "Cold Bid Resurrector",
    channel: "EMAIL / SMS",
    payoff: "A dead estimate comes back to life days later from a perfectly timed follow-up.",
    jawDrop:
      "A $2,400 estimate they sent 11 days ago and completely forgot about suddenly gets a reply — because the system sent a perfectly timed, personalized nudge that didn't feel robotic.",
    does: "Follows up on open estimates until the lead books or declines.",
    steps: [
      "Monitor all estimates in CRM (sent date, status, amount, customer name).",
      "On day 3, 7, and 12 with no response: trigger an automated follow-up sequence.",
      "LLM generates a short, natural human message tailored to trade and job type.",
      "If customer replies with hesitation, detect objection and send a \"social proof\" follow-up.",
      "If they say yes: move them into the booking flow automatically.",
    ],
    result:
      "Open estimates quietly convert to active bookings in the background. Log every follow-up and outcome for real ROI tracking.",
    why: "Recovers thousands in lost revenue from prospects who simply got busy.",
  },
  {
    num: "03",
    name: "No-Show Punisher",
    channel: "SMS",
    payoff: "A missed appointment gets recovered and the slot gets refilled from the waitlist.",
    jawDrop:
      "Someone doesn't show. Instead of the owner sitting in a driveway losing 2 hours, the system detects the no-show, texts the customer, reads the reply, reschedules, and fills the slot from a waitlist — all before they even pull out.",
    does: "Detects no-shows, texts the customer, and recovers the calendar slot.",
    steps: [
      "Trigger: appointment time passes with no \"job started\" signal.",
      "Wait 10 minutes, then send: \"Hey, wanted to make sure everything's still good for today?\"",
      "Branch on response (No reply, \"Forgot\", or \"Emergency\") and trigger intelligent follow-up.",
      "If slot opens: immediately text the #1 waitlist candidate to take the opening.",
    ],
    result:
      "Idle crew hours get instantly re-allocated to paying jobs. Notify owner only when the slot is successfully refilled or recovery fails.",
    why: "Stops calendar gaps from killing daily profit margins.",
  },
  {
    num: "04",
    name: "5-Star Machine",
    channel: "SMS / EMAIL",
    payoff: "Reviews appear automatically after a job is finished, without the owner asking.",
    jawDrop:
      "They close a job on Friday. Monday morning there are two new Google reviews from that customer and their neighbor — and they never had to ask.",
    does: "Sends review requests after payment or completion and escalates bad reviews privately.",
    steps: [
      "Trigger: job marked complete or invoice marked paid.",
      "Wait ~2 hours (post-job satisfaction window).",
      "Send a warm, job-specific review request with a direct link.",
      "If no review in 48 hours: send a soft follow-up reminder.",
      "If 5 stars: send a thank-you and a referral ask.",
    ],
    result:
      "Google Review rating consistently climbs on autopilot. Bad reviews (3 stars or less) are flagged to the owner privately via Telegram/SMS before publishing.",
    why: "Dominates local search rankings and builds trust without manual chasing.",
  },
  {
    num: "05",
    name: "10PM Desk Killer",
    channel: "DIGEST",
    payoff: "The owner gets one clean nightly digest instead of doing admin at the kitchen table.",
    jawDrop:
      "It's 9:45PM. Instead of sitting down to return calls and chase invoices, they get one message summarizing what happened today and what's already handled for tomorrow.",
    does: "Summarizes missed calls, invoices, estimates, and tomorrow's appointments.",
    steps: [
      "Nightly at 8PM, run a full operational audit across systems.",
      "Check missed calls (and status of text-backs), outstanding invoices, and active estimates.",
      "Pull tomorrow's calendar and verify confirmation status.",
      "LLM generates a plain-English, cohesive evening briefing.",
    ],
    result:
      "Receive a single, clean WhatsApp/Telegram notification: \"Today: 3 missed calls (2 text-backs sent, 1 booked), 4 invoices outstanding ($3,200, reminders sent), 6 appointments confirmed for Tuesday.\"",
    why: "Reclaims late nights and eliminates administrative anxiety.",
  },
  {
    num: "06",
    name: "Revenue Leak Scorecard",
    channel: "DIGEST",
    payoff: "See exactly how much money missed calls and cold bids cost last month.",
    jawDrop:
      "During a free assessment, you show them a live report: \"In the last 30 days, your business missed an estimated $9,600 from 8 unanswered calls and 3 cold estimates.\" It's their own data — not theory.",
    does: "Turns operational leaks into real dollar figures for the sales conversation.",
    steps: [
      "Onboarding: ingest call logs, estimates, and job records.",
      "Calculate missed-call loss, cold-estimate loss, and no-show loss using their actual averages.",
      "Generate a high-fidelity visual dashboard / dynamic summary.",
    ],
    result:
      "A clear, interactive scoreboard highlighting exactly where money is slipping through the cracks and how much automation will recover.",
    why: "Translates invisible mistakes into undeniable, high-priority dollar figures.",
  },
  {
    num: "07",
    name: "Invoice Chaser",
    channel: "SMS / EMAIL",
    payoff: "Overdue invoices start getting paid without awkward manual follow-up.",
    jawDrop:
      "Overdue invoices start getting paid from polite messages that went out automatically, and the owner didn't have to be the bad guy.",
    does: "Sends polite reminders, escalates tone when needed, and logs payment status.",
    steps: [
      "Watch invoices in accounting; flag anything overdue by N days and under a max amount.",
      "Send a friendly reminder sequence with different tones by age of invoice.",
      "Stop the sequence immediately if payment posts or customer replies.",
      "Escalate stubborn accounts to the owner with suggested response templates.",
    ],
    result:
      "Overdue balances turn into active deposits without requiring manual phone calls or confrontational messages.",
    why: "Maximizes cash flow while keeping customer relationships stress-free.",
  },
  {
    num: "08",
    name: "Lead Traffic Cop",
    channel: "SMS / EMAIL",
    payoff: "Every lead is routed correctly instead of interrupting the owner.",
    jawDrop:
      "Every lead doesn't interrupt their day. Instead, the system decides who's worth a fast response, who can wait, and where each request should go.",
    does: "Sorts leads by urgency, trade, size, and location, then routes them to the right workflow.",
    steps: [
      "Capture leads from phone, web form, SMS, or social channels.",
      "Classify each by trade, urgency, location, and job size using rules + LLM.",
      "Route hot, high-value jobs to instant text + call.",
      "Route low-urgency work to standardized estimation flows.",
    ],
    result:
      "An organized, pre-filtered lead inbox where high-priority clients get addressed in seconds, and tire-kickers are handled on autopilot.",
    why: "Restores focus and stops high-value opportunities from getting buried in spam.",
  },
  {
    num: "09",
    name: "Job Confirmation Guardian",
    channel: "SMS",
    payoff: "Tomorrow's schedule is confirmed automatically before the owner wakes up.",
    jawDrop:
      "Instead of scribbling jobs on a whiteboard and hoping it works, tomorrow's roster is fully confirmed, optimized, and mapped while you sleep.",
    does: "Sends reminder texts, reduces cancellations, and catches issues early.",
    steps: [
      "Pull tomorrow's jobs, addresses, estimated durations, and tech assignments.",
      "Use routing logic to group jobs by geography and sequence them efficiently.",
      "Text each tech their optimized route with addresses and time windows.",
      "Send automated confirmations to tomorrow's appointments.",
    ],
    result:
      "A beautifully coordinated schedule dashboard showing all routes verified, clients ready, and technicians dispatched with zero manual coordination.",
    why: "Minimizes drive-time overhead, eliminates empty runs, and ensures flawless crew utilization.",
  },
  {
    num: "10",
    name: "Estimate Objection Handler",
    channel: "EMAIL / SMS",
    payoff: "A \"too expensive\" reply gets a smart response instead of going cold.",
    jawDrop:
      "A prospect replies with a budget objection and, instead of the lead dying, they receive an immediate, professional alternative option or value proposition that saves the deal.",
    does: "Detects objections and responds with proof, clarity, or next-step options.",
    steps: [
      "Ingest incoming SMS and email replies on sent estimates.",
      "Classify replies for common objections (price, timing, competitor).",
      "LLM drafts a tailored response addressing the specific concern professionally.",
      "Present custom payment plan details or alternative scope suggestions.",
    ],
    result:
      "Difficult sales conversations get navigated automatically, keeping critical deals alive and advancing them to close.",
    why: "Prevents solid deals from slipping away due to minor pricing or timing hesitations.",
  },
  {
    num: "11",
    name: "Referral Prompt Engine",
    channel: "SMS / EMAIL",
    payoff: "Happy customers are asked for referrals at exactly the right moment.",
    jawDrop:
      "Exactly when a customer is expressing peak excitement over a completed job, the system prompts them to refer a neighbor, bringing in fresh bookings for free.",
    does: "Triggers referral requests after successful jobs and good reviews.",
    steps: [
      "Monitor feedback loops and identify 5-star review submissions.",
      "Trigger a personalized referral prompt thanking them for their business.",
      "Offer a clear incentive or an easy-to-share landing link for neighbors.",
      "Track successful referral conversions automatically.",
    ],
    result:
      "A consistent pipeline of high-quality word-of-mouth leads flowing directly into your booking calendar.",
    why: "Leverages organic customer enthusiasm to lower lead acquisition costs.",
  },
  {
    num: "12",
    name: "Owner OS Digest",
    channel: "DIGEST",
    payoff: "One clean business snapshot instead of ten separate apps.",
    jawDrop:
      "Instead of logging into ten separate software screens, the owner looks at a single, centralized HUD and instantly knows the health of their entire operation.",
    does: "Combines the most important signals into one operational command center.",
    steps: [
      "Pull metrics across phone channels, reviews, outstanding invoices, and scheduling.",
      "Consolidate active pipeline data and daily operational leaks.",
      "Output a unified, highly readable executive dashboard.",
    ],
    result:
      "A unified live interface showing booking status, active leaks plugged, daily closed revenue, and outstanding client follow-ups.",
    why: "Acts as a complete cockpit for your business, keeping you in control with zero clutter.",
  },
];

function Agents() {
  const [active, setActive] = useState<Agent | null>(null);

  return (
    <>
      <section
        className="hero"
        style={{ minHeight: "auto", paddingBottom: "var(--space-2xl)" }}
        aria-labelledby="ag-h"
      >
        <div className="hero__rail">
          <span className="hero__rail-dot" aria-hidden="true" />
          <span>The catalogue · 12 agents · tap any card</span>
        </div>
        <h1 className="hero__display" id="ag-h" style={{ maxWidth: "20ch" }}>
          <span className="hero__line">Twelve agents.</span>
          <span className="hero__line">
            <em>One owner.</em>
          </span>
        </h1>
        <p
          className="hero__p"
          style={{ maxWidth: "32ch", textAlign: "center", marginTop: "1.25rem" }}
        >
          Every workflow your shop runs by hand — answered, followed up, and closed.
          Tap a card to see what it does, what it costs, and what it saves.
        </p>
      </section>

      <section className="agents-grid" aria-label="Agent catalogue">
        {AGENTS.map((a) => (
          <button
            key={a.num}
            type="button"
            className="agent-card"
            onClick={() => setActive(a)}
            aria-haspopup="dialog"
          >
            <p className="agent-card__num tnum">Agent {a.num}</p>
            <h2 className="agent-card__h">{a.name}</h2>
            <p className="agent-card__p">{a.payoff}</p>
            <div className="agent-card__foot">
              <span className="agent-card__tag">{a.channel}</span>
              <span className="agent-card__open">Open <span aria-hidden="true">→</span></span>
            </div>
          </button>
        ))}
      </section>

      <Dialog open={!!active} onOpenChange={(o) => !o && setActive(null)}>
        <DialogContent className="agent-modal" aria-describedby={undefined}>
          {active && (
            <>
              <DialogHeader className="agent-modal__header">
                <p className="agent-modal__num tnum">Agent {active.num}</p>
                <DialogTitle className="agent-modal__h">{active.name}</DialogTitle>
                <DialogDescription asChild>
                  <span className="agent-modal__tag">{active.channel}</span>
                </DialogDescription>
              </DialogHeader>

              <div className="agent-modal__body">
                <blockquote className="agent-modal__quote">{active.jawDrop}</blockquote>

                <div className="agent-modal__section">
                  <h3>What it does</h3>
                  <p>{active.does}</p>
                </div>

                <div className="agent-modal__section">
                  <h3>How it works</h3>
                  <ol className="agent-modal__steps">
                    {active.steps.map((s, i) => (
                      <li key={i}>{s}</li>
                    ))}
                  </ol>
                </div>

                <div className="agent-modal__section">
                  <h3>What the owner sees</h3>
                  <p>{active.result}</p>
                </div>

                <div className="agent-modal__section">
                  <h3>Why it matters</h3>
                  <p>{active.why}</p>
                </div>
              </div>

              <div className="agent-modal__footer">
                <BookingButton className="cta cta--primary cta--lg agent-modal__cta">
                  See this working in my business
                </BookingButton>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>

      <FinalCTA />
      <LeadBar />
    </>
  );
}
