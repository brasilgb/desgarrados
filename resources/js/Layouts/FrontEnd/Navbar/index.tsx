import React, { useState } from "react";
import { Link, usePage } from "@inertiajs/react";
import NavLinks from "./NavLinks";
import { ButtonNavbar } from "@/Components/FrontEnd/Button";
import { IoClose, IoMenu } from "react-icons/io5";
import { IconContext } from "react-icons";
type Props = {}

const NavBar = (props: Props) => {
    const { setting } = usePage().props as any;
    const [open, setOpen] = useState(false);
    return (
        <nav className="bg-white z-10 border-b border-gray-200">
            <div className="container flex items-center font-medium justify-start mx-auto">
                <div className="md:pb-4 md:mr-4 md:w-auto flex items-center">
                    <div className="md:hidden" onClick={() => setOpen(!open)}>
                        <IconContext.Provider value={{ className: "text-3xl" }}>
                            <div className="absolute top-3 z-20 w-full">
                                {open ? <IoClose className="text-secundary-dark" /> : <IoMenu className="text-secundary-dark" />}
                            </div>
                        </IconContext.Provider>
                    </div>
                    <div className="ml-10 md:ml-0 mt-3 flex items-center justify-start">
                        <div className="h-10 w-10 mr-1 rounded-full bg-primary-red flex items-center justify-center">
                            <h1 className="text-3xl text-primary-light font-Courgette drop-shadow">D</h1>
                        </div>
                        <h1 className="text-3xl text-secundary-dark font-Courgette drop-shadow">Desgarrados</h1>
                        {/* {setting && <img src={`/storage/logo/${setting?.logo ? setting?.logo : 'default.png'}`} alt="logo" className="md:cursor-pointer h-9" />} */}
                    </div>
                </div>
                <ul className="md:flex flex-1 hidden items-center gap-8 font-Poppins">
                    <li>
                        <Link
                            href="/"
                            className="py-7 px-3 inline-block text-primary-red"
                        >
                            Home
                        </Link>
                    </li>
                    <NavLinks />
                </ul>
                <div className="md:block hidden">
                    <ButtonNavbar />
                </div>
                {/* Mobile Nav */}
                <ul className={`
                md:hidden bg-white absolute w-full h-full bottom-0 py-10 pl-4
                duration-500 ${open ? "left-0" : "left-[-100%] z-30"}
                `}>
                    <li>
                        <Link
                            href="/"
                            className="py-4 px-3 inline-block"
                        >
                            Home
                        </Link>
                    </li>
                    <NavLinks />
                    <div className="py-5">
                        <ButtonNavbar />
                    </div>
                </ul>
            </div>
        </nav>
    )
}

export default NavBar;