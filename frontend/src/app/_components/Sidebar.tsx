"use client";

import Filter from "./Filter";
import { CiMoneyCheck1 } from "react-icons/ci";
import { FaHeart } from "react-icons/fa";
import { IoCart } from "react-icons/io5";
import { BiAlbum } from "react-icons/bi";
import { useButtonsFunctionality } from "@/hooks/useButtonsFunctionality";
import { useActualCurrency } from "@/hooks/useActualCurrency";
import SidebarButton from "./SidebarButton";
import SidebarSelectCurrency from "./SidebarSelectCurrency";
import { useRouter } from "next/navigation";

export default function Sidebar() {
  const router = useRouter();
  const { setOpenCardList, setOpenWishList } = useButtonsFunctionality();
  const { currency, setCurrency } = useActualCurrency();

  function handleCurrencyChange(e: React.ChangeEvent<HTMLSelectElement>) {
    if (
      e.target.value !== "RON" &&
      e.target.value !== "USD" &&
      e.target.value !== "EUR" &&
      e.target.value !== "GBP" &&
      e.target.value !== "JPY"
    ) {
      throw new Error("Invalid currency");
    }
    setCurrency(e.target.value);
  }

  function handleOrderHistory() {
    router.push("/orders");
  }

  return (
    <div className="bg-slate-100 dark:bg-slate-500 px-2 sm:px-4 border-r border-gray-200 dark:border-500 row-span-full flex flex-col gap-4 sm:gap-6 md:gap-8 items-center py-5 w-full">
      <Filter />

      <SidebarSelectCurrency
        currency={currency}
        handleCurrencyChange={handleCurrencyChange}
      >
        <CiMoneyCheck1 className="h-5 w-5 sm:h-6 sm:w-6" />
      </SidebarSelectCurrency>

      <SidebarButton content="Wishlist" onClick={() => setOpenWishList(true)}>
        <FaHeart className="h-5 w-5 sm:h-6 sm:w-6" />
      </SidebarButton>
      <SidebarButton content="Cart" onClick={() => setOpenCardList(true)}>
        <IoCart className="h-5 w-5 sm:h-6 sm:w-6" />
      </SidebarButton>
      <SidebarButton content="Commands history" onClick={handleOrderHistory}>
        <BiAlbum className="h-5 w-5 sm:h-6 sm:w-6" />
      </SidebarButton>
    </div>
  );
}
