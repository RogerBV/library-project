'use client'

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Sidebar() {
  const pathname = usePathname();
  const isActive = (path: string) =>
    pathname === path ? 'bg-gray-700' : ''
  const [isProjectsOpen, setIsProjectsOpen] = useState(false);

  return (
    <div className="flex">
      {/* Sidebar */}
      <aside className="w-64 bg-gray-800 text-gray-100 min-h-screen">
        <div className="p-6 text-2xl font-bold border-b border-gray-700">
          Library System
        </div>
        <nav className="mt-6">
          <ul>
            <li className={`px-6 py-3 hover:bg-gray-700 cursor-pointer ${isActive('/')}`}>
              <Link href="/" className="flex items-center space-x-3">
                <span>🏠</span>
                <span>Inicio</span>
              </Link>
            </li>
            <li className={`px-6 py-3 hover:bg-gray-700 cursor-pointer ${isActive('/authors')}`}>
              <Link href="/authors" className="flex items-center space-x-3">
                <span>📁</span>
                <span>Authors</span>
              </Link>
            </li>
            <li className={`px-6 py-3 hover:bg-gray-700 cursor-pointer ${isActive('/books')}`}>
              <Link href="/books" className="flex items-center space-x-3">
                <span>📁</span>
                <span>Books</span>
              </Link>
            </li>
          </ul>
        </nav>
      </aside>
    </div>
  );
}