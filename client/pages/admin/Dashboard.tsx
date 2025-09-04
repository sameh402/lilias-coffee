"use client";
import { useState, useEffect } from "react";
import { AdminLayout } from "@/components/admin/AdminLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { SafeLink } from "@/components/navigation/SafeLink";
import { DashboardStats, Order } from "@shared/api";
import {
  TrendingUp,
  Package,
  ShoppingCart,
  DollarSign,
  Clock,
  Eye,
  ArrowUpRight,
} from "lucide-react";

export default function AdminDashboard() {
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate API call
    const fetchStats = async () => {
      try {
        // Mock data - replace with actual API call
        const mockStats: DashboardStats = {
          totalOrders: 1247,
          totalRevenue: 45680.50,
          totalProducts: 4,
          pendingOrders: 23,
          recentOrders: [
            {
              id: "1",
              orderNumber: "LL-2024-001",
              customerEmail: "john@example.com",
              customerName: "John Doe",
              items: [
                {
                  productId: "1",
                  productName: "Single Origin — Yemen",
                  productImage: "/placeholder.svg",
                  size: 500,
                  grind: "whole",
                  quantity: 2,
                  price: 24,
                },
              ],
              subtotal: 48,
              shipping: 0,
              tax: 3.84,
              total: 51.84,
              status: "pending",
              paymentStatus: "paid",
              shippingAddress: {
                firstName: "John",
                lastName: "Doe",
                address: "123 Main St",
                city: "New York",
                state: "NY",
                zip: "10001",
              },
              createdAt: "2024-01-15T10:30:00Z",
              updatedAt: "2024-01-15T10:30:00Z",
            },
            {
              id: "2",
              orderNumber: "LL-2024-002",
              customerEmail: "jane@example.com",
              customerName: "Jane Smith",
              items: [
                {
                  productId: "2",
                  productName: "LiLas Signature Blend",
                  productImage: "/placeholder.svg",
                  size: 250,
                  grind: "filter",
                  quantity: 1,
                  price: 22,
                },
              ],
              subtotal: 22,
              shipping: 5,
              tax: 2.16,
              total: 29.16,
              status: "processing",
              paymentStatus: "paid",
              shippingAddress: {
                firstName: "Jane",
                lastName: "Smith",
                address: "456 Oak Ave",
                city: "Los Angeles",
                state: "CA",
                zip: "90210",
              },
              createdAt: "2024-01-15T09:15:00Z",
              updatedAt: "2024-01-15T09:15:00Z",
            },
          ],
          topProducts: [
            { productId: "1", productName: "Single Origin — Yemen", sales: 156 },
            { productId: "2", productName: "LiLas Signature Blend", sales: 134 },
            { productId: "3", productName: "High Caffeine Espresso", sales: 98 },
            { productId: "4", productName: "Desert Morning Light", sales: 87 },
          ],
        };
        
        setStats(mockStats);
      } catch (error) {
        console.error("Failed to fetch dashboard stats:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchStats();
  }, []);

  if (isLoading) {
    return (
      <AdminLayout>
        <div className="flex items-center justify-center h-64">
          <div className="text-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gold mx-auto mb-4"></div>
            <p className="text-foreground/70">Loading dashboard...</p>
          </div>
        </div>
      </AdminLayout>
    );
  }

  if (!stats) {
    return (
      <AdminLayout>
        <div className="text-center py-12">
          <p className="text-foreground/70">Failed to load dashboard data</p>
        </div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout>
      <div className="space-y-6">
        {/* Header */}
        <div>
          <h1 className="text-3xl font-display text-espresso">Dashboard</h1>
          <p className="text-foreground/70 mt-2">
            Welcome back! Here's what's happening with your coffee shop.
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
              <DollarSign className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-espresso">
                ${stats.totalRevenue.toLocaleString()}
              </div>
              <p className="text-xs text-muted-foreground">
                +12.5% from last month
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Orders</CardTitle>
              <ShoppingCart className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-espresso">
                {stats.totalOrders.toLocaleString()}
              </div>
              <p className="text-xs text-muted-foreground">
                +8.2% from last month
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Active Products</CardTitle>
              <Package className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-espresso">
                {stats.totalProducts}
              </div>
              <p className="text-xs text-muted-foreground">
                All products in stock
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Pending Orders</CardTitle>
              <Clock className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-espresso">
                {stats.pendingOrders}
              </div>
              <p className="text-xs text-muted-foreground">
                Requires attention
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Recent Orders and Top Products */}
        <div className="grid gap-6 lg:grid-cols-2">
          {/* Recent Orders */}
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>Recent Orders</CardTitle>
                  <CardDescription>
                    Latest orders that need attention
                  </CardDescription>
                </div>
                <SafeLink to="/admin/orders">
                  <Button variant="ghost" size="sm">
                    View all
                    <ArrowUpRight className="h-4 w-4 ml-1" />
                  </Button>
                </SafeLink>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {stats.recentOrders.map((order) => (
                  <div
                    key={order.id}
                    className="flex items-center justify-between p-3 rounded-lg border border-border"
                  >
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <p className="font-medium text-espresso">
                          {order.orderNumber}
                        </p>
                        <Badge
                          variant={
                            order.status === "pending"
                              ? "destructive"
                              : order.status === "processing"
                              ? "default"
                              : "secondary"
                          }
                        >
                          {order.status}
                        </Badge>
                      </div>
                      <p className="text-sm text-foreground/70">
                        {order.customerName} • {order.customerEmail}
                      </p>
                      <p className="text-xs text-foreground/60">
                        {new Date(order.createdAt).toLocaleDateString()}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="font-semibold text-espresso">
                        ${order.total.toFixed(2)}
                      </p>
                      <SafeLink to={`/admin/orders/${order.id}`}>
                        <Button variant="ghost" size="sm">
                          <Eye className="h-4 w-4" />
                        </Button>
                      </SafeLink>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Top Products */}
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>Top Products</CardTitle>
                  <CardDescription>
                    Best selling products this month
                  </CardDescription>
                </div>
                <SafeLink to="/admin/products">
                  <Button variant="ghost" size="sm">
                    Manage
                    <ArrowUpRight className="h-4 w-4 ml-1" />
                  </Button>
                </SafeLink>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {stats.topProducts.map((product, index) => (
                  <div
                    key={product.productId}
                    className="flex items-center justify-between p-3 rounded-lg border border-border"
                  >
                    <div className="flex items-center gap-3">
                      <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gold text-accent-foreground text-sm font-semibold">
                        {index + 1}
                      </div>
                      <div>
                        <p className="font-medium text-espresso">
                          {product.productName}
                        </p>
                        <p className="text-sm text-foreground/70">
                          {product.sales} sales
                        </p>
                      </div>
                    </div>
                    <TrendingUp className="h-4 w-4 text-muted-foreground" />
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </AdminLayout>
  );
}
