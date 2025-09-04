import { ShoppingCart, Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetClose,
} from "@/components/ui/sheet";
import { SafeLink, SafeNavLink } from "./SafeLink";
import { useCart } from "@/store/cart";
import { Instagram, Twitter, Facebook, Youtube } from "lucide-react";

const navItems = [
  { label: "Shop", href: "/shop" },
  { label: "About", href: "/about" },
  { label: "FAQ", href: "/faq" },
  { label: "Contact", href: "/contact" },
];

export function Header() {
  const { items } = useCart();
  const cartCount = items.reduce((s, i) => s + i.qty, 0);

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/60 backdrop-blur supports-[backdrop-filter]:bg-background/70 transform-gpu">
      <div className="container mx-auto grid h-16 grid-cols-3 items-center">
        <div className="justify-self-start" />
        <SafeLink
          to="/"
          className="justify-self-center inline-flex items-center gap-2"
        >
          <div className="h-9 w-9 rounded-full bg-gold shadow-gold" />
          <span className="font-display text-2xl tracking-wide text-espresso">
            LiLas
          </span>
        </SafeLink>

        {/* hidden desktop nav; using full-screen menu instead */}
        <nav className="hidden">
          {navItems.map((item) => (
            <SafeNavLink
              key={item.href}
              to={item.href}
              className={
                "text-sm font-medium transition-colors text-foreground/80 hover:text-espresso"
              }
              activeClassName="text-espresso"
            >
              {item.label}
            </SafeNavLink>
          ))}
        </nav>

        <div className="justify-self-end flex items-center gap-2">
          <SafeLink
            to="/cart"
            className="relative inline-flex items-center justify-center rounded-md p-2 hover:bg-accent"
          >
            <ShoppingCart className="text-espresso" />
            {cartCount > 0 && (
              <span className="absolute -right-2 -top-2 rounded-full bg-gold px-1.5 text-xs text-accent-foreground shadow-gold">
                {cartCount}
              </span>
            )}
          </SafeLink>

          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" className="">
                <Menu />
              </Button>
            </SheetTrigger>
            <SheetContent
              side="right"
              className="w-screen max-w-none p-0"
              aria-label="Main menu"
            >
              <div className="grid h-full md:grid-cols-2">
                <div className="hidden md:block overflow-hidden">
                  <img
                    src="https://images.pexels.com/photos/2868982/pexels-photo-2868982.jpeg"
                    alt="Roastery"
                    className="h-full w-full object-cover"
                  />
                </div>
                <div className="flex h-full flex-col items-center justify-center gap-8 p-8 text-center">
                  <div className="space-y-4">
                    {navItems.map((item) => (
                      <SheetClose asChild key={item.href}>
                        <SafeLink
                          to={item.href}
                          className="block text-2xl font-medium text-espresso hover:opacity-80"
                        >
                          {item.label}
                        </SafeLink>
                      </SheetClose>
                    ))}
                  </div>
                  <SheetClose asChild>
                    <SafeLink to="/shop">
                      <Button className="bg-gold text-accent-foreground shadow-gold hover:bg-gold/90">
                        Shop Now
                      </Button>
                    </SafeLink>
                  </SheetClose>
                  <div className="flex items-center gap-5 text-foreground/80">
                    <a
                      href="https://instagram.com"
                      target="_blank"
                      rel="noreferrer"
                      aria-label="Instagram"
                      className="hover:text-espresso"
                    >
                      <Instagram />
                    </a>
                    <a
                      href="https://twitter.com"
                      target="_blank"
                      rel="noreferrer"
                      aria-label="Twitter"
                      className="hover:text-espresso"
                    >
                      <Twitter />
                    </a>
                    <a
                      href="https://facebook.com"
                      target="_blank"
                      rel="noreferrer"
                      aria-label="Facebook"
                      className="hover:text-espresso"
                    >
                      <Facebook />
                    </a>
                    <a
                      href="https://youtube.com"
                      target="_blank"
                      rel="noreferrer"
                      aria-label="YouTube"
                      className="hover:text-espresso"
                    >
                      <Youtube />
                    </a>
                  </div>
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
