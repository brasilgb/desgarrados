import { ABoxAll, ABoxBody, ABoxHeader } from "@/Components/BackEnd/Boxes";
import { ButtonDelete, ButtonEdit, ButtonNew, ButtonSave } from "@/Components/BackEnd/Buttons";
import { Success } from "@/Components/BackEnd/FlashMessage";
import { AForm, AInput, ATextarea, InputSearch } from "@/Components/BackEnd/Form";
import { ATd, ATr } from "@/Components/BackEnd/Table";
import { ModalImage } from "@/Components/ModalImage";
import { LayoutBack } from "@/Layouts";
import Auxbar from "@/Layouts/BackEnd/Auxbar";
import { router, useForm, usePage } from "@inertiajs/react";
import React, { Fragment, useState } from 'react';
import { IconContext } from "react-icons";
import { IoAdd, IoBrowsersOutline, IoClose, IoSave, IoSearch, IoChevronDown } from "react-icons/io5";
import { RiImageEditLine, RiLoader3Line } from "react-icons/ri";
import 'animate.css';
interface Props {
    galleries: any;
}

const Images = ({ galleries }: Props) => {
    const { messages } = usePage().props as any;
    const [loading, setLoading] = useState(false);
    const { data, setData, post, processing, delete: destroy, reset } = useForm({
        idgallery: '',
        title: '',
        description: ''
    });
    const [showEdit, setShowEdit] = useState(null);
    const [showModalImage, setShowModalImage] = useState(null);
    const [imagesGallery, setImagesGallery] = useState(null);

    const handleSubmit = (e: any) => {
        e.preventDefault();
        setLoading(true);
        setTimeout(() => {
            setLoading(false);
            reset();
            setShowEdit(null);
            router.post(route('images.update', data.idgallery), {
                _method: 'put',
                title: data.title,
                description: data.description,
            });
        }, 1000);

    }

    const handleEditImage = ((id: any) => {
        setShowEdit(id);
    });

    const handleShowImage = ((id: any) => {
        setShowModalImage(id);
    });

    const handleImagesGallery = ((id: any) => {
        console.log(imagesGallery);
        if (imagesGallery === id) {
            setImagesGallery(null);
        } else {
            setImagesGallery(id);
        }
    });

    return (
        <LayoutBack>

            <Auxbar
                header={{
                    icon: <IoBrowsersOutline />,
                    title: "Imagens"
                }}
                breadcumb={[
                    { title: "Imagens", url: "", divider: false }
                ]}
            />

            <ABoxAll>
                {messages.success && (
                    <Success message={messages.success} />
                )}
                <ABoxHeader>
                    <div className="px-4">
                        <IconContext.Provider value={{ className: "text-xl text-gray-700" }}>
                            <div>
                                <InputSearch placeholder="Buscar Imagens" url="images.index" />
                            </div>
                        </IconContext.Provider>
                    </div>
                    <div className="px-4">
                        <ButtonNew url={'images.create'} value={'Nova Imagem'} icon={<IoAdd />} />
                    </div>

                </ABoxHeader>

                <ABoxBody>
                    <div className="mx-2 mb-2">
                        {galleries.data.map((gallery: any, index: any) => (
                            <div key={index} className="border border-bg-gray-200 rounded-lg my-2">
                                <button
                                    className="w-full"
                                    onClick={() => handleImagesGallery(gallery.id)}
                                >
                                    <div className={`flex items-center justify-start bg-gray-200 ${imagesGallery === gallery.id ? 'rounded-t-md' : 'rounded'} p-2`}>
                                        <IoChevronDown size={22} className={`${imagesGallery === gallery.id && '-rotate-180'} duration-300 text-gray-500`} />
                                        <div className="flex items-center justify-start">
                                            <h1 className="text-sm text-gray-500 ml-2 uppercase">Galeria: {gallery.title}</h1><span className="ml-2 text-sm rounded bg-blue-500 text-gray-50 p-1">{gallery.images.length}</span>
                                        </div>
                                    </div>
                                </button>

                                {imagesGallery === gallery.id &&
                                    <div className="duration-300">
                                        {gallery.images.length === 0
                                            ? <h1 className="p-2 bg-sky-200 text-gray-500">Não há imagens para esta galeria</h1>
                                            :
                                            <div className="grid grid-cols-6 gap-1 p-1 pt-2">
                                                {gallery.images.map((image: any, index: any) => (
                                                    <>
                                                        <div key={index} className="relative bg-gray-200 border-2 border-white shadow-md rounded-md p-0.5 mb-1">
                                                            {showEdit == image.id &&
                                                                <div className="absolute z-10 left-0 right-0 top-0 bottom-0 bg-gray-100 p-1">
                                                                    <form onSubmit={handleSubmit}>
                                                                        <input
                                                                            id="idgallery"
                                                                            type="hidden"
                                                                            value={data.idgallery = image.id}
                                                                            onChange={(e: any) => setData('idgallery', e.target.value)}
                                                                        />
                                                                        <input
                                                                            id="title"
                                                                            type="text"
                                                                            placeholder={image.title}
                                                                            value={data.title}
                                                                            onChange={(e: any) => setData('title', e.target.value)}
                                                                            className="block w-full px-1 py-2 mb-1 text-xs text-gray-700 bg-white border border-gray-200 rounded-md focus:outline-none focus:ring-0 focus:border-gray-300"
                                                                        />
                                                                        <textarea
                                                                            id="description"
                                                                            placeholder={image.description}
                                                                            value={data.description}
                                                                            onChange={(e: any) => setData('description', e.target.value)}
                                                                            className="block w-full px-1 py-2 text-xs text-gray-700 bg-white border border-gray-200 rounded-md focus:outline-none focus:ring-0 focus:border-gray-300"
                                                                            rows={3}
                                                                        />
                                                                        <div className="w-full mt-1 flex items-center justify-between">
                                                                            <IoClose size={26} onClick={() => handleEditImage(null)}
                                                                                className="bg-red-500 p-1 text-gray-50 cursor-pointer rounded shadow border-2 border-white"
                                                                                title="Fechar"
                                                                            />
                                                                            <button className="p-1 bg-blue-500 rounded shadow border-2 border-white"
                                                                                type="submit"
                                                                                title="Salvar"
                                                                                disabled={processing}
                                                                            >
                                                                                {loading
                                                                                    ? <RiLoader3Line size={15} color="#FFFFFF" className="animate-spin" />
                                                                                    : <IoSave size={15} color="#FFFFFF" />
                                                                                }
                                                                            </button>
                                                                        </div>
                                                                    </form>
                                                                </div>
                                                            }

                                                            <div className="h-[160px] max-w-[260px] overflow-hidden">
                                                                <ButtonDelete url="images.destroy" param={image.id} tipo="esta imagem" classname="!absolute !bg-gray-200 left-1 top-1 !p-0.5 !rounded-none border border-gray-50" textBut="" styleBut="text-[18px] text-red-500" title="Deletar imagem" />
                                                                <RiImageEditLine size={24} onClick={() => handleEditImage(image.id)} className="absolute bg-gray-200 top-1 right-1 p-0.5 text-gray-600 cursor-pointer border border-gray-50 shadow" title="Editar imagem" />
                                                                <IoSearch size={36} onClick={() => handleShowImage(image.id)} className="absolute top-[46%] left-[46%] bg-gray-100 border-white shadow-md rounded-full p-2 text-yellow-500 cursor-pointer" title="Visualizar imagem" />
                                                                <img src={`/storage/galleries/${image.image}`} className="object-contain h-auto" />
                                                            </div>
                                                        </div>
                                                        {showModalImage == image.id &&
                                                            <ModalImage image={`/storage/galleries/${image.image}`} title={image.title} handle={setShowModalImage} />
                                                        }
                                                    </>
                                                ))}
                                            </div>
                                        }
                                    </div>
                                }
                            </div>
                        ))}
                    </div>

                </ABoxBody>
            </ABoxAll>
        </LayoutBack>
    )
}

export default Images;