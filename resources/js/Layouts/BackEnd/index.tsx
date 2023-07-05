import React from 'react';
import Footer from "./Footer";
import Sidebar from "./Sidebar";
import Topbar from "./Topbar";

interface LayoutProps {
  children: React.ReactNode;
}

const LayoutBack = ({ children }: LayoutProps) => {
  return (
    <div className="flex flex-row min-h-screen font-Roboto">
      <div className="shadow-lg z-20 md:pr-64 pr-0">
        <Sidebar />
      </div>
      <div className="flex flex-col w-full">
        <Topbar />
        <div className="flex-grow">
          {children}
        </div>
        <Footer />
      </div>

    </div>
  )
}

export default LayoutBack;