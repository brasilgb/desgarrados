import { Link } from '@inertiajs/react'
import React from 'react'
import { IoLogInOutline } from "react-icons/io5"

type Props = {}

const ButtonNavbar = (props: Props) => {

  return (
    <Link
      href={route('admin')}
      className="flex items-center justify-between bg-primary-green transition duration-300 hover:bg-secundary-green px-5 py-2 rounded-full"
    >
      <span className="text-sm uppercase text-gray-50 ">Login</span> <IoLogInOutline size={24} className="ml-2 text-gray-50 "/>
    </Link>
  )
}

export default ButtonNavbar;