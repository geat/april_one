"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { ShoppingBag } from "lucide-react";
import { useRouter } from "next/navigation";

interface CartSummaryProps {
  items: Array<{
    quantity: number;
    product: {
      price: string;
    };
  }>;
}

export function CartSummary({ items }: CartSummaryProps) {
  const router = useRouter();

  const subtotal = items.reduce((acc, item) => {
    return acc + parseFloat(item.product.price) * item.quantity;
  }, 0);

  const tax = subtotal * 0.11; // 11% tax (PPN)
  const shipping = subtotal > 150000 ? 0 : 15000; // Free shipping over Rp 150.000
  const total = subtotal + tax + shipping;

  return (
    <Card className="sticky top-8">
      <CardHeader>
        <CardTitle>Order Summary</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <div className="flex justify-between">
            <span className="text-muted-foreground">Subtotal</span>
            <span className="font-semibold">Rp {subtotal.toLocaleString('id-ID')}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-muted-foreground">Shipping</span>
            <span className="font-semibold">
              {shipping === 0 ? "GRATIS" : `Rp ${shipping.toLocaleString('id-ID')}`}
            </span>
          </div>
          <div className="flex justify-between">
            <span className="text-muted-foreground">Tax (10%)</span>
            <span className="font-semibold">Rp {tax.toLocaleString('id-ID')}</span>
          </div>
          <Separator />
          <div className="flex justify-between text-lg">
            <span className="font-bold">Total</span>
            <span className="font-bold text-primary">Rp {total.toLocaleString('id-ID')}</span>
          </div>
        </div>

        <Button
          className="w-full"
          size="lg"
          onClick={() => router.push("/checkout")}
          disabled={items.length === 0}
        >
          <ShoppingBag className="mr-2 h-5 w-5" />
          Proceed to Checkout
        </Button>

        {subtotal < 100 && subtotal > 0 && (
          <p className="text-sm text-muted-foreground text-center">
            Tambah Rp {(150000 - subtotal).toLocaleString('id-ID')} lagi untuk gratis ongkir!
          </p>
        )}
      </CardContent>
    </Card>
  );
}
