import Image from "next/image";

import imag from "@/app/images/electronics-logo.png";
import Link from "next/link";

export default function Logo() {
  return (
    <div className="max-w-2xl">
      <Link href={`/electronix/1`}>
        <Image
          className="cursor-pointer"
          src={imag}
          alt="ElectroniX"
          width={160}
          height={50}
        />
      </Link>
    </div>
  );
}
