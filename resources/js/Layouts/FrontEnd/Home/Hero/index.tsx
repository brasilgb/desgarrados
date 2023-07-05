import React from 'react'

interface HeroProps {
  children: React.ReactNode;
}
// size image hero or slider => 1920×1080 or 1920×1200 px.
const Hero = ({ children }: HeroProps) => {
  return (
    <div className="bg-hero-image bg-cover bg-center h-[25rem] border-y border-white flex items-end justify-center ">
      <div className="bg-gradient-to-r from-transparent via-black to-transparent bg-opacity-150 py-8 w-full">
          {children}
      </div>
    </div>
  )
}

export default Hero;