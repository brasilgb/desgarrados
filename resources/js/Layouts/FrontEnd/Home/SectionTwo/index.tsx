import { Link } from "@inertiajs/react";
import React from 'react'
import { IconContext } from "react-icons";
import { IoArrowForwardCircle, IoPlay, IoPlayCircleOutline, IoPlayOutline } from "react-icons/io5";

type Props = {}

const SectionTwo = (props: Props) => {
  return (
    <div className="w-full py-8 bg-section-two">
      <div className="container mx-auto">
        <div className="flex flex-col items-start justify-start">
          <h1 className="text-3xl font-bold text-secundary-yellow flex-none mr-2 pb-2">Galerias recentes</h1>
          <Link href="" className="flex items-center text-base font-bold text-secundary-dark hover:text-[#5d6064] transition duration-300  flex-none mr-2">
            <span className="mr-2">Todas as galerias</span><IoArrowForwardCircle />
          </Link>
          {/* <div className="h-2 w-full border-y border-t-primary-green border-b-primary-yellow" /> */}
        </div>

        <div className="grid grid-cols-3 gap-8 mt-8">

          <div className="border border-primary-light block group hover:bg-[hsl(0,0%,98.4%,0.2)] rounded-3xl flex-shrink-0 relative w-full aspect-w-16 aspect-h-16 sm:aspect-h-9 overflow-hidden z-0">
            <div>
              <Link href="#" className="absolute inset-0 bg-neutral-900 bg-opacity-20 opacity-0 group-hover:opacity-100 transition-opacity"></Link>
              <div className="absolute w-full top-4 pl-4">
                <Link href="" className="bg-secundary-yellow px-2 py-1 rounded-full text-xs text-primary-dark font-semibold">Categoria</Link>
              </div>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-2 bg-white group rounded-lg">
                <div className="grid gap-2">
                  <div className="h-40">
                    <img className="h-full w-full object-cover" src="/photos/foto1.jpg" alt="" />
                  </div>
                  <div className="h-40">
                    <img className="h-full w-full object-cover" src="/photos/foto2.jpg" alt="" />
                  </div>
                  <div className="h-24">
                    <img className="h-full w-full object-cover" src="/photos/foto3.jpg" alt="" />
                  </div>
                </div>
                <div className="grid gap-2">
                  <div className="h-40">
                    <img className="h-full w-full object-cover" src="/photos/foto4.jpg" alt="" />
                  </div>
                  <div className="h-24">
                    <img className="h-full w-full object-cover" src="/photos/foto5.jpg" alt="" />
                  </div>
                  <div className="h-40">
                    <img className="h-full w-full object-cover" src="/photos/foto6.jpg" alt="" />
                  </div>
                </div>
                <div className="grid gap-2">
                  <div className="h-40">
                    <img className="h-full w-full object-cover" src="/photos/foto7.jpg" alt="" />
                  </div>
                  <div className="h-40">
                    <img className="h-full w-full object-cover" src="/photos/foto8.jpg" alt="" />
                  </div>
                  <div className="h-24">
                    <img className="h-full w-full object-cover" src="/photos/foto9.jpg" alt="" />
                  </div>
                </div>
                <div className="grid gap-2">
                  <div className="h-40">
                    <img className="h-full w-full object-cover" src="/photos/foto10.jpg" alt="" />
                  </div>
                  <div className="h-24">
                    <img className="h-full w-full object-cover" src="/photos/foto11.jpg" alt="" />
                  </div>
                  <div className="h-40">
                    <img className="h-full w-full object-cover" src="/photos/foto12.jpg" alt="" />
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="border border-primary-light block group hover:bg-[hsl(0,0%,98.4%,0.2)] rounded-3xl flex-shrink-0 relative w-full aspect-w-16 aspect-h-16 sm:aspect-h-9 overflow-hidden z-0">
            <div>
              <Link href="#" className="absolute inset-0 bg-neutral-900 bg-opacity-20 opacity-0 group-hover:opacity-100 transition-opacity"></Link>
              <div className="absolute w-full top-4 pl-4">
                <Link href="" className="bg-secundary-yellow px-2 py-1 rounded-full text-xs text-primary-dark font-semibold">Categoria</Link>
              </div>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-2 bg-white group rounded-lg">
                <div className="grid gap-2">
                  <div className="h-40">
                    <img className="h-full w-full object-cover" src="/photos/foto1.jpg" alt="" />
                  </div>
                  <div className="h-40">
                    <img className="h-full w-full object-cover" src="/photos/foto2.jpg" alt="" />
                  </div>
                  <div className="h-24">
                    <img className="h-full w-full object-cover" src="/photos/foto3.jpg" alt="" />
                  </div>
                </div>
                <div className="grid gap-2">
                  <div className="h-40">
                    <img className="h-full w-full object-cover" src="/photos/foto4.jpg" alt="" />
                  </div>
                  <div className="h-24">
                    <img className="h-full w-full object-cover" src="/photos/foto5.jpg" alt="" />
                  </div>
                  <div className="h-40">
                    <img className="h-full w-full object-cover" src="/photos/foto6.jpg" alt="" />
                  </div>
                </div>
                <div className="grid gap-2">
                  <div className="h-40">
                    <img className="h-full w-full object-cover" src="/photos/foto7.jpg" alt="" />
                  </div>
                  <div className="h-40">
                    <img className="h-full w-full object-cover" src="/photos/foto8.jpg" alt="" />
                  </div>
                  <div className="h-24">
                    <img className="h-full w-full object-cover" src="/photos/foto9.jpg" alt="" />
                  </div>
                </div>
                <div className="grid gap-2">
                  <div className="h-40">
                    <img className="h-full w-full object-cover" src="/photos/foto10.jpg" alt="" />
                  </div>
                  <div className="h-24">
                    <img className="h-full w-full object-cover" src="/photos/foto11.jpg" alt="" />
                  </div>
                  <div className="h-40">
                    <img className="h-full w-full object-cover" src="/photos/foto12.jpg" alt="" />
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="border border-primary-light block group hover:bg-[hsl(0,0%,98.4%,0.2)] rounded-3xl flex-shrink-0 relative w-full aspect-w-16 aspect-h-16 sm:aspect-h-9 overflow-hidden z-0">
            <div>
              <Link href="#" className="absolute inset-0 bg-neutral-900 bg-opacity-20 opacity-0 group-hover:opacity-100 transition-opacity"></Link>
              <div className="absolute w-full top-4 pl-4">
                <Link href="" className="bg-secundary-yellow px-2 py-1 rounded-full text-xs text-primary-dark font-semibold">Categoria</Link>
              </div>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-2 bg-white group rounded-lg">
                <div className="grid gap-2">
                  <div className="h-40">
                    <img className="h-full w-full object-cover" src="/photos/foto1.jpg" alt="" />
                  </div>
                  <div className="h-40">
                    <img className="h-full w-full object-cover" src="/photos/foto2.jpg" alt="" />
                  </div>
                  <div className="h-24">
                    <img className="h-full w-full object-cover" src="/photos/foto3.jpg" alt="" />
                  </div>
                </div>
                <div className="grid gap-2">
                  <div className="h-40">
                    <img className="h-full w-full object-cover" src="/photos/foto4.jpg" alt="" />
                  </div>
                  <div className="h-24">
                    <img className="h-full w-full object-cover" src="/photos/foto5.jpg" alt="" />
                  </div>
                  <div className="h-40">
                    <img className="h-full w-full object-cover" src="/photos/foto6.jpg" alt="" />
                  </div>
                </div>
                <div className="grid gap-2">
                  <div className="h-40">
                    <img className="h-full w-full object-cover" src="/photos/foto7.jpg" alt="" />
                  </div>
                  <div className="h-40">
                    <img className="h-full w-full object-cover" src="/photos/foto8.jpg" alt="" />
                  </div>
                  <div className="h-24">
                    <img className="h-full w-full object-cover" src="/photos/foto9.jpg" alt="" />
                  </div>
                </div>
                <div className="grid gap-2">
                  <div className="h-40">
                    <img className="h-full w-full object-cover" src="/photos/foto10.jpg" alt="" />
                  </div>
                  <div className="h-24">
                    <img className="h-full w-full object-cover" src="/photos/foto11.jpg" alt="" />
                  </div>
                  <div className="h-40">
                    <img className="h-full w-full object-cover" src="/photos/foto12.jpg" alt="" />
                  </div>
                </div>
              </div>
            </div>
          </div>

        </div>

      </div>
    </div>
  )
}

export default SectionTwo;