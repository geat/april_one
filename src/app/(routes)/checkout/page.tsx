"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { AddressForm } from "@/components/checkout/AddressForm";
import { OrderSummary } from "@/components/checkout/OrderSummary";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";

interface CartItemType {
  id: string;
  quantity: number;
  product: {
    id: string;
    name: string;
    price: string;
    imageUrls?: string[];
    stock: number;
  };
}

export default function CheckoutPage() {
  const router = useRouter();
  const [cartItems, setCartItems] = useState<CartItemType[]>([]);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [sameAsShipping, setSameAsShipping] = useState(true);

  const [shippingAddress, setShippingAddress] = useState({
    street: "",
    city: "",
    postalCode: "",
    phone: "",
  });

  const [billingAddress, setBillingAddress] = useState({
    street: "",
    city: "",
    postalCode: "",
    phone: "",
  });

  useEffect(() => {
    const fetchCart = async () => {
      try {
        const response = await fetch("/api/cart");
        if (!response.ok) {
          throw new Error("Failed to fetch cart");
        }
        const data = await response.json();

        if (data.length === 0) {
          toast.error("Your cart is empty");
          router.push("/cart");
          return;
        }

        setCartItems(data);
      } catch (error) {
        console.error("Error fetching cart:", error);
        toast.error("Failed to load cart");
        router.push("/cart");
      } finally {
        setLoading(false);
      }
    };

    fetchCart();
  }, [router]);

  const handleShippingChange = (field: string, value: string) => {
    setShippingAddress((prev) => ({ ...prev, [field]: value }));
    if (sameAsShipping) {
      setBillingAddress((prev) => ({ ...prev, [field]: value }));
    }
  };

  const handleBillingChange = (field: string, value: string) => {
    setBillingAddress((prev) => ({ ...prev, [field]: value }));
  };

  const handleSameAsShippingChange = (checked: boolean) => {
    setSameAsShipping(checked);
    if (checked) {
      setBillingAddress(shippingAddress);
    }
  };

  const handleSubmitOrder = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validate addresses
    if (!shippingAddress.street || !shippingAddress.city || !shippingAddress.postalCode || !shippingAddress.phone) {
      toast.error("Please fill in all shipping address fields");
      return;
    }

    if (!sameAsShipping && (!billingAddress.street || !billingAddress.city || !billingAddress.postalCode || !billingAddress.phone)) {
      toast.error("Please fill in all billing address fields");
      return;
    }

    setSubmitting(true);

    try {
      const finalBillingAddress = sameAsShipping ? shippingAddress : billingAddress;

      const orderItems = cartItems.map((item) => ({
        productId: item.product.id,
        quantity: item.quantity,
      }));

      const response = await fetch("/api/orders", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          shippingAddress: `${shippingAddress.street}, ${shippingAddress.city}, ${shippingAddress.postalCode}, Phone: ${shippingAddress.phone}`,
          billingAddress: `${finalBillingAddress.street}, ${finalBillingAddress.city}, ${finalBillingAddress.postalCode}, Phone: ${finalBillingAddress.phone}`,
          items: orderItems,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to create order");
      }

      const order = await response.json();

      toast.success("Order placed successfully!");
      router.push(`/orders/${order.id}`);
    } catch (error) {
      console.error("Error creating order:", error);
      toast.error("Failed to place order. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <p className="text-center">Loading...</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-8">Checkout</h1>

      <form onSubmit={handleSubmitOrder}>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Address Forms */}
          <div className="lg:col-span-2 space-y-6">
            <AddressForm
              title="Shipping Address"
              address={shippingAddress}
              onChange={handleShippingChange}
            />

            <div className="flex items-center space-x-2">
              <Checkbox
                id="sameAsShipping"
                checked={sameAsShipping}
                onCheckedChange={handleSameAsShippingChange}
              />
              <Label htmlFor="sameAsShipping">
                Billing address same as shipping
              </Label>
            </div>

            {!sameAsShipping && (
              <AddressForm
                title="Billing Address"
                address={billingAddress}
                onChange={handleBillingChange}
              />
            )}
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="sticky top-8 space-y-6">
              <OrderSummary items={cartItems} />

              <Button
                type="submit"
                size="lg"
                className="w-full"
                disabled={submitting}
              >
                {submitting ? "Placing Order..." : "Place Order"}
              </Button>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}
