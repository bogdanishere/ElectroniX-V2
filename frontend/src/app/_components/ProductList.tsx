import ProductCard from "./ProductCard";

interface Product {
  productId: string;
  price: number;
  currency: string;
  weight: string;
  name: string;
  brand: string;
  quantity: number;
  pricesAvailability: string;
  pricesMerchant: string;
  categories: string;
  dateAdded: string;
  dateUpdated: string;
  imageUrls: string;
  rating: number;
  nrOfRatings: number;
  description: string;
  quality: number;
}

interface ProductResponse {
  products: Product[];
  pageNumber: number;
  itemsPerPage: number;
  status: string;
}

export default function ProductList({
  title = "Recomandations",
  dataProducts = {
    products: [],
    pageNumber: 0,
    itemsPerPage: 0,
    status: "",
  },
}: {
  title?: string;
  dataProducts: ProductResponse;
}) {
  if (dataProducts.products.length === 0) {
    return (
      <div className="flex flex-col gap-4 pb-8">
        <div className="bg-gray-50 flex justify-center items-center p-3 sm:p-4 md:p-5 border-b border-gray-200 text-lg sm:text-xl md:text-2xl font-semibold">
          {title}
        </div>
        <div className="flex items-center flex-col p-4 sm:p-5 border-b text-xl sm:text-2xl md:text-3xl border-gray-200 font-bold min-h-[50vh] w-auto pt-9 gap-3 sm:gap-4 md:gap-5 text-center">
          <div>
            We&apos;re sorry, but we don&apos;t have the product you&apos;re
            looking for
          </div>
          <div>Please try another one from our range of products</div>
        </div>
      </div>
    );
  }
  return (
    <div className="flex flex-col gap-4 pb-8">
      <div className="bg-gray-50 flex justify-center items-center p-3 sm:p-4 md:p-5 border-b border-gray-200 text-lg sm:text-xl md:text-2xl font-semibold">
        {title}
      </div>
      {dataProducts.products.length === 0 && (
        <div className="flex items-center flex-col p-4 sm:p-5 border-b text-xl sm:text-2xl md:text-3xl border-gray-200 font-bold min-h-[50vh] w-auto pt-9 gap-3 sm:gap-4 md:gap-5 text-center">
          <div>
            We&apos;re sorry, but we don&apos;t have the product you&apos;re
            looking for
          </div>
          <div>Please try another one from our range of products</div>
        </div>
      )}
      <div className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6 md:gap-8">
        {dataProducts.products.map((product) => (
          <ProductCard key={product.productId} dataProduct={product} />
        ))}
      </div>
    </div>
  );
}
