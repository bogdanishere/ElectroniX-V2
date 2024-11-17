export function handleAddToCart(
  id: string,
  name: string,
  provider: string,
  price: string | number
) {
  const newProduct = {
    id,
    name,
    provider,
    price,
    quantity: 1,
  };

  const savedProducts = JSON.parse(
    localStorage.getItem("cartProducts") || "[]"
  );

  const existingProductIndex = savedProducts.findIndex(
    (product: { id: string }) => product.id === newProduct.id
  );

  if (existingProductIndex !== -1) {
    savedProducts[existingProductIndex].quantity += 1;
  } else {
    savedProducts.push(newProduct);
  }

  localStorage.setItem("cartProducts", JSON.stringify(savedProducts));
}
