"use client";
import { motion } from "framer-motion";

export function Promise() {
  return (
    <section className="container mx-auto grid gap-10 py-16 md:grid-cols-2">
      <div className="flex flex-col justify-center">
        <h2 className="font-display text-4xl text-espresso">More Than Coffee. It’s Your Edge.</h2>
        <p className="mt-4 text-foreground/80">
          We roast-to-ship within 24 hours so you get peak flavor and performance. Sustainably sourced from
          Yemen’s heritage terraces.
        </p>
        <div className="mt-6 grid grid-cols-3 gap-6">
          {[
            { label: "24h", sub: "Roast-to-ship" },
            { label: "4.9★", sub: "Rated by pros" },
            { label: "100%", sub: "Traceable" },
          ].map((item, i) => (
            <motion.div
              key={item.label}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08, duration: 0.4 }}
              className="rounded-xl2 border border-border bg-surface p-5 text-center shadow-soft"
            >
              <div className="font-display text-3xl text-espresso">{item.label}</div>
              <div className="text-sm text-foreground/70">{item.sub}</div>
            </motion.div>
          ))}
        </div>
      </div>
      <motion.div
        initial={{ clipPath: "inset(0 0 100% 0)" }}
        whileInView={{ clipPath: "inset(0 0 0% 0)" }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        className="overflow-hidden rounded-xl2 border border-border"
      >
        <img src="/placeholder.svg" alt="Yemen terraces" className="h-full w-full object-cover" />
      </motion.div>
    </section>
  );
}
