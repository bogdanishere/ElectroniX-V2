import Button from "@/utils/Button";
import { redirect } from "next/navigation";

export default function Home() {
  async function handleSubmit() {
    "use server";
    redirect("/electronix/1");
  }

  return (
    <div className="min-h-screen w-full bg-gradient-to-b from-blue-100 to-blue-200 flex items-center justify-center p-4 sm:p-6 md:p-8">
      <div className="bg-white rounded-lg shadow-xl p-6 sm:p-8 max-w-3xl w-full">
        <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-center text-blue-800 mb-6">
          Welcome to My Portfolio
        </h1>
        <div className="space-y-4 text-gray-700 text-base sm:text-lg md:text-xl mb-8">
          <p className="bg-yellow-100 border-l-4 border-yellow-500 p-4 rounded">
            <span className="font-semibold">Important:</span> This is not an
            online platform, but a portfolio demonstration.
          </p>
          <p className="font-medium">
            To simulate a payment, use the following test card details:
          </p>
          <ul className="list-disc list-inside bg-gray-100 p-4 rounded space-y-2">
            <li>Card number: 4242 4242 4242 4242</li>
            <li>Expiry date: Any future date</li>
            <li>CVC: Any 3 digits</li>
          </ul>
          <div className="bg-blue-50 p-4 rounded-lg space-y-3">
            <p className="font-medium text-blue-800">Employee Access:</p>
            <p className="italic">
              To have access to create and delete products, you need to log into
              the employee page using:
            </p>
            <ul className="list-disc list-inside pl-4 space-y-1">
              <li>Email: admin@gmail.com</li>
              <li>Password: password_employee</li>
            </ul>
          </div>
          <p>
            After that, you have access to create a provider and become a
            provider for my website.
          </p>
          <p>
            Log into the provider section and feel free to add and delete your
            products!
          </p>
          <p className="font-medium text-red-600">
            Please use normal images, not anything offensive.
          </p>
          <p className="text-center font-semibold mt-6">
            Thank you for your understanding and I hope you will have fun
            exploring my page!
          </p>
        </div>
        <form action={handleSubmit} className="flex justify-center">
          <Button
            type="submit"
            className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-full transition duration-300 ease-in-out transform hover:scale-105 text-lg sm:text-xl"
          >
            Explore the Portfolio
          </Button>
        </form>
      </div>
    </div>
  );
}
