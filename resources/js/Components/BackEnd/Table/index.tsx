import React, { Fragment } from 'react'

interface TableProps {
    children: React.ReactNode;
    header?: any;
    classname?: string;
}
export const ATable = ({ children }: TableProps) => {
    return (
        <div className="overflow-auto">
            <table className="min-w-full table-auto">
                {children}
            </table>
        </div>

    )
}

export const ATr = ({ children, header }) => {
    return (
        <Fragment>
            {header
                ?
                <thead>
                    <tr>
                        {children}
                    </tr>
                </thead>
                :
                <tbody>
                    <tr>
                        {children}
                    </tr>
                </tbody>
            }
        </Fragment>
    )
}

export const ATh = ({ children, classname }: TableProps) => {
    return (
        <th className={`${classname} px-2 py-2 border-b border-gray-200 bg-gray-100 text-left text-sm font-semibold text-gray-600 tracking-wider`}>
            {children}
        </th>
    )
}

export const ATd = ({ children, classname }: TableProps) => {
    return (
        <td className={`${classname} px-2 py-2 border-b border-gray-200 bg-white text-sm`}>
            {children}
        </td>
    )
}
