import { Link } from "@inertiajs/react";
import React, { useState } from "react";
import { IoChevronDown, IoChevronUp } from "react-icons/io5";
import { links } from "./Links";

type Props = {}

const NavLinks = (props: Props) => {
    const [heading, setHeading] = useState("");
    const [subHeading, setSubHeading] = useState("");
    return <>
        {
            links.map((link, lindex) => (
                <div key={lindex}>
                    <div className="px-3 text-left md:cursor-pointer group">
                        <h1 className="py-7 flex justify-between items-center md:pr-0 pr-5 group md:text-secundary-dark hover:text-gray-400"
                            onClick={() => { heading !== link.name ? setHeading(link.name) : setHeading(""); setSubHeading(""); }}>
                            {link.name}
                            <span className="text-xl md:hidden inline">
                                {heading === link.name ? <IoChevronUp /> : <IoChevronDown />}
                            </span>
                            <span className="text-base md:mt-1 md:ml-2 md:block hidden group-hover:rotate-180 duration-500 group-hover:-mt-0">
                                <IoChevronDown />
                            </span>
                        </h1>
                        {link.submenu && (
                            <div>
                                <div className="absolute top-[85px] transform scale-0 group-hover:scale-100 transition duration-150 ease-in-out origin-top min-w-32">
                                    <div className="bg-gray-50 p-5 grid grid-cols-3 gap-10 shadow rounded-md border-2 border-white">
                                        {
                                            link.sublinks.map((sub, subi) => (
                                                <div key={subi}>
                                                    <h1 className="text-lg text-secundary-dark font-semibold">{sub.Head}</h1>
                                                    {sub.sublink.map((slink) => (
                                                        <li className="text-sm text-secundary-dark my-2.5">
                                                            <Link href={slink.link}
                                                                className="hover:text-gray-400"
                                                            >{slink.name}</Link>
                                                        </li>
                                                    ))}
                                                </div>
                                            ))
                                        }
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                    {/* // Mobile menus */}
                    <div className={`
                    ${heading === link.name ? 'md:hidden' : 'hidden'}
                    `}>
                        {
                            link.sublinks.map((slinks, slis) => (
                                <div key={slis}>
                                    <div>
                                        <h1 className="py-4 pl-7 font-semibold flex justify-between items-center md:pr-0 pr-5"
                                            onClick={() =>
                                                subHeading !== slinks.Head
                                                    ? setSubHeading(slinks.Head)
                                                    : setSubHeading("")
                                            }>
                                            {slinks.Head}
                                            <span className="text-xl md:mt-1 md:ml-2 inline">
                                                {subHeading === slinks.Head ? <IoChevronUp /> : <IoChevronDown />}
                                            </span>
                                        </h1>
                                        <div className={`${subHeading === slinks.Head ? "md:hidden" : "hidden"
                                            }`}>
                                            {slinks.sublink.map((slink, sli) => (
                                                <li key={sli} className="py-3 pl-14">
                                                    <Link
                                                        className="hover:text-aque-primary"
                                                        href={slink.link}
                                                    >{slink.name}</Link>
                                                </li>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            ))
                        }
                    </div>
                </div>


            ))
        }
    </>
}

export default NavLinks;