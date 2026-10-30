import React from 'react';
import { Outlet, NavLink } from 'react-router-dom';

export default function Admin_Dashboard_Page() {
  const menuItems = [
    { name: 'Users', path: 'users' },
    { name: 'Products', path: 'products' },
    { name: 'Vouchers', path: 'vouchers' },
    { name: 'Categories', path: 'categories' },
    { name: 'Orders', path: 'orders' },
    { name: 'Reports', path: 'reports' },
  ];

  return (
    <div className="flex h-screen bg-gray-100">
      {/* LEFT SIDEBAR */}
      <aside className="w-64 bg-white shadow-md flex flex-col">
        <div className="p-6 border-b text-xl font-bold text-center text-blue-600">
          Admin Dashboard
        </div>
        <nav className="flex-1 p-4 space-y-2">
          {menuItems.map((item) => (
            <NavLink
              key={item.name}
              to={item.path}
              className={({ isActive }) =>
                `block px-4 py-2 rounded transition-colors ${
                  isActive 
                    ? 'bg-blue-500 text-white' 
                    : 'text-gray-700 hover:bg-blue-100'
                }`
              }
            >
              {item.name}
            </NavLink>
          ))}
        </nav>
      </aside>

      {/* RIGHT CONTENT */}
      <main className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <header className="h-16 bg-white shadow flex items-center justify-between px-6">
            <h2 className="text-gray-800 font-semibold">Welcome Back</h2>
        </header>

        {/* Outlet Container */}
        <div className="flex-1 overflow-auto p-6">
          <Outlet />
        </div>
      </main>
    </div>
  );
}