import { redirect } from "next/navigation";
import { auth } from "@/lib/auth/server";
import { headers } from "next/headers";
import Link from "next/link";
import { Shield, Package, ShoppingBag, Tags } from "lucide-react";

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  // Check if user is admin
  if (!session?.user || session.user.role !== "admin") {
    redirect("/");
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        <div className="flex items-center gap-2 mb-6">
          <Shield className="h-6 w-6 text-primary" />
          <h1 className="text-3xl font-bold">Admin Dashboard</h1>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
          {/* Sidebar */}
          <aside className="lg:col-span-1">
            <nav className="bg-white rounded-lg shadow p-4 space-y-2">
              <Link
                href="/admin"
                className="flex items-center gap-2 px-4 py-2 rounded hover:bg-gray-100 transition-colors"
              >
                <Shield className="h-4 w-4" />
                Dashboard
              </Link>
              <Link
                href="/admin/products"
                className="flex items-center gap-2 px-4 py-2 rounded hover:bg-gray-100 transition-colors"
              >
                <Package className="h-4 w-4" />
                Products
              </Link>
              <Link
                href="/admin/categories"
                className="flex items-center gap-2 px-4 py-2 rounded hover:bg-gray-100 transition-colors"
              >
                <Tags className="h-4 w-4" />
                Categories
              </Link>
              <Link
                href="/admin/orders"
                className="flex items-center gap-2 px-4 py-2 rounded hover:bg-gray-100 transition-colors"
              >
                <ShoppingBag className="h-4 w-4" />
                Orders
              </Link>
            </nav>
          </aside>

          {/* Main Content */}
          <main className="lg:col-span-4">{children}</main>
        </div>
      </div>
    </div>
  );
}
