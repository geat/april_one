"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import Image from "next/image";
import { toast } from "sonner";
import { CheckCircle2, Package, Truck, Clock } from "lucide-react";

interface OrderDetails {
  id: string;
  totalAmount: string;
  status: string;
  shippingAddress: string;
  billingAddress: string;
  createdAt: string;
  items: Array<{
    id: string;
    quantity: number;
    price: string;
    product: {
      id: string;
      name: string;
      imageUrls?: string[];
    };
  }>;
}

const statusConfig = {
  pending: { label: "Pending", icon: Clock, color: "bg-yellow-100 text-yellow-800" },
  processing: { label: "Processing", icon: Package, color: "bg-blue-100 text-blue-800" },
  shipped: { label: "Shipped", icon: Truck, color: "bg-purple-100 text-purple-800" },
  delivered: { label: "Delivered", icon: CheckCircle2, color: "bg-green-100 text-green-800" },
  cancelled: { label: "Cancelled", icon: Clock, color: "bg-red-100 text-red-800" },
};

export default function OrderDetailPage() {
  const params = useParams();
  const [order, setOrder] = useState<OrderDetails | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrder = async () => {
      try {
        const response = await fetch(`/api/orders/${params.id}`);
        if (!response.ok) {
          throw new Error("Failed to fetch order");
        }
        const data = await response.json();
        setOrder(data);
      } catch (error) {
        console.error("Error fetching order:", error);
        toast.error("Failed to load order details");
      } finally {
        setLoading(false);
      }
    };

    fetchOrder();
  }, [params.id]);

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <p className="text-center">Loading...</p>
      </div>
    );
  }

  if (!order) {
    return (
      <div className="container mx-auto px-4 py-8">
        <p className="text-center">Order not found</p>
      </div>
    );
  }

  const StatusIcon = statusConfig[order.status as keyof typeof statusConfig]?.icon || Clock;
  const statusLabel = statusConfig[order.status as keyof typeof statusConfig]?.label || order.status;
  const statusColor = statusConfig[order.status as keyof typeof statusConfig]?.color || "bg-gray-100 text-gray-800";

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-6">
        <Link href="/orders">
          <Button variant="outline">Back to Orders</Button>
        </Link>
      </div>

      <div className="space-y-6">
        {/* Order Header */}
        <Card>
          <CardHeader>
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <div>
                <CardTitle className="text-2xl">Order #{order.id.slice(0, 8)}</CardTitle>
                <p className="text-sm text-muted-foreground mt-1">
                  Placed on {new Date(order.createdAt).toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                    hour: '2-digit',
                    minute: '2-digit'
                  })}
                </p>
              </div>
              <Badge className={`${statusColor} flex items-center gap-1 px-3 py-1`}>
                <StatusIcon className="h-4 w-4" />
                {statusLabel}
              </Badge>
            </div>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h3 className="font-semibold mb-2">Shipping Address</h3>
                <p className="text-sm text-muted-foreground whitespace-pre-line">
                  {order.shippingAddress}
                </p>
              </div>
              <div>
                <h3 className="font-semibold mb-2">Billing Address</h3>
                <p className="text-sm text-muted-foreground whitespace-pre-line">
                  {order.billingAddress}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Order Items */}
        <Card>
          <CardHeader>
            <CardTitle>Order Items</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {order.items.map((item) => {
              const imageUrl =
                item.product.imageUrls && item.product.imageUrls.length > 0
                  ? item.product.imageUrls[0]
                  : "/placeholder-product.png";

              return (
                <div key={item.id} className="flex gap-4 pb-4 border-b last:border-0 last:pb-0">
                  <Link href={`/products/${item.product.id}`} className="flex-shrink-0">
                    <div className="relative h-20 w-20 bg-gray-100 rounded overflow-hidden">
                      <Image
                        src={imageUrl}
                        alt={item.product.name}
                        fill
                        className="object-cover"
                        sizes="80px"
                      />
                    </div>
                  </Link>
                  <div className="flex-1">
                    <Link
                      href={`/products/${item.product.id}`}
                      className="font-semibold hover:text-primary transition-colors"
                    >
                      {item.product.name}
                    </Link>
                    <p className="text-sm text-muted-foreground mt-1">
                      Quantity: {item.quantity}
                    </p>
                    <p className="text-sm font-semibold mt-1">
                      ${parseFloat(item.price).toFixed(2)} each
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="font-bold">
                      ${(parseFloat(item.price) * item.quantity).toFixed(2)}
                    </p>
                  </div>
                </div>
              );
            })}

            <Separator className="my-4" />

            {/* Order Total */}
            <div className="space-y-2">
              <div className="flex justify-between text-lg">
                <span className="font-bold">Total</span>
                <span className="font-bold text-primary">
                  ${parseFloat(order.totalAmount).toFixed(2)}
                </span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
