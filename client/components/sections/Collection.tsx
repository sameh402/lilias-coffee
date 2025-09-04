"use client";
import { products } from "@/lib/products";
import { ProductCard } from "@/components/product/ProductCard";
import { motion } from "framer-motion";

export function Collection() {
  return (
    <section className="container mx-auto py-16">
      <div className="mb-8 flex items-end justify-between">
        <h3 className="font-display text-3xl text-espresso">Best Sellers</h3>
      </div>
      <motion.div
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.1 }}
        className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4"
      >
        {products.map((p, i) => (
          <motion.div
            key={p.id}
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.06, duration: 0.4 }}
          >
            <ProductCard product={p} />
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
}
