export type Product = {
  id: string;
  slug: string;
  name: string;
  notes: string;
  price: number;
  image: string;
  roast: "light" | "medium" | "dark";
  grinds: Array<"whole" | "espresso" | "filter">;
  sizes: number[]; // grams
  bestseller?: boolean;
  createdAt: string; // ISO date for sorting "new"
};

export const products: Product[] = [
  {
    id: "1",
    slug: "single-origin-yemen",
    name: "Single Origin — Yemen",
    notes: "Cardamom • Molasses • Dried Fig",
    price: 24,
    image: "/placeholder.svg",
    roast: "medium",
    grinds: ["whole", "filter", "espresso"],
    sizes: [250, 500, 1000],
    bestseller: true,
    createdAt: "2024-08-15",
  },
  {
    id: "2",
    slug: "lilas-signature-blend",
    name: "LiLas Signature Blend",
    notes: "Cocoa • Citrus • Cedar",
    price: 22,
    image: "/placeholder.svg",
    roast: "medium",
    grinds: ["whole", "filter"],
    sizes: [250, 500],
    bestseller: true,
    createdAt: "2024-07-20",
  },
  {
    id: "3",
    slug: "high-caffeine-espresso",
    name: "High Caffeine Espresso",
    notes: "Dark Chocolate • Spice • Long Finish",
    price: 26,
    image: "/placeholder.svg",
    roast: "dark",
    grinds: ["whole", "espresso"],
    sizes: [250, 500, 1000],
    createdAt: "2024-09-01",
  },
  {
    id: "4",
    slug: "desert-morning-light",
    name: "Desert Morning Light",
    notes: "Honey • Apricot • Almond",
    price: 21,
    image: "/placeholder.svg",
    roast: "light",
    grinds: ["whole", "filter"],
    sizes: [250],
    createdAt: "2024-06-10",
  },
];
