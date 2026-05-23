import type { ReactNode } from "react";

export type BlogPost = {
  slug: string;
  title: string;
  description: string;
  trade: string;
  leak: string;
  date: string;
  content: ReactNode;
};

export const blogPosts: BlogPost[] = [
  {
    slug: "missed-call-text-back-for-contractors",
    title: "Missed-Call Text-Back for Contractors",
    description:
      "Every missed call is a lead that walked. Here's how a 60-second automated text-back catches them — before they call your competitor.",
    trade: "Contractors",
    leak: "Missed Calls",
    date: "April 14, 2026",
    content: (
      <>
        <p>
          You're on the other job. The phone rings in the truck. You're under a sink, on a roof, or
          elbow-deep in a condenser. By the time you check voicemail, that lead has already called
          the next shop on Google.
        </p>
        <p>
          Missed calls are the most expensive hang-up in a contracting business. And the fix is
          embarrassingly simple: text them back within 60 seconds.
        </p>

        <h2>The real cost of a missed call</h2>
        <p>
          Most contractors I talk to in Rockford and Beloit think they lose "a few" leads to missed
          calls. So I had them count. For a 5-truck HVAC shop:
        </p>
        <table>
          <thead>
            <tr>
              <th>Metric</th>
              <th>Per Week</th>
              <th>Per Month</th>
              <th>Per Year</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Missed calls (est.)</td>
              <td>14</td>
              <td>60</td>
              <td>728</td>
            </tr>
            <tr>
              <td>Avg. ticket (HVAC)</td>
              <td>—</td>
              <td>—</td>
              <td>$650</td>
            </tr>
            <tr>
              <td>Recoverable at 35%</td>
              <td>5 leads</td>
              <td>21 leads</td>
              <td>255 leads</td>
            </tr>
            <tr>
              <td>
                <strong>Revenue recovered</strong>
              </td>
              <td>
                <strong>$3,250</strong>
              </td>
              <td>
                <strong>$13,650</strong>
              </td>
              <td>
                <strong>$165,750</strong>
              </td>
            </tr>
          </tbody>
        </table>
        <p>
          That's six figures sitting in your voicemail inbox. And that's just HVAC. Plumbers,
          electricians, and roofers see similar numbers.
        </p>

        <h2>Why text-back works better than voicemail</h2>
        <p>
          Voicemail is a <em>passive</em> recovery — you wait for them to call back. Text-back is{" "}
          <em>active</em>: the moment the call drops, a text fires to their phone:
        </p>
        <blockquote>
          "Hey, we missed your call — we're on a job site right now. Reply with what you need and
          we'll get right back to you with a time."
        </blockquote>
        <p>Three things happen when that text lands within 60 seconds:</p>
        <ul>
          <li>
            <strong>You acknowledge them.</strong> The lead feels seen, not screened.
          </li>
          <li>
            <strong>You capture intent.</strong> Before they call the next shop, you know what they
            need.
          </li>
          <li>
            <strong>You buy time.</strong> Most homeowners will wait 5–10 minutes for a text reply.
            They won't wait 4 hours for a voicemail callback.
          </li>
        </ul>

        <h2>How to set it up (under an hour)</h2>
        <p>You don't need a CRM overhaul or a new phone system. Here's the lean setup:</p>
        <ol>
          <li>
            <strong>Forward missed calls to a Google Voice number</strong> (or port your main line
            to a VoIP provider that supports webhooks).
          </li>
          <li>
            <strong>Connect that number to an automation tool</strong> like GoHighLevel or a simpler
            webhook-to-text service.
          </li>
          <li>
            <strong>Write one text message.</strong> Keep it plain and human. No links. No "Press 1
            for…" Just a real reply.
          </li>
          <li>
            <strong>Set your hours.</strong> Only fire the text-back when you're actually
            unavailable — after hours, during known job windows.
          </li>
        </ol>

        <h3>Two rules for the text itself</h3>
        <ul>
          <li>
            <strong>No robots.</strong> "Your call is important to us" is the fastest way to sound
            like a corporate HVAC chain. Write it like you'd text a neighbor.
          </li>
          <li>
            <strong>One ask.</strong> "Reply with what you need." That's it. Don't ask for address,
            budget, and credit card upfront. The goal is the reply.
          </li>
        </ul>

        <h2>What the numbers look like in practice</h2>
        <p>
          A 4-truck plumbing company in Machesney Park installed a text-back workflow last November.
          Before: they recovered about 1 in 10 missed calls. After: 4 in 10 replied to the text
          within 15 minutes. Six of those turned into booked jobs the same day.
        </p>
        <p>That's $2,700 in emergency service calls from a setup that took 40 minutes.</p>

        <h2>Start with one line</h2>
        <p>
          If you're reading this and thinking <em>"I should track my missed calls"</em>— don't. Just
          set up the text-back this week. You'll see the numbers in your first weekend.
        </p>
        <p>
          The shops that act on this pull ahead. The ones that keep letting the phone ring into
          voicemail? They're training leads to call someone else.
        </p>
      </>
    ),
  },
  {
    slug: "podium-vs-gohighlevel-local-service-businesses",
    title: "Podium vs GoHighLevel for Local Service Businesses",
    description:
      "Two platforms. One is built for enterprise marketing teams. The other was born for local service operators. Here's which one wins — and why.",
    trade: "Business Tools",
    leak: "Platform Comparison",
    date: "April 10, 2026",
    content: (
      <>
        <p>
          If you're running a local service business and shopping for an all-in-one platform, you've
          hit the Podium vs GoHighLevel wall.
        </p>
        <p>
          Both do reviews, messaging, and online presence. Both claim to be built for "local
          businesses." But they come at the problem from completely different angles — and one of
          them will cost you a lot more for what you actually need.
        </p>

        <h2>The quick take</h2>
        <table>
          <thead>
            <tr>
              <th>Capability</th>
              <th>Podium</th>
              <th>GoHighLevel</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Starting price</td>
              <td>$249/mo</td>
              <td>$97/mo</td>
            </tr>
            <tr>
              <td>Review management</td>
              <td>✅ Built-in</td>
              <td>✅ Built-in</td>
            </tr>
            <tr>
              <td>Text messaging</td>
              <td>✅ Included</td>
              <td>✅ Included</td>
            </tr>
            <tr>
              <td>Missed-call text-back</td>
              <td>❌ Add-on</td>
              <td>✅ Built-in workflow</td>
            </tr>
            <tr>
              <td>Automation builder</td>
              <td>⚠️ Basic</td>
              <td>✅ Full visual builder</td>
            </tr>
            <tr>
              <td>Pipeline/CRM</td>
              <td>⚠️ Simplified</td>
              <td>✅ Full pipeline</td>
            </tr>
            <tr>
              <td>Website builder</td>
              <td>❌ Not included</td>
              <td>✅ Included</td>
            </tr>
            <tr>
              <td>Conversation AI</td>
              <td>✅ Included</td>
              <td>✅ Add-on</td>
            </tr>
            <tr>
              <td>Multi-location</td>
              <td>✅ Native</td>
              <td>✅ Native (agencies)</td>
            </tr>
          </tbody>
        </table>

        <h2>Podium: polished, priced for enterprise</h2>
        <p>
          Podium started as a review-generation tool and expanded into a full "local marketing"
          platform. Their UI is clean. Their onboarding is hand-holdy. And their pricing assumes you
          have a marketing budget, not a tool budget.
        </p>
        <p>
          At $249/month for the basic plan, you get review management, messaging, and payment links.
          If you want webchat, missed-call recovery, or advanced automation, those are separate line
          items. A typical Podium setup runs $400–$700/month for a single-location shop.
        </p>
        <blockquote>
          "Podium is excellent if you want a polished, low-configuration product and have
          $500+/month to spend. It's not built for owners who want to build custom workflows."
        </blockquote>

        <h2>GoHighLevel: built for operators, rough around the edges</h2>
        <p>
          GoHighLevel (GHL) started as a CRM and automation platform for marketing agencies. But the
          tools it built for agencies — automation workflows, pipelines, trigger-based messaging —
          happen to be exactly what a local service operator needs.
        </p>
        <p>At $97/month (Starter) or $297/month (Unlimited), you get:</p>
        <ul>
          <li>Unlimited contacts and pipelines</li>
          <li>Visual automation builder (triggers, conditions, actions)</li>
          <li>Review management and reputation tools</li>
          <li>Email and SMS messaging</li>
          <li>Conversation inbox across channels</li>
          <li>Website and funnel builder</li>
          <li>Membership / course portal</li>
        </ul>
        <p>
          The catch: it's harder to learn. GHL has a steeper onboarding curve because it gives you
          more control. You have to build what you want, rather than picking from a menu of
          pre-baked features.
        </p>

        <h2>Which one should you pick?</h2>
        <h3>Pick Podium if:</h3>
        <ul>
          <li>You have $500+/month to spend and want something that works out of the box</li>
          <li>Review management is your #1 priority and you don't need complex automation</li>
          <li>
            You have a team member who will own the platform (rather than you tinkering with it)
          </li>
        </ul>

        <h3>Pick GoHighLevel if:</h3>
        <ul>
          <li>
            You want to automate the repetitive parts of your operation (missed calls, follow-ups,
            invoicing)
          </li>
          <li>You're willing to spend a weekend learning the platform to save $200–$400/month</li>
          <li>
            You want one system for CRM, messaging, and automation instead of three separate
            subscriptions
          </li>
        </ul>

        <h2>The bottom line</h2>
        <p>
          For most single-location operators in the Rockford corridor — HVAC shops, plumbers, auto
          repair — GoHighLevel is the better value. The automation builder alone saves you from
          paying for Zapier, a separate SMS tool, and a CRM. Podium is a better fit for
          multi-location businesses with marketing staff.
        </p>
        <p>
          But neither platform works if you don't set it up for <em>your</em>
          specific leak. Start with the leak, not the tool.
        </p>
      </>
    ),
  },
  {
    slug: "best-automation-tools-local-service-businesses",
    title: "Best Automation Tools for Local Service Businesses",
    description:
      "A grounded tour of the tools that actually move the needle for owner-operators — from $0 setups to full-stack platforms.",
    trade: "Business Tools",
    leak: "Tool Selection",
    date: "April 6, 2026",
    content: (
      <>
        <p>
          Walk into any conversation about "automation tools" and you'll drown in options. Zapier.
          Make. GoHighLevel. Podium. HubSpot. Salesforce. A dozen CRMs. Three dozen "AI phone
          agents."
        </p>
        <p>
          For a local service business owner, most of these are overkill. You don't need a marketing
          cloud. You need the phone to stop leaking leads.
        </p>
        <p>
          Here's the practical stack for an owner-operated shop — organized by what you're trying to
          fix, not by vendor category.
        </p>

        <h2>The three leaks automation actually fixes</h2>
        <p>
          Before picking tools, name the leak. In our experience working with shops in Rockford,
          Beloit, and Roscoe, three operational leaks account for 80% of the revenue gap:
        </p>
        <ol>
          <li>
            <strong>Missed calls</strong> — calls that go to voicemail during jobs or after hours
          </li>
          <li>
            <strong>Cold estimates</strong> — quotes sent that never get a follow-up
          </li>
          <li>
            <strong>No-shows</strong> — appointments that weren't confirmed and nobody showed
          </li>
        </ol>
        <p>Each leak maps to a specific tool category. Here's the landscape.</p>

        <h2>Category 1: Missed-call recovery</h2>
        <table>
          <thead>
            <tr>
              <th>Tool</th>
              <th>Price</th>
              <th>Best For</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Google Voice + webhook</td>
              <td>$0 (plus SMS)</td>
              <td>Solo operators who want the leanest setup</td>
            </tr>
            <tr>
              <td>GoHighLevel</td>
              <td>$97/mo</td>
              <td>Shops that want CRM + missed-call in one</td>
            </tr>
            <tr>
              <td>Smith.ai</td>
              <td>$285/mo</td>
              <td>Real human answering, not a text-back</td>
            </tr>
            <tr>
              <td>Dialpad</td>
              <td>$23/user/mo</td>
              <td>VoIP-based auto-attendant + text</td>
            </tr>
          </tbody>
        </table>
        <p>
          The simplest version costs nothing: forward after-hours calls to Google Voice, connect it
          to a Slack channel or text-forwarding service, and reply within 60 seconds. You can build
          this in an afternoon.
        </p>

        <h2>Category 2: Estimate follow-up</h2>
        <p>Most quotes go cold at the 48-hour mark. The fix is a three-touch sequence:</p>
        <ul>
          <li>
            <strong>Touch 1 (same day):</strong> "Here's your estimate. Reply with questions."
          </li>
          <li>
            <strong>Touch 2 (48 hours):</strong> "Checking in on the estimate I sent. Want me to
            block Friday?"
          </li>
          <li>
            <strong>Touch 3 (7 days):</strong> "Estimate's still good. Let me know if timing
            changes."
          </li>
        </ul>
        <p>Tools that handle this sequence:</p>
        <ul>
          <li>
            <strong>GoHighLevel</strong> — visual workflow builder with time-based triggers ($97/mo)
          </li>
          <li>
            <strong>Make (formerly Integromat)</strong> — connects your existing tools without a
            full CRM ($9/mo)
          </li>
          <li>
            <strong>Housecall Pro / Jobber</strong> — built-in estimate follow-ups if you're already
            using them for scheduling
          </li>
        </ul>
        <p>
          The automation removes the awkwardness. You're not "chasing." You're following a system
          that the customer opted into.
        </p>

        <h2>Category 3: No-show prevention</h2>
        <p>
          A no-show costs you the appointment slot plus the opportunity cost of a paying job. The
          fix is two texts:
        </p>
        <ol>
          <li>
            <strong>24-hour reminder</strong> — "See you tomorrow at 2 PM at 123 Main St. Reply C to
            confirm."
          </li>
          <li>
            <strong>2-hour confirmation</strong> — "On our way. Be there in 20." (for field service)
            or "Headed your way shortly." (for shop appointments)
          </li>
        </ol>
        <p>Tools for this:</p>
        <ul>
          <li>
            <strong>GoHighLevel</strong> — time-based SMS workflows with two-way reply handling
          </li>
          <li>
            <strong>Podium</strong> — review-first platform with appointment reminders
          </li>
          <li>
            <strong>Calendly + Zapier</strong> — connects scheduling to automated SMS reminders
            ($0–$30/mo)
          </li>
        </ul>

        <h2>When to graduate to a full platform</h2>
        <p>
          If you're currently using 3+ separate tools (scheduling app + SMS tool + CRM + review
          service), you're paying for integration headaches, not capability.
        </p>
        <p>
          At that point, a single platform like GoHighLevel or Podium replaces the stack and pays
          for itself in time saved. The rule: if you spend more than 2 hours per week moving data
          between tools, consolidate.
        </p>

        <h2>One tool to start</h2>
        <p>
          If you're starting from zero, pick <strong>one leak</strong> and pick
          <strong>one tool</strong> for it. The highest-ROI first move for most shops is missed-call
          text-back. It costs the least, takes the least time, and produces visible revenue in the
          first week.
        </p>
        <p>
          Once that's running, layer on estimate follow-up. Then no-show prevention. Each layer
          compounds the last.
        </p>
        <p>
          Don't buy the platform until you've proven the pattern with a free or cheap tool. Let the
          revenue fund the upgrade.
        </p>
      </>
    ),
  },
];
