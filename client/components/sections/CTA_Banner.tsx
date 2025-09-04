"use client";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

export function CTA_Banner() {
  return (
    <section className="relative overflow-hidden py-16">
      <div className="container mx-auto rounded-xl2 border border-border bg-[linear-gradient(110deg,theme(colors.gold)/20%,theme(colors.gold)/10%_45%,theme(colors.gold)/30%)] p-8 shadow-gold">
        <div className="flex flex-col items-start justify-between gap-4 md:flex-row md:items-center">
          <div>
            <h3 className="font-display text-2xl text-espresso">Never run out of focus — subscribe & save 15%.</h3>
            <p className="text-foreground/80">Flexible deliveries. Pause or cancel anytime.</p>
          </div>
          <motion.div
            initial={{ backgroundPosition: "-100% 0" }}
            whileHover={{ backgroundPosition: "200% 0" }}
            transition={{ duration: 1.2, ease: "easeInOut" }}
            className="rounded-md bg-[linear-gradient(100deg,rgba(255,255,255,0.0)_0%,rgba(255,255,255,0.35)_50%,rgba(255,255,255,0.0)_100%)] bg-[length:200%_100%] p-1"
          >
            <Button asChild className="bg-espresso text-primary-foreground hover:bg-espresso/90">
              <Link to="/shop">Subscribe Now</Link>
            </Button>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
