"use client";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import BlurText from "@/components/animations/BlurText";

export function SplashScreen({ onDone }: { onDone: () => void }) {
  const [finished, setFinished] = useState(false);
  const [idx, setIdx] = useState(0);
  const messages = [
    "Fuel your ambition",
    "Roast-to-ship freshness",
    "Yemeni heritage energy",
  ];

  useEffect(() => {
    const step = 1200; // ms per tagline
    let i = 0;
    const id = setInterval(() => {
      i += 1;
      if (i < messages.length) setIdx(i);
      if (i === messages.length) {
        clearInterval(id);
        setTimeout(() => setFinished(true), 500);
      }
    }, step);
    return () => clearInterval(id);
  }, []);

  useEffect(() => {
    if (finished) {
      const t = setTimeout(onDone, 350);
      return () => clearTimeout(t);
    }
  }, [finished, onDone]);

  return (
    <motion.div
      initial={{ opacity: 1 }}
      animate={{ opacity: finished ? 0 : 1 }}
      transition={{ duration: 0.35 }}
      className="fixed inset-0 z-[60] grid place-items-center bg-background"
    >
      <div className="flex flex-col items-center gap-6">
        <div className="h-20 w-20 md:h-24 md:w-24 rounded-full bg-gold shadow-gold" />
        <BlurText
          text="LiLas Coffee"
          className="font-display text-5xl md:text-6xl text-espresso"
          delay={50}
          animateBy="letters"
          stepDuration={0.3}
        />
        <BlurText
          key={idx}
          text={messages[idx]}
          className="text-lg md:text-xl text-foreground/70"
          delay={40}
          animateBy="words"
          stepDuration={0.26}
        />
      </div>
    </motion.div>
  );
}
