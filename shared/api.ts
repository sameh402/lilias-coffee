/**
 * Shared code between client and server
 * Useful to share types between client and server
 * and/or small pure JS functions that can be used on both client and server
 */

/**
 * Example response type for /api/demo
 */
export interface DemoResponse {
  message: string;
}

// Admin Dashboard Types
export interface AdminUser {
  id: string;
  email: string;
  name: string;
  role: 'admin' | 'manager';
  createdAt: string;
  lastLogin?: string;
}

export interface Order {
  id: string;
  orderNumber: string;
  customerEmail: string;
  customerName: string;
  items: OrderItem[];
  subtotal: number;
  shipping: number;
  tax: number;
  total: number;
  status: 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled';
  paymentStatus: 'pending' | 'paid' | 'failed' | 'refunded';
  shippingAddress: Address;
  notes?: string;
  createdAt: string;
  updatedAt: string;
}

export interface OrderItem {
  productId: string;
  productName: string;
  productImage: string;
  size: number;
  grind: string;
  quantity: number;
  price: number;
}

export interface Address {
  firstName: string;
  lastName: string;
  address: string;
  city: string;
  state: string;
  zip: string;
}

export interface Product {
  id: string;
  slug: string;
  name: string;
  notes: string;
  price: number;
  image: string;
  roast: "light" | "medium" | "dark";
  grinds: Array<"whole" | "espresso" | "filter">;
  sizes: number[]; // grams
  bestseller?: boolean;
  featured?: boolean;
  stock: number;
  status: 'active' | 'inactive' | 'out_of_stock';
  createdAt: string;
  updatedAt: string;
}

export interface DashboardStats {
  totalOrders: number;
  totalRevenue: number;
  totalProducts: number;
  pendingOrders: number;
  recentOrders: Order[];
  topProducts: Array<{ productId: string; productName: string; sales: number }>;
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface LoginResponse {
  success: boolean;
  user?: AdminUser;
  token?: string;
  message?: string;
}