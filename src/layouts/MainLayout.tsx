import React from 'react';
import { Outlet } from 'react-router-dom';
import { Home, User, PenSquare } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useAuthStore } from '../lib/store';

export default function MainLayout() {
  const { user } = useAuthStore();

  return (
    <div className="min-h-screen bg-white">
      <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 md:left-0 md:top-0 md:bottom-0 md:w-64 md:border-r">
        <div className="flex justify-around p-4 md:flex-col md:h-full">
          <Link to="/" className="flex items-center gap-2 p-2 hover:bg-gray-100 rounded-md">
            <Home className="w-6 h-6" />
            <span className="hidden md:inline">Home</span>
          </Link>
          <Link to={`/profile/${user?.username}`} className="flex items-center gap-2 p-2 hover:bg-gray-100 rounded-md">
            <User className="w-6 h-6" />
            <span className="hidden md:inline">Perfil</span>
          </Link>
          <button className="flex items-center gap-2 p-2 hover:bg-gray-100 rounded-md">
            <PenSquare className="w-6 h-6" />
            <span className="hidden md:inline">Crear Publicacion</span>
          </button>
        </div>
      </nav>
      <main className="pb-16 md:pl-64 md:pb-0">
        <div className="max-w-2xl mx-auto px-4 py-6">
          <Outlet />
        </div>
      </main>
    </div>
  );
}