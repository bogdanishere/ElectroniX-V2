import { CiSearch } from "react-icons/ci";
import Logo from "./Logo";
import SearchBar from "./SearchBar";

export default function NavBar({ children }: { children: React.ReactNode }) {
  return (
    <nav className="bg-gray-50 shadow-md">
      <div className="grid grid-cols-1 md:grid-cols-[16rem_1fr] items-center">
        <div className="flex justify-center items-center mb-4 md:mb-0">
          <Logo />
        </div>

        <div className="flex flex-col md:flex-row items-center justify-center w-full">
          <div className="relative w-full max-w-full md:max-w-2xl">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
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
