import electronicsLogo from "@/app/images/electronics-logo.png";
import Image from "next/image";
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="py-8 md:py-16 border-t border-gray-200 col-span-full bg-white">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-8">
          <div className="flex flex-col items-center sm:items-start justify-center col-span-1 sm:col-span-2 lg:col-span-1">
            <Link className="mb-4 md:mb-8" href="electronix/1">
              <Image
                className="block w-full max-w-[200px] md:max-w-[300px]"
                alt="ElectroniX logo"
                src={electronicsLogo}
                width={300}
                height={100}
              />
            </Link>
          </div>

          <div>
            <p className="text-lg font-medium mb-4 md:mb-8">Contact us</p>
            <address className="text-sm md:text-base leading-6 not-italic">
              <p className="mb-4 md:mb-6 mr-4 md:mr-8">
                Strada Târgu Neamț 4, București 062056
              </p>
              <p>
                <Link
                  className="text-gray-500 transition-colors duration-300 hover:text-gray-700 block mb-2"
                  href="tel:0749133578"
                >
                  0749133578
                </Link>
                <Link
                  className="text-gray-500 transition-colors duration-300 hover:text-gray-700 block"
                  href="mailto:hello@electronix.com"
                >
                  hello@electronix.com
                </Link>
              </p>
            </address>
          </div>

          <nav>
            <p className="text-lg font-medium mb-4 md:mb-8">Account</p>
            <ul className="flex flex-col gap-3 md:gap-6">
              <li>
                <Link
                  className="text-gray-500 transition-colors duration-300 hover:text-gray-700 text-sm md:text-base"
                  href="/register"
                >
                  Create account
                </Link>
              </li>
              <li>
                <Link
                  className="text-gray-500 transition-colors duration-300 hover:text-gray-700 text-sm md:text-base"
                  href="/login"
                >
                  Sign in
                </Link>
              </li>
            </ul>
          </nav>

          <nav>
            <p className="text-lg font-medium mb-4 md:mb-8">Company</p>
            <ul className="flex flex-col gap-3 md:gap-6">
              <li>
                <Link
                  className="text-gray-500 transition-colors duration-300 hover:text-gray-700 text-sm md:text-base"
                  href="/help/about"
                >
                  About ElectroniX
                </Link>
              </li>
              <li>
                <Link
                  className="text-gray-500 transition-colors duration-300 hover:text-gray-700 text-sm md:text-base"
                  href="/help/forbusiness"
                >
                  For Business
                </Link>
              </li>
            </ul>
          </nav>

          <nav>
            <p className="text-lg font-medium mb-4 md:mb-8">Resources</p>
            <ul className="flex flex-col gap-3 md:gap-6">
              <li>
                <Link
                  className="text-gray-500 transition-colors duration-300 hover:text-gray-700 text-sm md:text-base"
                  href="/help/helpcenter"
                >
                  Help center
                </Link>
              </li>
              <li>
                <Link
                  className="text-gray-500 transition-colors duration-300 hover:text-gray-700 text-sm md:text-base"
                  href="/help/privacyterms"
                >
                  Privacy & terms
                </Link>
              </li>
            </ul>
          </nav>
        </div>
        <p className="text-center text-sm md:text-base text-gray-500 mt-8">
          Copyright &copy; 2024 by ElectroniX, Inc. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
