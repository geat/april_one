"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Badge } from "@/components/ui/badge";
import { ShoppingCart, User, Package, LogOut, Menu, Shield } from "lucide-react";
import { useRouter, usePathname } from "next/navigation";
import { useSession, signOut } from "@/lib/auth/client";
import { LanguageSwitcher } from "./LanguageSwitcher";
import { useTranslations } from "next-intl";

export function Header() {
  const router = useRouter();
  const pathname = usePathname();
  const { data: session } = useSession();
  const t = useTranslations('header');
  const [cartCount, setCartCount] = useState(0);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  // Handle client-side mounting
  useEffect(() => {
    setMounted(true);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [pathname]);

  useEffect(() => {
    if (session?.user) {
      fetchCartCount();
    }
  }, [session]);

  const fetchCartCount = async () => {
    try {
      const response = await fetch("/api/cart");
      if (response.ok) {
        const data = await response.json();
        const count = data.reduce((acc: number, item: { quantity: number }) => acc + item.quantity, 0);
        setCartCount(count);
      }
    } catch (error) {
      console.error("Error fetching cart:", error);
    }
  };

  const handleSignOut = async () => {
    await signOut();
    setCartCount(0);
    router.push("/");
    router.refresh();
  };

  return (
    <>
      {/* Mobile menu overlay */}
      {mounted && mobileMenuOpen && (
        <div
          className="fixed inset-0 bg-black/20 z-40 md:hidden"
          onClick={() => setMobileMenuOpen(false)}
        />
      )}

      <header className="border-b sticky top-0 bg-background z-50 backdrop-blur-sm bg-background/95">
        <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16" suppressHydrationWarning>
          {/* Logo */}
          <Link href="/" className="font-bold text-xl">
            ShopName
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-6">
            <Link href="/products" className="hover:text-primary transition-colors">
              {t('products')}
            </Link>
            <Link href="/contact" className="hover:text-primary transition-colors">
              {t('contact')}
            </Link>
            {session?.user && (
              <Link href="/orders" className="hover:text-primary transition-colors">
                {t('myOrders')}
              </Link>
            )}
            {session?.user?.role === "admin" && (
              <Link href="/admin" className="hover:text-primary transition-colors flex items-center gap-1">
                <Shield className="h-4 w-4" />
                {t('admin')}
              </Link>
            )}
          </nav>

          {/* Actions */}
          <div className="flex items-center gap-2">
            {/* Language Switcher */}
            <LanguageSwitcher />

            {/* Cart */}
            {session?.user && (
              <Link href="/cart">
                <Button variant="ghost" size="icon" className="relative">
                  <ShoppingCart className="h-5 w-5" />
                  {mounted && cartCount > 0 && (
                    <Badge
                      variant="destructive"
                      className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0 text-xs"
                    >
                      {cartCount}
                    </Badge>
                  )}
                </Button>
              </Link>
            )}

            {/* User Menu */}
            {session?.user ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon">
                    <User className="h-5 w-5" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-56">
                  <div className="px-2 py-1.5">
                    <p className="text-sm font-semibold">{session.user.name}</p>
                    <p className="text-xs text-muted-foreground">{session.user.email}</p>
                  </div>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem asChild>
                    <Link href="/orders" className="cursor-pointer">
                      <Package className="mr-2 h-4 w-4" />
                      My Orders
                    </Link>
                  </DropdownMenuItem>
                  {session.user.role === "admin" && (
                    <DropdownMenuItem asChild>
                      <Link href="/admin" className="cursor-pointer">
                        <Shield className="mr-2 h-4 w-4" />
                        Admin Dashboard
                      </Link>
                    </DropdownMenuItem>
                  )}
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={handleSignOut} className="cursor-pointer">
                    <LogOut className="mr-2 h-4 w-4" />
                    Sign Out
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <div className="hidden md:flex items-center gap-2">
                <Link href="/signin">
                  <Button variant="ghost">Sign In</Button>
                </Link>
                <Link href="/signup">
                  <Button>Sign Up</Button>
                </Link>
              </div>
            )}

            {/* Mobile Menu */}
            <Button
              variant="ghost"
              size="icon"
              className="md:hidden"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              <Menu className="h-5 w-5" />
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {mounted && mobileMenuOpen && (
          <div className="absolute left-0 right-0 top-16 md:hidden border-t border-b bg-background shadow-lg py-4 space-y-2">
            <Link
              href="/products"
              className="block px-4 py-2 hover:bg-accent rounded mx-2 transition-colors"
              onClick={() => setMobileMenuOpen(false)}
            >
              Products
            </Link>
            <Link
              href="/contact"
              className="block px-4 py-2 hover:bg-accent rounded mx-2 transition-colors"
              onClick={() => setMobileMenuOpen(false)}
            >
              Contact
            </Link>
            {session?.user && (
              <Link
                href="/orders"
                className="block px-4 py-2 hover:bg-accent rounded mx-2 transition-colors"
                onClick={() => setMobileMenuOpen(false)}
              >
                My Orders
              </Link>
            )}
            {session?.user?.role === "admin" && (
              <Link
                href="/admin"
                className="block px-4 py-2 hover:bg-accent rounded mx-2 transition-colors"
                onClick={() => setMobileMenuOpen(false)}
              >
                Admin Dashboard
              </Link>
            )}
            {!session?.user && (
              <>
                <Link
                  href="/signin"
                  className="block px-4 py-2 hover:bg-accent rounded mx-2 transition-colors"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Sign In
                </Link>
                <Link
                  href="/signup"
                  className="block px-4 py-2 hover:bg-accent rounded mx-2 transition-colors"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Sign Up
                </Link>
              </>
            )}
          </div>
        )}
      </div>
    </header>
    </>
  );
}
