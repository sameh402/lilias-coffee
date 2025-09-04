"use client";
import { motion } from "framer-motion";
import { Product } from "@/lib/products";
import { Button } from "@/components/ui/button";
import { SafeLink } from "@/components/navigation/SafeLink";
import { useCart } from "@/store/cart";
import { useToast } from "@/hooks/use-toast";

export function ProductCard({ product }: { product: Product }) {
  return (
    <motion.div
      whileHover={{ y: -4 }}
      className="group overflow-hidden rounded-xl2 border border-border bg-card shadow-soft"
    >
      <SafeLink to={`/shop/${product.slug}`} className="block">
        <div className="relative overflow-hidden">
          <motion.img
            src={product.image}
            alt={product.name}
            className="h-60 w-full object-cover transition-transform duration-500"
            whileHover={{ scale: 1.05 }}
          />
        </div>
        <div className="space-y-1 p-4">
          <h3 className="font-medium text-espresso">{product.name}</h3>
          <p className="text-sm text-foreground/70">{product.notes}</p>
          <div className="mt-3 flex items-center justify-between">
            <span className="font-semibold text-espresso">${product.price}</span>
            <AddBtn product={product} />
          </div>
        </div>
      </SafeLink>
    </motion.div>
  );
}

function AddBtn({ product }: { product: Product }) {
  const { add } = useCart();
  const { toast } = useToast();
  return (
    <Button
      size="sm"
      className="bg-gold text-accent-foreground hover:bg-gold/90 shadow-gold"
      onClick={(e) => {
        e.preventDefault();
        add({ id: product.id, slug: product.slug, name: product.name, price: product.price, image: product.image, size: product.sizes[0], grind: product.grinds[0] });
        toast({ title: "Added to cart", description: `${product.name}` });
      }}
    >
      Add to Cart
    </Button>
  );
}
