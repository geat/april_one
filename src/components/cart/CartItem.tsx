"use client";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Minus, Plus, Trash2 } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

interface CartItemProps {
  id: string;
  quantity: number;
  product: {
    id: string;
    name: string;
    price: string;
    imageUrls?: string[];
    stock: number;
  };
  onUpdateQuantity: (id: string, quantity: number) => void;
  onRemove: (id: string) => void;
}

export function CartItem({
  id,
  quantity,
  product,
  onUpdateQuantity,
  onRemove,
}: CartItemProps) {
  const imageUrl =
    product.imageUrls && product.imageUrls.length > 0
      ? product.imageUrls[0]
      : "/placeholder-product.png";

  const subtotal = (parseFloat(product.price) * quantity).toFixed(2);

  return (
    <Card className="p-4">
      <div className="flex gap-4">
        {/* Product Image */}
        <Link href={`/products/${product.id}`} className="flex-shrink-0">
          <div className="relative h-24 w-24 bg-gray-100 rounded-lg overflow-hidden">
            <Image
              src={imageUrl}
              alt={product.name}
              fill
              className="object-cover"
              sizes="96px"
            />
          </div>
        </Link>

        {/* Product Info */}
        <div className="flex-1 min-w-0">
          <Link
            href={`/products/${product.id}`}
            className="hover:text-primary transition-colors"
          >
            <h3 className="font-semibold text-lg truncate">{product.name}</h3>
          </Link>
          <p className="text-xl font-bold text-primary mt-1">
            ${product.price}
          </p>
          <p className="text-sm text-muted-foreground mt-1">
            {product.stock > 0 ? `${product.stock} in stock` : "Out of stock"}
          </p>
        </div>

        {/* Quantity Controls */}
        <div className="flex flex-col items-end gap-2">
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="icon"
              className="h-8 w-8"
              onClick={() => onUpdateQuantity(id, quantity - 1)}
              disabled={quantity <= 1}
            >
              <Minus className="h-4 w-4" />
            </Button>
            <span className="w-12 text-center font-semibold">{quantity}</span>
            <Button
              variant="outline"
              size="icon"
              className="h-8 w-8"
              onClick={() => onUpdateQuantity(id, quantity + 1)}
              disabled={quantity >= product.stock}
            >
              <Plus className="h-4 w-4" />
            </Button>
          </div>

          <p className="text-lg font-bold">${subtotal}</p>

          <Button
            variant="ghost"
            size="sm"
            className="text-destructive hover:text-destructive"
            onClick={() => onRemove(id)}
          >
            <Trash2 className="h-4 w-4 mr-1" />
            Remove
          </Button>
        </div>
      </div>
    </Card>
  );
}
