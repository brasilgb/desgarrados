import React, { Fragment } from 'react'
import { IconContext } from 'react-icons';
import { IoSearch } from 'react-icons/io5';
import { useForm, usePage } from '@inertiajs/react';

interface FormSearchProps {
    placeholder?: string;
    url?: string;
}
export const InputSearch = ({ placeholder, url }: FormSearchProps) => {

    const { data, setData, post, get, processing, errors } = useForm({
        q: '',
    });

    function handleSubmit(e: any) {
        e.preventDefault();
        get(route(`${url}`, data));
    }

    return (
        <Fragment>
            <form onSubmit={handleSubmit} className="relative my-2 flex w-full flex-wrap items-stretch">

                <input
                    name="search"
                    value={data.q}
                    onChange={(e) => setData('q', e.target.value)}
                    className="relative m-0 -mr-px block w-[1%] min-w-0 flex-auto rounded-l border border-solid border-gray-200 bg-gray-50 bg-clip-padding px-3 text-sm font-normal text-gray-500 outline-none transition duration-300 ease-in-out focus:bg-white focus:border-gray-300 focus:text-gray-600 focus:outline-none focus:ring-0"
                    type="search"
                    placeholder={placeholder}
                    autoComplete="off"
                />
                <button
                    className="relative z-[2] flex items-center rounded-r border border-solid border-gray-200 bg-gray-50 px-6 py-2 text-xs font-medium uppercase leading-tight transition duration-500 ease-in-out hover:bg-gray-100  focus:ring-0"
                    type="submit"
                    disabled={processing}
                >
                    <IconContext.Provider value={{ className: "h-5 w-5 text-gray-400" }}>
                        <IoSearch />
                    </IconContext.Provider>
                </button>
            </form>
        </Fragment>
    )
}


interface FormProps {
    children: React.ReactNode;
    onsubmit: any;
}

export const AForm = ({ children, onsubmit }: FormProps) => {
    return (
        <form onSubmit={onsubmit} autoComplete="off">
            {children}
        </form>
    )
}

interface InputProps {
    label?: string;
    classname?: string;
    type?: string;
    inputid?: string;
    value?: string;
    onchange?: any;
    error?: any;
    columns?: number;
    checked?: any;
    data?: any;
    placeholder?: string;
    maxlength?: number;
    pattern?: any;
}

export const AInput = ({ label, classname, type, inputid, value, onchange, error, placeholder, maxlength, pattern }: InputProps) => {
    return (
        <div className={classname}>
            <label className="text-gray-700 text-base" htmlFor={inputid}>{label}</label>
            <input
                multiple
                id={inputid}
                type={type}
                value={value}
                onChange={onchange}
                placeholder={placeholder}
                maxLength={maxlength}
                pattern={pattern}
                className={`${type === "file"
                    ? "block w-full text-sm text-gray-500 border border-gray-200 rounded-md cursor-pointer bg-white focus:outline-none file:py-2 file:border-none file:rounded-r-none file:shadow-none file:px-4 file:bg-blue-700 hover:file:bg-blue-600 file:duration-500 file:text-white file:font-semibold file:tracking-[1.5px]"
                    : "block w-full px-4 py-2 text-gray-700 bg-white border border-gray-200 rounded-md focus:outline-none focus:ring-0 focus:border-gray-300"
                    }`}
            />
            {error && <div className="text-red-500">{error}</div>}
        </div>
    )
}

export const ATextarea = ({ label, classname, inputid, value, onchange, error, columns }: InputProps) => {
    return (
        <div className={classname}>
            <label className="text-gray-700 text-base" htmlFor={inputid}>{label}</label>
            <textarea
                cols={columns}
                id={inputid}
                value={value}
                onChange={onchange}
                className="block w-full px-4 py-2 text-gray-700 bg-white border border-gray-200 rounded-md focus:outline-none focus:ring-0 focus:border-gray-300"
            >
            </textarea>
            {error && <div className="text-red-500">{error}</div>}
        </div>
    )
}

export const ACheckBox = ({ label, classname, onchange, error, checked, inputid }: InputProps) => {
    return (
        <div className={`${classname} flex items-center`}>
            <input
                type="checkbox"
                id={inputid}
                checked={checked}
                onChange={onchange}
                className={`${checked ? "text-blue-700" : ""} block mr-2 p-2 bg-white border border-gray-200 rounded-md focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 focus:outline-none focus:ring`}
            />
            <label className="text-gray-700" htmlFor={inputid}>{label}</label>
            {error && <div className="text-red-500">{error}</div>}
        </div>
    )
}

export const ASelect = ({ label, classname, data, inputid, value, onchange, error }: InputProps) => {
    return (
        <div className={classname}>
            <label className="text-gray-700 text-base" htmlFor={inputid}>{label}</label>
            <select
                id={inputid}
                value={value}
                onChange={onchange}
                className="block w-full px-4 py-2 text-gray-700 bg-white border border-gray-200 rounded-md focus:outline-none focus:ring-0 focus:border-gray-300"
            >
                <option value=" ">Selecione a {label.toLowerCase()}</option>
                {data.map((category: any, index: any) => (
                    <option key={index} value={category.id}>{category.name}</option>
                ))}
            </select>
            {error && <div className="text-red-500">{error}</div>}
        </div>
    )
}