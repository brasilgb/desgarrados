import { Link } from "@inertiajs/react";
import React from "react";
import { IconContext } from "react-icons";
import { IoHomeOutline, IoHomeSharp } from "react-icons/io5";

interface AuxProps {
    header?: any;
    breadcumb?: any;
}

const Auxbar = ({ header, breadcumb }: AuxProps) => {
    return (
        <div className="flex items-center justify-between h-10 md:h-24 md:px-8 px-2">
            <div className="flex items-center justify-start">
                <IconContext.Provider value={{ className: "md:text-3xl text-gray-600" }}>
                    <div>
                        {header.icon}
                    </div>
                    <span className="ml-2 md:text-2xl font-medium text-gray-600">{header.title}</span>
                </IconContext.Provider>
            </div>
            <div>
                <ul className="flex items-center justify-end">
                    <Link
                        href="/admin"
                        className="text-aque-primary hover:text-aque-primary-hover"
                    >
                        <IconContext.Provider value={{ className: "md:text-xl text-gray-600" }}>
                            <div>
                                <IoHomeSharp />
                            </div>
                        </IconContext.Provider>
                    </Link>

                    {breadcumb.length > 0 && <span className="px-1 text-gray-600">/</span>}
                    {breadcumb.map((bc: any, index: any) => (
                        <li key={index}>
                            {bc.url !== ""
                                ? < Link
                                    className="md:text-base text-sm text-aque-primary hover:text-aque-primary-hover"
                                    href={bc.url}
                                >
                                    {bc.title}
                                </Link>
                                : <span className="text-gray-600">{bc.title}</span>
                            }
                            <span className="px-1 md:text-base text-sm text-gray-600">{bc.divider && '/'}</span>
                        </li>
                    ))}
                </ul>
            </div>
        </div >
    )
}

export default Auxbar;