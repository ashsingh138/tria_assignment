import { create } from 'zustand'; // <-- CORRECTED IMPORT
import { MOCK_CONTACTS } from '../data/mockContacts';

const LOCAL_STORAGE_KEY = 'myContacts';

// Helper to get initial contacts
const getInitialContacts = () => {
  try {
    const storedContacts = localStorage.getItem(LOCAL_STORAGE_KEY);
    if (storedContacts) {
      return JSON.parse(storedContacts);
    } else {
      // No contacts in storage, fetch from "API"
      // In a real app, this would be an async fetch
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(MOCK_CONTACTS));
      return MOCK_CONTACTS;
    }
  } catch (err) {
    console.error('Failed to load contacts:', err);
    return MOCK_CONTACTS; // Fallback
  }
};

// Create the store
export const useContactStore = create((set, get) => ({
  // --- STATE ---
  contacts: getInitialContacts(),
  isLoading: false, // We load synchronously from localStorage, so false
  error: null,

  // --- ACTIONS ---

  // All actions will update state AND persist to localStorage
  addContact: (contactData) => {
    const newContact = {
      ...contactData,
      id: Date.now(),
      isFavorite: false,
    };
    set((state) => {
      const updatedContacts = [newContact, ...state.contacts];
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(updatedContacts));
      return { contacts: updatedContacts };
    });
  },

  updateContact: (contactId, contactData) => {
    set((state) => {
      const updatedContacts = state.contacts.map((c) =>
        c.id === contactId ? { ...c, ...contactData } : c
      );
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(updatedContacts));
      return { contacts: updatedContacts };
    });
  },

  deleteContact: (contactId) => {
    set((state) => {
      const updatedContacts = state.contacts.filter((c) => c.id !== contactId);
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(updatedContacts));
      return { contacts: updatedContacts };
    });
  },

  toggleFavorite: (contactId) => {
    set((state) => {
      const updatedContacts = state.contacts.map((c) =>
        c.id === contactId ? { ...c, isFavorite: !c.isFavorite } : c
      );
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(updatedContacts));
      return { contacts: updatedContacts };
    });
  },

  // --- SELECTORS ---
  // A selector to find a single contact by ID
  getContactById: (contactId) => {
    // Convert contactId to number just in case it's a string from URL params
    const id = Number(contactId);
    return get().contacts.find((c) => c.id === id);
  },
}));