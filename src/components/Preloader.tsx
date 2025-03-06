// preloader for api call or delay in app
import React from "react";

const Preloader: React.FC = () => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-white/10 backdrop-blur-[3px] shadow-lg z-50">
      <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-green-500"></div>
    </div>
  );
};

export default Preloader;
