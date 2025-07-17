import ProductCarousel from "@/components/shared/product/product-carousel";
import ProductList from "@/components/shared/product/product-list";
import {
  getFeaturedProducts,
  getLatestProduct,
} from "@/lib/actions/product.actions";
// import sampleData from "@/lib/sample-data";

export default async function Home() {
  const latestProducts = await getLatestProduct();
  const featuredProducts = await getFeaturedProducts();
  return (
    <div className="space-y-8">
      <ProductList title="Latest Products" data={latestProducts} />

      <div>
        {featuredProducts.length > 0 && (
          <ProductCarousel data={featuredProducts} />
        )}
        <div className="space-y-8">
          <ProductList title="Newest Arrivals" data={latestProducts} />
        </div>
      </div>
    </div>
  );
}
