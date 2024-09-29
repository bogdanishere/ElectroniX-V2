import Button from "@/utils/Button";
import { redirect } from "next/navigation";

export default function Home() {
  async function handleSubmit() {
    "use server";
    redirect("/electronix/1");
  }

  return (
    <div className="min-h-screen w-full bg-gradient-to-b from-blue-100 to-blue-200 flex items-center justify-center p-4 md:p-8">
      <div className="bg-white rounded-lg shadow-xl p-6 md:p-8 max-w-2xl w-full">
        <h1 className="text-3xl md:text-4xl font-bold text-center text-blue-800 mb-6">
          Welcome to My Portfolio
        </h1>
        <div className="space-y-4 text-gray-700 text-lg md:text-xl mb-8">
          <p className="bg-yellow-100 border-l-4 border-yellow-500 p-4 rounded">
            <span className="font-semibold">Important:</span> This is not an
            online platform, but a portfolio demonstration.
          </p>
          <p>To simulate a payment, use the following test card details:</p>
          <ul className="list-disc list-inside bg-gray-100 p-4 rounded">
            <li>Card number: 4242 4242 4242 4242</li>
            <li>Expiry date: Any future date</li>
            <li>CVC: Any 3 digits</li>
          </ul>
          <p className="italic">
            Note: The admin panel is not accessible in this demo version.
          </p>
        </div>
        <form action={handleSubmit} className="flex justify-center">
          <Button
            type="submit"
            className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-full transition duration-300 ease-in-out transform hover:scale-105"
          >
            Explore the Portfolio
          </Button>
        </form>
      </div>
    </div>
  );
}
