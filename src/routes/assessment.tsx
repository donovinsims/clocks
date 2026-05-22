import { createFileRoute } from "@tanstack/react-router";
import { BookingButton } from "@/components/BookingModal";
import { useState, useEffect, useRef, useCallback } from "react";

export const Route = createFileRoute("/assessment")({
  head: () => ({
    meta: [
      { title: "Free Operations Audit — Clockout · 20 minutes, written report" },
      {
        name: "description",
        content:
          "A 20-minute call. A written ROI report. An effort/impact matrix. No pitch. No obligation. Roscoe · Rockford · Beloit.",
      },
      { property: "og:title", content: "Free Operations Audit — Clockout" },
      {
        property: "og:description",
        content:
          "20 minutes. Written report. The exact leak, in dollars. Then you decide what to do with it.",
      },
    ],
  }),
  component: Assessment,
});

const QUESTIONS = [
  {
    question: "How many incoming calls do you miss per week because you're busy or on a job?",
    options: [
      { text: "0-2 calls", value: 0 },
      { text: "3-5 calls", value: 500 },
      { text: "6-10 calls", value: 1500 },
      { text: "11+ calls", value: 3000 },
    ],
  },
  {
    question: "How many hours per week do you spend manually chasing unpaid invoices?",
    options: [
      { text: "0-1 hours", value: 0 },
      { text: "2-4 hours", value: 300 },
      { text: "5-8 hours", value: 600 },
      { text: "9+ hours", value: 1000 },
    ],
  },
  {
    question: "When a new lead requests a quote or bid, how fast do you usually respond?",
    options: [
      { text: "Within 15 minutes", value: 0 },
      { text: "Within a few hours", value: 400 },
      { text: "By the next day", value: 1000 },
      { text: "2+ days", value: 2000 },
    ],
  },
  {
    question: "How often do you lose track of leads that didn't close immediately?",
    options: [
      { text: "Never, we follow up automatically", value: 0 },
      { text: "Sometimes, if things get busy", value: 300 },
      { text: "Often, we only follow up once", value: 800 },
      { text: "Always, if they don't buy, they're gone", value: 1500 },
    ],
  },
  {
    question:
      "How much of your evenings or weekends are spent on admin work (scheduling, billing, data entry)?",
    options: [
      { text: "None, I leave work at work", value: 0 },
      { text: "A couple hours a week", value: 200 },
      { text: "Most evenings or weekends", value: 500 },
      { text: "My business consumes my entire life", value: 1000 },
    ],
  },
];

const SEVERITY_CONFIG = {
  tight: {
    label: "Tight Operations",
    color: "var(--color-success)",
    bg: "color-mix(in oklch, var(--color-success) 12%, transparent)",
    border: "color-mix(in oklch, var(--color-success) 30%, var(--color-rule))",
    message:
      "Your operations are tight. You have minimal leakage. Focus on scaling what already works.",
  },
  moderate: {
    label: "Moderate Leak",
    color: "var(--color-accent)",
    bg: "color-mix(in oklch, var(--color-accent) 12%, transparent)",
    border: "color-mix(in oklch, var(--color-accent) 30%, var(--color-rule))",
    message:
      "You have a moderate leak. Basic automation for missed calls and quotes could recover this easily.",
  },
  severe: {
    label: "Severe Leak",
    color: "var(--color-accent-2)",
    bg: "color-mix(in oklch, var(--color-accent-2) 12%, transparent)",
    border: "color-mix(in oklch, var(--color-accent-2) 30%, var(--color-rule))",
    message:
      "Your operational chaos is directly impacting your bottom line. It's time to plug the holes.",
  },
};

function getSeverity(total: number) {
  if (total === 0) return SEVERITY_CONFIG.tight;
  if (total <= 2000) return SEVERITY_CONFIG.moderate;
  return SEVERITY_CONFIG.severe;
}

function getRecommendations(total: number, answers: number[]): string[] {
  const recs: string[] = [];
  if (answers[0] >= 500) recs.push("Missed calls are your #1 leak. A missed-call text-back system recovers 30-50% of those.");
  if (answers[0] >= 1500) recs.push("You're losing serious revenue to unanswered phones. This should be fixed first.");
  if (answers[1] >= 300) recs.push("Invoice chasing is eating your time. Automated payment reminders would save those hours.");
  if (answers[2] >= 400) recs.push("Slow quote responses lose deals. Instant quote acknowledgment + templated responses close faster.");
  if (answers[3] >= 300) recs.push("Lost leads = lost revenue. A simple CRM pipeline with automated follow-ups fixes this.");
  if (answers[4] >= 200) recs.push("Admin at the kitchen table is a sign. Scheduling and billing can be automated in a day.");
  if (total === 0) recs.push("You're running lean. Invest in scaling your lead generation — your operations can handle it.");
  if (recs.length === 0) recs.push("Book the audit and we'll map out the highest-impact fix first.");
  return recs;
}

function AnimatedDots() {
  const [dots, setDots] = useState(0);
  useEffect(() => {
    const interval = setInterval(() => setDots((d) => (d + 1) % 4), 400);
    return () => clearInterval(interval);
  }, []);
  return <span>{".".repeat(dots)}</span>;
}

function CountUpNumber({ target, duration = 1200 }: { target: number; duration?: number }) {
  const [display, setDisplay] = useState(0);
  const startTime = useRef<number | null>(null);
  const frameRef = useRef<number>(0);

  const animate = useCallback(
    (timestamp: number) => {
      if (!startTime.current) startTime.current = timestamp;
      const progress = Math.min((timestamp - startTime.current) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setDisplay(Math.round(eased * target));
      if (progress < 1) {
        frameRef.current = requestAnimationFrame(animate);
      }
    },
    [target, duration],
  );

  useEffect(() => {
    startTime.current = null;
    frameRef.current = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(frameRef.current);
  }, [animate]);

  return <span className="tnum">${display.toLocaleString()}</span>;
}

function ProgressBar({ current, total }: { current: number; total: number }) {
  const pct = ((current + 1) / total) * 100;
  return (
    <div style={{ marginBottom: "2rem" }}>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          marginBottom: "0.75rem",
        }}
      >
        <span
          style={{
            fontFamily: "var(--font-mono)",
            fontSize: "var(--text-xs)",
            color: "var(--color-ink-2)",
            letterSpacing: "0.04em",
            textTransform: "uppercase",
          }}
        >
          Question {current + 1} of {total}
        </span>
        <span
          style={{
            fontFamily: "var(--font-mono)",
            fontSize: "var(--text-xs)",
            color: "var(--color-accent)",
            fontWeight: 600,
          }}
        >
          {Math.round(pct)}%
        </span>
      </div>
      <div
        style={{
          height: "4px",
          backgroundColor: "var(--color-paper-3)",
          borderRadius: "999px",
          overflow: "hidden",
        }}
      >
        <div
          style={{
            height: "100%",
            width: `${pct}%`,
            background: "var(--color-accent)",
            borderRadius: "999px",
            transition: "width 0.4s var(--ease-out)",
          }}
        />
      </div>
    </div>
  );
}

const ITEMS = [
  {
    h: "A written leak report",
    p: "Where you're losing money, in dollars per month and per year. No fluff.",
  },
  {
    h: "An effort / impact matrix",
    p: "Every leak ranked by what it costs to fix versus what it brings back.",
  },
  {
    h: "A single recommendation",
    p: "The one fix I'd install first. With the price, known upfront. No surprises.",
  },
  {
    h: "A walk-away",
    p: "If there's nothing worth fixing, I'll say so. You keep the report.",
  },
];

const ITEMS_FAQ = [
  {
    q: "How long is the call?",
    a: "20 minutes. I respect your time. If we run long, it's because you wanted to.",
  },
  {
    q: "What do I need to bring?",
    a: "Nothing. Just be near your phone and your normal day. I'll ask what I need.",
  },
  {
    q: "Will you pitch me?",
    a: "No. You'll leave with a written report. If you want to hire me, you'll tell me.",
  },
  {
    q: "Is it really free?",
    a: "Yes. I do this because most of the time the math sells itself. I don't need to.",
  },
  {
    q: "Can we do it in person?",
    a: "If you're in Roscoe, Rockford, Loves Park, Machesney, South Beloit, or anywhere in Winnebago / Boone County — yes. I'll drive.",
  },
];

function Assessment() {
  const [step, setStep] = useState<"landing" | "quiz" | "calculating" | "results">("landing");
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<number[]>([]);
  const [selectedOptionIdx, setSelectedOptionIdx] = useState<number | null>(null);
  const [leadName, setLeadName] = useState("");
  const [leadEmail, setLeadEmail] = useState("");
  const [copied, setCopied] = useState(false);

  const handleAnswer = (val: number, idx: number) => {
    setSelectedOptionIdx(idx);
    const newAnswers = [...answers, val];
    setAnswers(newAnswers);
    setTimeout(() => {
      if (currentQuestion < QUESTIONS.length - 1) {
        setCurrentQuestion(currentQuestion + 1);
        setSelectedOptionIdx(null);
      } else {
        setStep("calculating");
        setTimeout(() => {
          setStep("results");
        }, 1800);
      }
    }, 300);
  };

  const totalLeak = answers.reduce((a, b) => a + b, 0);
  const annualLeak = totalLeak * 12;
  const severity = getSeverity(totalLeak);
  const recommendations = getRecommendations(totalLeak, answers);

  const biggestLeakIdx = answers.reduce(
    (maxIdx, val, idx) => (val > (answers[maxIdx] ?? 0) ? idx : maxIdx),
    0,
  );
  const biggestLeakQuestion = QUESTIONS[biggestLeakIdx]?.question;
  const biggestLeakValue = answers[biggestLeakIdx] ?? 0;

  const handleCopyResults = async () => {
    const text = `Clockout Operations Scorecard: I'm leaking $${totalLeak.toLocaleString()}/month ($${annualLeak.toLocaleString()}/year) in missed revenue. Find your leak: clockout-site.com/assessment`;
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Fallback: select all in a temp textarea
      const ta = document.createElement("textarea");
      ta.value = text;
      document.body.appendChild(ta);
      ta.select();
      document.execCommand("copy");
      document.body.removeChild(ta);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const handleReset = () => {
    setStep("landing");
    setAnswers([]);
    setCurrentQuestion(0);
    setSelectedOptionIdx(null);
    setLeadName("");
    setLeadEmail("");
    setCopied(false);
  };

  return (
    <>
      <section
        className="hero"
        style={{ minHeight: "auto", paddingBottom: "4rem" }}
        aria-labelledby="as-h"
      >
        {step === "landing" && (
          <div style={{ animation: "fadeIn 0.5s ease", display: "flex", flexDirection: "column", alignItems: "center", gap: "1.75rem", width: "100%" }}>
            <div className="hero__rail">
              <span className="hero__rail-dot" aria-hidden="true" />
              <span>Operations Leak Scorecard · 5 Questions · 2 Minutes</span>
            </div>
            <h1 className="hero__display" id="as-h" style={{ maxWidth: "22ch", margin: 0 }}>
              <span className="hero__line">Find the leak.</span>
              <span className="hero__line">
                <em>In dollars.</em>
              </span>
            </h1>
            <p
              className="hero__p"
              style={{ margin: 0, maxWidth: "45ch", color: "var(--color-text-dim)", textAlign: "center" }}
            >
              Are you losing money to missed calls, slow quotes, and unpaid invoices? Answer 5 quick
              questions to discover your exact operational leak and get personalized
              recommendations.
            </p>
            <div className="hero__ctas" style={{ marginTop: "0.5rem" }}>
              <button className="cta cta--primary cta--lg" onClick={() => setStep("quiz")}>
                Start the Scorecard
              </button>
            </div>
          </div>
        )}


        {step === "quiz" && (
          <div
            style={{
              width: "100%",
              maxWidth: "600px",
              margin: "0 auto",
              animation: "fadeIn 0.4s var(--ease-out)",
            }}
          >
            <ProgressBar current={currentQuestion} total={QUESTIONS.length} />

            <h2
              className="section-h"
              style={{
                fontSize: "clamp(1.25rem, 3.5vw, 1.75rem)",
                marginBottom: "1.75rem",
                textAlign: "left",
                lineHeight: 1.3,
              }}
            >
              {QUESTIONS[currentQuestion].question}
            </h2>
            <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
              {QUESTIONS[currentQuestion].options.map((opt, idx) => {
                const isSelected = selectedOptionIdx === idx;
                return (
                  <button
                    key={idx}
                    onClick={() => handleAnswer(opt.value, idx)}
                    className="cta cta--ghost"
                    style={{
                      justifyContent: "flex-start",
                      padding: "1rem 1.25rem",
                      border: isSelected
                        ? "1.5px solid var(--color-accent)"
                        : "1px solid var(--color-border)",
                      textAlign: "left",
                      minHeight: "52px",
                      height: "auto",
                      width: "100%",
                      whiteSpace: "normal",
                      fontSize: "var(--text-md)",
                      lineHeight: 1.4,
                      transition:
                        "border-color 0.2s var(--ease-out), background-color 0.2s var(--ease-out), transform 0.2s var(--ease-out), opacity 0.2s var(--ease-out)",
                      opacity: selectedOptionIdx !== null && !isSelected ? 0.45 : 1,
                      transform: isSelected ? "scale(0.98)" : undefined,
                      backgroundColor: isSelected
                        ? "color-mix(in oklch, var(--color-accent) 10%, transparent)"
                        : undefined,
                      cursor: selectedOptionIdx !== null ? "default" : "pointer",
                      pointerEvents: selectedOptionIdx !== null ? "none" : "auto",
                    }}
                  >
                    <span style={{ flex: 1, minWidth: 0 }}>{opt.text}</span>
                    {isSelected && (
                      <span
                        style={{
                          color: "var(--color-accent)",
                          fontWeight: 700,
                          fontSize: "1.1em",
                          marginLeft: "0.5rem",
                          flexShrink: 0,
                        }}
                      >
                        →
                      </span>
                    )}
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {step === "calculating" && (
          <div
            style={{
              width: "100%",
              maxWidth: "600px",
              margin: "0 auto",
              textAlign: "center",
              padding: "3rem 0",
              animation: "fadeIn 0.4s var(--ease-out)",
            }}
          >
            <div
              style={{
                display: "inline-flex",
                alignItems: "center",
                justifyContent: "center",
                gap: "0.5rem",
                padding: "0.375rem 1rem",
                backgroundColor: "color-mix(in oklch, var(--color-paper-2) 90%, transparent)",
                border: "1px solid var(--color-border)",
                borderRadius: "var(--radius-pill)",
                marginBottom: "2rem",
                fontFamily: "var(--font-mono)",
                fontSize: "var(--text-xs)",
                letterSpacing: "0.04em",
                color: "var(--color-ink-2)",
                textTransform: "uppercase",
              }}
            >
              <span
                style={{
                  width: "6px",
                  height: "6px",
                  borderRadius: "50%",
                  backgroundColor: "var(--color-accent)",
                  boxShadow: "0 0 8px var(--color-accent)",
                  animation: "pulse 1s var(--ease-in-out) infinite",
                }}
              />
              <span>
                Analyzing responses
                <AnimatedDots />
              </span>
            </div>

            <div
              style={{
                padding: "2.5rem 2rem",
                backgroundColor: "var(--color-bg-alt, var(--color-paper-2))",
                borderRadius: "1rem",
                border: "1px solid var(--color-border)",
                marginBottom: "1.5rem",
              }}
            >
              <p
                style={{
                  fontFamily: "var(--font-mono)",
                  fontSize: "var(--text-xs)",
                  letterSpacing: "0.12em",
                  textTransform: "uppercase",
                  color: "var(--color-ink-3)",
                  margin: "0 0 1rem",
                }}
              >
                Estimated Monthly Leak
              </p>
              <div
                style={{
                  fontSize: "clamp(2.5rem, 8vw, 4rem)",
                  fontWeight: 800,
                  letterSpacing: "-0.04em",
                  lineHeight: 1,
                  color: "var(--color-accent)",
                  fontFamily: "var(--font-display)",
                }}
              >
                <CountUpNumber target={totalLeak} duration={1500} />
                <span style={{ opacity: 0.5 }}>
                  /mo
                </span>
              </div>
            </div>

            <p
              style={{
                color: "var(--color-ink-3)",
                fontSize: "var(--text-sm)",
                fontFamily: "var(--font-mono)",
              }}
            >
              Building your report
              <AnimatedDots />
            </p>
          </div>
        )}

        {step === "results" && (
          <div
            style={{
              width: "100%",
              maxWidth: "600px",
              margin: "0 auto",
              animation: "fadeIn 0.5s var(--ease-out)",
            }}
          >
            <div
              className="hero__rail"
              style={{ marginBottom: "1.5rem", justifyContent: "flex-start" }}
            >
              <span className="hero__rail-dot" aria-hidden="true" />
              <span>Your Operations Score</span>
            </div>

            {/* Main result card */}
            <div
              style={{
                padding: "2.5rem 2rem",
                backgroundColor: "var(--color-bg-alt, var(--color-paper-2))",
                borderRadius: "1rem",
                border: `1px solid ${severity.border}`,
                marginBottom: "1.5rem",
                textAlign: "center",
                position: "relative",
                overflow: "hidden",
              }}
            >
              {/* Ambient glow */}
              <div
                style={{
                  position: "absolute",
                  top: "-40%",
                  left: "50%",
                  transform: "translateX(-50%)",
                  width: "200%",
                  height: "80%",
                  background: `radial-gradient(ellipse, ${severity.bg} 0%, transparent 70%)`,
                  pointerEvents: "none",
                }}
              />

              <div style={{ position: "relative" }}>
                {/* Severity badge */}
                <div
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: "0.375rem",
                    padding: "0.375rem 0.875rem",
                    backgroundColor: severity.bg,
                    border: `1px solid ${severity.border}`,
                    borderRadius: "var(--radius-pill)",
                    marginBottom: "1.25rem",
                    fontFamily: "var(--font-mono)",
                    fontSize: "var(--text-xs)",
                    fontWeight: 600,
                    letterSpacing: "0.08em",
                    textTransform: "uppercase",
                    color: severity.color,
                  }}
                >
                  <span
                    style={{
                      width: "6px",
                      height: "6px",
                      borderRadius: "50%",
                      backgroundColor: severity.color,
                    }}
                  />
                  {severity.label}
                </div>

                {/* Monthly leak */}
                <p
                  className="section-eyebrow"
                  style={{
                    justifyContent: "center",
                    marginBottom: "0.5rem",
                    color: "var(--color-ink-3)",
                  }}
                >
                  Estimated Monthly Leak
                </p>
                <h2
                  style={{
                    fontSize: "clamp(3rem, 10vw, 5rem)",
                    margin: "0 0 0.25rem",
                    letterSpacing: "-0.04em",
                    lineHeight: 1,
                    color: severity.color,
                    fontFamily: "var(--font-display)",
                    fontWeight: 800,
                  }}
                >
                  ${totalLeak.toLocaleString()}
                </h2>
                <p
                  style={{
                    fontFamily: "var(--font-mono)",
                    fontSize: "var(--text-sm)",
                    color: "var(--color-ink-3)",
                    margin: "0 0 1.5rem",
                  }}
                >
                  per month
                </p>

                {/* Divider */}
                <div
                  style={{
                    height: "1px",
                    backgroundColor: "var(--color-border)",
                    margin: "1.5rem auto",
                    maxWidth: "120px",
                  }}
                />

                {/* Annual leak */}
                <p
                  style={{
                    fontFamily: "var(--font-mono)",
                    fontSize: "var(--text-xs)",
                    letterSpacing: "0.12em",
                    textTransform: "uppercase",
                    color: "var(--color-ink-3)",
                    margin: "0 0 0.5rem",
                  }}
                >
                  Annualized
                </p>
                <p
                  style={{
                    fontSize: "clamp(1.5rem, 5vw, 2.25rem)",
                    fontWeight: 700,
                    letterSpacing: "-0.03em",
                    lineHeight: 1.1,
                    color: "var(--color-ink)",
                    margin: "0 0 1.5rem",
                    fontFamily: "var(--font-display)",
                  }}
                >
                  ${annualLeak.toLocaleString()}
                  <span style={{ opacity: 0.4, fontWeight: 400, fontSize: "0.6em" }}>
                    /year
                  </span>
                </p>

                {/* Severity message */}
                <p style={{ color: "var(--color-ink-2)", fontSize: "var(--text-md)", lineHeight: 1.55 }}>
                  {severity.message}
                </p>
              </div>
            </div>

            {/* Biggest leak highlight */}
            {biggestLeakValue > 0 && biggestLeakQuestion && (
              <div
                style={{
                  padding: "1.25rem 1.5rem",
                  backgroundColor: "var(--color-paper-3)",
                  borderRadius: "0.75rem",
                  border: "1px solid var(--color-border)",
                  marginBottom: "1.5rem",
                }}
              >
                <p
                  style={{
                    fontFamily: "var(--font-mono)",
                    fontSize: "var(--text-xs)",
                    letterSpacing: "0.12em",
                    textTransform: "uppercase",
                    color: "var(--color-accent-2)",
                    margin: "0 0 0.5rem",
                    fontWeight: 600,
                  }}
                >
                  Biggest Leak
                </p>
                <p
                  style={{
                    color: "var(--color-ink)",
                    fontSize: "var(--text-md)",
                    margin: "0 0 0.375rem",
                    lineHeight: 1.45,
                  }}
                >
                  {biggestLeakQuestion}
                </p>
                <p
                  style={{
                    fontFamily: "var(--font-mono)",
                    fontSize: "var(--text-sm)",
                    color: "var(--color-accent-2)",
                    fontWeight: 600,
                    margin: 0,
                  }}
                >
                  ${biggestLeakValue.toLocaleString()}
                  /month
                </p>
              </div>
            )}

            {/* Recommendations */}
            <div
              style={{
                padding: "1.5rem",
                backgroundColor: "var(--color-paper-2)",
                borderRadius: "0.75rem",
                border: "1px solid var(--color-border)",
                marginBottom: "1.5rem",
              }}
            >
              <p
                style={{
                  fontFamily: "var(--font-mono)",
                  fontSize: "var(--text-xs)",
                  letterSpacing: "0.12em",
                  textTransform: "uppercase",
                  color: "var(--color-ink-3)",
                  margin: "0 0 1rem",
                  fontWeight: 600,
                }}
              >
                Quick Recommendations
              </p>
              <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "grid", gap: "0.75rem" }}>
                {recommendations.map((rec, idx) => (
                  <li
                    key={idx}
                    style={{
                      display: "flex",
                      gap: "0.75rem",
                      alignItems: "flex-start",
                      fontSize: "var(--text-sm)",
                      color: "var(--color-ink-2)",
                      lineHeight: 1.5,
                    }}
                  >
                    <span
                      style={{
                        color: "var(--color-accent)",
                        fontWeight: 700,
                        flexShrink: 0,
                        marginTop: "1px",
                      }}
                    >
                      →
                    </span>
                    <span>{rec}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Lead capture — lightweight, inline */}
            <div
              style={{
                padding: "1.5rem",
                backgroundColor: "var(--color-paper-2)",
                borderRadius: "0.75rem",
                border: "1px solid var(--color-border)",
                marginBottom: "1.5rem",
              }}
            >
              <p
                style={{
                  fontFamily: "var(--font-mono)",
                  fontSize: "var(--text-xs)",
                  letterSpacing: "0.12em",
                  textTransform: "uppercase",
                  color: "var(--color-ink-3)",
                  margin: "0 0 0.75rem",
                }}
              >
                Save your results (optional)
              </p>
              <div style={{ display: "grid", gap: "0.5rem" }}>
                <input
                  type="text"
                  placeholder="Your name"
                  value={leadName}
                  onChange={(e) => setLeadName(e.target.value)}
                  style={{
                    padding: "0.75rem 1rem",
                    backgroundColor: "var(--color-paper)",
                    border: "1px solid var(--color-border)",
                    borderRadius: "var(--radius-sm)",
                    color: "var(--color-ink)",
                    fontSize: "var(--text-md)",
                    width: "100%",
                  }}
                />
                <input
                  type="email"
                  placeholder="Your email"
                  value={leadEmail}
                  onChange={(e) => setLeadEmail(e.target.value)}
                  style={{
                    padding: "0.75rem 1rem",
                    backgroundColor: "var(--color-paper)",
                    border: "1px solid var(--color-border)",
                    borderRadius: "var(--radius-sm)",
                    color: "var(--color-ink)",
                    fontSize: "var(--text-md)",
                    width: "100%",
                  }}
                />
              </div>
              <p
                style={{
                  fontFamily: "var(--font-mono)",
                  fontSize: "11px",
                  color: "var(--color-ink-3)",
                  margin: "0.5rem 0 0",
                }}
              >
                We'll send you the written report. No spam, ever.
              </p>
            </div>

            {/* CTA section */}
            <div style={{ textAlign: "center", marginBottom: "1.5rem" }}>
              <h3
                style={{
                  fontSize: "1.25rem",
                  marginBottom: "0.5rem",
                  fontFamily: "var(--font-display)",
                  fontWeight: 700,
                }}
              >
                Want a custom plan to fix this?
              </h3>
              <p style={{ color: "var(--color-ink-2)", marginBottom: "1.5rem", fontSize: "var(--text-md)" }}>
                Book a free 20-minute operations audit. We'll find exactly where the leak is
                happening and map out the fix. No pitch.
              </p>
              <BookingButton
                className="cta cta--primary cta--lg"
                style={{ width: "100%", justifyContent: "center", minHeight: "52px" }}
              >
                Book your free audit
              </BookingButton>
            </div>

            {/* Copy results + Retake */}
            <div style={{ display: "grid", gap: "0.75rem" }}>
              <button
                onClick={handleCopyResults}
                className="cta cta--ghost"
                style={{
                  width: "100%",
                  justifyContent: "center",
                  minHeight: "48px",
                  border: "1px solid var(--color-border)",
                  fontSize: "var(--text-sm)",
                }}
              >
                {copied ? (
                  <>
                    <span style={{ color: "var(--color-success)" }}>✓</span>
                    <span>Copied to clipboard</span>
                  </>
                ) : (
                  <>
                    <span>📋</span>
                    <span>Copy my results</span>
                  </>
                )}
              </button>
              <button
                onClick={handleReset}
                className="cta cta--ghost"
                style={{
                  width: "100%",
                  justifyContent: "center",
                  minHeight: "48px",
                  border: "none",
                  fontSize: "var(--text-sm)",
                  color: "var(--color-ink-3)",
                }}
              >
                Retake Quiz
              </button>
            </div>
          </div>
        )}
      </section>

      {step === "landing" && (
        <>
          <section className="how">
            <header className="section-head">
              <p className="section-eyebrow">
                <span className="num tnum">01</span> · What you get
              </p>
              <h2 className="section-h">Four things. In writing. After 20 minutes.</h2>
            </header>
            <div className="how__steps how__steps--two">
              {ITEMS.map((i, idx) => (
                <div key={i.h} className="how__step">
                  <p className="how__num tnum">0{idx + 1}</p>
                  <h3 className="how__h">{i.h}</h3>
                  <p className="how__p">{i.p}</p>
                </div>
              ))}
            </div>
          </section>

          <section className="proof">
            <div className="proof__grid proof__grid--top">
              <div className="proof__copy">
                <p className="section-eyebrow">
                  <span className="num tnum">02</span> · Who this is for
                </p>
                <h2 className="section-h">Owners. Bottlenecks. Both.</h2>
                <p>
                  You're still the person answering calls, chasing leads, doing admin at the kitchen
                  table. Your business is good. The system around it is the problem.
                </p>
                <ul className="proof__list">
                  <li>HVAC, plumbing, electrical, auto repair</li>
                  <li>Real estate, nail salons, barbershops, landscaping</li>
                  <li>Any local owner whose phone is the front desk</li>
                  <li>You're in or near the Rockford / Beloit corridor</li>
                </ul>
              </div>
              <div className="proof__copy">
                <p className="section-eyebrow">
                  <span className="num tnum">03</span> · Who this isn't for
                </p>
                <h2 className="section-h">Tire-kickers. Big agencies.</h2>
                <p>
                  If you want a monthly retainer with a fancy dashboard and a quarterly business
                  review, I'm not your guy. If you want a SaaS tool with 47 features you'll never
                  use, also not me.
                </p>
                <ul className="proof__list">
                  <li>Not a marketing agency</li>
                  <li>Not a SaaS subscription</li>
                  <li>Not a "free strategy session" that's actually a 90-minute pitch</li>
                </ul>
              </div>
            </div>
          </section>

          <section className="guarantee">
            <div className="guarantee__card">
              <p className="guarantee__eyebrow">Investment</p>
              <h2 className="guarantee__h">
                The audit is free. The fix is <em>flat-fee.</em>
              </h2>
              <p className="guarantee__p">
                Single System Fix: $300–$800. Operations Stack: $1,200–$3,000. One-time. You own the
                system. We install your system in 7 days. If it doesn't recover 10 hours a week
                within 30 days, we keep working for free until it does.
              </p>
              <BookingButton className="cta cta--primary cta--lg">
                Book your free audit
              </BookingButton>
            </div>
          </section>

          <section className="faq">
            <header className="section-head">
              <p className="section-eyebrow">
                <span className="num tnum">04</span> · Questions
              </p>
              <h2 className="section-h">Quick answers.</h2>
            </header>
            <div className="faq__list">
              {ITEMS_FAQ.map((f) => (
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

          <section className="finalcta">
            <div className="finalcta__inner">
              <h2 className="finalcta__h">
                One call. <em>One number.</em>
              </h2>
              <p className="finalcta__p">
                Twenty minutes to know exactly what your operational chaos is costing you.
              </p>
              <BookingButton className="cta cta--primary cta--lg">
                Book your free audit
              </BookingButton>
              <p className="finalcta__guar">
                No pitch on the call. You leave with a written report either way.
              </p>
            </div>
          </section>
        </>
      )}
    </>
  );
}
