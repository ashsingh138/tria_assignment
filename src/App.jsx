import { useState, useEffect, useMemo, useCallback } from 'react';
import toast from 'react-hot-toast';
import { MOCK_CONTACTS } from './data/mockContacts';
import Header from './components/Header';
import SearchBar from './components/SearchBar';
import ContactList from './components/ContactList';
import LoadingSpinner from './components/LoadingSpinner';
import ErrorDisplay from './components/ErrorDisplay';
import AddContactModal from './components/AddContactModal';

// Mock API function (only used if local storage is empty)
const fetchContactsFromAPI = () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(MOCK_CONTACTS);
    }, 1000); // 1s delay
  });
};

const LOCAL_STORAGE_KEY = 'myContacts';

export default function App() {
  // State for the full list of contacts
  const [contacts, setContacts] = useState([]);
  
  // State for the search bar input (what the user is typing)
  const [searchTerm, setSearchTerm] = useState('');
  // State for the debounced search query (what we filter by)
  const [searchQuery, setSearchQuery] = useState('');

  // State for API interaction
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  
  // State for the modal
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  // NEW: State to hold the contact being edited
  const [contactToEdit, setContactToEdit] = useState(null);

  // --- Data Fetching & Persistence ---

  // 1. Load contacts from Local Storage or API on initial mount
  useEffect(() => {
    setIsLoading(true);
    try {
      const storedContacts = localStorage.getItem(LOCAL_STORAGE_KEY);
      if (storedContacts) {
        setContacts(JSON.parse(storedContacts));
      } else {
        // No contacts in storage, fetch from "API"
        fetchContactsFromAPI()
          .then((data) => {
            setContacts(data);
          })
          .catch((err) => {
            setError(err.message || 'Failed to fetch contacts');
          });
      }
    } catch (err) {
      setError('Failed to load contacts from storage.');
    } finally {
      setIsLoading(false);
    }
  }, []); // Empty dependency array, runs once

  // 2. Save contacts to Local Storage whenever they change
  useEffect(() => {
    // Don't save if we are still in the initial loading state
    if (!isLoading) {
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(contacts));
    }
  }, [contacts, isLoading]);

  // --- Search Debouncing ---

  // 3. Effect to debounce the search term
  useEffect(() => {
    // Set up a timer
    const timerId = setTimeout(() => {
      setSearchQuery(searchTerm); // Update the "real" query after 300ms
    }, 300);

    // Cleanup function: clear the timer if the user types again
    return () => {
      clearTimeout(timerId);
    };
  }, [searchTerm]); // Re-run whenever the user's typing changes

  // --- State Derivation ---

  // 4. Memoized derived state for filtered contacts
  // Now depends on 'searchQuery' (the debounced value)
  const filteredContacts = useMemo(() => {
    return contacts.filter((contact) =>
      contact.name.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [contacts, searchQuery]);

  // --- CRUD Handlers ---

  // 5. Handler for opening the modal to ADD a contact
  const handleOpenAddModal = () => {
    setContactToEdit(null); // Ensure no contact is being edited
    setIsModalOpen(true);
  };

  // 6. Handler for opening the modal to EDIT a contact
  // useCallback is used for performance, so this function isn't
  // re-created on every render, which is good for prop-drilling
  const handleOpenEditModal = useCallback((contact) => {
    setContactToEdit(contact); // Set the contact to edit
    setIsModalOpen(true);
  }, []);

  // 7. Handler for closing the modal
  const handleCloseModal = () => {
    setIsModalOpen(false);
    setContactToEdit(null); // Always clear the edit state on close
  };

  // 8. Handler for SAVING a contact (handles both Add and Edit)
  const handleSaveContact = (contactData) => {
    if (contactToEdit) {
      // --- UPDATE LOGIC ---
      setContacts((prevContacts) =>
        prevContacts.map((c) =>
          c.id === contactToEdit.id ? { ...c, ...contactData } : c
        )
      );
      toast.success('Contact updated!');
    } else {
      // --- ADD LOGIC ---
      const newContact = {
        ...contactData,
        id: Date.now(), // Simple unique ID
        avatar: `https://i.pravatar.cc/150?img=${Math.floor(Math.random() * 70) + 1}`,
      };
      setContacts([newContact, ...contacts]);
      toast.success('Contact added!');
    }
    handleCloseModal(); // Close modal on success
  };

  // 9. Handler for DELETING a contact
  const handleDeleteContact = useCallback((contactId) => {
    // Basic confirmation
    if (window.confirm('Are you sure you want to delete this contact?')) {
      setContacts((prevContacts) =>
        prevContacts.filter((c) => c.id !== contactId)
      );
      toast.error('Contact deleted.');
    }
  }, []);

  // --- Content Rendering ---

  const renderContent = () => {
    if (isLoading) {
      return <LoadingSpinner />;
    }
    if (error) {
      return <ErrorDisplay message={error} />;
    }
    if (filteredContacts.length === 0 && searchQuery) {
      return (
        <p className="text-center text-gray-400 mt-10">
          No contacts found for "{searchQuery}".
        </p>
      );
    }
    if (contacts.length === 0) {
      return (
        <p className="text-center text-gray-400 mt-10">
          Your contact list is empty. Add a new contact to get started!
        </p>
      );
    }
    return (
      <ContactList
        contacts={filteredContacts}
        onEdit={handleOpenEditModal}
        onDelete={handleDeleteContact}
      />
    );
  };

  return (
    <div className="min-h-screen">
      <Header />
      <main className="container mx-auto max-w-4xl px-4 py-8">
        <div className="flex flex-col sm:flex-row justify-between items-center gap-4 mb-8">
          <div className="w-full sm:w-auto flex-grow">
            <SearchBar
              // Pass the instant value and setter to the input
              searchValue={searchTerm}
              onSearchChange={setSearchTerm}
            />
          </div>
          <button
            onClick={handleOpenAddModal}
            className="w-full sm:w-auto bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3 px-6 rounded-lg transition-colors duration-200"
          >
            Add Contact
          </button>
        </div>

        {renderContent()}
      </main>

      {/* Render the modal conditionally */}
      <AddContactModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        onSave={handleSaveContact}
        // Pass the contact to edit (will be null for 'Add')
        contactToEdit={contactToEdit}
      />
    </div>
  );
}