"use client";
import { BadgeCheck, Flame, Leaf, Star } from "lucide-react";
import { motion } from "framer-motion";
import { SafeLink } from "@/components/navigation/SafeLink";
import { Button } from "@/components/ui/button";

export function FeaturedSection() {
  return (
    <section className="container mx-auto py-14">
      <div className="grid gap-8 md:grid-cols-2">
        <motion.div
          initial={{ opacity: 0, x: -12 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="relative overflow-hidden rounded-xl2 border border-border bg-card shadow-soft"
        >
          <img
            src="https://images.pexels.com/photos/30669009/pexels-photo-30669009.jpeg"
            alt="Small-batch roasting at our roastery"
            className="h-80 w-full object-cover sm:h-[26rem]"
            loading="lazy"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-black/10 to-transparent" />
          <div className="absolute bottom-4 left-4 right-4 flex items-center gap-2 text-cream">
            <Star className="h-5 w-5 text-gold" />
            <p className="text-sm">Featured: LiLas Signature Craft</p>
          </div>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
          <h2 className="font-display text-3xl text-espresso">Featured — Signature Craft</h2>
          <p className="mt-2 text-foreground/80">Precision-roasted for clarity and performance. Balanced sweetness, vibrant aromatics, and a clean finish that fuels your day.</p>
          <ul className="mt-5 space-y-3 text-foreground/80">
            <li className="flex items-center gap-3"><BadgeCheck className="h-5 w-5 text-gold" /> Small-batch, roast-to-ship freshness</li>
            <li className="flex items-center gap-3"><Flame className="h-5 w-5 text-gold" /> Tuned profiles for espresso and filter</li>
            <li className="flex items-center gap-3"><Leaf className="h-5 w-5 text-gold" /> Ethically sourced, farmer-first relationships</li>
          </ul>
          <div className="mt-6 flex gap-3">
            <SafeLink to="/shop">
              <Button className="bg-gold text-accent-foreground shadow-gold hover:bg-gold/90">Shop Now</Button>
            </SafeLink>
            <SafeLink to="/about">
              <Button variant="ghost" className="text-espresso hover:bg-gold/10">Learn More</Button>
            </SafeLink>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
