import { CiSearch } from "react-icons/ci";
import Logo from "./Logo";
import SearchBar from "./SearchBar";

export default function NavBar({ children }: { children: React.ReactNode }) {
  return (
    <nav className="bg-gray-50 shadow-md h-20">
      <div className="grid grid-cols-[16rem_1fr] h-16 items-center">
        <div className="flex justify-center items-center">
          <Logo />
        </div>

        <div className="flex items-center justify-center">
          <div className="relative w-full max-w-2xl pl-5">
            <div className="absolute inset-y-0 pl-3 flex items-center pointer-events-none">
              <CiSearch className="h-5 w-5 text-gray-400" aria-hidden="true" />
            </div>
            <SearchBar />
          </div>

          {children}
        </div>
      </div>
    </nav>
  );
}
