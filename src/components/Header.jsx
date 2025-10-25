import { UsersIcon } from '@heroicons/react/24/solid';
import { Link } from 'react-router-dom';

export default function Header() {
  return (
    <header className="bg-gray-800 shadow-lg">
      <div className="container mx-auto max-w-4xl px-4 py-6">
        <Link to="/" className="flex items-center space-x-3 group">
          <UsersIcon className="h-10 w-10 text-indigo-400 group-hover:text-indigo-300 transition" />
          <h1 className="text-3xl font-bold tracking-tight text-white group-hover:text-gray-200 transition">
            MyContact
          </h1>
        </Link>
      </div>
    </header>
  );
}