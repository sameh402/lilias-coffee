"use client";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { Button } from "@/components/ui/button";
import { SafeLink } from "@/components/navigation/SafeLink";

export default function HeroParallax() {
  const ref = useRef<HTMLDivElement | null>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const yBg = useTransform(scrollYProgress, [0, 1], [0, -120]);
  const yFg = useTransform(scrollYProgress, [0, 1], [0, -220]);

  return (
    <section
      ref={ref}
      className="relative isolate overflow-hidden bg-background"
    >
      <motion.div
        style={{ y: yBg }}
        className="pointer-events-none absolute inset-0 -z-10 opacity-50"
      >
        <div className="absolute inset-0 bg-[radial-gradient(closest-side,theme(colors.gold)/20%,transparent_70%)]" />
      </motion.div>

      <div className="container mx-auto flex min-h-[72vh] flex-col items-start justify-center gap-6 py-20">
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="font-display text-5xl leading-tight text-espresso md:text-6xl"
        >
          LiLas: Fuel Your Ambition
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
          className="max-w-2xl text-lg text-foreground/80"
        >
          Premium Yemeni coffee with a naturally higher caffeine profile —
          crafted for achievers.
        </motion.p>
        <motion.div
          style={{ y: yFg }}
          className="flex flex-wrap items-center gap-3"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            duration: 0.5,
            delay: 0.2,
            type: "spring",
            stiffness: 120,
          }}
        >
          <Button
            asChild
            className="bg-gold text-accent-foreground shadow-gold hover:bg-gold/90"
          >
            <SafeLink to="/shop">Shop Now</SafeLink>
          </Button>
          <Button
            asChild
            variant="ghost"
            className="text-espresso hover:bg-gold/10"
          >
            <SafeLink to="/shop">Subscribe & Save</SafeLink>
          </Button>
        </motion.div>
      </div>
    </section>
  );
}
