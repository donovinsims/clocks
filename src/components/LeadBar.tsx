import { useState } from "react";
import { subscribeToConvertKit } from "@/lib/convertkit";

export function LeadBar(): JSX.Element {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [errorMsg, setErrorMsg] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setStatus("loading");
    setErrorMsg("");
    try {
      await subscribeToConvertKit({ data: { email } });
      setStatus("success");
    } catch (err) {
      setStatus("error");
      setErrorMsg(err instanceof Error ? err.message : "Something went wrong");
    }
  };

  return (
    <section className="leadbar" id="leadbar" aria-label="Operational Leak Audit Checklist">
      <div className="leadbar__inner">
        <div className="leadbar__copy">
          <h2>The Operational Leak Audit Checklist.</h2>
          <p>The 5 most common revenue leaks in local service businesses. One page.</p>
        </div>
        <form className="leadbar__form" onSubmit={handleSubmit}>
          {status === "success" ? (
            <p
              className="tnum"
              style={{ color: "var(--color-success)", margin: 0, alignSelf: "center" }}
            >
              ✓ Sent. Check your inbox.
            </p>
          ) : (
            <>
              <input
                type="email"
                required
                aria-label="Email address for checklist"
                placeholder="you@yourshop.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                disabled={status === "loading"}
              />
              <button
                type="submit"
                className="cta cta--primary"
                disabled={status === "loading"}
              >
                <span>{status === "loading" ? "Sending..." : "Get the checklist"}</span>
                <span className="cta__arrow" aria-hidden="true">
                  →
                </span>
              </button>
              {status === "error" && (
                <p style={{ color: "var(--color-danger)", margin: 0, fontSize: "0.85em" }}>
                  {errorMsg}
                </p>
              )}
            </>
          )}
        </form>
        <p className="leadbar__note">No pitch. No follow-up campaign. Just the checklist.</p>
      </div>
    </section>
  );
}
