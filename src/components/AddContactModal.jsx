import { useState, useEffect } from 'react';
import { useContactStore } from '../store/contactStore';
import toast from 'react-hot-toast';
import { UserPlusIcon, PencilIcon, XMarkIcon } from '@heroicons/react/24/solid';

export default function AddContactModal({ isOpen, onClose, contactToEdit }) {
  // --- Get actions from Zustand store ---

  //
  const addContact = useContactStore((state) => state.addContact);
  const updateContact = useContactStore((state) => state.updateContact);

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');

  // Sync form state with the contact being edited
  useEffect(() => {
    if (contactToEdit) {
      setName(contactToEdit.name);
      setEmail(contactToEdit.email);
      setPhone(contactToEdit.phone || '');
    } else {
      setName('');
      setEmail('');
      setPhone('');
    }
  }, [contactToEdit, isOpen]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name || !email) {
      alert('Name and Email are required.');
      return;
    }
    
    const contactData = { name, email, phone };

    if (isEditing) {
      updateContact(contactToEdit.id, contactData);
      toast.success('Contact updated!');
    } else {
      addContact(contactData);
      toast.success('Contact added!');
    }
    
    onClose(); // Close the modal
  };

  const isEditing = !!contactToEdit;
  const modalTitle = isEditing ? 'Edit Contact' : 'Add New Contact';
  const saveButtonText = isEditing ? 'Save Changes' : 'Save Contact';
  const icon = isEditing ? (
    <PencilIcon className="h-7 w-7 text-indigo-400 mr-3" />
  ) : (
    <UserPlusIcon className="h-7 w-7 text-indigo-400 mr-3" />
  );

  if (!isOpen) return null;

  return (
    // Backdrop
    <div
      onClick={onClose}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-70 backdrop-blur-sm"
    >
      {/* Modal */}
      <div
        onClick={(e) => e.stopPropagation()}
        className="relative w-full max-w-md p-8 bg-gray-800 rounded-lg shadow-2xl m-4"
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-white"
        >
          <XMarkIcon className="h-6 w-6" />
        </button>
        
        <h2 className="text-2xl font-bold text-white mb-6 flex items-center">
          {icon}
          {modalTitle}
        </h2>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-300">
              Name
            </label>
            <input
              type="text"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              className="mt-1 block w-full rounded-md border-0 bg-gray-700 py-2 px-3 text-white shadow-sm ring-1 ring-inset ring-gray-600 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-500"
            />
          </div>
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-300">
              Email
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="mt-1 block w-full rounded-md border-0 bg-gray-700 py-2 px-3 text-white shadow-sm ring-1 ring-inset ring-gray-600 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-500"
            />
          </div>
          <div>
            <label htmlFor="phone" className="block text-sm font-medium text-gray-300">
              Phone
            </label>
            <input
              type="tel"
              id="phone"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="mt-1 block w-full rounded-md border-0 bg-gray-700 py-2 px-3 text-white shadow-sm ring-1 ring-inset ring-gray-600 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-500"
            />
          </div>
          <div className="flex justify-end pt-4">
            <button
              type="button"
              onClick={onClose}
              className="mr-3 rounded-md bg-gray-600 px-4 py-2 text-sm font-medium text-white hover:bg-gray-500"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="rounded-md bg-indigo-600 px-4 py-2 text-sm font-medium text-white hover:bg-indigo-700"
            >
              {saveButtonText}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}