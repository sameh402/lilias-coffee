"use client";
import { motion } from "framer-motion";
import { SafeLink } from "@/components/navigation/SafeLink";
import { Button } from "@/components/ui/button";
import { Zap } from "lucide-react";

export function ProductCTA() {
  return (
    <section className="container mx-auto py-10">
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="relative overflow-hidden rounded-xl2 border border-border bg-surface shadow-soft"
      >
        <img
          src="https://images.pexels.com/photos/7937410/pexels-photo-7937410.jpeg"
          alt="Pour-over ritual with kettle and carafe"
          className="h-56 w-full object-cover sm:h-72"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/50 via-black/20 to-transparent" />
        <div className="absolute inset-y-0 left-0 flex w-full max-w-xl flex-col justify-center gap-3 p-6 text-cream">
          <div className="flex items-center gap-2 text-gold">
            <Zap className="h-5 w-5" />
            <span className="text-sm">Fuel your flow</span>
          </div>
          <h3 className="font-display text-2xl">Subscribe & Save 10%</h3>
          <p className="text-sm opacity-90">
            Never run out. Flexible deliveries, cancel anytime.
          </p>
          <div className="mt-2 flex gap-3">
            <SafeLink to="/shop">
              <Button className="bg-gold text-accent-foreground shadow-gold hover:bg-gold/90">
                Start Subscription
              </Button>
            </SafeLink>
            <SafeLink to="/contact">
              <Button variant="ghost" className="text-cream hover:bg-white/10">
                Wholesale
              </Button>
            </SafeLink>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
