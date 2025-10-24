import { UsersIcon } from '@heroicons/react/24/solid';
// You need to install heroicons: npm install @heroicons/react

export default function Header() {
  return (
    <header className="bg-gray-800 shadow-lg">
      <div className="container mx-auto max-w-4xl px-4 py-6">
        <div className="flex items-center space-x-3">
          <UsersIcon className="h-10 w-10 text-indigo-400" />
          <h1 className="text-3xl font-bold tracking-tight text-white">
            MyContact
          </h1>
        </div>
      </div>
    </header>
  );
}