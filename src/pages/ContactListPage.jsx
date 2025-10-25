import { useState, useMemo, useEffect } from 'react';
import { useContactStore } from '../store/contactStore';
import toast from 'react-hot-toast';
import SearchBar from '../components/SearchBar';
import ContactList from '../components/ContactList';
import LoadingSpinner from '../components/LoadingSpinner';
import ErrorDisplay from '../components/ErrorDisplay';
import AddContactModal from '../components/AddContactModal';
import ConfirmModal from '../components/ConfirmModal';
import { StarIcon } from '@heroicons/react/24/outline';
import { StarIcon as StarIconSolid } from '@heroicons/react/24/solid';

export default function ContactListPage() {
  // --- Get state and actions from Zustand store ---
  //
  // THE FIX: Select each value individually.
  // This ensures the component only re-renders if one of these *specific* values changes.
  //
  const contacts = useContactStore((state) => state.contacts);
  const isLoading = useContactStore((state) => state.isLoading);
  const error = useContactStore((state) => state.error);
  const deleteContact = useContactStore((state) => state.deleteContact);

  // --- Page-specific UI state ---
  const [searchTerm, setSearchTerm] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [sortFavorites, setSortFavorites] = useState(false);
  
  // Modal states
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [contactToEdit, setContactToEdit] = useState(null);
  const [contactToDelete, setContactToDelete] = useState(null);

  // --- Search Debouncing ---
  useEffect(() => {
    const timerId = setTimeout(() => setSearchQuery(searchTerm), 300);
    return () => clearTimeout(timerId);
  }, [searchTerm]);

  // --- Memoized Filtering & Sorting ---
  const filteredContacts = useMemo(() => {
    let filtered = contacts.filter((contact) =>
      contact.name.toLowerCase().includes(searchQuery.toLowerCase())
    );

    if (sortFavorites) {
      filtered.sort((a, b) => (a.isFavorite === b.isFavorite ? 0 : a.isFavorite ? -1 : 1));
    }
    
    return filtered;
  }, [contacts, searchQuery, sortFavorites]);

  // --- Modal Handlers ---
  const handleOpenAddModal = () => {
    setContactToEdit(null);
    setIsAddModalOpen(true);
  };

  const handleOpenEditModal = (contact) => {
    setContactToEdit(contact);
    setIsAddModalOpen(true);
  };

  const handleCloseAddModal = () => {
    setIsAddModalOpen(false);
    setContactToEdit(null);
  };

  const handleOpenDeleteModal = (contact) => {
    setContactToDelete(contact);
    setIsDeleteModalOpen(true);
  };

  const handleCloseDeleteModal = () => {
    setIsDeleteModalOpen(false);
    setContactToDelete(null);
  };

  const handleConfirmDelete = () => {
    if (contactToDelete) {
      deleteContact(contactToDelete.id);
      toast.error('Contact deleted.');
      handleCloseDeleteModal();
    }
  };
  
  // --- Render Logic ---
  const renderContent = () => {
    if (isLoading) return <LoadingSpinner />;
    if (error) return <ErrorDisplay message={error} />;

    if (filteredContacts.length === 0 && searchQuery) {
      return <p className="text-center text-gray-400 mt-10">No contacts found for "{searchQuery}".</p>;
    }
    if (contacts.length === 0) {
      return <p className="text-center text-gray-400 mt-10">Your contact list is empty.</p>;
    }
    
    return (
      <ContactList
        contacts={filteredContacts}
        onEdit={handleOpenEditModal}
        onDelete={handleOpenDeleteModal}
      />
    );
  };

  return (
    <>
      <div className="flex flex-col sm:flex-row justify-between items-center gap-4 mb-8">
        <div className="w-full sm:w-auto flex-grow">
          <SearchBar searchValue={searchTerm} onSearchChange={setSearchTerm} />
        </div>
        <div className="flex gap-2 w-full sm:w-auto">
          <button
            onClick={() => setSortFavorites(!sortFavorites)}
            title="Sort by favorites"
            className="flex-shrink-0 bg-gray-700 hover:bg-gray-600 text-white font-bold py-3 px-4 rounded-lg transition-colors duration-200"
          >
            {sortFavorites ? (
              <StarIconSolid className="h-6 w-6 text-yellow-400" />
            ) : (
              <StarIcon className="h-6 w-6 text-gray-400" />
            )}
          </button>
          <button
            onClick={handleOpenAddModal}
            className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3 px-6 rounded-lg transition-colors duration-200"
          >
            Add Contact
          </button>
        </div>
      </div>

      {renderContent()}

      {/* --- Modals --- */}
      <AddContactModal
        isOpen={isAddModalOpen}
        onClose={handleCloseAddModal}
        contactToEdit={contactToEdit}
      />
      
      <ConfirmModal
        isOpen={isDeleteModalOpen}
        onClose={handleCloseDeleteModal}
        onConfirm={handleConfirmDelete}
        title="Delete Contact"
        message={`Are you sure you want to delete ${contactToDelete?.name}? This action cannot be undone.`}
      />
    </>
  );
}