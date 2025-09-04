"use client";
import { motion } from "framer-motion";
import { Coffee, Leaf, Zap, BadgeCheck } from "lucide-react";

const features = [
  { icon: Zap, title: "Energy", desc: "Naturally higher caffeine for clean focus." },
  { icon: Coffee, title: "Taste", desc: "Rich Yemeni character with layered notes." },
  { icon: Leaf, title: "Sustainable", desc: "Ethically sourced from heritage farms." },
  { icon: BadgeCheck, title: "Craft", desc: "Small-batch roasted for precision." },
];

export function Why() {
  return (
    <section className="bg-surface py-16">
      <div className="container mx-auto">
        <h3 className="font-display text-3xl text-espresso">Why LiLas</h3>
        <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {features.map((f, i) => (
            <motion.div
              key={f.title}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.06, duration: 0.4 }}
              className="group rounded-xl2 border border-border bg-card p-6 shadow-soft transition hover:-translate-y-1 hover:shadow-gold"
            >
              <f.icon className="text-gold" />
              <h4 className="mt-3 font-medium text-espresso">{f.title}</h4>
              <p className="text-sm text-foreground/70">{f.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
