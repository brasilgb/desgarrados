import { Link } from '@inertiajs/react';
import React from 'react';
import { SlPlaylist } from "react-icons/sl";

type Props = {}

const ButtonsHero = (props: Props) => {
  return (
    <div className="container m-auto flex items-center justify-center gap-4">
      <Link
        href={route('/')}
      >
        <div className="bg-gray-50 w-28 h-28 rounded border border-white shadow-lg flex flex-col items-center justify-center hover:-translate-y-1 transition duration-300">
          {/* <SlPlaylist size={40} className="text-primary-yellow py-2" /> */}
          <img src={'/icones/musica.png'} className="h-12" />
          <h1 className="text-base text-gray-500 py-2">Música</h1>
        </div>
      </Link>
      <Link
        href={route('/')}
      >
        <div className="bg-gray-50 w-28 h-28 rounded border border-white shadow-lg flex flex-col items-center justify-center hover:-translate-y-1 transition duration-300">
          {/* <SlPlaylist size={40} className="text-primary-yellow py-2" /> */}
          <img src={'/icones/galeria.png'} alt="" className="h-12" />
          <h1 className="text-base text-gray-500 py-2">Imagens</h1>
        </div>
      </Link>
      <Link
        href={route('/')}
      >
        <div className="bg-gray-50 w-28 h-28 rounded border border-white shadow-lg flex flex-col items-center justify-center hover:-translate-y-1 transition duration-300">
          {/* <SlPlaylist size={40} className="text-primary-yellow py-2" /> */}
          <img src={'/icones/poema.png'} alt="" className="h-12" />
          <h1 className="text-base text-gray-500 py-2">Poesia</h1>
        </div>
      </Link>
      <Link
        href={route('/')}
      >
        <div className="bg-gray-50 w-28 h-28 rounded border border-white shadow-lg flex flex-col items-center justify-center hover:-translate-y-1 transition duration-300">
          {/* <SlPlaylist size={40} className="text-primary-yellow py-2" /> */}
          <img src={'/icones/historia.png'} alt="" className="h-12" />
          <h1 className="text-base text-gray-500 py-2">História</h1>
        </div>
      </Link>
      <Link
        href={route('/')}
      >
        <div className="bg-gray-50 w-28 h-28 rounded border border-white shadow-lg flex flex-col items-center justify-center hover:-translate-y-1 transition duration-300">
          {/* <SlPlaylist size={40} className="text-primary-yellow py-2" /> */}
          <img src={'/icones/lendas.png'} alt="" className="h-12" />
          <h1 className="text-base text-gray-500 py-2">Lendas</h1>
        </div>
      </Link>
      <Link
        href={route('/')}
      >
        <div className="bg-gray-50 w-28 h-28 rounded border border-white shadow-lg flex flex-col items-center justify-center hover:-translate-y-1 transition duration-300">
          {/* <SlPlaylist size={40} className="text-primary-yellow py-2" /> */}
          <img src={'/icones/boia.png'} alt="" className="h-12" />
          <h1 className="text-base text-gray-500 py-2">Gastronomia</h1>
        </div>
      </Link>
      <Link
        href={route('/')}
      >
        <div className="bg-gray-50 w-28 h-28 rounded border border-white shadow-lg flex flex-col items-center justify-center hover:-translate-y-1 transition duration-300">
          {/* <SlPlaylist size={40} className="text-primary-yellow py-2" /> */}
          <img src={'/icones/trago.png'} alt="" className="h-12" />
          <h1 className="text-base text-gray-500 py-2">Bebidas</h1>
        </div>
      </Link>
      <Link
        href={route('/')}
      >
        <div className="bg-gray-50 w-28 h-28 rounded border border-white shadow-lg flex flex-col items-center justify-center hover:-translate-y-1 transition duration-300">
          {/* <SlPlaylist size={40} className="text-primary-yellow py-2" /> */}
          <img src={'/icones/bolicho.png'} alt="" className="h-12" />
          <h1 className="text-base text-gray-500 py-2">Bolicho</h1>
        </div>
      </Link>
    </div>
  )
}

export default ButtonsHero;