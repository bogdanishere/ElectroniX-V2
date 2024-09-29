"use client";

import { useButtonsFunctionality } from "@/hooks/useButtonsFunctionality";
import Modal from "./Modal";

export function ButtonsFunctionality() {
  const {
    openCardList,
    openWishList,
    setOpenCardList,
    setOpenWishList,
    openReview,
    setOpenReview,
  } = useButtonsFunctionality();

  const toggleShopping = () => setOpenCardList(!openCardList);
  const toggleWishies = () => setOpenWishList(!openWishList);
  const toggleReview = () => setOpenReview(!openReview);

  return (
    <>
      <Modal isOpen={openWishList} onClose={toggleWishies}>
        <Modal.Window>
          <Modal.Wishies />
        </Modal.Window>
      </Modal>

      <Modal isOpen={openCardList} onClose={toggleShopping}>
        <Modal.Window>
          <Modal.Products />
        </Modal.Window>
      </Modal>

      <Modal isOpen={openReview} onClose={toggleReview}>
        <Modal.Window>
          <Modal.AddReview />
        </Modal.Window>
      </Modal>
    </>
  );
}
