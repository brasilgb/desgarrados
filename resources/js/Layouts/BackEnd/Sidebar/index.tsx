import { Link, usePage } from "@inertiajs/react";
import React, { useState } from "react";
import { IconContext } from "react-icons";
import { IoAlbumsOutline, IoAppsSharp, IoBrowsersOutline, IoCalendarOutline, IoChatboxEllipsesOutline, IoChatbubblesOutline, IoClose, IoHome, IoHomeOutline, IoHomeSharp, IoImagesOutline, IoList, IoMenu, IoMusicalNotesOutline, IoPeopleOutline, IoReaderOutline, IoSettings } from "react-icons/io5";


type Props = {}
const Sidebar = (props: Props) => {
    const [open, setOpen] = useState(false);
    /**
     * ${open ? "left-0" : "left-[-100%]"}public/storage/logo/1680021321.png
     */
    const { setting } = usePage().props as any;

    return (
        <>
            <div className="md:hidden absolute left-2 top-4 z-40">
                <IconContext.Provider value={{ className: 'text-2xl' }} >
                    <div onClick={() => setOpen(!open)}>
                        {open ? <IoClose /> : <IoMenu />}
                    </div>
                </IconContext.Provider>
            </div>
            <aside className={`md:w-64 ${open ? "md:hidden block absolute top-14 left-0 right-0 bottom-0" : "hidden md:block fixed w-64"} duration-500 h-full bg-white`}>
                <div className="bg-aque-light py-2 px-4 flex items-center justify-center">
                    {setting && <img src={`/storage/logo/${setting?.logo ? setting?.logo : 'default.png'}`} alt="" className="h-9" />}
                </div>
                <div className="mt-8 mb-24">
                    <ul className="mt-4 mx-2">
                        <li className={`${route().current('admin') ? "bg-[#02314F] text-blue-50 border-l-amber-600" : "text-gray-500"} border-l-4 border-transparent hover:border-l-amber-600 hover:bg-[#02314F] hover:text-blue-50 px-4 rounded-lg`}>
                            <Link
                                href={route('admin')}
                                className="flex items-center py-2"
                            >
                                <IconContext.Provider value={{ className: "text-xl" }}>
                                    <IoHomeOutline />
                                </IconContext.Provider>
                                <span className="ml-2 text-base">Home</span>
                            </Link>
                        </li>
                        <li className="mt-4 uppercase text-sm font-semibold text-aque-primary border-b border-gray-200">
                            Conteúdo
                        </li>
 
                        <li className={`${route().current('pages*') ? "bg-[#02314F] text-blue-50 border-l-amber-600" : "text-gray-500"} mt-2 border-l-4 border-transparent hover:border-l-amber-600 hover:bg-[#02314F] hover:text-blue-50 px-4 rounded-lg`}>
                            <Link
                                href={route('pages.index')}
                                className="flex items-center py-2"
                            >
                                <IconContext.Provider value={{ className: "text-xl" }}>
                                    <IoBrowsersOutline />
                                </IconContext.Provider>
                                <span className="ml-2 text-base">Páginas</span>
                            </Link>
                        </li>

                        <li className={`${route().current('categories*') ? "bg-[#02314F] text-blue-50 border-l-amber-600" : "text-gray-500"} mt-2 border-l-4 border-transparent hover:border-l-amber-600 hover:bg-[#02314F] hover:text-blue-50 px-4 rounded-lg`}>
                            <Link
                                href={route('categories.index')}
                                className="flex items-center py-2"
                            >
                                <IconContext.Provider value={{ className: "text-xl" }}>
                                    <IoAppsSharp />
                                </IconContext.Provider>
                                <span className="ml-2 text-base">Categorias</span>
                            </Link>
                        </li>

                        <li className={`${route().current('posts*') ? "bg-[#02314F] text-blue-50 border-l-amber-600" : "text-gray-500"} mt-2 border-l-4 border-transparent hover:border-l-amber-600 hover:bg-[#02314F] hover:text-blue-50 px-4 rounded-lg`}>
                            <Link
                                href={route('posts.index')}
                                className="flex items-center py-2"
                            >
                                <IconContext.Provider value={{ className: "text-xl" }}>
                                    <IoReaderOutline />
                                </IconContext.Provider>
                                <span className="ml-2 text-base">Postagens</span>
                            </Link>
                        </li>

                        <li className="mt-4 uppercase text-sm font-semibold text-aque-primary border-b border-gray-200">
                            Interação
                        </li>
                        <li className={`${route().current('schedules*') ? "bg-[#02314F] text-blue-50 border-l-amber-600" : "text-gray-500"} mt-2 border-l-4 border-transparent hover:border-l-amber-600 hover:bg-[#02314F] hover:text-blue-50 px-4 rounded-lg`}>
                            <Link
                                href={route('schedules.index')}
                                className="flex items-center py-2"
                            >
                                <IconContext.Provider value={{ className: "text-xl" }}>
                                    <IoCalendarOutline />
                                </IconContext.Provider>
                                <span className="ml-2 text-base">Agenda/Eventos</span>
                            </Link>
                        </li>
                        
                        <li className={`${route().current('messages*') ? "bg-[#02314F] text-blue-50 border-l-amber-600" : "text-gray-500"} mt-2 border-l-4 border-transparent hover:border-l-amber-600 hover:bg-[#02314F] hover:text-blue-50 px-4 rounded-lg`}>
                            <Link
                                href={route('messages.index')}
                                className="flex items-center py-2"
                            >
                                <IconContext.Provider value={{ className: "text-xl" }}>
                                    <IoChatbubblesOutline />
                                </IconContext.Provider>
                                <span className="ml-2 text-base">Mensagens</span>
                            </Link>
                        </li>

                        <li className={`${route().current('comments*') ? "bg-[#02314F] text-blue-50 border-l-amber-600" : "text-gray-500"} mt-2 border-l-4 border-transparent hover:border-l-amber-600 hover:bg-[#02314F] hover:text-blue-50 px-4 rounded-lg`}>
                            <Link
                                href={route('comments.index')}
                                className="flex items-center py-2"
                            >
                                <IconContext.Provider value={{ className: "text-xl" }}>
                                    <IoChatboxEllipsesOutline />
                                </IconContext.Provider>
                                <span className="ml-2 text-base">Comentários</span>
                            </Link>
                        </li>

                        <li className="mt-4 uppercase text-sm font-semibold text-aque-primary border-b border-gray-200">
                            Mídias
                        </li>

                        <li className={`${route().current('galleries*') ? "bg-[#02314F] text-blue-50 border-l-amber-600" : "text-gray-500"} mt-2 border-l-4 border-transparent hover:border-l-amber-600 hover:bg-[#02314F] hover:text-blue-50 px-4 rounded-lg`}>
                            <Link
                                href={route('galleries.index')}
                                className="flex items-center py-2"
                            >
                                <IconContext.Provider value={{ className: "text-xl" }}>
                                    <IoAlbumsOutline />
                                </IconContext.Provider>
                                <span className="ml-2 text-base">Galerias</span>
                            </Link>
                        </li>

                        <li className={`${route().current('images*') ? "bg-[#02314F] text-blue-50 border-l-amber-600" : "text-gray-500"} mt-2 border-l-4 border-transparent hover:border-l-amber-600 hover:bg-[#02314F] hover:text-blue-50 px-4 rounded-lg`}>
                            <Link
                                href={route('images.index')}
                                className="flex items-center py-2"
                            >
                                <IconContext.Provider value={{ className: "text-xl" }}>
                                    <IoImagesOutline />
                                </IconContext.Provider>
                                <span className="ml-2 text-base">Imagens</span>
                            </Link>
                        </li>

                        <li className={`${route().current('playlists*') ? "bg-[#02314F] text-blue-50 border-l-amber-600" : "text-gray-500"} mt-2 border-l-4 border-transparent hover:border-l-amber-600 hover:bg-[#02314F] hover:text-blue-50 px-4 rounded-lg`}>
                            <Link
                                href={route('playlists.index')}
                                className="flex items-center py-2"
                            >
                                <IconContext.Provider value={{ className: "text-xl" }}>
                                    <IoList />
                                </IconContext.Provider>
                                <span className="ml-2 text-base">Playlists</span>
                            </Link>
                        </li>

                        <li className={`${route().current('audios*') ? "bg-[#02314F] text-blue-50 border-l-amber-600" : "text-gray-500"} mt-2 border-l-4 border-transparent hover:border-l-amber-600 hover:bg-[#02314F] hover:text-blue-50 px-4 rounded-lg`}>
                            <Link
                                href={route('audios.index')}
                                className="flex items-center py-2"
                            >
                                <IconContext.Provider value={{ className: "text-xl" }}>
                                    <IoMusicalNotesOutline />
                                </IconContext.Provider>
                                <span className="ml-2 text-base">Audios</span>
                            </Link>
                        </li>

                        <li className="mt-4 uppercase text-sm font-semibold text-aque-primary border-b border-gray-200">
                            Configurações
                        </li>
                        <li className={`${route().current('settings*') ? "bg-[#02314F] text-blue-50 border-l-amber-600" : "text-gray-500"} mt-2 border-l-4 border-transparent hover:border-l-amber-600 hover:bg-[#02314F] hover:text-blue-50 px-4 rounded-lg`}>
                            <Link
                                href={route("settings.index")}
                                className="flex items-center py-2"
                            >
                                <IconContext.Provider value={{ className: "text-xl" }}>
                                    <IoSettings />
                                </IconContext.Provider>
                                <span className="ml-2 text-base">Configurações</span>
                            </Link>
                        </li>
                        <li className={`${route().current('users*') ? "bg-[#02314F] text-blue-50 border-l-amber-600" : "text-gray-500"} mt-2 border-l-4 border-transparent hover:border-l-amber-600 hover:bg-[#02314F] hover:text-blue-50 px-4 rounded-lg`}>
                            <Link
                                href={route("users.index")}
                                className="flex items-center py-2"
                            >
                                <IconContext.Provider value={{ className: "text-xl" }}>
                                    <IoPeopleOutline />
                                </IconContext.Provider>
                                <span className="ml-2 text-base">Usuários</span>
                            </Link>
                        </li>

                    </ul>
                </div>

            </aside>
        </>
    )
}

export default Sidebar;