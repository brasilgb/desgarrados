import React from 'react'
import { IconContext } from "react-icons";
import { IoPlay, IoPlayCircleOutline, IoPlayOutline } from "react-icons/io5";

type Props = {}

const SectionTwo = (props: Props) => {
  return (
    <div className="w-full py-8 bg-[#F3F4F6]">
      <div className="container mx-auto">
        <div className="flex flex-col items-center justify-start">
          <h1 className="text-3xl font-bold text-secundary-red flex-none mr-2 pb-2">Playlists recentes</h1>
          <h1 className="text-base font-bold text-secundary-dark flex-none mr-2">Clique no play e curta a música</h1>
          {/* <div className="h-2 w-full border-y border-t-primary-green border-b-primary-yellow" /> */}
        </div>
        <div className="container mx-auto md:grid md:grid-cols-4 gap-8 mt-8">

          <div className="h-[360px]">
            <div className="relative flex flex-col group rounded-2xl overflow-hidden z-0 h-full border border-white">
              <img src="/images/desgarrado.jpg" alt="" className="relative object-cover w-full h-full rounded-2xl" />
              <div className="absolute w-full h-full flex flex-col items-center justify-center hover:bg-[hsl(0,0%,98.4%,0.2)] hover:bg-[hsl(0,0%,98.4%,0.2)]">
                <div className="w-full flex flex-grow items-center justify-center">
                  <IconContext.Provider value={{ className: "text-secundary-light text-3xl" }} >
                    <div className="h-10 w-10 rounded-full flex items-center justify-center border border-secundary-light">
                      <IoPlayCircleOutline />
                    </div>
                  </IconContext.Provider>
                </div>
                <div className="w-full h-[115px] flex flex-col items-start justify-between p-4 bg-gradient-to-b from-transparent to-black">
                  <div className="w-full mb-3">
                    <span className="bg-red-200 px-2 py-1 rounded-full text-xs text-red-600 font-semibold">Categoria</span>
                  </div>
                  <div className="w-full">
                    <span className="text-lg text-white font-bold">Título</span>
                  </div>
                  <div className="w-full">
                    <span className="text-xs text-gray-50 font-semibold">Descrição</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="h-[360px]">
            <div className="relative flex flex-col group rounded-2xl overflow-hidden z-0 h-full border border-white">
              <img src="/images/desgarrado.jpg" alt="" className="relative object-cover w-full h-full rounded-2xl" />
              <div className="absolute w-full h-full flex flex-col items-center justify-center hover:bg-[hsl(0,0%,98.4%,0.2)] hover:bg-[hsl(0,0%,98.4%,0.2)]">
                <div className="w-full flex flex-grow items-center justify-center">
                  <IconContext.Provider value={{ className: "text-secundary-light text-3xl" }} >
                    <div className="h-10 w-10 rounded-full flex items-center justify-center border border-secundary-light">
                      <IoPlayCircleOutline />
                    </div>
                  </IconContext.Provider>
                </div>
                <div className="w-full h-[115px] flex flex-col items-start justify-between p-4 bg-gradient-to-b from-transparent to-black">
                  <div className="w-full mb-3">
                    <span className="bg-red-200 px-2 py-1 rounded-full text-xs text-red-600 font-semibold">Categoria</span>
                  </div>
                  <div className="w-full">
                    <span className="text-lg text-white font-bold">Título</span>
                  </div>
                  <div className="w-full">
                    <span className="text-xs text-gray-50 font-semibold">Descrição</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="h-[360px]">
            <div className="relative flex flex-col group rounded-2xl overflow-hidden z-0 h-full border border-white">
              <img src="/images/desgarrado.jpg" alt="" className="relative object-cover w-full h-full rounded-2xl" />
              <div className="absolute w-full h-full flex flex-col items-center justify-center hover:bg-[hsl(0,0%,98.4%,0.2)] hover:bg-[hsl(0,0%,98.4%,0.2)]">
                <div className="w-full flex flex-grow items-center justify-center">
                  <IconContext.Provider value={{ className: "text-secundary-light text-3xl" }} >
                    <div className="h-10 w-10 rounded-full flex items-center justify-center border border-secundary-light">
                      <IoPlayCircleOutline />
                    </div>
                  </IconContext.Provider>
                </div>
                <div className="w-full h-[115px] flex flex-col items-start justify-between p-4 bg-gradient-to-b from-transparent to-black">
                  <div className="w-full mb-3">
                    <span className="bg-red-200 px-2 py-1 rounded-full text-xs text-red-600 font-semibold">Categoria</span>
                  </div>
                  <div className="w-full">
                    <span className="text-lg text-white font-bold">Título</span>
                  </div>
                  <div className="w-full">
                    <span className="text-xs text-gray-50 font-semibold">Descrição</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="h-[360px]">
            <div className="relative flex flex-col group rounded-2xl overflow-hidden z-0 h-full border border-white">
              <img src="/images/desgarrado.jpg" alt="" className="relative object-cover w-full h-full rounded-2xl" />
              <div className="absolute w-full h-full flex flex-col items-center justify-center hover:bg-[hsl(0,0%,98.4%,0.2)] hover:bg-[hsl(0,0%,98.4%,0.2)]">
                <div className="w-full flex flex-grow items-center justify-center">
                  <IconContext.Provider value={{ className: "text-secundary-light text-3xl" }} >
                    <div className="h-10 w-10 rounded-full flex items-center justify-center border border-secundary-light">
                      <IoPlayCircleOutline />
                    </div>
                  </IconContext.Provider>
                </div>
                <div className="w-full h-[115px] flex flex-col items-start justify-between p-4 bg-gradient-to-b from-transparent to-black">
                  <div className="w-full mb-3">
                    <span className="bg-red-200 px-2 py-1 rounded-full text-xs text-red-600 font-semibold">Categoria</span>
                  </div>
                  <div className="w-full">
                    <span className="text-lg text-white font-bold">Título</span>
                  </div>
                  <div className="w-full">
                    <span className="text-xs text-gray-50 font-semibold">Descrição</span>
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