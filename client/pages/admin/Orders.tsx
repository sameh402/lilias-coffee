"use client";
import { useState, useEffect } from "react";
import { AdminLayout } from "@/components/admin/AdminLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Order } from "@shared/api";
import {
  Search,
  Eye,
  Package,
  Truck,
  CheckCircle,
  XCircle,
  Clock,
  Filter,
} from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export default function AdminOrders() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [paymentFilter, setPaymentFilter] = useState<string>("all");

  useEffect(() => {
    // Simulate API call
    const fetchOrders = async () => {
      try {
        // Mock data - replace with actual API call
        const mockOrders: Order[] = [
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
          {
            id: "3",
            orderNumber: "LL-2024-003",
            customerEmail: "bob@example.com",
            customerName: "Bob Johnson",
            items: [
              {
                productId: "3",
                productName: "High Caffeine Espresso",
                productImage: "/placeholder.svg",
                size: 1000,
                grind: "espresso",
                quantity: 1,
                price: 26,
              },
            ],
            subtotal: 26,
            shipping: 0,
            tax: 2.08,
            total: 28.08,
            status: "shipped",
            paymentStatus: "paid",
            shippingAddress: {
              firstName: "Bob",
              lastName: "Johnson",
              address: "789 Pine St",
              city: "Chicago",
              state: "IL",
              zip: "60601",
            },
            createdAt: "2024-01-14T14:20:00Z",
            updatedAt: "2024-01-15T08:45:00Z",
          },
          {
            id: "4",
            orderNumber: "LL-2024-004",
            customerEmail: "alice@example.com",
            customerName: "Alice Brown",
            items: [
              {
                productId: "4",
                productName: "Desert Morning Light",
                productImage: "/placeholder.svg",
                size: 250,
                grind: "whole",
                quantity: 3,
                price: 21,
              },
            ],
            subtotal: 63,
            shipping: 0,
            tax: 5.04,
            total: 68.04,
            status: "delivered",
            paymentStatus: "paid",
            shippingAddress: {
              firstName: "Alice",
              lastName: "Brown",
              address: "321 Elm St",
              city: "Houston",
              state: "TX",
              zip: "77001",
            },
            createdAt: "2024-01-13T16:45:00Z",
            updatedAt: "2024-01-14T12:30:00Z",
          },
        ];
        
        setOrders(mockOrders);
      } catch (error) {
        console.error("Failed to fetch orders:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchOrders();
  }, []);

  const filteredOrders = orders.filter((order) => {
    const matchesSearch = 
      order.orderNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.customerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.customerEmail.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = statusFilter === "all" || order.status === statusFilter;
    const matchesPayment = paymentFilter === "all" || order.paymentStatus === paymentFilter;
    
    return matchesSearch && matchesStatus && matchesPayment;
  });

  const getStatusBadge = (status: Order["status"]) => {
    switch (status) {
      case "pending":
        return <Badge variant="destructive" className="flex items-center gap-1"><Clock className="h-3 w-3" />Pending</Badge>;
      case "processing":
        return <Badge variant="default" className="flex items-center gap-1"><Package className="h-3 w-3" />Processing</Badge>;
      case "shipped":
        return <Badge variant="default" className="flex items-center gap-1"><Truck className="h-3 w-3" />Shipped</Badge>;
      case "delivered":
        return <Badge variant="secondary" className="flex items-center gap-1"><CheckCircle className="h-3 w-3" />Delivered</Badge>;
      case "cancelled":
        return <Badge variant="destructive" className="flex items-center gap-1"><XCircle className="h-3 w-3" />Cancelled</Badge>;
      default:
        return <Badge variant="secondary">{status}</Badge>;
    }
  };

  const getPaymentBadge = (status: Order["paymentStatus"]) => {
    switch (status) {
      case "paid":
        return <Badge variant="secondary" className="flex items-center gap-1"><CheckCircle className="h-3 w-3" />Paid</Badge>;
      case "pending":
        return <Badge variant="destructive" className="flex items-center gap-1"><Clock className="h-3 w-3" />Pending</Badge>;
      case "failed":
        return <Badge variant="destructive" className="flex items-center gap-1"><XCircle className="h-3 w-3" />Failed</Badge>;
      case "refunded":
        return <Badge variant="secondary" className="flex items-center gap-1"><XCircle className="h-3 w-3" />Refunded</Badge>;
      default:
        return <Badge variant="secondary">{status}</Badge>;
    }
  };

  if (isLoading) {
    return (
      <AdminLayout>
        <div className="flex items-center justify-center h-64">
          <div className="text-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gold mx-auto mb-4"></div>
            <p className="text-foreground/70">Loading orders...</p>
          </div>
        </div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout>
      <div className="space-y-6">
        {/* Header */}
        <div>
          <h1 className="text-3xl font-display text-espresso">Orders</h1>
          <p className="text-foreground/70 mt-2">
            Manage customer orders and track fulfillment
          </p>
        </div>

        {/* Filters */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Filter className="h-5 w-5" />
              Filters
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex gap-4">
              <div className="flex-1">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-foreground/50" />
                  <Input
                    placeholder="Search orders, customers..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-48">
                  <SelectValue placeholder="Filter by status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="pending">Pending</SelectItem>
                  <SelectItem value="processing">Processing</SelectItem>
                  <SelectItem value="shipped">Shipped</SelectItem>
                  <SelectItem value="delivered">Delivered</SelectItem>
                  <SelectItem value="cancelled">Cancelled</SelectItem>
                </SelectContent>
              </Select>
              <Select value={paymentFilter} onValueChange={setPaymentFilter}>
                <SelectTrigger className="w-48">
                  <SelectValue placeholder="Filter by payment" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Payments</SelectItem>
                  <SelectItem value="paid">Paid</SelectItem>
                  <SelectItem value="pending">Pending</SelectItem>
                  <SelectItem value="failed">Failed</SelectItem>
                  <SelectItem value="refunded">Refunded</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        {/* Orders Table */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Package className="h-5 w-5" />
              Orders ({filteredOrders.length})
            </CardTitle>
            <CardDescription>
              View and manage all customer orders
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="rounded-md border">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Order</TableHead>
                    <TableHead>Customer</TableHead>
                    <TableHead>Items</TableHead>
                    <TableHead>Total</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Payment</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredOrders.map((order) => (
                    <TableRow key={order.id}>
                      <TableCell>
                        <div>
                          <p className="font-medium text-espresso">
                            {order.orderNumber}
                          </p>
                          <p className="text-sm text-foreground/70">
                            {order.items.length} item{order.items.length !== 1 ? 's' : ''}
                          </p>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div>
                          <p className="font-medium text-espresso">
                            {order.customerName}
                          </p>
                          <p className="text-sm text-foreground/70">
                            {order.customerEmail}
                          </p>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="space-y-1">
                          {order.items.slice(0, 2).map((item, index) => (
                            <div key={index} className="text-sm">
                              <p className="text-espresso">{item.productName}</p>
                              <p className="text-foreground/70">
                                {item.quantity} × {item.size}g • {item.grind}
                              </p>
                            </div>
                          ))}
                          {order.items.length > 2 && (
                            <p className="text-xs text-foreground/50">
                              +{order.items.length - 2} more
                            </p>
                          )}
                        </div>
                      </TableCell>
                      <TableCell>
                        <span className="font-semibold text-espresso">
                          ${order.total.toFixed(2)}
                        </span>
                      </TableCell>
                      <TableCell>{getStatusBadge(order.status)}</TableCell>
                      <TableCell>{getPaymentBadge(order.paymentStatus)}</TableCell>
                      <TableCell>
                        <div>
                          <p className="text-sm text-foreground/70">
                            {new Date(order.createdAt).toLocaleDateString()}
                          </p>
                          <p className="text-xs text-foreground/50">
                            {new Date(order.createdAt).toLocaleTimeString()}
                          </p>
                        </div>
                      </TableCell>
                      <TableCell className="text-right">
                        <Button variant="ghost" size="sm">
                          <Eye className="h-4 w-4" />
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>
      </div>
    </AdminLayout>
  );
}
