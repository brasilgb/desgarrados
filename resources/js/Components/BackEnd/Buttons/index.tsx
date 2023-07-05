import { Link, useForm } from "@inertiajs/react";
import React, { Fragment, useState } from "react"
import { IconContext } from "react-icons";
import { IoCreateOutline, IoSaveOutline, IoTrash } from "react-icons/io5";
import { HiOutlineInformationCircle, HiTrash } from "react-icons/hi2";
import { RiLoader3Line } from "react-icons/ri";
import "animate.css";

export const ButtonNew = ({ url, icon, value }) => {

    return (
        <Fragment>

            <Link
                as="button"
                type="button"
                href={route(`${url}`)}
                className="flex items-center my-2 py-1.5 px-4 duration-500 bg-blue-600 hover:bg-blue-500 rounded shadow-md"
                title="Adicionar página"
            >
                <IconContext.Provider value={{ className: "text-xl text-gray-50 text-black" }}>
                    <div>
                        {icon}
                    </div>
                </IconContext.Provider>
                <h1 className="md:block hidden text-sm text-gray-50 hover:text-white">{value}</h1>
            </Link>

        </Fragment>
    )
}

interface SaveProps {
    processing?: any;
    loading?: boolean;
}
export const ButtonSave = ({ processing, loading }: SaveProps) => {

    return (
        <div className="w-full flex items-center justify-end p-4">
            <button
                type="submit"
                className="flex items-center py-1.5 px-4 duration-500 bg-blue-700 hover:bg-blue-600 rounded-md shadow-md"
                disabled={processing}
            >

                {loading ?
                    <IconContext.Provider value={{ className: "text-2xl mx-6 text-gray-50 text-white " }}>
                        <RiLoader3Line className="animate-spin" />
                    </IconContext.Provider>
                    :
                    <IconContext.Provider value={{ className: "text-xl text-gray-50 text-white " }}>
                        <IoSaveOutline />
                    </IconContext.Provider>
                }

                {!loading && <div className="text-md ml-2 text-gray-50 hover:text-white">Salvar</div>}
            </button>
        </div>
    )

}

export const ButtonEdit = ({ url }) => {
    return (
        <Fragment>

            <Link
                href={url}
                className="flex items-center py-1.5 px-4 duration-500 bg-orange-500 hover:bg-orange-600 rounded-md shadow-md"
            >
                <IconContext.Provider value={{ className: "text-xl text-gray-50 text-white" }}>
                    <IoCreateOutline />
                </IconContext.Provider>
                <h1 className="text-md ml-1 text-gray-50 hover:text-white">Editar</h1>
            </Link>

        </Fragment>
    )
}

interface DeleteProps {
    url?: string;
    param?: number;
    tipo?: string;
    classname?: any;
    textBut?: string;
    styleBut?: string;
    title?: string;
}
export const ButtonDelete = ({ url, param, tipo, classname, textBut = 'Excluir', styleBut, title }: DeleteProps) => {

    const [deleteModal, setDeleteModal] = useState(false);
    const { delete: destroy } = useForm();

    function onsubmit(e: any) {
        e.preventDefault();
        destroy(route(url, param));
        setDeleteModal(false);
    }

    return (
        <Fragment>

            <button
                onClick={() => setDeleteModal(true)}
                type="submit"
                title={title}
                className={`flex items-center py-1.5 px-4 duration-500 bg-red-500 hover:bg-red-600 rounded-md shadow-md ${classname}`}
            >
                <IconContext.Provider value={{ className: `${styleBut ? styleBut : 'text-xl text-gray-50'}` }}>
                    <IoTrash />
                </IconContext.Provider>
                {textBut && <h1 className="text-md ml-1 text-gray-50 hover:text-white">{textBut}</h1>}
            </button>

            {deleteModal &&

                <div className="min-w-screen h-screen fixed left-0 top-0 flex justify-center items-center inset-0 z-50 outline-none focus:outline-none bg-no-repeat bg-center bg-cover">
                    <div className="absolute bg-black opacity-80 inset-0 z-0"></div>
                    <div className="w-full animate__animated animate__fadeIn max-w-lg p-2 relative mx-auto my-auto rounded-xl shadow-lg bg-white">

                        <div className="">
                            {/* <!--body--> */}
                            <div className="text-center p-2 flex-auto justify-center">

                                <div className="flex flex-col items-center justify-center">
                                    <IconContext.Provider value={{ className: "text-lg text-red-500" }}>
                                        <HiOutlineInformationCircle />
                                    </IconContext.Provider>
                                    <IconContext.Provider value={{ className: "text-7xl text-red-500" }}>
                                        <HiTrash />
                                    </IconContext.Provider>
                                </div>

                                <h2 className="text-xl font-bold py-4 ">Têm certeza?</h2>
                                <p className="text-sm text-gray-500 px-8">Quer excluir {tipo}?
                                    Este processo não pode ser desfeito.</p>
                            </div>
                            <form onSubmit={onsubmit}>
                                <div className="p-3  mt-2 text-center space-x-4 md:block">

                                    <button
                                        onClick={() => setDeleteModal(false)}
                                        className="mb-2 md:mb-0 bg-white px-5 py-2 text-sm shadow-sm font-medium tracking-wider border text-gray-600 rounded-full hover:shadow-lg hover:bg-gray-100"
                                    >
                                        Cancelar
                                    </button>
                                    <button
                                        className="mb-2 md:mb-0 bg-red-500 border border-red-500 px-5 py-2 text-sm shadow-sm font-medium tracking-wider text-white rounded-full hover:shadow-lg hover:bg-red-600"
                                    >
                                        Excluir
                                    </button>

                                </div>
                            </form>
                        </div>

                    </div>
                </div>
            }

        </Fragment>
    )
}