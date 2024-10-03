"use client";

import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import { createPortal } from "react-dom";
import { FaXmark } from "react-icons/fa6";
import { FiMinus } from "react-icons/fi";

import { FaPlus } from "react-icons/fa6";
import { FaTrash } from "react-icons/fa";
import { convertAmount, formatCurrency } from "@/helpers/formatCurrency";

import Button from "@/utils/Button";
import { usePathname, useRouter } from "next/navigation";

import { useActualCurrency } from "@/hooks/useActualCurrency";
import StarRating from "@/utils/StarRating";
import { postReview, updateProfile } from "../_lib/actions";
import Image from "next/image";

interface ModalContextType {
  isOpen: boolean;
  close: () => void;
}

interface ProductProps {
  id: string;
  name: string;
  provider: string;
  price: string;
  quantity: number;
}

interface FavoriteProps {
  id: string;
  name: string;
  provider: string;
  price: string;
}

const ModalContext = createContext<ModalContextType | undefined>(undefined);

function useOutsideClick(handler: () => void, listenCapturing = true) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) handler();
    }
    document.addEventListener("click", handleClick, listenCapturing);

    return () =>
      document.removeEventListener("click", handleClick, listenCapturing);
  }, [handler, listenCapturing]);

  return ref;
}

function Modal({
  children,
  isOpen,
  onClose,
}: {
  children: ReactNode;
  isOpen: boolean;
  onClose: () => void;
}) {
  return (
    <ModalContext.Provider value={{ isOpen, close: onClose }}>
      {children}
    </ModalContext.Provider>
  );
}

function Window({ children }: { children: ReactNode }) {
  const { isOpen, close } = useContext(ModalContext)!;
  const ref = useOutsideClick(close);

  return isOpen
    ? createPortal(
        <div className="fixed inset-0 bg-gray-900 bg-opacity-50 backdrop-blur-sm z-50 transition-all">
          <div
            ref={ref}
            className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white rounded-lg shadow-lg p-8 transition-all"
          >
            <div className="flex justify-end pb-8">
              <Button onClick={close}>
                <FaXmark />
              </Button>
            </div>
            {children}
          </div>
        </div>,
        document.body
      )
    : null;
}

function Products() {
  const router = useRouter();
  const [products, setProducts] = useState<ProductProps[]>(
    JSON.parse(localStorage.getItem("cartProducts") || "[]")
  );

  const [convertedPrice, setConvertedPrice] = useState<number>(0);
  const { currency: actualCurrency } = useActualCurrency();

  useEffect(() => {
    if (products.length > 0) {
      const sumProducts = products
        .reduce(
          (acc, currValue) =>
            acc + Number(currValue.price) * Number(currValue.quantity),
          0
        )
        .toFixed(2);

      convertAmount(Number(sumProducts), "USD", actualCurrency).then(
        (result) => {
          if (result !== null) setConvertedPrice(result);
        }
      );
    } else {
      setConvertedPrice(0);
    }
  }, [products, actualCurrency]);

  const handleIncrement = (id: string) => {
    const updatedCart = products.map((product) =>
      product.id === id
        ? { ...product, quantity: product.quantity + 1 }
        : product
    );
    setProducts(updatedCart);
    localStorage.setItem("cartProducts", JSON.stringify(updatedCart));
  };

  const handleDecrement = (id: string) => {
    const updatedCart = products.reduce((acc, product) => {
      if (product.id === id) {
        if (product.quantity > 1) {
          return [...acc, { ...product, quantity: product.quantity - 1 }];
        }
        return acc;
      } else {
        return [...acc, product];
      }
    }, [] as ProductProps[]);
    setProducts(updatedCart);
    localStorage.setItem("cartProducts", JSON.stringify(updatedCart));
  };

  const handleDelete = (id: string) => {
    const updatedCart = products.filter((product) => product.id !== id);
    setProducts(updatedCart);
    localStorage.setItem("cartProducts", JSON.stringify(updatedCart));
  };

  const { close } = useContext(ModalContext)!;

  const handleCommand = () => {
    close();
    router.push("/address");
  };

  if (products.length === 0)
    return <span className="text-gray-500">Nu ati selectat niciun produs</span>;

  const handleNavigateToProduct = (id: string) => {
    close();
    router.push(`/product/${id}`);
  };

  return (
    <>
      <ul className="list-none m-0 p-0">
        {products.map((product: ProductProps) => (
          <li
            key={product.id}
            className="flex items-center justify-between mb-4 p-2 shadow-md rounded-md gap-8"
          >
            <span className="font-bold">{product.quantity}x</span>
            <span
              className="cursor-pointer"
              onClick={() => handleNavigateToProduct(product.id)}
            >
              {product.name.slice(0, 45)}
            </span>
            <div className="ml-auto flex space-x-2">
              <Button onClick={() => handleDecrement(product.id)}>
                <FiMinus />
              </Button>
              <Button onClick={() => handleIncrement(product.id)}>
                <FaPlus />
              </Button>
              <Button onClick={() => handleDelete(product.id)}>
                <FaTrash />
              </Button>
            </div>
          </li>
        ))}
      </ul>
      <div className="flex justify-between items-center pt-8">
        <div>Price: {formatCurrency(convertedPrice, actualCurrency)}</div>
        <Button onClick={handleCommand}>Open Cart</Button>
      </div>
    </>
  );
}

function Wishies() {
  const router = useRouter();
  const { close } = useContext(ModalContext)!;
  const [wishies, setWishies] = useState<FavoriteProps[]>(
    JSON.parse(localStorage.getItem("wishlistProducts") || "[]")
  );

  const handleDelete = (id: string) => {
    const updatedWishies = wishies.filter((product) => product.id !== id);
    setWishies(updatedWishies);
    localStorage.setItem("wishlistProducts", JSON.stringify(updatedWishies));
  };

  const handleNavigateToProduct = (id: string) => {
    close();
    router.push(`/product/${id}`);
  };

  if (wishies.length === 0) return <div>Nu ati selectat niciun produs</div>;
  return (
    <>
      <h1 className="text-xl font-bold">Produsele favorite</h1>
      <ul className="list-none m-0 p-0">
        {wishies.map((product) => (
          <li
            key={product.id}
            className="flex items-center justify-between mb-4 p-2 shadow-md rounded-md"
          >
            <span
              className="cursor-pointer"
              onClick={() => handleNavigateToProduct(product.id)}
            >
              {product.name.slice(0, 50)}
            </span>
            <Button onClick={() => handleDelete(product.id)}>
              <FaTrash />
            </Button>
          </li>
        ))}
      </ul>
    </>
  );
}

function ModifyProfilePicture() {
  const { close } = useContext(ModalContext)!;
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  function handleImageChange(event: React.ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];
    if (file) {
      setImageFile(file);
      setImagePreview(URL.createObjectURL(file));
    }
  }

  async function handleSave() {
    if (!imageFile) return;

    const formData = new FormData();
    formData.append("image_profile", imageFile);

    await updateProfile(formData);
    close();
  }

  return (
    <div className="flex flex-col items-center gap-6 p-6 bg-background rounded-lg shadow-md max-w-md mx-auto">
      <h1 className="text-3xl font-bold text-foreground">
        Modify your profile picture
      </h1>
      <div>You cannot send something else</div>
      <div className="w-full">
        <label
          htmlFor="file-upload"
          className="flex flex-col items-center justify-center px-4 py-6 bg-background text-primary rounded-lg shadow-lg tracking-wide uppercase border border-primary cursor-pointer hover:bg-primary hover:text-primary-foreground transition-colors duration-300"
        >
          <span className="mt-2 text-base leading-normal">Select a file</span>
          <input
            id="file-upload"
            type="file"
            className="hidden"
            onChange={handleImageChange}
          />
        </label>
      </div>
      {imagePreview && (
        <div className="relative w-40 h-40 rounded-full overflow-hidden border-4 border-primary shadow-lg">
          <Image
            src={imagePreview}
            alt="Profile Preview"
            layout="fill"
            objectFit="cover"
          />
        </div>
      )}
      <Button onClick={handleSave}>Save the change</Button>
    </div>
  );
}

function AddReview() {
  const pathname = usePathname();

  const productID = pathname.split("/").pop();

  const { close } = useContext(ModalContext)!;
  const [valueInput, setValueInput] = useState("");
  const [valueTextarea, setValueTextarea] = useState("");
  const [reviewStar, setReviewStar] = useState(0);

  if (!productID) {
    throw new Error("Product id is missing");
  }

  async function handleSendReview() {
    const review = {
      productID: productID as string,
      title: valueInput,
      review: valueTextarea,
      rating: reviewStar,
    };

    await postReview(review);

    close();
  }

  return (
    <div className="flex flex-col gap-4">
      <h1 className="text-2xl font-bold">Adauga un review pentru:</h1>
      <h2 className="text-xl font-semibold">Product Name</h2>
      <StarRating
        size={32}
        defaultRating={Number(reviewStar)}
        color={"#3b82f6"}
        onSetRatingHandle={(rating) => setReviewStar(rating)}
      />
      <div className="flex flex-col gap-2">
        <h3 className="font-semibold">Titlu review:</h3>
        <input
          type="text"
          placeholder="Foloseste o sugestie sau scrie propriul titlu"
          className="w-full p-2 rounded-md border border-gray-300"
          value={valueInput}
          onChange={(e) => setValueInput(e.target.value)}
        />
      </div>
      <div className="flex space-x-2">
        <Button onClick={() => setValueInput("Multumit")}>Multumit</Button>
        <Button onClick={() => setValueInput("Imi place")}>Imi place</Button>
        <Button onClick={() => setValueInput("Merita")}>Merita</Button>
        <Button onClick={() => setValueInput("Bun")}>Bun</Button>
        <Button onClick={() => setValueInput("Rezonabil")}>Rezonabil</Button>
      </div>
      <textarea
        rows={4}
        className="w-full text-lg p-4 border border-gray-300 rounded-md"
        value={valueTextarea}
        onChange={(e) => setValueTextarea(e.target.value)}
      />
      <div className="flex justify-between">
        <Button onClick={handleSendReview}>Adauga review</Button>
      </div>
    </div>
  );
}

Modal.Window = Window;
Modal.Products = Products;
Modal.Wishies = Wishies;
Modal.AddReview = AddReview;
Modal.ModifyProfilePicture = ModifyProfilePicture;

export default Modal;
