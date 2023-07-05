import React, { Fragment } from 'react'
import { IconContext } from 'react-icons';
import { IoCheckmark } from 'react-icons/io5';
import "animate.css";

export const Success = ({ message }) => {
    
    return (
        <Fragment>
            <div className="flex items-center bg-green-100 rounded-lg p-4 m-4 text-sm text-green-700 border border-green-200 animate__animated animate__fadeIn">
                <IconContext.Provider value={{ className: "text-xl text-green-700" }}>
                    <IoCheckmark />
                </IconContext.Provider>
                <div>
                    <span className="font-medium">{message}</span>
                </div>
            </div>
        </Fragment>
    )
}