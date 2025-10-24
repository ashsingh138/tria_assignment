import { MagnifyingGlassIcon } from '@heroicons/react/24/outline';

export default function SearchBar({ searchValue, onSearchChange }) {
  return (
    <div className="relative">
      <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
        <MagnifyingGlassIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
      </div>
      <input
        id="search"
        name="search"
        type="search"
        placeholder="Search by name..."
        value={searchValue} // Use the instant value from prop
        onChange={(e) => onSearchChange(e.target.value)} // Call the setter prop
        className="block w-full rounded-md border-0 bg-gray-700 py-3 pl-10 pr-3 text-white placeholder:text-gray-400 focus:bg-white focus:text-gray-900 focus:ring-0 focus:placeholder:text-gray-500 sm:text-sm sm:leading-6"
      />
    </div>
  );
}