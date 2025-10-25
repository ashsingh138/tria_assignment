import { Link } from 'react-router-dom';
import { EnvelopeIcon, PhoneIcon, PencilIcon, TrashIcon, StarIcon } from '@heroicons/react/24/solid';
import { StarIcon as StarIconOutline } from '@heroicons/react/24/outline';
import Avatar from './Avatar';
import { useContactStore } from '../store/contactStore';
import toast from 'react-hot-toast';

export default function ContactCard({ contact, onEdit, onDelete }) {

  const toggleFavorite = useContactStore((state) => state.toggleFavorite);

  const handleFavoriteClick = (e) => {
    e.preventDefault(); // Stop the <Link> from navigating
    e.stopPropagation(); // Stop event bubbling
    toggleFavorite(contact.id);
    toast.success(contact.isFavorite ? 'Removed from favorites' : 'Added to favorites');
  };

  const handleEditClick = (e) => {
    e.preventDefault();
    e.stopPropagation();
    onEdit(contact);
  };
  
  const handleDeleteClick = (e) => {
    e.preventDefault();
    e.stopPropagation();
    onDelete(contact);
  };

  return (
    <Link
      to={`/contact/${contact.id}`}
      className="flex flex-col rounded-lg bg-gray-800 shadow-md overflow-hidden transition-all duration-300 hover:shadow-xl hover:scale-105"
    >
      <div className="relative flex flex-col items-center p-6 flex-grow">
        <button
          onClick={handleFavoriteClick}
          className="absolute top-4 right-4 p-1 text-gray-400 hover:text-yellow-400 transition"
          title={contact.isFavorite ? 'Remove from favorites' : 'Add to favorites'}
        >
          {contact.isFavorite ? (
            <StarIcon className="h-6 w-6 text-yellow-400" />
          ) : (
            <StarIconOutline className="h-6 w-6" />
          )}
        </button>

        <Avatar name={contact.name} size="medium" />
        
        <h2 className="mt-4 text-xl font-semibold text-white truncate w-full text-center">
          {contact.name}
        </h2>
        
        <div className="mt-4 flex flex-col space-y-2 text-sm text-gray-400 w-full">
          <div className="flex items-center space-x-2">
            <EnvelopeIcon className="h-5 w-5 text-gray-500 flex-shrink-0" />
            <span className="truncate" title={contact.email}>
              {contact.email}
            </span>
          </div>
          <div className="flex items-center space-x-2">
            <PhoneIcon className="h-5 w-5 text-gray-500 flex-shrink-0" />
            <span className="truncate">
              {contact.phone || 'N/A'}
            </span>
          </div>
        </div>
      </div>
      
      {/* Action Buttons */}
      <div className="flex border-t border-gray-700">
        <button
          onClick={handleEditClick}
          className="flex-1 p-3 text-sm font-medium text-indigo-400 hover:bg-gray-700 flex justify-center items-center gap-2 transition-colors"
        >
          <PencilIcon className="h-4 w-4" />
          Edit
        </button>
        <div className="w-px bg-gray-700"></div> {/* Vertical divider */}
        <button
          onClick={handleDeleteClick}
          className="flex-1 p-3 text-sm font-medium text-red-400 hover:bg-gray-700 flex justify-center items-center gap-2 transition-colors"
        >
          <TrashIcon className="h-4 w-4" />
          Delete
        </button>
      </div>
    </Link>
  );
}