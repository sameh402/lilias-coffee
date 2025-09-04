"use client";
import { useState, useEffect } from "react";
import { AdminLayout } from "@/components/admin/AdminLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Product } from "@shared/api";
import {
  Plus,
  Search,
  Edit,
  Trash2,
  Eye,
  EyeOff,
  Package,
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

export default function AdminProducts() {
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");

  useEffect(() => {
    // Simulate API call
    const fetchProducts = async () => {
      try {
        // Mock data - replace with actual API call
        const mockProducts: Product[] = [
          {
            id: "1",
            slug: "single-origin-yemen",
            name: "Single Origin — Yemen",
            notes: "Cardamom • Molasses • Dried Fig",
            price: 24,
            image: "/placeholder.svg",
            roast: "medium",
            grinds: ["whole", "filter", "espresso"],
            sizes: [250, 500, 1000],
            bestseller: true,
            featured: true,
            stock: 45,
            status: "active",
            createdAt: "2024-08-15T00:00:00Z",
            updatedAt: "2024-01-15T00:00:00Z",
          },
          {
            id: "2",
            slug: "lilas-signature-blend",
            name: "LiLas Signature Blend",
            notes: "Cocoa • Citrus • Cedar",
            price: 22,
            image: "/placeholder.svg",
            roast: "medium",
            grinds: ["whole", "filter"],
            sizes: [250, 500],
            bestseller: true,
            featured: false,
            stock: 32,
            status: "active",
            createdAt: "2024-07-20T00:00:00Z",
            updatedAt: "2024-01-15T00:00:00Z",
          },
          {
            id: "3",
            slug: "high-caffeine-espresso",
            name: "High Caffeine Espresso",
            notes: "Dark Chocolate • Spice • Long Finish",
            price: 26,
            image: "/placeholder.svg",
            roast: "dark",
            grinds: ["whole", "espresso"],
            sizes: [250, 500, 1000],
            bestseller: false,
            featured: false,
            stock: 0,
            status: "out_of_stock",
            createdAt: "2024-09-01T00:00:00Z",
            updatedAt: "2024-01-15T00:00:00Z",
          },
          {
            id: "4",
            slug: "desert-morning-light",
            name: "Desert Morning Light",
            notes: "Honey • Apricot • Almond",
            price: 21,
            image: "/placeholder.svg",
            roast: "light",
            grinds: ["whole", "filter"],
            sizes: [250],
            bestseller: false,
            featured: false,
            stock: 18,
            status: "active",
            createdAt: "2024-06-10T00:00:00Z",
            updatedAt: "2024-01-15T00:00:00Z",
          },
        ];
        
        setProducts(mockProducts);
      } catch (error) {
        console.error("Failed to fetch products:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const filteredProducts = products.filter((product) => {
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         product.notes.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === "all" || product.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const getStatusBadge = (status: Product["status"]) => {
    switch (status) {
      case "active":
        return <Badge variant="default">Active</Badge>;
      case "inactive":
        return <Badge variant="secondary">Inactive</Badge>;
      case "out_of_stock":
        return <Badge variant="destructive">Out of Stock</Badge>;
      default:
        return <Badge variant="secondary">{status}</Badge>;
    }
  };

  const getStockBadge = (stock: number) => {
    if (stock === 0) {
      return <Badge variant="destructive">Out of Stock</Badge>;
    } else if (stock < 10) {
      return <Badge variant="destructive">Low Stock</Badge>;
    } else if (stock < 25) {
      return <Badge variant="default">Medium Stock</Badge>;
    } else {
      return <Badge variant="secondary">In Stock</Badge>;
    }
  };

  if (isLoading) {
    return (
      <AdminLayout>
        <div className="flex items-center justify-center h-64">
          <div className="text-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gold mx-auto mb-4"></div>
            <p className="text-foreground/70">Loading products...</p>
          </div>
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
            <h1 className="text-3xl font-display text-espresso">Products</h1>
            <p className="text-foreground/70 mt-2">
              Manage your coffee products and inventory
            </p>
          </div>
          <Button className="bg-gold text-accent-foreground shadow-gold hover:bg-gold/90">
            <Plus className="h-4 w-4 mr-2" />
            Add Product
          </Button>
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
                    placeholder="Search products..."
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
                  <SelectItem value="active">Active</SelectItem>
                  <SelectItem value="inactive">Inactive</SelectItem>
                  <SelectItem value="out_of_stock">Out of Stock</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        {/* Products Table */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Package className="h-5 w-5" />
              Products ({filteredProducts.length})
            </CardTitle>
            <CardDescription>
              Manage your product catalog and inventory
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="rounded-md border">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Product</TableHead>
                    <TableHead>Price</TableHead>
                    <TableHead>Stock</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Featured</TableHead>
                    <TableHead>Updated</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredProducts.map((product) => (
                    <TableRow key={product.id}>
                      <TableCell>
                        <div className="flex items-center gap-3">
                          <img
                            src={product.image}
                            alt={product.name}
                            className="h-12 w-12 rounded-lg object-cover"
                          />
                          <div>
                            <p className="font-medium text-espresso">
                              {product.name}
                            </p>
                            <p className="text-sm text-foreground/70">
                              {product.notes}
                            </p>
                            <div className="flex gap-1 mt-1">
                              {product.bestseller && (
                                <Badge variant="secondary" className="text-xs">
                                  Bestseller
                                </Badge>
                              )}
                              <Badge variant="outline" className="text-xs">
                                {product.roast}
                              </Badge>
                            </div>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <span className="font-semibold text-espresso">
                          ${product.price}
                        </span>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <span className="text-sm">{product.stock}</span>
                          {getStockBadge(product.stock)}
                        </div>
                      </TableCell>
                      <TableCell>{getStatusBadge(product.status)}</TableCell>
                      <TableCell>
                        {product.featured ? (
                          <Eye className="h-4 w-4 text-gold" />
                        ) : (
                          <EyeOff className="h-4 w-4 text-foreground/30" />
                        )}
                      </TableCell>
                      <TableCell>
                        <span className="text-sm text-foreground/70">
                          {new Date(product.updatedAt).toLocaleDateString()}
                        </span>
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="flex items-center justify-end gap-2">
                          <Button variant="ghost" size="sm">
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button variant="ghost" size="sm">
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
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
