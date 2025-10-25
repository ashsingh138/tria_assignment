import { useParams, Link } from 'react-router-dom';
import { useContactStore } from '../store/contactStore';
import Avatar from '../components/Avatar';
import { ArrowLeftIcon, EnvelopeIcon, PhoneIcon, StarIcon } from '@heroicons/react/24/solid';

export default function ContactDetailPage() {
  const { contactId } = useParams();
  
  //
  // THE FIX: Select these individually.
  //
  const getContactById = useContactStore((state) => state.getContactById);
  const toggleFavorite = useContactStore((state) => state.toggleFavorite);

  const contact = getContactById(contactId);

  if (!contact) {
    return (
      <div className="text-center">
        <h2 className="text-2xl font-bold text-white mb-4">Contact not found</h2>
        <Link
          to="/"
          className="inline-flex items-center gap-2 text-indigo-400 hover:text-indigo-300"
        >
          <ArrowLeftIcon className="h-5 w-5" />
          Back to all contacts
        </Link>
      </div>
    );
  }

  return (
    <div>
      <Link
        to="/"
        className="inline-flex items-center gap-2 text-indigo-400 hover:text-indigo-300 mb-6"
      >
        <ArrowLeftIcon className="h-5 w-5" />
        Back to all contacts
      </Link>

      <div className="bg-gray-800 rounded-lg shadow-xl p-8 max-w-lg mx-auto">
        <div className="flex flex-col items-center">
          <div className="relative">
            <Avatar name={contact.name} size="large" />
            <button
              onClick={() => toggleFavorite(contact.id)}
              className="absolute -top-2 -right-2 p-2 bg-gray-700 rounded-full text-gray-400 hover:text-yellow-400 transition"
              title={contact.isFavorite ? 'Remove from favorites' : 'Add to favorites'}
            >
              <StarIcon
                className={`h-6 w-6 ${
                  contact.isFavorite ? 'text-yellow-400' : 'text-gray-400'
                }`}
              />
            </button>
          </div>
          <h1 className="text-4xl font-bold text-white mt-6">{contact.name}</h1>
          <div className="mt-6 flex flex-col space-y-4 text-lg text-gray-300 w-full">
            <div className="flex items-center space-x-4">
              <EnvelopeIcon className="h-6 w-6 text-gray-500" />
              <a href={`mailto:${contact.email}`} className="hover:text-indigo-300">
                {contact.email}
              </a>
            </div>
            <div className="flex items-center space-x-4">
              <PhoneIcon className="h-6 w-6 text-gray-500" />
              <a href={`tel:${contact.phone}`} className="hover:text-indigo-300">
                {contact.phone || 'N/A'}
              </a>
            </div>
          </div>
          {/* Add more fields here like Address, Notes, etc. */}
        </div>
      </div>
    </div>
  );
}