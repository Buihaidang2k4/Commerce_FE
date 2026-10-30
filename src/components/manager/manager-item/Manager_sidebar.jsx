import { NavLink } from "react-router-dom";

export default function Manager_sidebar({ to, icon, label }) {
    return (
        <NavLink
            to={to}
            className={`group flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-300 hover:bg-sky-100  hover:scale-105 `}
        >
            <div className="bg-white p-3 rounded-full shadow-sm group-hover:bg-sky-100 transition-all duration-300">
                {icon}
            </div>
            <span className="text-[16px] font-medium">{label}</span>
        </NavLink>
    )
}
