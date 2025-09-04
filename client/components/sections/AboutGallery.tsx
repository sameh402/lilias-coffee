"use client";
import { motion } from "framer-motion";

const photos = [
  {
    src: "https://images.pexels.com/photos/235925/pexels-photo-235925.jpeg",
    alt: "Scenic terraces in harvest season",
  },
  {
    src: "https://images.pexels.com/photos/7125435/pexels-photo-7125435.jpeg",
    alt: "Hand picking ripe coffee cherries",
  },
  {
    src: "https://images.pexels.com/photos/30669009/pexels-photo-30669009.jpeg",
    alt: "Beans roasting in industrial machine",
  },
  {
    src: "https://images.pexels.com/photos/33682397/pexels-photo-33682397.jpeg",
    alt: "Aromatic roasted coffee beans macro",
  },
  {
    src: "https://images.pexels.com/photos/2868982/pexels-photo-2868982.jpeg",
    alt: "Burlap coffee sacks in warehouse",
  },
  {
    src: "https://images.pexels.com/photos/7937410/pexels-photo-7937410.jpeg",
    alt: "Pour-over brew with kettle and carafe",
  },
];

export function AboutGallery({
  title = "In Pictures",
  subtitle = "From origin to roast to cup",
}: {
  title?: string;
  subtitle?: string;
}) {
  return (
    <section className="container mx-auto py-10">
      <div className="mb-4 flex items-end justify-between">
        <h2 className="font-display text-3xl text-espresso">{title}</h2>
        <p className="text-sm text-foreground/70">{subtitle}</p>
      </div>
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6">
        {photos.map((p, i) => (
          <motion.div
            key={p.src}
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ delay: i * 0.05 }}
            className={
              "group relative overflow-hidden rounded-xl2 border border-border bg-card " +
              (i % 6 === 0
                ? " col-span-2 row-span-2 sm:col-span-2 lg:col-span-3 lg:row-span-2 h-64 lg:h-[22rem]"
                : i % 6 === 1
                  ? " h-40 sm:h-48 lg:h-56"
                  : i % 6 === 2
                    ? " h-40 sm:h-60 lg:h-72"
                    : i % 6 === 3
                      ? " h-40 sm:h-44 lg:h-52"
                      : i % 6 === 4
                        ? " h-40 sm:h-44 lg:h-52"
                        : " h-40 sm:h-56 lg:h-64")
            }
          >
            <motion.img
              src={p.src}
              alt={p.alt}
              className="h-full w-full object-cover"
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.5 }}
              loading="lazy"
            />
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-background/0 via-background/0 to-background/0" />
          </motion.div>
        ))}
      </div>
    </section>
  );
}
