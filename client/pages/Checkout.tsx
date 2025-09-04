"use client";
import { useMemo } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useCart } from "@/store/cart";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { useNavigate } from "react-router-dom";
import { PaymentGateway } from "@/components/checkout/PaymentGateway";

const Schema = z.object({
  email: z.string().email(),
  firstName: z.string().min(2),
  lastName: z.string().min(2),
  address: z.string().min(5),
  city: z.string().min(2),
  state: z.string().min(2),
  zip: z.string().min(3),
  notes: z.string().optional(),
  shipping: z.enum(["standard", "express"]).default("standard"),
});

type FormData = z.infer<typeof Schema>;

export default function Checkout() {
  const { items, clear } = useCart();
  const navigate = useNavigate();
  const { toast } = useToast();
  const subtotal = items.reduce((s, i) => s + i.price * i.qty, 0);
  const shippingBase = subtotal >= 50 ? 0 : 5;
  const expressFee = 10;
  const TAX_RATE = 0.08;

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<FormData>({
    resolver: zodResolver(Schema),
    defaultValues: { shipping: "standard" },
  });

  const shippingMethod = watch("shipping");
  const shippingCost = useMemo(
    () => shippingBase + (shippingMethod === "express" ? expressFee : 0),
    [shippingBase, shippingMethod],
  );
  const tax = useMemo(() => +(subtotal * TAX_RATE).toFixed(2), [subtotal]);
  const total = useMemo(
    () => +(subtotal + shippingCost + tax).toFixed(2),
    [subtotal, shippingCost, tax],
  );

  const onSubmit = async (data: FormData) => {
    await new Promise((r) => setTimeout(r, 600));
    const orderId = Math.random().toString(36).slice(2, 8).toUpperCase();
    toast({
      title: "Order placed",
      description: `Thank you! Order #${orderId}`,
    });
    clear();
    navigate(`/thank-you/${orderId}`);
  };

  if (items.length === 0) {
    return (
      <main className="container mx-auto py-12">
        <h1 className="font-display text-4xl text-espresso">Checkout</h1>
        <p className="mt-2 text-foreground/80">Your cart is empty.</p>
      </main>
    );
  }

  return (
    <main>
      <section className="container mx-auto grid gap-8 py-12 md:grid-cols-3">
        <div className="md:col-span-2 space-y-6">
          <h1 className="font-display text-4xl text-espresso">Checkout</h1>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <Input
                  placeholder="Email"
                  type="email"
                  {...register("email")}
                />
                {errors.email && (
                  <p className="mt-1 text-sm text-terra">
                    {errors.email.message}
                  </p>
                )}
              </div>
              <div className="hidden sm:block" />
              <div>
                <Input placeholder="First name" {...register("firstName")} />
                {errors.firstName && (
                  <p className="mt-1 text-sm text-terra">
                    {errors.firstName.message}
                  </p>
                )}
              </div>
              <div>
                <Input placeholder="Last name" {...register("lastName")} />
                {errors.lastName && (
                  <p className="mt-1 text-sm text-terra">
                    {errors.lastName.message}
                  </p>
                )}
              </div>
              <div className="sm:col-span-2">
                <Input placeholder="Address" {...register("address")} />
                {errors.address && (
                  <p className="mt-1 text-sm text-terra">
                    {errors.address.message}
                  </p>
                )}
              </div>
              <div>
                <Input placeholder="City" {...register("city")} />
                {errors.city && (
                  <p className="mt-1 text-sm text-terra">
                    {errors.city.message}
                  </p>
                )}
              </div>
              <div>
                <Input placeholder="State" {...register("state")} />
                {errors.state && (
                  <p className="mt-1 text-sm text-terra">
                    {errors.state.message}
                  </p>
                )}
              </div>
              <div>
                <Input placeholder="ZIP" {...register("zip")} />
                {errors.zip && (
                  <p className="mt-1 text-sm text-terra">
                    {errors.zip.message}
                  </p>
                )}
              </div>
              <div>
                <select
                  className="h-10 w-full rounded-md border bg-background px-3 text-sm"
                  {...register("shipping")}
                >
                  <option value="standard">
                    Standard{" "}
                    {shippingBase === 0
                      ? "(Free)"
                      : `($${shippingBase.toFixed(2)})`}
                  </option>
                  <option value="express">
                    Express (+${expressFee.toFixed(2)})
                  </option>
                </select>
              </div>
              <div className="sm:col-span-2">
                <Textarea
                  placeholder="Notes (optional)"
                  rows={4}
                  {...register("notes")}
                />
              </div>
            </div>
            <div className="pt-2">
              <Button
                type="submit"
                disabled={isSubmitting}
                className="bg-gold text-accent-foreground shadow-gold hover:bg-gold/90"
              >
                Place Order
              </Button>
            </div>
          </form>

          <div className="pt-4">
            {/* Payment gateway UI */}
            <PaymentGateway />
          </div>
        </div>

        <aside className="rounded-xl2 border border-border bg-surface p-6 shadow-soft">
          <h2 className="font-display text-2xl text-espresso">Order Summary</h2>
          <div className="mt-4 space-y-4">
            {items.map((i) => (
              <div
                key={`${i.slug}-${i.size}-${i.grind}`}
                className="flex items-center gap-4"
              >
                <img
                  src={i.image}
                  alt=""
                  className="h-14 w-14 rounded-md object-cover"
                />
                <div className="flex-1 text-sm">
                  <div className="font-medium text-espresso">{i.name}</div>
                  <div className="text-foreground/70">
                    {i.qty} × {i.size}g • {i.grind}
                  </div>
                </div>
                <div className="text-sm font-semibold text-espresso">
                  ${(i.price * i.qty).toFixed(2)}
                </div>
              </div>
            ))}
          </div>
          <div className="mt-4 space-y-2 text-sm">
            <div className="flex justify-between">
              <span>Subtotal</span>
              <span className="font-medium text-espresso">
                ${subtotal.toFixed(2)}
              </span>
            </div>
            <div className="flex justify-between">
              <span>Shipping</span>
              <span className="font-medium text-espresso">
                ${shippingCost.toFixed(2)}
              </span>
            </div>
            <div className="flex justify-between">
              <span>Tax</span>
              <span className="font-medium text-espresso">
                ${tax.toFixed(2)}
              </span>
            </div>
            <div className="mt-2 flex justify-between text-base">
              <span className="text-espresso">Total</span>
              <span className="font-semibold text-espresso">
                ${total.toFixed(2)}
              </span>
            </div>
          </div>
        </aside>
      </section>
    </main>
  );
}
