import { HeroSlider } from "@/components/website/HeroSlider";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import Link from "next/link";
import { ShoppingBag, Truck, Shield, Headphones } from "lucide-react";

export default async function Home() {
  return (
    <div className="min-h-screen">
      {/* Hero Slider */}
      <HeroSlider />

      {/* Features Section */}
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card>
              <CardHeader>
                <ShoppingBag className="h-10 w-10 mb-2 text-primary" />
                <CardTitle>Quality Products</CardTitle>
                <CardDescription>
                  Curated selection of premium items
                </CardDescription>
              </CardHeader>
            </Card>
            <Card>
              <CardHeader>
                <Truck className="h-10 w-10 mb-2 text-primary" />
                <CardTitle>Fast Delivery</CardTitle>
                <CardDescription>
                  Quick and reliable shipping
                </CardDescription>
              </CardHeader>
            </Card>
            <Card>
              <CardHeader>
                <Shield className="h-10 w-10 mb-2 text-primary" />
                <CardTitle>Secure Payment</CardTitle>
                <CardDescription>
                  Your transactions are protected
                </CardDescription>
              </CardHeader>
            </Card>
            <Card>
              <CardHeader>
                <Headphones className="h-10 w-10 mb-2 text-primary" />
                <CardTitle>24/7 Support</CardTitle>
                <CardDescription>
                  We're here to help anytime
                </CardDescription>
              </CardHeader>
            </Card>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-20 bg-primary text-primary-foreground">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Start Shopping Today
          </h2>
          <p className="text-lg mb-8 opacity-90">
            Discover amazing products at great prices
          </p>
          <Link href="/products">
            <Button size="lg" variant="secondary" className="text-lg px-8">
              Browse Products
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
}
