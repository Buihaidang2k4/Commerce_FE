import React from 'react'

export default function InfoRow({ label, value }) {
    return (
        <div className="flex">
            <div className="flex-1 text-gray-500 p-2">{label}</div>
            <div className="flex-1 p-2 text-[18px]">{value}</div>
        </div>
    )
}
