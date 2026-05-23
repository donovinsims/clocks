import { createFileRoute } from "@tanstack/react-router";
import {
  Hero,
  TrustBar,
  CostCalculator,
  HowItWorks,
  IPhoneProof,
  WhatYouGet,
  Guarantee,
  Pricing,
  FAQ,
  FinalCTA,
} from "@/components/sections";
import { LeadBar } from "@/components/LeadBar";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Local Business Automation Services | Clockout | Roscoe · Rockford · Beloit" },
      {
        name: "description",
        content:
          "Stop missing calls and losing jobs. Clockout installs flat-fee automation for owner-operators in Roscoe, Rockford, Beloit, and the Northern Illinois corridor. No retainer. No lock-in.",
      },
      {
        property: "og:title",
        content: "Local Business Automation Services | Clockout | Roscoe · Rockford · Beloit",
      },
      {
        property: "og:description",
        content:
          "Free 20-minute operations audit. Flat-fee install in 3–7 days. 30-day guarantee or we keep working free. Serving Roscoe, Rockford, Loves Park, Machesney Park, South Beloit, and Beloit, WI.",
      },
      { property: "og:type", content: "website" },
      { property: "og:locale", content: "en_US" },
      { property: "og:site_name", content: "Clockout" },
      { name: "twitter:card", content: "summary_large_image" },
      {
        name: "twitter:title",
        content: "Local Business Automation Services | Clockout | Roscoe · Rockford · Beloit",
      },
      {
        name: "keywords",
        content:
          "business automation Roscoe, local automation Rockford, owner-operator automation, service business automation Illinois, missed call text-back, flat-fee automation, Northern Illinois, Winnebago County, Boone County",
      },
    ],
    links: [{ rel: "canonical", href: "https://clockout.io" }],
  }),
  component: Home,
});

function Home() {
  return (
    <>
      <Hero />
      <TrustBar />
      <CostCalculator />
      <HowItWorks />
      <IPhoneProof />
      <WhatYouGet />
      <Guarantee />
      <Pricing />
      <FAQ />
      <FinalCTA />
      <LeadBar />
    </>
  );
}
