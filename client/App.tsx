import "./global.css";

import { Toaster } from "@/components/ui/toaster";
import { createRoot } from "react-dom/client";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import About from "./pages/About";
import Shop from "./pages/Shop";
import Contact from "./pages/Contact";
import FAQ from "./pages/FAQ";
import Product from "./pages/Product";
import Privacy from "./pages/Privacy";
import Terms from "./pages/Terms";
import Checkout from "./pages/Checkout";
import ThankYou from "./pages/ThankYou";
import Cart from "./pages/Cart";
import { Header } from "@/components/navigation/Header";
import { SafeLink } from "@/components/navigation/SafeLink";
import { CartProvider } from "@/store/cart";
import { AuthProvider } from "@/store/auth";
import { Instagram, Twitter, Facebook, Youtube } from "lucide-react";

const Footer = () => (
  <footer className="border-t border-border/60 mt-20">
    <div className="container mx-auto py-10 text-sm text-foreground/70 flex flex-col md:flex-row items-center justify-between gap-6">
      <p>© {new Date().getFullYear()} LiLas. All rights reserved.</p>
      <div className="flex items-center gap-6">
        <SafeLink to="/privacy" className="hover:text-espresso">
          Privacy
        </SafeLink>
        <SafeLink to="/terms" className="hover:text-espresso">
          Terms
        </SafeLink>
      </div>
      <div className="flex items-center gap-4">
        <a
          href="https://instagram.com"
          target="_blank"
          rel="noreferrer"
          aria-label="Instagram"
          className="hover:text-espresso"
        >
          <Instagram className="h-5 w-5" />
        </a>
        <a
          href="https://twitter.com"
          target="_blank"
          rel="noreferrer"
          aria-label="Twitter"
          className="hover:text-espresso"
        >
          <Twitter className="h-5 w-5" />
        </a>
        <a
          href="https://facebook.com"
          target="_blank"
          rel="noreferrer"
          aria-label="Facebook"
          className="hover:text-espresso"
        >
          <Facebook className="h-5 w-5" />
        </a>
        <a
          href="https://youtube.com"
          target="_blank"
          rel="noreferrer"
          aria-label="YouTube"
          className="hover:text-espresso"
        >
          <Youtube className="h-5 w-5" />
        </a>
      </div>
    </div>
  </footer>
);

import { useState } from "react";
import { SplashScreen } from "@/components/overlays/SplashScreen";

// Admin imports
import AdminLogin from "./pages/admin/Login";
import AdminDashboard from "./pages/admin/Dashboard";
import AdminProducts from "./pages/admin/Products";
import AdminOrders from "./pages/admin/Orders";
import AdminAnalytics from "./pages/admin/Analytics";
import AdminSettings from "./pages/admin/Settings";
import { ProtectedRoute, AdminOnlyRoute } from "@/components/admin/ProtectedRoute";

// Public layout wrapper
const PublicLayout = ({ children }: { children: React.ReactNode }) => (
  <>
    <Header />
    {children}
    <Footer />
  </>
);

const App = () => {
  const [showSplash, setShowSplash] = useState(true);
  return (
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <AuthProvider>
          <CartProvider>
            {showSplash && <SplashScreen onDone={() => setShowSplash(false)} />}
            <Routes>
              {/* Public routes */}
              <Route path="/" element={<PublicLayout><Index /></PublicLayout>} />
              <Route path="/shop" element={<PublicLayout><Shop /></PublicLayout>} />
              <Route path="/shop/:slug" element={<PublicLayout><Product /></PublicLayout>} />
              <Route path="/about" element={<PublicLayout><About /></PublicLayout>} />
              <Route path="/contact" element={<PublicLayout><Contact /></PublicLayout>} />
              <Route path="/faq" element={<PublicLayout><FAQ /></PublicLayout>} />
              <Route path="/privacy" element={<PublicLayout><Privacy /></PublicLayout>} />
              <Route path="/terms" element={<PublicLayout><Terms /></PublicLayout>} />
              <Route path="/cart" element={<PublicLayout><Cart /></PublicLayout>} />
              <Route path="/checkout" element={<PublicLayout><Checkout /></PublicLayout>} />
              <Route path="/thank-you/:id" element={<PublicLayout><ThankYou /></PublicLayout>} />
              
              {/* Admin routes */}
              <Route path="/admin/login" element={<AdminLogin />} />
              <Route path="/admin" element={
                <ProtectedRoute>
                  <AdminDashboard />
                </ProtectedRoute>
              } />
              <Route path="/admin/products" element={
                <ProtectedRoute>
                  <AdminProducts />
                </ProtectedRoute>
              } />
              <Route path="/admin/orders" element={
                <ProtectedRoute>
                  <AdminOrders />
                </ProtectedRoute>
              } />
              <Route path="/admin/analytics" element={
                <ProtectedRoute>
                  <AdminAnalytics />
                </ProtectedRoute>
              } />
              <Route path="/admin/settings" element={
                <AdminOnlyRoute>
                  <AdminSettings />
                </AdminOnlyRoute>
              } />
              
              {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
              <Route path="*" element={<PublicLayout><NotFound /></PublicLayout>} />
            </Routes>
          </CartProvider>
        </AuthProvider>
      </BrowserRouter>
    </TooltipProvider>
  );
};

import type { Root } from "react-dom/client";

const container = document.getElementById("root")! as HTMLElement & {
  _reactRoot?: Root;
};
let root = container._reactRoot;
if (!root) {
  root = createRoot(container);
  container._reactRoot = root;
}
root.render(<App />);
