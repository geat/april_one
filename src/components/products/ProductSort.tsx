"use client";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ArrowUpDown } from "lucide-react";

export type SortOption = "name-asc" | "name-desc" | "price-asc" | "price-desc" | "newest" | "oldest";

interface ProductSortProps {
  value: SortOption;
  onSortChange: (sort: SortOption) => void;
}

export function ProductSort({ value, onSortChange }: ProductSortProps) {
  return (
    <div className="flex items-center gap-2">
      <ArrowUpDown className="h-4 w-4 text-primary" />
      <Select value={value} onValueChange={(val) => onSortChange(val as SortOption)}>
        <SelectTrigger className="w-[200px] focus:ring-primary">
          <SelectValue placeholder="Sort by" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="newest">Newest First</SelectItem>
          <SelectItem value="oldest">Oldest First</SelectItem>
          <SelectItem value="name-asc">Name: A to Z</SelectItem>
          <SelectItem value="name-desc">Name: Z to A</SelectItem>
          <SelectItem value="price-asc">Price: Low to High</SelectItem>
          <SelectItem value="price-desc">Price: High to Low</SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
}
