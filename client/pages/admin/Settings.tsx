"use client";
import { useState } from "react";
import { AdminLayout } from "@/components/admin/AdminLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import { useAuth } from "@/store/auth";
import { useToast } from "@/hooks/use-toast";
import {
  Settings as SettingsIcon,
  User,
  Bell,
  Shield,
  CreditCard,
  Mail,
  Save,
} from "lucide-react";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";

export default function AdminSettings() {
  const { user } = useAuth();
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);

  // Form states
  const [profile, setProfile] = useState({
    name: user?.name || "",
    email: user?.email || "",
    role: user?.role || "admin",
  });

  const [notifications, setNotifications] = useState({
    emailOrders: true,
    emailLowStock: true,
    emailNewCustomers: false,
    pushNotifications: true,
  });

  const [shopSettings, setShopSettings] = useState({
    shopName: "LiLas Coffee",
    currency: "USD",
    taxRate: 8.0,
    freeShippingThreshold: 50,
    maintenanceMode: false,
  });

  const [paymentSettings, setPaymentSettings] = useState({
    stripeEnabled: true,
    paypalEnabled: true,
    applePayEnabled: false,
    testMode: true,
  });

  const handleSaveProfile = async () => {
    setIsLoading(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      toast({
        title: "Profile updated",
        description: "Your profile has been successfully updated.",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to update profile. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleSaveNotifications = async () => {
    setIsLoading(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      toast({
        title: "Notifications updated",
        description: "Your notification preferences have been saved.",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to update notifications. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleSaveShopSettings = async () => {
    setIsLoading(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      toast({
        title: "Shop settings updated",
        description: "Your shop settings have been saved.",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to update shop settings. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleSavePaymentSettings = async () => {
    setIsLoading(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      toast({
        title: "Payment settings updated",
        description: "Your payment settings have been saved.",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to update payment settings. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AdminLayout>
      <div className="space-y-6">
        {/* Header */}
        <div>
          <h1 className="text-3xl font-display text-espresso">Settings</h1>
          <p className="text-foreground/70 mt-2">
            Manage your account and shop configuration
          </p>
        </div>

        <Tabs defaultValue="profile" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="profile" className="flex items-center gap-2">
              <User className="h-4 w-4" />
              Profile
            </TabsTrigger>
            <TabsTrigger value="notifications" className="flex items-center gap-2">
              <Bell className="h-4 w-4" />
              Notifications
            </TabsTrigger>
            <TabsTrigger value="shop" className="flex items-center gap-2">
              <SettingsIcon className="h-4 w-4" />
              Shop
            </TabsTrigger>
            <TabsTrigger value="payments" className="flex items-center gap-2">
              <CreditCard className="h-4 w-4" />
              Payments
            </TabsTrigger>
          </TabsList>

          {/* Profile Settings */}
          <TabsContent value="profile">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <User className="h-5 w-5" />
                  Profile Settings
                </CardTitle>
                <CardDescription>
                  Update your personal information and account details
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid gap-4 md:grid-cols-2">
                  <div>
                    <Label htmlFor="name">Full Name</Label>
                    <Input
                      id="name"
                      value={profile.name}
                      onChange={(e) => setProfile({ ...profile, name: e.target.value })}
                    />
                  </div>
                  <div>
                    <Label htmlFor="email">Email Address</Label>
                    <Input
                      id="email"
                      type="email"
                      value={profile.email}
                      onChange={(e) => setProfile({ ...profile, email: e.target.value })}
                    />
                  </div>
                </div>
                <div>
                  <Label htmlFor="role">Role</Label>
                  <div className="flex items-center gap-2 mt-2">
                    <Badge variant="secondary">{profile.role}</Badge>
                    <span className="text-sm text-foreground/70">
                      Role cannot be changed
                    </span>
                  </div>
                </div>
                <Button
                  onClick={handleSaveProfile}
                  disabled={isLoading}
                  className="bg-gold text-accent-foreground shadow-gold hover:bg-gold/90"
                >
                  <Save className="h-4 w-4 mr-2" />
                  {isLoading ? "Saving..." : "Save Changes"}
                </Button>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Notification Settings */}
          <TabsContent value="notifications">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Bell className="h-5 w-5" />
                  Notification Preferences
                </CardTitle>
                <CardDescription>
                  Choose how you want to be notified about important events
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <Label htmlFor="email-orders">New Order Notifications</Label>
                      <p className="text-sm text-foreground/70">
                        Get notified when new orders are placed
                      </p>
                    </div>
                    <Switch
                      id="email-orders"
                      checked={notifications.emailOrders}
                      onCheckedChange={(checked) =>
                        setNotifications({ ...notifications, emailOrders: checked })
                      }
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <Label htmlFor="email-stock">Low Stock Alerts</Label>
                      <p className="text-sm text-foreground/70">
                        Get notified when product stock is running low
                      </p>
                    </div>
                    <Switch
                      id="email-stock"
                      checked={notifications.emailLowStock}
                      onCheckedChange={(checked) =>
                        setNotifications({ ...notifications, emailLowStock: checked })
                      }
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <Label htmlFor="email-customers">New Customer Notifications</Label>
                      <p className="text-sm text-foreground/70">
                        Get notified when new customers register
                      </p>
                    </div>
                    <Switch
                      id="email-customers"
                      checked={notifications.emailNewCustomers}
                      onCheckedChange={(checked) =>
                        setNotifications({ ...notifications, emailNewCustomers: checked })
                      }
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <Label htmlFor="push-notifications">Push Notifications</Label>
                      <p className="text-sm text-foreground/70">
                        Receive push notifications in your browser
                      </p>
                    </div>
                    <Switch
                      id="push-notifications"
                      checked={notifications.pushNotifications}
                      onCheckedChange={(checked) =>
                        setNotifications({ ...notifications, pushNotifications: checked })
                      }
                    />
                  </div>
                </div>

                <Button
                  onClick={handleSaveNotifications}
                  disabled={isLoading}
                  className="bg-gold text-accent-foreground shadow-gold hover:bg-gold/90"
                >
                  <Save className="h-4 w-4 mr-2" />
                  {isLoading ? "Saving..." : "Save Preferences"}
                </Button>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Shop Settings */}
          <TabsContent value="shop">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <SettingsIcon className="h-5 w-5" />
                  Shop Configuration
                </CardTitle>
                <CardDescription>
                  Configure your shop settings and preferences
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid gap-4 md:grid-cols-2">
                  <div>
                    <Label htmlFor="shop-name">Shop Name</Label>
                    <Input
                      id="shop-name"
                      value={shopSettings.shopName}
                      onChange={(e) => setShopSettings({ ...shopSettings, shopName: e.target.value })}
                    />
                  </div>
                  <div>
                    <Label htmlFor="currency">Currency</Label>
                    <Input
                      id="currency"
                      value={shopSettings.currency}
                      onChange={(e) => setShopSettings({ ...shopSettings, currency: e.target.value })}
                    />
                  </div>
                </div>

                <div className="grid gap-4 md:grid-cols-2">
                  <div>
                    <Label htmlFor="tax-rate">Tax Rate (%)</Label>
                    <Input
                      id="tax-rate"
                      type="number"
                      step="0.1"
                      value={shopSettings.taxRate}
                      onChange={(e) => setShopSettings({ ...shopSettings, taxRate: parseFloat(e.target.value) })}
                    />
                  </div>
                  <div>
                    <Label htmlFor="free-shipping">Free Shipping Threshold ($)</Label>
                    <Input
                      id="free-shipping"
                      type="number"
                      value={shopSettings.freeShippingThreshold}
                      onChange={(e) => setShopSettings({ ...shopSettings, freeShippingThreshold: parseInt(e.target.value) })}
                    />
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="maintenance">Maintenance Mode</Label>
                    <p className="text-sm text-foreground/70">
                      Temporarily disable the shop for maintenance
                    </p>
                  </div>
                  <Switch
                    id="maintenance"
                    checked={shopSettings.maintenanceMode}
                    onCheckedChange={(checked) =>
                      setShopSettings({ ...shopSettings, maintenanceMode: checked })
                    }
                  />
                </div>

                <Button
                  onClick={handleSaveShopSettings}
                  disabled={isLoading}
                  className="bg-gold text-accent-foreground shadow-gold hover:bg-gold/90"
                >
                  <Save className="h-4 w-4 mr-2" />
                  {isLoading ? "Saving..." : "Save Settings"}
                </Button>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Payment Settings */}
          <TabsContent value="payments">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <CreditCard className="h-5 w-5" />
                  Payment Configuration
                </CardTitle>
                <CardDescription>
                  Configure payment methods and processing settings
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <Label htmlFor="stripe">Stripe Payments</Label>
                      <p className="text-sm text-foreground/70">
                        Accept credit card payments through Stripe
                      </p>
                    </div>
                    <Switch
                      id="stripe"
                      checked={paymentSettings.stripeEnabled}
                      onCheckedChange={(checked) =>
                        setPaymentSettings({ ...paymentSettings, stripeEnabled: checked })
                      }
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <Label htmlFor="paypal">PayPal Payments</Label>
                      <p className="text-sm text-foreground/70">
                        Accept payments through PayPal
                      </p>
                    </div>
                    <Switch
                      id="paypal"
                      checked={paymentSettings.paypalEnabled}
                      onCheckedChange={(checked) =>
                        setPaymentSettings({ ...paymentSettings, paypalEnabled: checked })
                      }
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <Label htmlFor="apple-pay">Apple Pay</Label>
                      <p className="text-sm text-foreground/70">
                        Accept Apple Pay payments on compatible devices
                      </p>
                    </div>
                    <Switch
                      id="apple-pay"
                      checked={paymentSettings.applePayEnabled}
                      onCheckedChange={(checked) =>
                        setPaymentSettings({ ...paymentSettings, applePayEnabled: checked })
                      }
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <Label htmlFor="test-mode">Test Mode</Label>
                      <p className="text-sm text-foreground/70">
                        Use test payment processing (recommended for development)
                      </p>
                    </div>
                    <Switch
                      id="test-mode"
                      checked={paymentSettings.testMode}
                      onCheckedChange={(checked) =>
                        setPaymentSettings({ ...paymentSettings, testMode: checked })
                      }
                    />
                  </div>
                </div>

                <div className="p-4 bg-muted rounded-lg">
                  <div className="flex items-center gap-2 mb-2">
                    <Shield className="h-4 w-4 text-foreground/70" />
                    <span className="text-sm font-medium">Security Notice</span>
                  </div>
                  <p className="text-sm text-foreground/70">
                    All payment information is encrypted and securely processed. 
                    Never share your API keys or credentials.
                  </p>
                </div>

                <Button
                  onClick={handleSavePaymentSettings}
                  disabled={isLoading}
                  className="bg-gold text-accent-foreground shadow-gold hover:bg-gold/90"
                >
                  <Save className="h-4 w-4 mr-2" />
                  {isLoading ? "Saving..." : "Save Payment Settings"}
                </Button>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </AdminLayout>
  );
}
