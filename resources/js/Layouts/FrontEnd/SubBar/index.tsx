import React from 'react'
import { IoCalendarOutline, IoImageOutline, IoPlayCircleSharp } from 'react-icons/io5'
import { LuLightbulb, LuLightbulbOff } from 'react-icons/lu'

type Props = {}

const SubBar = (props: Props) => {
  return (
    <div className="container m-auto py-2 flex items-center justify-between">
    <div>
      {1 === 1 ? <LuLightbulb size={24} className="text-primary-yellow" /> : <LuLightbulbOff size={24} className="text-secundary-yellow" />}
    </div>
    <div className="flex items-center justify-end">
      <div className="bg-secundary-red rounded-full p-1 shadow transition duration-300 hover:bg-primary-red">
        <IoPlayCircleSharp size={22} className="text-white" title="Playlists" />
      </div>
      <div className="bg-secundary-red rounded-full p-1 shadow mx-2 transition duration-300 hover:bg-primary-red">
        <IoImageOutline size={22} className="text-white" title="Galeria de imagens" />
      </div>
      <div className="bg-secundary-red rounded-full p-1 shadow transition duration-300 hover:bg-primary-red">
        <IoCalendarOutline size={22} className="text-white" title="Agenda de eventos" />
      </div>
    </div>
  </div>
  )
}

export default SubBar