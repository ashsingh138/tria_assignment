# Tria Contact List - Frontend Assignment

This is a dynamic, single-page contact list application built for the Tria frontend development assignment. It demonstrates a complete CRUD (Create, Read, Update, Delete) workflow, efficient state management with React hooks, and a focus on a polished user experience.

**Deployed Application URL:** `https://triaassignment.netlify.app/`

---

##  Features

This project implements all core requirements and several advanced features to demonstrate product sense and technical skill.

* **Full CRUD Functionality:**
    * **Create:** Add new contacts to the list via a responsive modal.
    * **Read:** View all contacts in a clean, responsive card grid.
    * **Update:** Edit any contact's information using the same intelligent modal.
    * **Delete:** Remove contacts from the list with a simple confirmation step.

* **Interactive UI & UX:**
    * **Real-time Search:** Filter the contact list instantly by name.
    * **Debounced Input:** The search input is "debounced" by 300ms. This is a performance optimization that waits for the user to stop typing before filtering, preventing excessive re-renders on a large list or spamming an API.
    * **Toast Notifications:** The app uses `react-hot-toast` to provide non-intrusive feedback for all CRUD operations (e.g., "Contact added!", "Contact deleted.").
    * **Rich UI States:** The application provides clear user feedback for all possible states:
        * **Loading State:** A spinner is shown while the initial data is "fetched."
        * **Empty State:** A helpful message is shown if the contact list is empty.
        * **No Results State:** A different message is shown if a search yields no results.
        * **Error State:** A panel is displayed if the mock data fails to load.

* **Data Persistence:**
    * **Local Storage:** The contact list is saved to the browser's **Local Storage**. All changes (adds, edits, and deletes) persist even after the user refreshes the page, creating a stateful, real-world experience.

---

##  Tech Stack & Libraries Used

* **React:** The core library for building the user interface with a component-based architecture.
* **Vite:** The build tool and development server. Chosen for its blazing-fast HMR (Hot Module Replacement) and modern, ESM-based architecture, which provides a superior developer experience.
* **Tailwind CSS:** A utility-first CSS framework. Chosen to rapidly build a modern, responsive, and custom-designed UI without writing a single line of traditional CSS.
    * `@tailwindcss/forms`: A Tailwind plugin used to provide sensible, styled defaults for form elements.
* **Heroicons:** A high-quality set of SVG icons used throughout the application for a clean and professional look.
* **react-hot-toast:** A lightweight and customizable library for adding toast notifications. Chosen for its simplicity and elegant API.

---

##  How to Set Up and Run Locally

1.  **Clone the Repository:**
    ```bash
    git clone https://github.com/ashsingh138/tria_assignment.git
    cd tria_contactlist
    ```

2.  **Install Dependencies:**
    (This will install React, Vite, Tailwind, Heroicons, etc.)
    ```bash
    npm install
    ```

3.  **Run the Development Server:**
    ```bash
    npm run dev
    ```

4.  **Open in Browser:**
    The application will be available at `http://localhost:5173`.

---

##  Assumptions & Design Choices

The assignment intentionally left some details open. Here are the key assumptions and design decisions I made:

1.  **State Management:**
    * All application state (e.g., `contacts`, `searchQuery`, `isLoading`) is managed within the top-level `App.jsx` component using React's built-in hooks (`useState`, `useEffect`, `useMemo`, `useCallback`).
    * This "lifting state up" pattern is efficient and sufficient for an application of this scale. It avoids the premature overhead of external libraries (like Redux) or the Context API.
    * `useCallback` was used for the `onEdit` and `onDelete` handlers passed to `ContactCard` to prevent unnecessary re-renders of list items.

2.  **Data Fetching & Local Storage:**
    * To demonstrate handling asynchronous data, the app *simulates* an API call on first load.
    * It then adopts a **"Local Storage-first"** strategy. On load, it *first* checks for contacts in `localStorage`. If found, it uses that data. If not, it fetches the mock data (simulating a first-time user).
    * All subsequent changes are saved directly to `localStorage`, making it the single source of truth after the initial load.

3.  **Reusable Modal Component:**
    * A single, "smart" modal component (`AddContactModal.jsx`) is used for *both* adding and editing contacts.
    * It dynamically changes its title, button text, and form fields based on a `contactToEdit` prop. If this prop is `null`, the modal is in "Add" mode. If it contains a contact object, it switches to "Edit" mode and pre-fills the form. This is a highly reusable and common pattern.

4.  **Confirmation on Delete:**
    * To prevent accidental data loss, a simple `window.confirm()` browser dialogue is used before deleting a contact. In a production app, this would be a custom-styled confirmation modal, but `window.confirm()` is a quick and effective way to demonstrate the intended UX.

5.  **AI Usage:**
    * AI was used as a development partner throughout this assignment.
    * It helped scaffold the initial project structure, write boilerplate (like the mock data and the `README` structure), and act as a "rubber duck" for debugging and brainstorming new features (like debouncing and local storage).
    * All code was ultimately written, reviewed, and refactored by me to ensure correctness, maintainability, and a coherent application architecture that meets the assignment's goals.