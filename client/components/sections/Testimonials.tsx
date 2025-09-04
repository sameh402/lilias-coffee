"use client";
import { motion } from "framer-motion";

const testimonials = [
  { quote: "The only coffee that powers my 5am training and 10pm sprints.", author: "A. Rahman", role: "Founder" },
  { quote: "Clean energy, zero jitters. Flavor is unreal.", author: "S. Faris", role: "Designer" },
  { quote: "Tasting notes are spot on. It’s become my ritual.", author: "M. Ali", role: "Engineer" },
];

export function Testimonials() {
  return (
    <section className="bg-surface py-16">
      <div className="container mx-auto">
        <h3 className="font-display text-3xl text-espresso">What People Say</h3>
        <div className="mt-8 grid gap-6 md:grid-cols-3">
          {testimonials.map((t, i) => (
            <motion.blockquote
              key={t.author}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08, duration: 0.4 }}
              className="rounded-xl2 border border-border bg-card p-6 shadow-soft"
            >
              <p className="text-foreground/90">“{t.quote}”</p>
              <footer className="mt-4 text-sm text-foreground/70">{t.author} — {t.role}</footer>
            </motion.blockquote>
          ))}
        </div>
      </div>
    </section>
  );
}
