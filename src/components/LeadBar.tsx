import { useState } from "react";

export function LeadBar() {
  const [email, setEmail] = useState("");
  const [done, setDone] = useState(false);

  return (
    <section className="leadbar" id="leadbar" aria-label="Operational Leak Audit Checklist">
      <div className="leadbar__inner">
        <div className="leadbar__copy">
          <h3>The Operational Leak Audit Checklist.</h3>
          <p>The 5 most common revenue leaks in local service businesses. One page.</p>
        </div>
        <form
          className="leadbar__form"
          onSubmit={(e) => {
            e.preventDefault();
            if (!email) return;
            setDone(true);
          }}
        >
          {done ? (
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
                placeholder="you@yourshop.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <button type="submit" className="cta cta--primary">
                <span>Get the checklist</span>
                <span className="cta__arrow" aria-hidden="true">
                  →
                </span>
              </button>
            </>
          )}
        </form>
        <p className="leadbar__note">No pitch. No follow-up campaign. Just the checklist.</p>
      </div>
    </section>
  );
}
