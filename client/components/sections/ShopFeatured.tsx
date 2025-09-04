"use client";
import { motion } from "framer-motion";
import { Truck, Flame, BadgeCheck } from "lucide-react";
import { SafeLink } from "@/components/navigation/SafeLink";
import { Button } from "@/components/ui/button";

export function ShopFeatured() {
  return (
    <section className="container mx-auto py-10">
      <div className="grid gap-8 md:grid-cols-2">
        <motion.div
          initial={{ opacity: 0, x: -12 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="relative overflow-hidden rounded-xl2 border border-border bg-card shadow-soft"
        >
          <img
            src="https://images.pexels.com/photos/33682397/pexels-photo-33682397.jpeg"
            alt="Freshly roasted beans ready for packing"
            className="h-72 w-full object-cover sm:h-[24rem]"
            loading="lazy"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-black/10 to-transparent" />
          <div className="absolute bottom-4 left-4 right-4 text-cream">
            <p className="text-sm">Freshly Roasted • Peak Flavor</p>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <h2 className="font-display text-3xl text-espresso">
            Shop Highlights
          </h2>
          <p className="mt-2 text-foreground/80">
            Dialed-in profiles, shipped fast. Choose your grind and size for
            ultimate performance.
          </p>
          <ul className="mt-5 space-y-3 text-foreground/80">
            <li className="flex items-center gap-3">
              <BadgeCheck className="h-5 w-5 text-gold" /> Quality-checked small
              batches
            </li>
            <li className="flex items-center gap-3">
              <Flame className="h-5 w-5 text-gold" /> Roast-to-ship within 24
              hours
            </li>
            <li className="flex items-center gap-3">
              <Truck className="h-5 w-5 text-gold" /> Free shipping over $50
            </li>
          </ul>
          <div className="mt-6">
            <SafeLink to="#products">
              <Button className="bg-gold text-accent-foreground shadow-gold hover:bg-gold/90">
                Browse Coffee
              </Button>
            </SafeLink>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
