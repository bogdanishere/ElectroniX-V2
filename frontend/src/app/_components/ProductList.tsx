import ProductCard from "./ProductCard";

interface ProductProps {
  product_id: string;
  price: string;
  currency: string;
  weight: string;
  name: string;
  brand: string;
  quantity: number;
  prices_availability: string;
  prices_condition: string;
  prices_merchant: string;
  prices_sourceURLs: string;
  categories: string;
  dateAdded: string;
  dateUpdated: string;
  imageURLs: string[];
  sourceURLs: string;
  rating: string;
  nr_rating: number;
  description: string;
  quality: string;
}

interface DataProductsProps {
  products: ProductProps[];
}

export default function ProductList({
  title = "Recomandari",
  dataProducts = { products: [] },
}: {
  title?: string;
  dataProducts: DataProductsProps;
}) {
  return (
    <div className="flex flex-col gap-4 pb-8">
      <div className="bg-gray-50 flex justify-center items-center p-5 border-b border-gray-200">
        {title}
      </div>
      {dataProducts.products.length === 0 && (
        <div className="flex items-center flex-col p-5 border-b text-3xl border-gray-200 font-bold h-[100vh] w-auto pt-9 gap-5">
          <div>Ne pare rău dar nu avem produsul pe care îl căutați</div>
          <div>Vă rugăm încercați altul din gama noastră de produse</div>
        </div>
      )}
      <div className="max-w-screen-xl mx-auto grid grid-rows-auto grid-cols-4 gap-8 lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1">
        {dataProducts.products.map((product) => (
          <ProductCard key={product.product_id} dataProduct={product} />
        ))}
      </div>
    </div>
  );
}
