import { db } from "@/db";
import { product } from "@/db/schema";
import { eq } from "drizzle-orm";
import { ProductForm } from "@/components/admin/ProductForm";
import { notFound } from "next/navigation";

async function getProduct(id: string) {
  const products = await db
    .select()
    .from(product)
    .where(eq(product.id, id))
    .limit(1);

  if (!products || products.length === 0) {
    return null;
  }

  return products[0];
}

export default async function EditProductPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const productData = await getProduct(id);

  if (!productData) {
    notFound();
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold">Edit Product</h2>
        <p className="text-muted-foreground">Update product information</p>
      </div>

      <ProductForm product={productData} />
    </div>
  );
}
