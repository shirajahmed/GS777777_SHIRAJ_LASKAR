// sidebar of app

import { ReactNode, useState } from "react";
import logo from "../assets/logo.svg";
import {
  FiBarChart2,
  FiCalendar,
  FiChevronLeft,
  FiHome,
  FiLayers,
} from "react-icons/fi";
import { Link, useLocation } from "react-router-dom";
import { useAuth } from "../hookss/AuthContext";

interface MenuItem {
  name: string;
  icon: ReactNode;
  href?: string;
}

const menuItems: MenuItem[] = [
  { name: "Stores", href: "/", icon: <FiHome /> },
  { name: "SKU", href: "/skus", icon: <FiLayers /> },
  { name: "Planning", href: "/planning", icon: <FiCalendar /> },
  { name: "Charts", href: "/chart", icon: <FiBarChart2 /> },
];

const Sidebar = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState<boolean>(true);
  const location = useLocation();
  const { user } = useAuth();
  return (
    <aside
      className={`${
        isSidebarOpen ? "w-[200px]" : "w-16"
      } flex flex-col relative transition-all duration-300 `}
    >
      <div
        className={`${
          isSidebarOpen ? "w-[200px]" : "w-16"
        } h-[90px] bg-[#ffffff] relative px-[24px] py-[30px] flex items-center`}
      >
        {isSidebarOpen ? (
          <img src={logo} alt="Logo" className="w-[166px]" />
        ) : (
          <span className="text-2xl font-bold tracking-wide">G</span>
        )}
        {user && (
          <div
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            className="absolute cursor-pointer top-1/2 transform -translate-y-1/2 right-0 h-[36px] w-[14px] bg-[#f3f4f6] rounded-l-md flex items-center justify-center"
          >
            <FiChevronLeft
              className={`w-4 h-4 transform ${!isSidebarOpen ? "rotate-180" : ""}`}
            />
          </div>
        )}
      </div>
      {user && (
        <nav
          className={`flex-1 flex flex-col ${
            isSidebarOpen ? "py-[20px] px-[0]" : "py-[15px] px-[0]"
          } bg-white`}
        >
          {menuItems.map((item, idx) => (
            <Link
              key={idx}
              to={item.href || "#"}
              className={`flex items-center pl-[20px] space-x-3 p-2 hover:bg-[#f3f4f6] text-[#202020] ${
                location.pathname === item.href ? "bg-[#f3f4f6]" : ""
              }`}
            >
              {item.icon}

              {isSidebarOpen && (
                <span className="text-[16px] font-normal leading-[26px]">
                  {item.name}
                </span>
              )}
            </Link>
          ))}
        </nav>
      )}
    </aside>
  );
};

export default Sidebar;
