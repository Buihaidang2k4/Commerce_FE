import { NavLink } from "react-router-dom";

const Manger_action_item = ({ to, icon, label }) => {

  return (
    <NavLink
        to={to}
      className="flex flex-col items-center gap-2 text-gray-700 hover:text-blue-600 cursor-pointer transition-transform duration-300 hover:scale-105"
    >
      <div className="bg-white p-3 rounded-full shadow-md">
        {icon}
      </div>
      <span className="text-sm font-medium">{label}</span>
    </NavLink>
  );
};

export default Manger_action_item;