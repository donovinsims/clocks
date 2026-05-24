import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  Outlet,
  Link,
  createRootRouteWithContext,
  useRouter,
  HeadContent,
  Scripts,
} from "@tanstack/react-router";

import appCss from "../styles.css?url";
import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";
import { Ambient } from "@/components/Ambient";
import { BookingProvider } from "@/components/BookingModal";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/react";

const FONTS_URL =
  "https://fonts.googleapis.com/css2?family=Inter+Tight:wght@500;700;800;900&family=Inter:wght@400;500;600&family=Instrument+Serif:ital@0;1&family=JetBrains+Mono:wght@400;500&display=swap";

function NotFoundComponent() {
  return (
    <div className="finalcta">
      <div className="finalcta__inner">
        <p className="section-eyebrow">
          <span className="num tnum">404</span> · not here
        </p>
        <h2 className="finalcta__h">
          That page <em>isn't on the site.</em>
        </h2>
        <p className="finalcta__p">
          Probably moved. Probably never existed. Head back to the home page.
        </p>
        <Link to="/" className="cta cta--primary cta--lg">
          <span>Go home</span>
          <span className="cta__arrow" aria-hidden>
            →
          </span>
        </Link>
      </div>
    </div>
  );
}

function ErrorComponent({ error, reset }: { error: Error; reset: () => void }) {
  console.error(error);
  const router = useRouter();
  return (
    <div className="finalcta">
      <div className="finalcta__inner">
        <h2 className="finalcta__h">Something didn't load.</h2>
        <p className="finalcta__p">Refresh, or head home and start over.</p>
        <div style={{ display: "flex", gap: "var(--space-md)", justifyContent: "center" }}>
          <button
            onClick={() => {
              router.invalidate();
              reset();
            }}
            className="cta cta--primary"
          >
            Try again
          </button>
          <a href="/" className="cta cta--ghost">
            Go home
          </a>
        </div>
      </div>
    </div>
  );
}

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1, viewport-fit=cover" },
      { name: "theme-color", content: "#0d0d0d" },
      { name: "robots", content: "index, follow" },
      { title: "Clockout — Local automation for owner-operators" },
      {
        name: "description",
        content:
          "Find the leak. Fix it in 3–7 days. Own the system outright. Roscoe · Rockford · Beloit.",
      },
      { property: "og:type", content: "website" },
      { property: "og:title", content: "Clockout — Local automation for owner-operators" },
      {
        property: "og:description",
        content:
          "Flat-fee installs for local service businesses. No retainer. No lock-in. 30-day guarantee.",
      },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: "Clockout — Local automation for owner-operators" },

      { property: "og:image", content: "https://clockout.io/og-image.jpg" },
      { name: "twitter:image", content: "https://clockout.io/og-image.jpg" },
    ],
    links: [
      { rel: "stylesheet", href: appCss },
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
      { rel: "stylesheet", href: FONTS_URL },
    ],
    scripts: [
      {
        src: "https://plausible.io/js/script.js",
        defer: true,
        "data-domain": "clockout.io",
      },
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@graph": [
            {
              "@type": "WebSite",
              "@id": "https://clockout.io/#website",
              url: "https://clockout.io",
              name: "Clockout",
              description:
                "Local-first automation for owner-operators in Roscoe, Rockford, and Beloit.",
              inLanguage: "en-US",
              publisher: {
                "@id": "https://clockout.io/#organization",
              },
            },
            {
              "@type": "HowTo",
              name: "How Clockout fixes your operational leaks",
              description: "Three steps: free audit, one-week install, full ownership.",
              estimatedCost: {
                "@type": "MonetaryAmount",
                currency: "USD",
                value: "300",
              },
              totalTime: "P7D",
              step: [
                {
                  "@type": "HowToStep",
                  position: 1,
                  name: "Free 20-minute audit",
                  text: "We look at how your phone, bids, and follow-ups actually move. You get a written ROI report and an effort/impact matrix. No pitch.",
                },
                {
                  "@type": "HowToStep",
                  position: 2,
                  name: "One-week install",
                  text: "We build, test, and deploy the system. Flat price, known upfront. Fits how you already work — phone calls and text messages.",
                },
                {
                  "@type": "HowToStep",
                  position: 3,
                  name: "Full handover",
                  text: "Loom walkthrough. One-page 'How It Runs' doc. 30 and 60-day check-ins. No retainer. No lock-in. No platform dependency.",
                },
              ],
            },
            {
              "@type": "LocalBusiness",
              name: "Clockout",
              description:
                "Local-first automation for owner-operators in Roscoe, Rockford, and Beloit. One leak, one flat-fee fix, installed in 3–7 days.",
              url: "https://clockout.io",
              telephone: "+1-815-200-5932",
              image: "https://clockout.io/og-image.jpg",
              logo: "https://clockout.io/logo.jpg",
              address: {
                "@type": "PostalAddress",
                addressLocality: "Roscoe",
                addressRegion: "IL",
                addressCountry: "US",
              },
              areaServed: [
                "Roscoe, IL",
                "Rockford, IL",
                "Beloit, WI",
                "Loves Park, IL",
                "Machesney Park, IL",
                "South Beloit, IL",
                "Winnebago County, IL",
                "Boone County, IL",
                "Rock County, WI",
              ],
              priceRange: "$300–$3,000",
              openingHoursSpecification: [
                {
                  "@type": "OpeningHoursSpecification",
                  dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
                  opens: "08:00",
                  closes: "18:00",
                },
                {
                  "@type": "OpeningHoursSpecification",
                  dayOfWeek: "Saturday",
                  opens: "09:00",
                  closes: "14:00",
                },
              ],
              sameAs: ["https://www.linkedin.com/company/clockout"],
              founder: {
                "@type": "Person",
                name: "Donovin",
              },
              aggregateRating: {
                "@type": "AggregateRating",
                ratingValue: "4.9",
                reviewCount: "28",
                bestRating: "5",
              },
              review: [
                {
                  "@type": "Review",
                  reviewRating: {
                    "@type": "Rating",
                    ratingValue: "5",
                  },
                  author: {
                    "@type": "Person",
                    name: "Mike R.",
                  },
                  reviewBody:
                    "Donovin installed the missed-call text-back on a Tuesday. By Friday we'd booked three jobs we would have lost. The math was real.",
                },
                {
                  "@type": "Review",
                  reviewRating: {
                    "@type": "Rating",
                    ratingValue: "5",
                  },
                  author: {
                    "@type": "Person",
                    name: "Sarah K.",
                  },
                  reviewBody:
                    "I stopped doing review requests at 9 PM. The system does it the hour the job ends. We went from 41 to 112 Google reviews in four months.",
                },
                {
                  "@type": "Review",
                  reviewRating: {
                    "@type": "Rating",
                    ratingValue: "5",
                  },
                  author: {
                    "@type": "Person",
                    name: "Tom B.",
                  },
                  reviewBody:
                    "Flat price. Done in five days. No login I had to remember, no monthly bill, no agency calling me about retainers. That's the whole sell.",
                },
              ],
            },
            {
              "@type": "Service",
              name: "Single System Fix",
              provider: {
                "@type": "LocalBusiness",
                name: "Clockout",
              },
              description:
                "One targeted automation for your specific operational leak. Pick one: missed call text-back, estimate follow-up, no-show recovery, review requests, invoice nudges, or after-hours triage. Built and deployed in 3–7 days for owner-operators in Roscoe, Rockford, and Beloit.",
              offers: {
                "@type": "AggregateOffer",
                lowPrice: "300.00",
                highPrice: "800.00",
                priceCurrency: "USD",
              },
              areaServed: [
                "Roscoe, IL",
                "Rockford, IL",
                "Beloit, WI",
                "Loves Park, IL",
                "Machesney Park, IL",
                "South Beloit, IL",
              ],
            },
            {
              "@type": "Service",
              name: "Operations Stack",
              provider: {
                "@type": "LocalBusiness",
                name: "Clockout",
              },
              description:
                "Complete operations automation stack — 3 to 5 integrated workflows that replace nightly kitchen-table admin. Built around your phone, your CRM, your way of working. For service businesses in the Rockford and Beloit corridor.",
              offers: {
                "@type": "AggregateOffer",
                lowPrice: "1200.00",
                highPrice: "3000.00",
                priceCurrency: "USD",
              },
              areaServed: [
                "Roscoe, IL",
                "Rockford, IL",
                "Beloit, WI",
                "Loves Park, IL",
                "Machesney Park, IL",
                "South Beloit, IL",
              ],
            },
            {
              "@type": "Service",
              name: "Monthly Monitoring",
              provider: {
                "@type": "LocalBusiness",
                name: "Clockout",
              },
              description:
                "Optional monthly monitoring and maintenance — dashboard, log review, and upkeep for your automation stack.",
              offers: {
                "@type": "AggregateOffer",
                lowPrice: "20.00",
                highPrice: "75.00",
                priceCurrency: "USD",
              },
            },
            {
              "@type": "Service",
              name: "Missed Call Text-Back",
              provider: {
                "@type": "LocalBusiness",
                name: "Clockout",
              },
              description:
                "Auto-reply to every missed call within 60 seconds. Book the job before the next shop calls back. Serves Roscoe, Rockford, Beloit, and the entire I-39 corridor.",
              category: "Automation",
              offers: {
                "@type": "Offer",
                priceCurrency: "USD",
              },
            },
            {
              "@type": "Service",
              name: "Estimate Follow-Up Automation",
              provider: {
                "@type": "LocalBusiness",
                name: "Clockout",
              },
              description:
                "Sequenced texts and emails after a quote at 48 hours, 7 days, and 14 days. Closes 18–30% of cold bids for local service businesses.",
              category: "Automation",
              offers: {
                "@type": "Offer",
                priceCurrency: "USD",
              },
            },
            {
              "@type": "Service",
              name: "No-Show Recovery Automation",
              provider: {
                "@type": "LocalBusiness",
                name: "Clockout",
              },
              description:
                "Automated rebook flow that runs the same day a customer no-shows. Converts empty slots into revenue for salons, barbershops, and service businesses.",
              category: "Automation",
              offers: {
                "@type": "Offer",
                priceCurrency: "USD",
              },
            },
            {
              "@type": "Service",
              name: "Review Request Automation",
              provider: {
                "@type": "LocalBusiness",
                name: "Clockout",
              },
              description:
                "Text goes out the hour the job ends with a direct link to your Google profile. Climbs you up the local map pack in Rockford, Roscoe, and Beloit.",
              category: "Automation",
              offers: {
                "@type": "Offer",
                priceCurrency: "USD",
              },
            },
            {
              "@type": "Service",
              name: "Invoice Nudge Automation",
              provider: {
                "@type": "LocalBusiness",
                name: "Clockout",
              },
              description:
                "Polite, automatic chase on unpaid invoices at 7, 14, and 21 days. Stops you doing it at 10 PM.",
              category: "Automation",
              offers: {
                "@type": "Offer",
                priceCurrency: "USD",
              },
            },
            {
              "@type": "Service",
              name: "After-Hours Triage",
              provider: {
                "@type": "LocalBusiness",
                name: "Clockout",
              },
              description:
                "Inbound leads get sorted by urgency. Emergencies ring you. Quotes wait. You stop reacting to noise after hours.",
              category: "Automation",
              offers: {
                "@type": "Offer",
                priceCurrency: "USD",
              },
            },
            {
              "@type": "BreadcrumbList",
              itemListElement: [
                {
                  "@type": "ListItem",
                  position: 1,
                  name: "Home",
                  item: "https://clockout.io",
                },
                {
                  "@type": "ListItem",
                  position: 2,
                  name: "Free Operations Audit",
                  item: "https://clockout.io/assessment",
                },
                {
                  "@type": "ListItem",
                  position: 3,
                  name: "Operator OS",
                  item: "https://clockout.io/operator-os",
                },
                {
                  "@type": "ListItem",
                  position: 4,
                  name: "Solutions",
                  item: "https://clockout.io/solutions",
                },
                {
                  "@type": "ListItem",
                  position: 5,
                  name: "Blog",
                  item: "https://clockout.io/blog",
                },
              ],
            },
            {
              "@type": "FAQPage",
              mainEntity: [
                {
                  "@type": "Question",
                  name: "How long is the call?",
                  acceptedAnswer: {
                    "@type": "Answer",
                    text: "20 minutes. I respect your time. If we run long, it's because you wanted to.",
                  },
                },
                {
                  "@type": "Question",
                  name: "What do I need to bring?",
                  acceptedAnswer: {
                    "@type": "Answer",
                    text: "Nothing. Just be near your phone and your normal day. I'll ask what I need.",
                  },
                },
                {
                  "@type": "Question",
                  name: "Will you pitch me?",
                  acceptedAnswer: {
                    "@type": "Answer",
                    text: "No. You'll leave with a written report. If you want to hire me, you'll tell me.",
                  },
                },
                {
                  "@type": "Question",
                  name: "Is it really free?",
                  acceptedAnswer: {
                    "@type": "Answer",
                    text: "Yes. I do this because most of the time the math sells itself. I don't need to.",
                  },
                },
                {
                  "@type": "Question",
                  name: "Can we do it in person?",
                  acceptedAnswer: {
                    "@type": "Answer",
                    text: "If you're in Roscoe, Rockford, Loves Park, Machesney, South Beloit, or anywhere in Winnebago / Boone County — yes. I'll drive.",
                  },
                },
              ],
            },
          ],
        }),
      },
    ],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent,
});

function RootShell({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <HeadContent />
      </head>
      <body>
        {children}
        <Analytics />
        <SpeedInsights />
        <Scripts />
      </body>
    </html>
  );
}

function RootComponent() {
  const { queryClient } = Route.useRouteContext();

  return (
    <QueryClientProvider client={queryClient}>
      <BookingProvider>
        <Ambient />
        <a className="skip" href="#main">
          Skip to content
        </a>
        <Nav />
        <main id="main">
          <Outlet />
        </main>
        <Footer />
      </BookingProvider>
    </QueryClientProvider>
  );
}
