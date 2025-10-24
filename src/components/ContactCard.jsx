import { EnvelopeIcon, PhoneIcon, PencilIcon, TrashIcon } from '@heroicons/react/24/solid';

export default function ContactCard({ contact, onEdit, onDelete }) {
  return (
    <div className="flex flex-col rounded-lg bg-gray-800 shadow-md overflow-hidden transition-all duration-300 hover:shadow-xl">
      <div className="flex flex-col items-center p-6 flex-grow">
        <img
          className="h-24 w-24 rounded-full object-cover ring-2 ring-indigo-400"
          src={contact.avatar}
          alt={`${contact.name}'s avatar`}
        />
        <h2 className="mt-4 text-xl font-semibold text-white">
          {contact.name}
        </h2>
        <div className="mt-4 flex flex-col space-y-2 text-sm text-gray-400">
          <div className="flex items-center space-x-2">
            <EnvelopeIcon className="h-5 w-5 text-gray-500" />
            <a href={`mailto:${contact.email}`} className="hover:text-indigo-300 truncate" title={contact.email}>
              {contact.email}
            </a>
          </div>
          <div className="flex items-center space-x-2">
            <PhoneIcon className="h-5 w-5 text-gray-500" />
            <a href={`tel:${contact.phone}`} className="hover:text-indigo-300">
              {contact.phone || 'N/A'}
            </a>
          </div>
        </div>
      </div>
      
      {/* --- NEW: Action Buttons --- */}
      <div className="flex border-t border-gray-700">
        <button
          onClick={() => onEdit(contact)}
          className="flex-1 p-3 text-sm font-medium text-indigo-400 hover:bg-gray-700 flex justify-center items-center gap-2 transition-colors"
        >
          <PencilIcon className="h-4 w-4" />
          Edit
        </button>
        <div className="w-px bg-gray-700"></div> {/* Vertical divider */}
        <button
          onClick={() => onDelete(contact.id)}
          className="flex-1 p-3 text-sm font-medium text-red-400 hover:bg-gray-700 flex justify-center items-center gap-2 transition-colors"
        >
          <TrashIcon className="h-4 w-4" />
          Delete
        </button>
      </div>
    </div>
  );
}