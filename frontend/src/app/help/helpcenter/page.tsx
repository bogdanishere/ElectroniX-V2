import Header from "@/app/_components/Header";
export const metadata = {
  title: "Electronix - Help Center",
  description: "Electronix - Help Center",
};

export default async function Page() {
  return (
    <>
      <Header text="Help center" />
      <div className="p-16 px-20 pb-24 bg-gray-100 w-auto h-[800px]">
        <br />
        <div className="mb-4">
          <h3 className="text-lg font-medium">1. How do I place an order?</h3>
          <p className="text-sm">
            Browse products, add to cart, and follow the checkout process to
            complete your purchase.
          </p>
        </div>
        <div className="mb-4">
          <h3 className="text-lg font-medium">2. Can I track my order?</h3>
          <p className="text-sm">
            Yes, after purchase, you&apos;ll receive a tracking number via email
            to monitor your order.
          </p>
        </div>

        <div className="mb-4">
          <h3 className="text-lg font-medium">
            3. What payment methods are accepted?
          </h3>
          <p className="text-sm">
            We accept various payment methods for your convenience.
          </p>
        </div>
      </div>
    </>
  );
}
