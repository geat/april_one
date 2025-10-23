"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Slider } from "@/components/ui/slider";
import { Button } from "@/components/ui/button";
import { Filter, X } from "lucide-react";
import { useState } from "react";

interface Category {
  id: string;
  name: string;
}

interface ProductFiltersProps {
  categories: Category[];
  selectedCategory: string | null;
  onCategoryChange: (categoryId: string | null) => void;
  priceRange?: [number, number];
  onPriceRangeChange?: (range: [number, number]) => void;
  maxPrice?: number;
}

export function ProductFilters({
  categories,
  selectedCategory,
  onCategoryChange,
  priceRange = [0, 100000000],
  onPriceRangeChange,
  maxPrice = 100000000,
}: ProductFiltersProps) {
  const [localPriceRange, setLocalPriceRange] = useState<[number, number]>(priceRange);

  const handlePriceChange = (values: number[]) => {
    setLocalPriceRange([values[0], values[1]]);
  };

  const applyPriceFilter = () => {
    onPriceRangeChange?.(localPriceRange);
  };

  const resetFilters = () => {
    onCategoryChange(null);
    setLocalPriceRange([0, maxPrice]);
    onPriceRangeChange?.([0, maxPrice]);
  };

  const hasActiveFilters = selectedCategory !== null || localPriceRange[0] > 0 || localPriceRange[1] < maxPrice;

  return (
    <div className="space-y-6">
      

      {/* Category Filter */}
      <Card>
        <CardHeader >
          <CardTitle className="text-base font-medium text-primary">Category</CardTitle>
        </CardHeader>
        <CardContent className="space-y-2">
          <div className="space-y-2">
            <Button
              variant={selectedCategory === null ? "default" : "outline"}
              className="w-full justify-start"
              onClick={() => onCategoryChange(null)}
            >
              All Categories
            </Button>
            {categories.map((category) => (
              <Button
                key={category.id}
                variant={selectedCategory === category.id ? "default" : "outline"}
                className="w-full justify-start"
                onClick={() => onCategoryChange(category.id)}
              >
                {category.name}
              </Button>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Price Range Filter */}
      {onPriceRangeChange && (
        <Card>
          <CardHeader>
            <CardTitle className="text-base font-medium text-primary">Price Range</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-4">
              <Slider
                min={0}
                max={maxPrice}
                step={100000}
                value={localPriceRange}
                onValueChange={handlePriceChange}
                className="w-full"
              />
              <div className="flex items-center justify-between text-sm">
                <div className="space-y-1">
                  <p className="text-xs text-muted-foreground">Min</p>
                  <p className="font-semibold">
                    Rp {localPriceRange[0].toLocaleString('id-ID')}
                  </p>
                </div>
                <div className="text-muted-foreground">—</div>
                <div className="space-y-1 text-right">
                  <p className="text-xs text-muted-foreground">Max</p>
                  <p className="font-semibold">
                    Rp {localPriceRange[1].toLocaleString('id-ID')}
                  </p>
                </div>
              </div>
              <Button
                onClick={applyPriceFilter}
                className="w-full"
                size="sm"
              >
                Apply Price Filter
              </Button>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
