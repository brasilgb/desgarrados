import React from "react";

interface BoxProps {
    children: React.ReactNode;
    className?: string;
}

export const ABoxAll = ({ children }:BoxProps) => {
    return (
      <div className="md:mx-6 mx-2 md:mb-6 mb-2 shadow bg-aque-light border-2 border-white rounded-md">
          {children}
      </div>
    )
  };
  
export const ABoxHeader = ({ children }:BoxProps) => {
    return (
      <div className="flex items-center justify-between bg-gray-100 border-b-2 border-white rounded-t-md">
          {children}
      </div>
    )
  };

  export const ABoxBody = ({ children, className }:BoxProps) => {
    return (
      <div className={`${className}`}>
          {children}
      </div>
    )
  };
  
export const ABoxFooter = ({ children }:BoxProps) => {
    return (
      <div className="flex items-center justify-center bg-gray-100 border-t-2 border-white rounded-b-md">
          {children}
      </div>
    )
  };