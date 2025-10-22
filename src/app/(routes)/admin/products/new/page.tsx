import { ProductForm } from "@/components/admin/ProductForm";

export default function NewProductPage() {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold">Add New Product</h2>
        <p className="text-muted-foreground">Create a new product for your store</p>
      </div>

      <ProductForm />
    </div>
  );
}
