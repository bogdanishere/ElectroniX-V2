"use client";

import { createContext, ReactNode, useState } from "react";

interface ButtonsFunctionalityContextType {
  openCardList: boolean;
  setOpenCardList: (value: boolean) => void;
  openWishList: boolean;
  setOpenWishList: (value: boolean) => void;
  openReview: boolean;



  setOpenReview: (value: boolean) => void;
}

export const ButtonsFunctionalityContext = createContext<
  ButtonsFunctionalityContextType | undefined
>(undefined);

export default function ButtonsFunctionalityProvider({
  children,
}: {
  children: ReactNode;
}) {
  const [openWishList, setOpenWishList] = useState(false);
  const [openCardList, setOpenCardList] = useState(false);
  const [openReview, setOpenReview] = useState(false);
  return (
    <ButtonsFunctionalityContext.Provider
      value={{
        openCardList,
        setOpenCardList,
        openWishList,
        setOpenWishList,
        openReview,
        setOpenReview,
      }}
    >
      {children}
    </ButtonsFunctionalityContext.Provider>
  );
}
