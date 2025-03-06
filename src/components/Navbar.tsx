// navigation coom bar

import { FiChevronDown } from "react-icons/fi";

const Navbar = () => {
  return (
    <header className="h-[90px] flex items-center justify-between bg-white border-b border-gray-200 px-[24px] py-[30px] shadow-[-2px_2px_6px_0px_rgba(0,_0,_0,_0.1)]">
      <div className="flex items-center space-x-2"></div>
      <div className="mx-4 text-center rounded-md">
        <h1 className="text-[20px] font-semibold text-gray-800">
          Data Viewer App
        </h1>
      </div>
      <div className="flex items-center space-x-4">
        <div className="flex items-center space-x-3">
          <div className="w-[40px] h-[40px] bg-[rgba(196,196,196,1)] rounded-full flex items-center justify-center text-white font-medium">
            SA
          </div>
          <div className="flex flex-col">
            <span className="text-[16px] font-semibold leading-[26px] text-[#1D1D1D]">
              Shiraj Ahmed
            </span>
          </div>
          <FiChevronDown />
        </div>
      </div>
    </header>
  );
};

export default Navbar;
