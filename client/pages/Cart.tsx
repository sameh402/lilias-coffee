"use client";
import { useCart } from "@/store/cart";
import { Button } from "@/components/ui/button";
import { SafeLink } from "@/components/navigation/SafeLink";

export default function Cart() {
  const { items, updateQty, remove, clear } = useCart();
  const subtotal = items.reduce((s, i) => s + i.price * i.qty, 0);

  return (
    <main>
      <section className="container mx-auto py-12">
        <h1 className="font-display text-4xl text-espresso">Your Cart</h1>
        {items.length === 0 ? (
          <div className="mt-6">
            <p className="text-foreground/80">Your cart is empty.</p>
            <SafeLink
              to="/shop"
              className="text-terra underline underline-offset-4 hover:text-rustic"
            >
              Continue shopping →
            </SafeLink>
          </div>
        ) : (
          <div className="mt-6 grid gap-8 md:grid-cols-3">
            <div className="md:col-span-2 space-y-4">
              {items.map((i) => (
                <div
                  key={`${i.slug}-${i.size}-${i.grind}`}
                  className="flex items-center gap-4 rounded-xl2 border border-border bg-card p-4 shadow-soft"
                >
                  <img
                    src={i.image}
                    alt=""
                    className="h-20 w-20 rounded-md object-cover"
                  />
                  <div className="flex-1">
                    <div className="font-medium text-espresso">{i.name}</div>
                    <div className="text-sm text-foreground/70">
                      {i.size}g • {i.grind}
                    </div>
                    <div className="mt-2 flex items-center gap-2">
                      <select
                        className="h-9 rounded-md border bg-background px-2 text-sm"
                        value={i.qty}
                        onChange={(e) =>
                          updateQty(
                            i.slug,
                            { size: i.size, grind: i.grind },
                            Number(e.target.value),
                          )
                        }
                      >
                        {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((n) => (
                          <option key={n} value={n}>
                            {n}
                          </option>
                        ))}
                      </select>
                      <Button
                        variant="ghost"
                        onClick={() =>
                          remove(i.slug, { size: i.size, grind: i.grind })
                        }
                      >
                        Remove
                      </Button>
                    </div>
                  </div>
                  <div className="font-semibold text-espresso">
                    ${(i.price * i.qty).toFixed(2)}
                  </div>
                </div>
              ))}
            </div>
            <aside className="rounded-xl2 border border-border bg-surface p-6 shadow-soft">
              <div className="flex items-center justify-between text-espresso">
                <span>Subtotal</span>
                <span className="text-xl font-semibold">
                  ${subtotal.toFixed(2)}
                </span>
              </div>
              <p className="mt-1 text-sm text-foreground/70">
                Shipping and taxes calculated at checkout.
              </p>
              <div className="mt-4 flex flex-col gap-3">
                <SafeLink to="/checkout">
                  <Button className="bg-gold text-accent-foreground shadow-gold hover:bg-gold/90">
                    Checkout
                  </Button>
                </SafeLink>
                <Button variant="ghost" onClick={clear}>
                  Clear Cart
                </Button>
              </div>
            </aside>
          </div>
        )}
      </section>
    </main>
  );
}
