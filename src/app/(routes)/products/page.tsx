"use client";

import { useEffect, useState } from "react";
import { ProductGrid } from "@/components/products/ProductGrid";
import { ProductSearch } from "@/components/products/ProductSearch";
import { ProductFilters } from "@/components/products/ProductFilters";
import { ProductSort, SortOption } from "@/components/products/ProductSort";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ChevronLeft, ChevronRight, Loader2 } from "lucide-react";

interface Product {
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
}

interface Category {
  id: string;
  name: string;
}

interface Pagination {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
}

export default function ProductsPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 100000000]);
  const [sortBy, setSortBy] = useState<SortOption>("newest");
  const [pagination, setPagination] = useState<Pagination>({
    page: 1,
    limit: 10,
    total: 0,
    totalPages: 0,
  });

  const fetchProducts = async () => {
    try {
      setLoading(true);
      const params = new URLSearchParams({
        page: pagination.page.toString(),
        limit: pagination.limit.toString(),
      });

      if (search) {
        params.append("search", search);
      }

      if (selectedCategory) {
        params.append("categoryId", selectedCategory);
      }

      const response = await fetch(`/api/products?${params}`);
      const data = await response.json();

      let filteredProducts = data.products;

      // Client-side price filtering
      filteredProducts = filteredProducts.filter((product: Product) => {
        const price = parseFloat(product.price);
        return price >= priceRange[0] && price <= priceRange[1];
      });

      // Client-side sorting
      filteredProducts.sort((a: Product, b: Product) => {
        switch (sortBy) {
          case "name-asc":
            return a.name.localeCompare(b.name);
          case "name-desc":
            return b.name.localeCompare(a.name);
          case "price-asc":
            return parseFloat(a.price) - parseFloat(b.price);
          case "price-desc":
            return parseFloat(b.price) - parseFloat(a.price);
          case "newest":
            return 0; // Default API order
          case "oldest":
            return 0; // Would need createdAt from API
          default:
            return 0;
        }
      });

      setProducts(filteredProducts);
      setPagination(data.pagination);
    } catch (error) {
      console.error("Error fetching products:", error);
    } finally {
      setLoading(false);
    }
  };

  const fetchCategories = async () => {
    try {
      const response = await fetch("/api/categories");
      const data = await response.json();
      setCategories(data);
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  useEffect(() => {
    fetchProducts();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pagination.page, search, selectedCategory, priceRange, sortBy]);

  const handleSearch = (query: string) => {
    setSearch(query);
    setPagination((prev) => ({ ...prev, page: 1 }));
  };

  const handleCategoryChange = (categoryId: string | null) => {
    setSelectedCategory(categoryId);
    setPagination((prev) => ({ ...prev, page: 1 }));
  };

  const handlePriceRangeChange = (range: [number, number]) => {
    setPriceRange(range);
    setPagination((prev) => ({ ...prev, page: 1 }));
  };

  const handleSortChange = (sort: SortOption) => {
    setSortBy(sort);
    setPagination((prev) => ({ ...prev, page: 1 }));
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      <div className="container mx-auto px-4 py-8">
        {/* Hero Header */}
        

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Filters Sidebar */}
          <aside className="lg:col-span-1">
            <div className="sticky top-24 space-y-6">
              <ProductFilters
                categories={categories}
                selectedCategory={selectedCategory}
                onCategoryChange={handleCategoryChange}
                priceRange={priceRange}
                onPriceRangeChange={handlePriceRangeChange}
                maxPrice={100000000}
              />
            </div>
          </aside>

          {/* Main Content */}
          <main className="lg:col-span-3">
            <div className="space-y-6">
              {/* Search and Sort Bar */}
              <Card className="p-4">
                <div className="flex flex-col md:flex-row gap-4">
                  <div className="flex-1">
                    <ProductSearch onSearch={handleSearch} />
                  </div>
                  <div className="flex items-center">
                    <ProductSort value={sortBy} onSortChange={handleSortChange} />
                  </div>
                </div>
              </Card>

              {/* Results Count */}
              {!loading && (
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                  <p className="text-sm text-muted-foreground">
                    Showing{" "}
                    <span className="font-semibold text-primary">
                      {pagination.total === 0 ? 0 : (pagination.page - 1) * pagination.limit + 1}
                    </span>
                    {" "}-{" "}
                    <span className="font-semibold text-primary">
                      {Math.min(pagination.page * pagination.limit, pagination.total)}
                    </span>
                    {" "}of{" "}
                    <span className="font-semibold text-primary">{pagination.total}</span> products
                  </p>
                  {pagination.totalPages > 1 && (
                    <p className="text-xs text-muted-foreground">
                      Page {pagination.page} of {pagination.totalPages}
                    </p>
                  )}
                </div>
              )}

              {/* Products Grid */}
              {loading ? (
                <Card className="p-12">
                  <div className="flex flex-col items-center justify-center gap-4">
                    <Loader2 className="h-12 w-12 animate-spin text-primary" />
                    <p className="text-muted-foreground">Loading products...</p>
                  </div>
                </Card>
              ) : (
                <>
                  <ProductGrid products={products} />

                  {/* Pagination */}
                  {pagination.totalPages > 1 && (
                    <div className="flex flex-col gap-4 items-center">
                      {/* Pagination Info */}
                      <div className="text-sm text-muted-foreground">
                        Page <span className="font-medium text-foreground">{pagination.page}</span> of{" "}
                        <span className="font-medium text-foreground">{pagination.totalPages}</span>
                      </div>

                      {/* Pagination Controls */}
                      <div className="flex items-center gap-1">
                        {/* First Page Button */}
                        <Button
                          variant="outline"
                          size="icon"
                          onClick={() => setPagination((prev) => ({ ...prev, page: 1 }))}
                          disabled={pagination.page === 1}
                          className="h-9 w-9"
                        >
                          <span className="sr-only">First page</span>
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="15"
                            height="15"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          >
                            <polyline points="11 17 6 12 11 7"></polyline>
                            <polyline points="18 17 13 12 18 7"></polyline>
                          </svg>
                        </Button>

                        {/* Previous Button */}
                        <Button
                          variant="outline"
                          size="icon"
                          onClick={() =>
                            setPagination((prev) => ({
                              ...prev,
                              page: prev.page - 1,
                            }))
                          }
                          disabled={pagination.page === 1}
                          className="h-9 w-9"
                        >
                          <ChevronLeft className="h-4 w-4" />
                          <span className="sr-only">Previous page</span>
                        </Button>

                        {/* Page Numbers */}
                        {Array.from({ length: pagination.totalPages }, (_, i) => i + 1)
                          .filter((pageNum) => {
                            // Always show first page, last page, current page, and pages around current
                            if (pageNum === 1 || pageNum === pagination.totalPages) return true;
                            if (Math.abs(pageNum - pagination.page) <= 1) return true;
                            return false;
                          })
                          .map((pageNum, index, array) => {
                            // Show ellipsis if there's a gap
                            const showEllipsisBefore = index > 0 && pageNum - array[index - 1] > 1;

                            return (
                              <div key={pageNum} className="flex items-center">
                                {showEllipsisBefore && (
                                  <span className="px-1.5 text-muted-foreground">...</span>
                                )}
                                <Button
                                  variant={pagination.page === pageNum ? "default" : "outline"}
                                  size="icon"
                                  onClick={() =>
                                    setPagination((prev) => ({
                                      ...prev,
                                      page: pageNum,
                                    }))
                                  }
                                  className="h-9 w-9"
                                >
                                  {pageNum}
                                </Button>
                              </div>
                            );
                          })}

                        {/* Next Button */}
                        <Button
                          variant="outline"
                          size="icon"
                          onClick={() =>
                            setPagination((prev) => ({
                              ...prev,
                              page: prev.page + 1,
                            }))
                          }
                          disabled={pagination.page === pagination.totalPages}
                          className="h-9 w-9"
                        >
                          <ChevronRight className="h-4 w-4" />
                          <span className="sr-only">Next page</span>
                        </Button>

                        {/* Last Page Button */}
                        <Button
                          variant="outline"
                          size="icon"
                          onClick={() =>
                            setPagination((prev) => ({
                              ...prev,
                              page: pagination.totalPages,
                            }))
                          }
                          disabled={pagination.page === pagination.totalPages}
                          className="h-9 w-9"
                        >
                          <span className="sr-only">Last page</span>
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="15"
                            height="15"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          >
                            <polyline points="13 17 18 12 13 7"></polyline>
                            <polyline points="6 17 11 12 6 7"></polyline>
                          </svg>
                        </Button>
                      </div>
                    </div>
                  )}
                </>
              )}
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}
