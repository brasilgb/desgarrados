import React from 'react'
import { IoClose } from "react-icons/io5";
import 'animate.css';

interface ModalProps {
    image?: any;
    title?: any;
    handle?: any;
}

export const ModalImage = ({ image, title, handle }: ModalProps) => {
    return (
        <div className="fixed flex items-center justify-center z-50 left-0 top-0 right-0 bottom-0 transform bg-[#00000081] animate__animated animate__fadeIn">
            <div className="w-1/4 flex-col flex items-center justify-center bg-gray-100 border border-white p-2 rounded shadow-md">
                <div className="flex-row flex items-center justify-between bg-gray-100 w-full pb-1">
                    <div className="">
                        <h1 className="text-gray-500 text-sm">{title}</h1>
                    </div>
                    <div className="bg-gray-50 rounded-full p-0.5 shadow border border-white">
                        <IoClose size={24} onClick={() => handle(false)} className="text-gray-500 cursor-pointer" />
                    </div>
                </div>
                <img src={image} alt={title} className="object-fill border" />
            </div>
        </div>
    )
};