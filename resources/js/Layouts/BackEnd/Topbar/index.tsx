import React from 'react'
import { IconContext } from "react-icons";
import { IoPerson } from "react-icons/io5";

type Props = {}

const Topbar = (props: Props) => {
    return (
        <nav className="bg-gray-50 shadow z-10">
             <div className="flex items-center justify-end mx-8 py-2">
                <div className="bg-gray-400 border-2 border-white rounded-full w-8 h-8 flex items-center justify-center shadow">
                    <IconContext.Provider value={{ className: "text-xl text-white" }}>
                        <IoPerson />
                    </IconContext.Provider>
                </div>
             </div>
        </nav>
    )
}

export default Topbar;