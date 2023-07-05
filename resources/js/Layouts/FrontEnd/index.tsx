import React from 'react';
import NavBar from "./Navbar";

interface LayoutProps {
  children: React.ReactNode;
}

const LayoutFront = ({ children }: LayoutProps) => {
  return (
    <div className="flex flex-col min-h-screen justify-between font-Roboto">
      <NavBar />
      <div className="flex-grow bg-primary-light pb-10">
        {children}
      </div>
      <div className="bg-white border-t border-gray-300">fdfd</div>
    </div>
  )
}

export default LayoutFront;