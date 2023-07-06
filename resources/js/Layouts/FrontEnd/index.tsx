import React from 'react';
import NavBar from "./Navbar";
import Footer from './Footer';

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
      <Footer />
    </div>
  )
}

export default LayoutFront;