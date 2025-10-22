"use client";

import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ShoppingCart, ImageIcon } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

interface ProductCardProps {
  id: string;
  name: string;
  description?: string;
  price: string;
  imageUrls?: string[];
  stock: number;
  category?: {
    id: string;
    name: string;
  };
  onAddToCart?: (productId: string) => void;
}

export function ProductCard({
  id,
  name,
  description,
  price,
  imageUrls,
  stock,
  category,
  onAddToCart,
}: ProductCardProps) {
  const [imageError, setImageError] = useState(false);
  const imageUrl =
    imageUrls && imageUrls.length > 0
      ? imageUrls[0]
      : null;

  return (
    <Card className="overflow-hidden hover:shadow-lg transition-shadow">
      <Link href={`/products/${id}`}>
        <div className="relative h-48 w-full bg-gray-100 flex items-center justify-center">
          {!imageUrl || imageError ? (
            <ImageIcon className="h-16 w-16 text-muted-foreground" />
          ) : (
            <img
              src={imageUrl}
              alt={name}
              className="w-full h-full object-cover"
              onError={() => setImageError(true)}
            />
          )}
          {stock === 0 && (
            <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
              <Badge variant="destructive">Out of Stock</Badge>
            </div>
          )}
        </div>
      </Link>
      <CardContent className="p-4">
        <div className="space-y-2">
          {category && (
            <Badge variant="secondary" className="text-xs">
              {category.name}
            </Badge>
          )}
          <Link href={`/products/${id}`}>
            <h3 className="font-semibold text-lg hover:text-primary transition-colors">
              {name}
            </h3>
          </Link>
          {description && (
            <p className="text-sm text-muted-foreground line-clamp-2">
              {description}
            </p>
          )}
          <p className="text-2xl font-bold text-primary">${price}</p>
          <p className="text-sm text-muted-foreground">
            {stock > 0 ? `${stock} in stock` : "Out of stock"}
          </p>
        </div>
      </CardContent>
      <CardFooter className="p-4 pt-0">
        <Button
          className="w-full"
          onClick={() => onAddToCart?.(id)}
          disabled={stock === 0}
        >
          <ShoppingCart className="mr-2 h-4 w-4" />
          Add to Cart
        </Button>
      </CardFooter>
    </Card>
  );
}
