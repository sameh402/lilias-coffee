"use client";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import {
  Mountain,
  Hand,
  Flame,
  Truck,
  Landmark,
  Hammer,
  Leaf,
  Zap,
} from "lucide-react";
import { FeaturedSection } from "@/components/sections/FeaturedSection";

const values = [
  {
    title: "Heritage",
    desc: "Rooted in Yemen’s ancient coffee culture.",
    Icon: Landmark,
  },
  {
    title: "Craft",
    desc: "Small-batch roasting for precision and flavor.",
    Icon: Hammer,
  },
  {
    title: "Sustainability",
    desc: "Respect for farmers and land.",
    Icon: Leaf,
  },
  { title: "Performance", desc: "Clean energy for achievers.", Icon: Zap },
];

export default function About() {
  const ref = useRef<HTMLDivElement | null>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], [0, -120]);

  const steps = [
    {
      h: "Origins",
      p: "Terraced highlands cultivate resilient coffee trees.",
      Icon: Mountain,
    },
    {
      h: "Craft",
      p: "Selective hand-picking and slow drying preserve nuance.",
      Icon: Hand,
    },
    {
      h: "Roast",
      p: "Small batches dialed for clarity and power.",
      Icon: Flame,
    },
    {
      h: "Ship",
      p: "Roast-to-ship within 24 hours for peak freshness.",
      Icon: Truck,
    },
  ];

  return (
    <main>
      <section
        ref={ref}
        className="relative isolate overflow-hidden bg-background"
      >
        <motion.div
          style={{ y }}
          className="pointer-events-none absolute inset-0 -z-10 opacity-40"
        >
          <div className="absolute inset-0 bg-[radial-gradient(closest-side,theme(colors.gold)/25%,transparent_70%)]" />
          <div className="absolute -left-24 top-20 h-72 w-72 rounded-full bg-[radial-gradient(circle_at_center,theme(colors.gold)/18%,transparent_60%)] blur-2xl" />
          <div className="absolute -right-24 bottom-0 h-80 w-80 rounded-full bg-[radial-gradient(circle_at_center,theme(colors.teal)/18%,transparent_60%)] blur-2xl" />
        </motion.div>
        <div className="container mx-auto min-h-[50vh] py-16">
          <h1 className="font-display text-5xl text-espresso">
            From Ancient Origins to Your Cup
          </h1>
          <p className="mt-2 max-w-2xl text-foreground/80">
            We partner with Yemeni farmers and roast-to-ship for peak freshness.
          </p>
        </div>
      </section>

      <FeaturedSection />

      <section className="container mx-auto grid gap-10 py-14 md:grid-cols-2">
        <div>
          <h2 className="font-display text-3xl text-espresso">Timeline</h2>
          <div className="relative mt-6 space-y-6 pl-10">
            <div className="absolute left-4 top-0 h-full w-px bg-border" />
            {steps.map((t, i) => (
              <motion.div
                key={t.h}
                initial={{ opacity: 0, x: -12 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.06 }}
                className="group relative flex items-start gap-4"
              >
                <div className="relative z-10 mt-1 grid h-8 w-8 place-items-center rounded-full bg-cream text-espresso ring-2 ring-gold shadow-gold">
                  <t.Icon className="h-4 w-4" />
                </div>
                <div className="w-full rounded-xl2 border border-border bg-surface p-5 shadow-soft transition-transform duration-200 group-hover:-translate-y-0.5 group-hover:shadow-gold">
                  <div className="font-medium text-espresso">{t.h}</div>
                  <p className="text-foreground/80">{t.p}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
        <div>
          <h2 className="font-display text-3xl text-espresso">Our Values</h2>
          <div className="mt-6 grid gap-6 sm:grid-cols-2">
            {values.map((v, i) => (
              <motion.div
                key={v.title}
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05 }}
                className="group relative overflow-hidden rounded-xl2 border border-border bg-card p-6 shadow-soft"
              >
                <div className="flex items-center gap-3">
                  <div className="grid h-9 w-9 place-items-center rounded-lg bg-cream text-espresso ring-1 ring-gold/60">
                    <v.Icon className="h-4 w-4" />
                  </div>
                  <div className="text-espresso">{v.title}</div>
                </div>
                <p className="mt-2 text-sm text-foreground/70">{v.desc}</p>
                <div className="pointer-events-none absolute inset-0 -z-10 bg-[linear-gradient(110deg,transparent,theme(colors.gold)/15%,transparent)] bg-[length:200%_100%] opacity-0 transition-opacity duration-200 group-hover:animate-sheen group-hover:opacity-100" />
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
