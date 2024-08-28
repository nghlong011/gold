// app/admin/sidebar.tsx
import React from "react";
import Link from "next/link";

const Sidebar = () => {
  return (
    <nav>
      <ul className="space-y-4">
        <li>
          <Link href="/admin">
            <span className="block py-2 px-4 bg-gray-800 hover:bg-gray-700 rounded cursor-pointer">
              Dashboard
            </span>
          </Link>
        </li>
        <li>
          <Link href="/admin/settings">
            <span className="block py-2 px-4 bg-gray-800 hover:bg-gray-700 rounded cursor-pointer">
              Settings
            </span>
          </Link>
        </li>
        <li>
          <Link href="/admin/users">
            <span className="block py-2 px-4 bg-gray-800 hover:bg-gray-700 rounded cursor-pointer">
              Users
            </span>
          </Link>
        </li>
        <li>
          <Link href="/admin/reports">
            <span className="block py-2 px-4 bg-gray-800 hover:bg-gray-700 rounded cursor-pointer">
              Reports
            </span>
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export default Sidebar;
