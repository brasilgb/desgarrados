import { ABoxAll, ABoxBody, ABoxHeader } from "@/Components/BackEnd/Boxes";
import { ButtonDelete, ButtonEdit, ButtonNew, ButtonSave } from "@/Components/BackEnd/Buttons";
import { Success } from "@/Components/BackEnd/FlashMessage";
import { AForm, AInput, ATextarea, InputSearch } from "@/Components/BackEnd/Form";
import { ATd, ATr } from "@/Components/BackEnd/Table";
import { ModalImage } from "@/Components/ModalImage";
import { LayoutBack } from "@/Layouts";
import Auxbar from "@/Layouts/BackEnd/Auxbar";
import { router, useForm, usePage } from "@inertiajs/react";
import React, { Fragment, useEffect, useState } from 'react';
import { IconContext } from "react-icons";
import { IoAdd, IoBrowsersOutline, IoClose, IoSave, IoSearch, IoChevronDown } from "react-icons/io5";
import { RiImageEditLine, RiLoader3Line } from "react-icons/ri";
import { MdOutlineAudiotrack } from "react-icons/md";
import 'animate.css';
import AudioPlayer from "@/Components/BackEnd/AudioPlayer";
interface Props {
    playlists: any;
}

const Audios = ({ playlists }: Props) => {
    const { messages } = usePage().props as any;
    const [loading, setLoading] = useState(false);
    const { data, setData, post, processing, delete: destroy, reset } = useForm({
        id: '',
        title: ''
    });

    const [showEdit, setShowEdit] = useState(null);
    const [showModalImage, setShowModalImage] = useState(null);
    const [audiosPlaylist, setAudiosPlaylist] = useState(null);

    const handleSubmit = (e: any) => {
        e.preventDefault();
        setLoading(true);
        setTimeout(() => {
            setLoading(false);
            reset();
            setShowEdit(null);
            router.post(route('audios.update', data.id), {
                _method: 'put',
                title: data.title,
            });
        }, 1000);

    }
    const handleExcludeImage = ((id: any) => {
        // console.log(id);
        destroy(route('audios.destroy', id));
    })

    const handleEditImage = ((id: any) => {
        setShowEdit(id);
    });

    const handleShowImage = ((id: any) => {
        setShowModalImage(id);
    });

    const handleAudiosPlaylist = ((id: any) => {
        if (audiosPlaylist === id) {
            setAudiosPlaylist(null);
        } else {
            setAudiosPlaylist(id);
        }
    });

    return (
        <LayoutBack>

            <Auxbar
                header={{
                    icon: <IoBrowsersOutline />,
                    title: "Áudios"
                }}
                breadcumb={[
                    { title: "Áudios", url: "", divider: false }
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
                                <InputSearch placeholder="Buscar Áudios" url="audios.index" />
                            </div>
                        </IconContext.Provider>
                    </div>
                    <div className="px-4">
                        <ButtonNew url={'audios.create'} value={'Nova Áudio'} icon={<IoAdd />} />
                    </div>

                </ABoxHeader>

                <ABoxBody>
                    <div className="mx-2 mb-2">
                        {playlists.data.map((playlist: any, index: any) => (
                            <div key={index} className="border border-bg-gray-200 rounded-lg my-2">
                                <button
                                    className="w-full"
                                    onClick={() => handleAudiosPlaylist(playlist.id)}
                                >
                                    <div className={`flex items-center justify-start bg-gray-200 ${audiosPlaylist === playlist.id ? 'rounded-t-md' : 'rounded'} p-2`}>
                                        <IoChevronDown size={22} className={`${audiosPlaylist === playlist.id && '-rotate-180'} duration-300 text-gray-500`} />
                                        <div className="flex items-center justify-start">
                                            <h1 className="text-sm text-gray-500 ml-2 uppercase">Galeria: {playlist.title}</h1><span className="ml-2 text-sm rounded bg-blue-500 text-gray-50 p-1">{playlist.audios.length}</span>
                                        </div>
                                    </div>
                                </button>

                                {audiosPlaylist === playlist.id &&
                                    <div className="duration-300">
                                        {playlist.audios.length === 0
                                            ? <h1 className="p-2 bg-sky-200 text-gray-500">Não há audions para esta galeria</h1>
                                            :
                                            <div className="grid grid-cols-6 gap-1 p-1 pt-2">
                                                {playlist.audios.map((audio: any, index: any) => (
                                                    <>
                                                        <div key={index} className="relative bg-gray-200 border-2 border-white shadow-md rounded-md p-0.5 mb-1">
                                                            {showEdit == audio.id &&
                                                                <div className="absolute z-10 left-0 right-0 top-0 bottom-0 bg-gray-100 p-1">
                                                                    <form onSubmit={handleSubmit}>
                                                                        <input
                                                                            id="id"
                                                                            type="hidden"
                                                                            value={data.id = audio.id}
                                                                            onChange={(e: any) => setData('id', e.target.value)}
                                                                        />
                                                                        {/* <input
                                                                            id="title"
                                                                            type="text"
                                                                            placeholder={audio.title}
                                                                            value={data.title}
                                                                            onChange={(e: any) => setData('title', e.target.value)}
                                                                            className="block w-full px-1 py-2 mb-1 text-xs text-gray-700 bg-white border border-gray-200 rounded-md focus:outline-none focus:ring-0 focus:border-gray-300"
                                                                        /> */}
                                                                        <textarea
                                                                            id="title"
                                                                            placeholder={audio.title}
                                                                            value={data.title}
                                                                            onChange={(e: any) => setData('title', e.target.value)}
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
                                                                <ButtonDelete url="audios.destroy" param={audio.id} tipo="esta audiom" classname="!absolute !bg-gray-200 left-1 top-1 !p-0.5 !rounded-none border border-gray-50" textBut="" styleBut="text-[18px] text-red-500" title="Deletar audio" />
                                                                <MdOutlineAudiotrack size={24} onClick={() => handleEditImage(audio.id)} className="absolute bg-gray-200 top-1 right-1 p-0.5 text-gray-600 cursor-pointer border border-gray-50 shadow" title="Editar audio" />
                                                                <div className="absolute top-[20%] w-full">
                                                                    <h1 className="text-center text-xs text-gray-500">{audio.title}</h1>
                                                                    <div className="flex items-center justify-center mt-2">
                                                                        <AudioPlayer url={`/storage/playlists/${audio.audio}`} />
                                                                    </div>
                                                                </div>

                                                            </div>
                                                        </div>
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

export default Audios;