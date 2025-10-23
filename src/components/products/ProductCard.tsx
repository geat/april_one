"use client";

import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ShoppingCart, ImageIcon, Eye } from "lucide-react";
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
  const [isHovered, setIsHovered] = useState(false);
  const imageUrl =
    imageUrls && imageUrls.length > 0
      ? imageUrls[0]
      : null;

  return (
    <Card
      className="group overflow-hidden hover:shadow-2xl transition-all duration-300 border-gray-200 hover:border-primary/50"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <Link href={`/products/${id}`}>
        <div className="relative h-56 w-full bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center overflow-hidden">
          {!imageUrl || imageError ? (
            <ImageIcon className="h-16 w-16 text-muted-foreground" />
          ) : (
            <img
              src={imageUrl}
              alt={name}
              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
              onError={() => setImageError(true)}
            />
          )}

          {/* Category Badge - Top Left */}
          {category && (
            <div className="absolute top-3 left-3">
              <Badge
                variant="secondary"
                className="bg-white/95 backdrop-blur-sm text-xs font-medium shadow-md hover:bg-white transition-colors"
              >
                {category.name}
              </Badge>
            </div>
          )}

          {/* Stock Badge - Top Right */}
          {stock > 0 && stock <= 5 && (
            <div className="absolute top-3 right-3">
              <Badge
                variant="destructive"
                className="bg-orange-500 text-white text-xs font-medium shadow-md uppercase"
              >
                Only {stock} Left
              </Badge>
            </div>
          )}

          {/* Out of Stock Overlay */}
          {stock === 0 && (
            <div className="absolute inset-0 bg-primary/80 flex items-center justify-center backdrop-blur-sm">
              <Badge variant="destructive" className="text-base py-2 px-4 shadow-lg">
                Out of Stock
              </Badge>
            </div>
          )}

          {/* View Details Overlay on Hover */}
          {stock > 0 && isHovered && (
            <div className="absolute inset-0 bg-primary/50 flex items-center justify-center transition-opacity duration-300">
              <div className="bg-white rounded-full p-3 shadow-lg transform hover:scale-110 transition-transform">
                <Eye className="h-6 w-6 text-primary" />
              </div>
            </div>
          )}
        </div>
      </Link>

      <CardContent className="p-5">
        <div className="space-y-3">
          <Link href={`/products/${id}`}>
            <h3 className="font-semibold text-lg leading-tight hover:text-primary transition-colors line-clamp-2 min-h-[3.5rem] text-primary">
              {name}
            </h3>
          </Link>

          {description && (
            <p className="text-sm text-gray-600 line-clamp-2 min-h-[2.5rem]">
              {description}
            </p>
          )}

          <div className="pt-2 border-t border-gray-100">
            <div className="flex items-baseline gap-2">
              <p className="text-2xl font-bold text-primary">
                Rp {parseFloat(price).toLocaleString('id-ID')}
              </p>
            </div>
            {stock > 0 && stock > 5 && (
              <p className="text-xs text-green-600 font-medium mt-1">
                ✓ In Stock
              </p>
            )}
          </div>
        </div>
      </CardContent>

      <CardFooter className="p-5 pt-0 gap-2">
        <Button
          className="flex-1 shadow-sm hover:shadow-md transition-shadow"
          onClick={() => onAddToCart?.(id)}
          disabled={stock === 0}
        >
          <ShoppingCart className="mr-2 h-4 w-4" />
          Add to Cart
        </Button>
        <Link href={`/products/${id}`} className="flex-shrink-0">
          <Button
            variant="outline"
            size="icon"
            className="shadow-sm hover:shadow-md transition-shadow border-primary text-primary hover:bg-primary hover:text-primary-foreground"
          >
            <Eye className="h-4 w-4" />
          </Button>
        </Link>
      </CardFooter>
    </Card>
  );
}
