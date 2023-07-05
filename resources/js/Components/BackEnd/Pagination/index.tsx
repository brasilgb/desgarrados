import React, { Fragment } from 'react';
import { Link } from '@inertiajs/react';
import { IoChevronBackOutline, IoChevronForwardOutline } from 'react-icons/io5';

const APagination = ({ data }) => {

    const clearLinks = [...data.links];
    clearLinks.shift();
    clearLinks.pop();

    return (
        <Fragment>
            {data.total > data.per_page &&
                <div className="flex py-2">
                    {data.prev_page_url &&
                        <Link
                            href={data.prev_page_url}
                            className="flex items-center justify-center mr-1 w-10 h-10 text-gray-500 rounded-lg bg-gray-100 hover:bg-blue-600 hover:text-white duration-500 border-2 border-white shadow">
                            <IoChevronBackOutline />
                        </Link>
                    }

                    {clearLinks.map((link, index) => (
                        <Link
                            key={index}
                            href={link.url}
                            className={
                                link.active
                                    ? "mx-1 flex items-center justify-center w-10 h-10 text-gray-50 bg-blue-600 rounded-lg border-2 border-white shadow"
                                    : "mx-1 flex items-center justify-center w-10 h-10 text-gray-500 bg-gray-100 hover:bg-blue-600 hover:text-white duration-500 rounded-lg border-2 border-white shadow"
                            }>
                            {link.label}
                        </Link>
                    ))}

                    {data.next_page_url &&
                        <Link
                            href={data.next_page_url}
                            className="flex items-center justify-center ml-1 w-10 h-10 text-gray-500 hover:bg-blue-600 hover:text-white duration-500 rounded-lg bg-gray-100 border-2 border-white shadow">
                            <IoChevronForwardOutline />
                        </Link>
                    }
                </div>
            }
        </Fragment>
    )
}

export default APagination;