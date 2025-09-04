"use client";
import { ReactNode, useState } from "react";
import { useAuth } from "@/store/auth";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Badge } from "@/components/ui/badge";
import { SafeLink } from "@/components/navigation/SafeLink";
import {
  LayoutDashboard,
  Package,
  ShoppingCart,
  Users,
  Settings,
  LogOut,
  Menu,
  TrendingUp,
  Bell,
  User,
} from "lucide-react";

interface AdminLayoutProps {
  children: ReactNode;
}

const navigation = [
  { name: "Dashboard", href: "/admin", icon: LayoutDashboard },
  { name: "Products", href: "/admin/products", icon: Package },
  { name: "Orders", href: "/admin/orders", icon: ShoppingCart },
  { name: "Analytics", href: "/admin/analytics", icon: TrendingUp },
  { name: "Settings", href: "/admin/settings", icon: Settings },
];

export function AdminLayout({ children }: AdminLayoutProps) {
  const { user, logout } = useAuth();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen bg-background">
      {/* Mobile sidebar */}
      <Sheet open={sidebarOpen} onOpenChange={setSidebarOpen}>
        <SheetTrigger asChild>
          <Button
            variant="ghost"
            size="sm"
            className="fixed top-4 left-4 z-50 md:hidden"
          >
            <Menu className="h-5 w-5" />
          </Button>
        </SheetTrigger>
        <SheetContent side="left" className="w-64 p-0">
          <SidebarContent onNavigate={() => setSidebarOpen(false)} />
        </SheetContent>
      </Sheet>

      {/* Desktop sidebar */}
      <div className="hidden md:fixed md:inset-y-0 md:flex md:w-64 md:flex-col">
        <SidebarContent />
      </div>

      {/* Main content */}
      <div className="md:pl-64">
        {/* Top bar */}
        <header className="sticky top-0 z-40 flex h-16 items-center justify-between border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 px-4">
          <div className="flex items-center gap-4">
            <h1 className="text-lg font-semibold text-espresso">Admin Dashboard</h1>
          </div>
          
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="sm">
              <Bell className="h-4 w-4" />
            </Button>
            
            <div className="flex items-center gap-2">
              <div className="h-8 w-8 rounded-full bg-gold flex items-center justify-center">
                <User className="h-4 w-4 text-accent-foreground" />
              </div>
              <div className="hidden sm:block">
                <p className="text-sm font-medium text-espresso">{user?.name}</p>
                <p className="text-xs text-foreground/70">{user?.role}</p>
              </div>
            </div>
            
            <Button variant="ghost" size="sm" onClick={logout}>
              <LogOut className="h-4 w-4" />
            </Button>
          </div>
        </header>

        {/* Page content */}
        <main className="p-6">
          {children}
        </main>
      </div>
    </div>
  );
}

function SidebarContent({ onNavigate }: { onNavigate?: () => void }) {
  const { user } = useAuth();

  return (
    <div className="flex h-full flex-col bg-card border-r border-border">
      {/* Logo */}
      <div className="flex h-16 items-center justify-center border-b border-border">
        <SafeLink to="/admin" className="flex items-center gap-2" onClick={onNavigate}>
          <div className="h-8 w-8 rounded-full bg-gold shadow-gold" />
          <span className="font-display text-xl text-espresso">LiLas Admin</span>
        </SafeLink>
      </div>

      {/* Navigation */}
      <nav className="flex-1 space-y-1 p-4">
        {navigation.map((item) => {
          const Icon = item.icon;
          return (
            <SafeLink
              key={item.name}
              to={item.href}
              className="flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium text-foreground/80 hover:bg-accent hover:text-accent-foreground transition-colors"
              onClick={onNavigate}
            >
              <Icon className="h-4 w-4" />
              {item.name}
            </SafeLink>
          );
        })}
      </nav>

      {/* User info */}
      <div className="border-t border-border p-4">
        <div className="flex items-center gap-3">
          <div className="h-10 w-10 rounded-full bg-gold flex items-center justify-center">
            <User className="h-5 w-5 text-accent-foreground" />
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium text-espresso truncate">
              {user?.name}
            </p>
            <p className="text-xs text-foreground/70 truncate">
              {user?.email}
            </p>
            <Badge variant="secondary" className="mt-1 text-xs">
              {user?.role}
            </Badge>
          </div>
        </div>
      </div>
    </div>
  );
}
