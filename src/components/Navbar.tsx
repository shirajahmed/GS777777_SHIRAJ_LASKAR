// navigation coom bar

import { useState } from "react";
import { FiChevronDown } from "react-icons/fi";
import { useAuth } from "../hookss/AuthContext";
import toast from "react-hot-toast";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { user, logout } = useAuth();

  const handleLogout = () => {
    setIsOpen(false);
    logout();
    toast.success("LogOut successful!");
  };

  return (
    <header className="h-[90px] flex items-center relative justify-between bg-white border-b border-gray-200 px-[24px] py-[30px] shadow-[-2px_2px_6px_0px_rgba(0,_0,_0,_0.1)]">
      <div className="flex items-center space-x-2"></div>
      <div className="mx-4 text-center rounded-md">
        <h1 className="text-[20px] font-semibold text-gray-800">
          Data Viewer App
        </h1>
      </div>
      <div className="flex  items-center space-x-4">
        {user && (
          <div className="flex  items-center space-x-3">
            <div className="w-[40px] h-[40px] bg-[rgba(196,196,196,1)] rounded-full flex items-center justify-center text-white font-medium">
              {user?.name[0]}
            </div>
            <div className="flex flex-col">
              <span className="text-[16px] font-semibold leading-[26px] text-[#1D1D1D]">
                {user?.name}
              </span>
            </div>
            <FiChevronDown
              className="space-x-3 cursor-pointer"
              onClick={() => setIsOpen(!isOpen)}
            />
          </div>
        )}
      </div>
      {isOpen && (
        <div className="absolute right-[20px] top-[65px]  bg-white shadow-lg rounded-lg">
          <button
            className="px-4 py-2 text-right text-red-600 bg-gray-100 hover:bg-gray-200 rounded-lg cursor-pointer"
            onClick={handleLogout}
          >
            Logout
          </button>
        </div>
      )}
    </header>
  );
};

export default Navbar;
