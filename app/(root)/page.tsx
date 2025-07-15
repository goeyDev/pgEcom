import ProductList from "@/components/shared/product/product-list";
import { getLatestProduct } from "@/lib/actions/product.actions";
import sampleData from "@/lib/sample-data";

export default async function Home() {
  const latestProducts = await getLatestProduct();
  return (
    <div className="space-y-8">
      <ProductList title="Latest Products" data={latestProducts} />
    </div>
  );
}
