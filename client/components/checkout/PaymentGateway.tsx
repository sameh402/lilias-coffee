"use client";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useState } from "react";

function formatCard(n: string) {
  return n
    .replace(/\D/g, "")
    .slice(0, 16)
    .replace(/(\d{4})(?=\d)/g, "$1 ");
}

export function PaymentGateway() {
  const [cardNumber, setCardNumber] = useState("");
  const [expiry, setExpiry] = useState("");
  const [cvc, setCvc] = useState("");
  const [name, setName] = useState("");

  return (
    <div className="rounded-xl2 border border-border bg-surface p-6 shadow-soft">
      <h2 className="font-display text-2xl text-espresso">Payment</h2>
      <Tabs defaultValue="card" className="mt-4">
        <TabsList>
          <TabsTrigger value="card">Card</TabsTrigger>
          <TabsTrigger value="paypal">PayPal</TabsTrigger>
          <TabsTrigger value="apple">Apple Pay</TabsTrigger>
        </TabsList>
        <TabsContent value="card" className="mt-4">
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="sm:col-span-2">
              <Input
                placeholder="Name on card"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div className="sm:col-span-2">
              <Input
                placeholder="Card number"
                inputMode="numeric"
                value={cardNumber}
                onChange={(e) => setCardNumber(formatCard(e.target.value))}
              />
            </div>
            <div>
              <Input
                placeholder="MM/YY"
                inputMode="numeric"
                value={expiry}
                onChange={(e) =>
                  setExpiry(e.target.value.replace(/[^0-9/]/g, "").slice(0, 5))
                }
              />
            </div>
            <div>
              <Input
                placeholder="CVC"
                inputMode="numeric"
                value={cvc}
                onChange={(e) =>
                  setCvc(e.target.value.replace(/\D/g, "").slice(0, 4))
                }
              />
            </div>
          </div>
          <p className="mt-2 text-xs text-foreground/70">
            Your payment details are encrypted and securely processed.
          </p>
        </TabsContent>
        <TabsContent value="paypal" className="mt-4">
          <div className="rounded-md border border-border bg-card p-4 text-sm text-foreground/80">
            You’ll be redirected to PayPal to complete your purchase.
          </div>
        </TabsContent>
        <TabsContent value="apple" className="mt-4">
          <div className="rounded-md border border-border bg-card p-4 text-sm text-foreground/80">
            Use Apple Pay on compatible devices and browsers.
          </div>
        </TabsContent>
      </Tabs>
      <div className="mt-4">
        <Button
          type="button"
          className="bg-gold text-accent-foreground shadow-gold hover:bg-gold/90 w-full sm:w-auto"
        >
          Pay Now
        </Button>
      </div>
    </div>
  );
}
