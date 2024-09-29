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
    <div className="bg-gray-400  pr-2 border-r border-grey-100 row-span-full flex flex-col gap-8 items-center pt-5 pl-2">
      <Filter />

      <SidebarSelectCurrency
        currency={currency}
        handleCurrencyChange={handleCurrencyChange}
      >
        <CiMoneyCheck1 className="h-6 w-6" />
      </SidebarSelectCurrency>

      <SidebarButton content="Wishlist" onClick={() => setOpenWishList(true)}>
        <FaHeart className="h-6 w-6" />
      </SidebarButton>
      <SidebarButton content="Cart" onClick={() => setOpenCardList(true)}>
        <IoCart className="h-6 w-6" />
      </SidebarButton>
      <SidebarButton content="Commands history" onClick={handleOrderHistory}>
        <BiAlbum className="h-6 w-6" />
      </SidebarButton>
    </div>
  );
}
