import { db } from "@/db";
import { product, order, category, user } from "@/db/schema";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Package, ShoppingBag, DollarSign, Users } from "lucide-react";
import { sql } from "drizzle-orm";

async function getStats() {
  const [productCount] = await db
    .select({ count: sql<number>`count(*)` })
    .from(product);

  const [orderCount] = await db
    .select({ count: sql<number>`count(*)` })
    .from(order);

  const [categoryCount] = await db
    .select({ count: sql<number>`count(*)` })
    .from(category);

  const [userCount] = await db
    .select({ count: sql<number>`count(*)` })
    .from(user);

  const [revenue] = await db
    .select({ total: sql<number>`COALESCE(SUM(CAST(total_amount AS DECIMAL)), 0)` })
    .from(order);

  return {
    products: Number(productCount.count),
    orders: Number(orderCount.count),
    categories: Number(categoryCount.count),
    users: Number(userCount.count),
    revenue: Number(revenue.total || 0),
  };
}

export default async function AdminDashboardPage() {
  const stats = await getStats();

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold mb-2">Overview</h2>
        <p className="text-muted-foreground">
          Key metrics and statistics for your store
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Products</CardTitle>
            <Package className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.products}</div>
            <p className="text-xs text-muted-foreground">
              {stats.categories} categories
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Orders</CardTitle>
            <ShoppingBag className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.orders}</div>
            <p className="text-xs text-muted-foreground">All time orders</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              Rp {stats.revenue.toLocaleString('id-ID')}
            </div>
            <p className="text-xs text-muted-foreground">All time revenue</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Users</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.users}</div>
            <p className="text-xs text-muted-foreground">Registered users</p>
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Card>
          <CardHeader>
            <CardTitle>Content Management</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            <a
              href="/admin/products/new"
              className="block px-4 py-3 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors text-center font-semibold"
            >
              Add New Product
            </a>
            <a
              href="/admin/sliders"
              className="block px-4 py-3 bg-secondary text-secondary-foreground rounded-lg hover:bg-secondary/80 transition-colors text-center font-semibold"
            >
              Manage Homepage Sliders
            </a>
            <a
              href="/admin/categories"
              className="block px-4 py-3 bg-secondary text-secondary-foreground rounded-lg hover:bg-secondary/80 transition-colors text-center font-semibold"
            >
              Manage Categories
            </a>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Management</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            <a
              href="/admin/orders"
              className="block px-4 py-3 bg-secondary text-secondary-foreground rounded-lg hover:bg-secondary/80 transition-colors text-center font-semibold"
            >
              Manage Orders
            </a>
            <a
              href="/admin/products"
              className="block px-4 py-3 bg-secondary text-secondary-foreground rounded-lg hover:bg-secondary/80 transition-colors text-center font-semibold"
            >
              View All Products
            </a>
            <a
              href="/admin/settings"
              className="block px-4 py-3 bg-secondary text-secondary-foreground rounded-lg hover:bg-secondary/80 transition-colors text-center font-semibold"
            >
              Website Settings
            </a>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
