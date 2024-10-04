// import ProductCard from "./ProductCard";

// interface ProductProps {
//   product_id: string;
//   price: string;
//   currency: string;
//   weight: string;
//   name: string;
//   brand: string;
//   quantity: number;
//   prices_availability: string;
//   prices_condition: string;
//   prices_merchant: string;
//   prices_sourceURLs: string;
//   categories: string;
//   dateAdded: string;
//   dateUpdated: string;
//   imageurls: string[];
//   sourceURLs: string;
//   rating: string;
//   nr_rating: number;
//   description: string;
//   quality: string;
// }

// interface DataProductsProps {
//   products: ProductProps[];
// }

// export default function ProductList({
//   title = "Recomandari",
//   dataProducts = { products: [] },
// }: {
//   title?: string;
//   dataProducts: DataProductsProps;
// }) {
//   return (
//     <div className="flex flex-col gap-4 pb-8">
//       <div className="bg-gray-50 flex justify-center items-center p-5 border-b border-gray-200">
//         {title}
//       </div>
//       {dataProducts.products.length === 0 && (
//         <div className="flex items-center flex-col p-5 border-b text-3xl border-gray-200 font-bold h-[100vh] w-auto pt-9 gap-5">
//           <div>Ne pare rău dar nu avem produsul pe care îl căutați</div>
//           <div>Vă rugăm încercați altul din gama noastră de produse</div>
//         </div>
//       )}
//       <div className="max-w-screen-xl mx-auto grid grid-rows-auto grid-cols-4 gap-8 lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1">
//         {dataProducts.products.map((product) => (
//           <ProductCard key={product.product_id} dataProduct={product} />
//         ))}
//       </div>
//     </div>
//   );
// }

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
  imageurls: string[];
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
  title = "Recomandations",
  dataProducts = { products: [] },
}: {
  title?: string;
  dataProducts: DataProductsProps;
}) {
  return (
    <div className="flex flex-col gap-4 pb-8">
      <div className="bg-gray-50 flex justify-center items-center p-3 sm:p-4 md:p-5 border-b border-gray-200 text-lg sm:text-xl md:text-2xl font-semibold">
        {title}
      </div>
      {dataProducts.products.length === 0 && (
        <div className="flex items-center flex-col p-4 sm:p-5 border-b text-xl sm:text-2xl md:text-3xl border-gray-200 font-bold min-h-[50vh] w-auto pt-9 gap-3 sm:gap-4 md:gap-5 text-center">
          <div>Ne pare rău dar nu avem produsul pe care îl căutați</div>
          <div>Vă rugăm încercați altul din gama noastră de produse</div>
        </div>
      )}
      <div className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6 md:gap-8">
        {dataProducts.products.map((product) => (
          <ProductCard key={product.product_id} dataProduct={product} />
        ))}
      </div>
    </div>
  );
}
