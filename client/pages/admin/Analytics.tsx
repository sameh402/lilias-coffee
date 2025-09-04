"use client";
import { useState, useEffect } from "react";
import { AdminLayout } from "@/components/admin/AdminLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  TrendingUp,
  TrendingDown,
  DollarSign,
  ShoppingCart,
  Users,
  Package,
  Calendar,
  Download,
} from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface AnalyticsData {
  revenue: {
    current: number;
    previous: number;
    change: number;
  };
  orders: {
    current: number;
    previous: number;
    change: number;
  };
  customers: {
    current: number;
    previous: number;
    change: number;
  };
  products: {
    current: number;
    previous: number;
    change: number;
  };
  topProducts: Array<{
    name: string;
    sales: number;
    revenue: number;
  }>;
  recentActivity: Array<{
    type: string;
    description: string;
    timestamp: string;
    amount?: number;
  }>;
}

export default function AdminAnalytics() {
  const [data, setData] = useState<AnalyticsData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [timeRange, setTimeRange] = useState("30d");

  useEffect(() => {
    // Simulate API call
    const fetchAnalytics = async () => {
      try {
        // Mock data - replace with actual API call
        const mockData: AnalyticsData = {
          revenue: {
            current: 45680.50,
            previous: 38920.25,
            change: 17.4,
          },
          orders: {
            current: 1247,
            previous: 1089,
            change: 14.5,
          },
          customers: {
            current: 892,
            previous: 756,
            change: 18.0,
          },
          products: {
            current: 4,
            previous: 4,
            change: 0,
          },
          topProducts: [
            { name: "Single Origin — Yemen", sales: 156, revenue: 3744 },
            { name: "LiLas Signature Blend", sales: 134, revenue: 2948 },
            { name: "High Caffeine Espresso", sales: 98, revenue: 2548 },
            { name: "Desert Morning Light", sales: 87, revenue: 1827 },
          ],
          recentActivity: [
            {
              type: "order",
              description: "New order from John Doe",
              timestamp: "2024-01-15T10:30:00Z",
              amount: 51.84,
            },
            {
              type: "order",
              description: "Order shipped to Jane Smith",
              timestamp: "2024-01-15T09:15:00Z",
              amount: 29.16,
            },
            {
              type: "product",
              description: "Product stock updated: High Caffeine Espresso",
              timestamp: "2024-01-15T08:45:00Z",
            },
            {
              type: "order",
              description: "Order delivered to Bob Johnson",
              timestamp: "2024-01-14T12:30:00Z",
              amount: 28.08,
            },
            {
              type: "customer",
              description: "New customer registered: Alice Brown",
              timestamp: "2024-01-14T10:20:00Z",
            },
          ],
        };
        
        setData(mockData);
      } catch (error) {
        console.error("Failed to fetch analytics:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchAnalytics();
  }, [timeRange]);

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(amount);
  };

  const formatChange = (change: number) => {
    const isPositive = change >= 0;
    return {
      value: `${isPositive ? '+' : ''}${change.toFixed(1)}%`,
      isPositive,
    };
  };

  if (isLoading) {
    return (
      <AdminLayout>
        <div className="flex items-center justify-center h-64">
          <div className="text-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gold mx-auto mb-4"></div>
            <p className="text-foreground/70">Loading analytics...</p>
          </div>
        </div>
      </AdminLayout>
    );
  }

  if (!data) {
    return (
      <AdminLayout>
        <div className="text-center py-12">
          <p className="text-foreground/70">Failed to load analytics data</p>
        </div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-display text-espresso">Analytics</h1>
            <p className="text-foreground/70 mt-2">
              Track your business performance and insights
            </p>
          </div>
          <div className="flex items-center gap-4">
            <Select value={timeRange} onValueChange={setTimeRange}>
              <SelectTrigger className="w-32">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="7d">Last 7 days</SelectItem>
                <SelectItem value="30d">Last 30 days</SelectItem>
                <SelectItem value="90d">Last 90 days</SelectItem>
                <SelectItem value="1y">Last year</SelectItem>
              </SelectContent>
            </Select>
            <Button variant="outline">
              <Download className="h-4 w-4 mr-2" />
              Export
            </Button>
          </div>
        </div>

        {/* Key Metrics */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
              <DollarSign className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-espresso">
                {formatCurrency(data.revenue.current)}
              </div>
              <div className="flex items-center gap-1 text-xs">
                {data.revenue.change >= 0 ? (
                  <TrendingUp className="h-3 w-3 text-green-600" />
                ) : (
                  <TrendingDown className="h-3 w-3 text-red-600" />
                )}
                <span className={data.revenue.change >= 0 ? "text-green-600" : "text-red-600"}>
                  {formatChange(data.revenue.change).value}
                </span>
                <span className="text-muted-foreground">from last period</span>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Orders</CardTitle>
              <ShoppingCart className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-espresso">
                {data.orders.current.toLocaleString()}
              </div>
              <div className="flex items-center gap-1 text-xs">
                {data.orders.change >= 0 ? (
                  <TrendingUp className="h-3 w-3 text-green-600" />
                ) : (
                  <TrendingDown className="h-3 w-3 text-red-600" />
                )}
                <span className={data.orders.change >= 0 ? "text-green-600" : "text-red-600"}>
                  {formatChange(data.orders.change).value}
                </span>
                <span className="text-muted-foreground">from last period</span>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Customers</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-espresso">
                {data.customers.current.toLocaleString()}
              </div>
              <div className="flex items-center gap-1 text-xs">
                {data.customers.change >= 0 ? (
                  <TrendingUp className="h-3 w-3 text-green-600" />
                ) : (
                  <TrendingDown className="h-3 w-3 text-red-600" />
                )}
                <span className={data.customers.change >= 0 ? "text-green-600" : "text-red-600"}>
                  {formatChange(data.customers.change).value}
                </span>
                <span className="text-muted-foreground">from last period</span>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Products</CardTitle>
              <Package className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-espresso">
                {data.products.current}
              </div>
              <div className="flex items-center gap-1 text-xs">
                {data.products.change >= 0 ? (
                  <TrendingUp className="h-3 w-3 text-green-600" />
                ) : (
                  <TrendingDown className="h-3 w-3 text-red-600" />
                )}
                <span className={data.products.change >= 0 ? "text-green-600" : "text-red-600"}>
                  {formatChange(data.products.change).value}
                </span>
                <span className="text-muted-foreground">from last period</span>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Charts and Details */}
        <div className="grid gap-6 lg:grid-cols-2">
          {/* Top Products */}
          <Card>
            <CardHeader>
              <CardTitle>Top Products</CardTitle>
              <CardDescription>
                Best performing products by sales
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {data.topProducts.map((product, index) => (
                  <div
                    key={product.name}
                    className="flex items-center justify-between p-3 rounded-lg border border-border"
                  >
                    <div className="flex items-center gap-3">
                      <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gold text-accent-foreground text-sm font-semibold">
                        {index + 1}
                      </div>
                      <div>
                        <p className="font-medium text-espresso">
                          {product.name}
                        </p>
                        <p className="text-sm text-foreground/70">
                          {product.sales} sales
                        </p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-semibold text-espresso">
                        {formatCurrency(product.revenue)}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Recent Activity */}
          <Card>
            <CardHeader>
              <CardTitle>Recent Activity</CardTitle>
              <CardDescription>
                Latest events and updates
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {data.recentActivity.map((activity, index) => (
                  <div
                    key={index}
                    className="flex items-start gap-3 p-3 rounded-lg border border-border"
                  >
                    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-accent">
                      {activity.type === "order" && <ShoppingCart className="h-4 w-4" />}
                      {activity.type === "product" && <Package className="h-4 w-4" />}
                      {activity.type === "customer" && <Users className="h-4 w-4" />}
                    </div>
                    <div className="flex-1">
                      <p className="text-sm font-medium text-espresso">
                        {activity.description}
                      </p>
                      <div className="flex items-center gap-2 mt-1">
                        <Calendar className="h-3 w-3 text-foreground/50" />
                        <p className="text-xs text-foreground/70">
                          {new Date(activity.timestamp).toLocaleString()}
                        </p>
                        {activity.amount && (
                          <Badge variant="secondary" className="text-xs">
                            {formatCurrency(activity.amount)}
                          </Badge>
                        )}
                      </div>
                    </div>
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
