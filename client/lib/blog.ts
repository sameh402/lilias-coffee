export type Post = {
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  date: string; // ISO
  readTime: string;
  image: string;
};

export const posts: Post[] = [
  {
    slug: "yemeni-origins",
    title: "Yemeni Coffee: Ancient Origins, Modern Performance",
    excerpt: "From terraced highlands to your espresso shot, how tradition meets focus.",
    category: "Origins",
    date: "2024-09-18",
    readTime: "6 min",
    image: "/placeholder.svg",
  },
  {
    slug: "dialing-espresso",
    title: "Dialing Espresso for Clean Energy",
    excerpt: "A simple guide to extract clarity, sweetness, and power — minus the jitters.",
    category: "Brew Guide",
    date: "2024-08-02",
    readTime: "5 min",
    image: "/placeholder.svg",
  },
  {
    slug: "sourcing-ethics",
    title: "Sourcing With Purpose",
    excerpt: "Our approach to traceability and farmer-first partnerships.",
    category: "Sourcing",
    date: "2024-07-11",
    readTime: "4 min",
    image: "/placeholder.svg",
  },
];
