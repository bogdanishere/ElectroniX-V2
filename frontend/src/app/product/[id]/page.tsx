import ReviewSection from "@/app/_components/ReviewSection";
import SingleProductDescription from "@/app/_components/SingleProductDescription";
import * as api from "@/network/api/products";

export default async function ProductPage({
  params: { id },
}: {
  params: { id: string };
}) {
  const product = await api.getProductByID(id);

  const { productId } = product.product;

  return (
    <SingleProductDescription dataProduct={product}>
      <ReviewSection productID={productId} />
    </SingleProductDescription>
  );
}
