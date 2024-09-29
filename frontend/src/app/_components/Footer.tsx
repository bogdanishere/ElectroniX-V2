import electronicsLogo from "@/app/images/electronics-logo.png";
import Image from "next/image";
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="py-16 border-t border-gray-200 col-span-2">
      <div className="grid grid-cols-[1.5fr_1.5fr_1fr_1fr_1fr] gap-8">
        <div className="flex flex-col items-center justify-center">
          <Link className="mb-8" href="electronix/1">
            <Image
              className="block"
              alt="ElectroniX logo"
              src={electronicsLogo}
              width={300}
              height={100}
            />
          </Link>
        </div>

        <div>
          <p className="text-lg font-medium mb-8">Contact us</p>
          <address className="text-base leading-6 not-italic">
            <p className="mb-6 mr-8">Strada Târgu Neamț 4, București 062056</p>
            <p>
              <Link
                className="text-gray-500 transition-colors duration-300 hover:text-gray-700"
                href="tel:0749133578"
              >
                0749133578
              </Link>
              <br />
              <Link
                className="text-gray-500 transition-colors duration-300 hover:text-gray-700"
                href="mailto:hello@electronix.com"
              >
                hello@electronix.com
              </Link>
            </p>
          </address>
        </div>

        <nav>
          <p className="text-lg font-medium mb-8">Account</p>
          <ul className="flex flex-col gap-6">
            <li>
              <Link
                className="text-gray-500 transition-colors duration-300 hover:text-gray-700"
                href="/register"
              >
                Create account
              </Link>
            </li>
            <li>
              <Link
                className="text-gray-500 transition-colors duration-300 hover:text-gray-700"
                href="/login"
              >
                Sign in
              </Link>
            </li>
          </ul>
        </nav>

        <nav>
          <p className="text-lg font-medium mb-8">Company</p>
          <ul className="flex flex-col gap-6">
            <li>
              <Link
                className="text-gray-500 transition-colors duration-300 hover:text-gray-700"
                href="/help/about"
              >
                About ElectroniX
              </Link>
            </li>
            <li>
              <Link
                className="text-gray-500 transition-colors duration-300 hover:text-gray-700"
                href="/help/forbusiness"
              >
                For Business
              </Link>
            </li>
          </ul>
        </nav>

        <nav>
          <p className="text-lg font-medium mb-8">Resources</p>
          <ul className="flex flex-col gap-6">
            <li>
              <Link
                className="text-gray-500 transition-colors duration-300 hover:text-gray-700"
                href="/help/helpcenter"
              >
                Help center
              </Link>
            </li>
            <li>
              <Link
                className="text-gray-500 transition-colors duration-300 hover:text-gray-700"
                href="/help/privacyterms"
              >
                Privacy & terms
              </Link>
            </li>
          </ul>
        </nav>
      </div>
      <p className="pl-8 flex items-center text-xl text-gray-500 mt-8">
        Copyright &copy; 2024 by ElectroniX, Inc. All rights reserved.
      </p>
    </footer>
  );
}
