# MyContact - Tria Frontend Assignment

This is a dynamic, single-page contact list application built with React. It demonstrates a scalable, production-grade architecture using **global state management (Zustand)** and **client-side routing (React Router)** to provide a complete CRUD (Create, Read, Update, Delete) experience.

**Deployed Application URL:** `https://triaassignment.netlify.app/`

-----

##  Features

This project implements all core requirements and several advanced features to demonstrate product sense and technical skill.

  * **Full CRUD Functionality:**

      * **Create:** Add new contacts to the list via a responsive modal.
      * **Read:** View all contacts in a clean, responsive card grid.
      * **Update:** Edit any contact's information using the same intelligent modal.
      * **Delete:** Remove contacts from the list with a custom, reusable confirmation modal.

  * **Advanced State & Navigation:**

      * **Global State (Zustand):** All application state (contacts, loading status) and business logic (CRUD actions) are managed in a central Zustand store.
      * **Client-Side Routing (React Router):** The app is structured with multiple "pages":
          * `/`: The main contact list page.
          * `/contact/:id`: A dedicated detail page for each contact.
      * **Favorite Contacts:** Users can mark/unmark contacts as "favorites."
      * **Sort by Favorites:** A toggle on the main page allows users to sort their favorite contacts to the top of the list.

  * **Interactive UI & UX:**

      * **Debounced Search:** The search input is "debounced" by 300ms to prevent excessive re-renders and improve performance.
      * **Initials Avatars:** Dynamically generated, colored avatars based on contact initials provide a consistent and professional UI.
      * **Custom Modals:** A reusable "smart" modal is used for adding/editing, and a custom confirmation modal is used for deleting contacts.
      * **Toast Notifications:** Uses `react-hot-toast` to provide non-intrusive feedback for all user actions (add, update, delete, favorite).
      * **Rich UI States:** Provides clear user feedback for loading, error, empty list, and "no search results" states.

  * **Data Persistence:**

      * **Local Storage:** The entire contact list, including "favorite" status, is saved to the browser's **Local Storage**. All changes persist even after the user refreshes the page.

-----

## 🛠️ Tech Stack & Libraries Used

  * **React:** The core library for building the user interface.
  * **Vite:** The build tool and development server, chosen for its speed.
  * **React Router (v6):** Used for all client-side navigation and routing.
  * **Zustand:** A simple, fast, and scalable global state manager for handling all contact data and logic.
  * **Tailwind CSS:** A utility-first CSS framework for rapid, custom UI development.
      * `@tailwindcss/forms`: A plugin for beautifully resetting and styling form elements.
  * **Heroicons:** A high-quality set of SVG icons used throughout the application.
  * **react-hot-toast:** A lightweight and customizable library for adding toast notifications.

-----

## 🚀 How to Set Up and Run Locally

1.  **Clone the Repository:**

    ```bash
    git clone https://github.com/ashsingh138/tria_assignment.git
    cd tria_contactlist
    ```

2.  **Install Dependencies:**
    (This will install React, Vite, Zustand, React Router, etc.)

    ```bash
    npm install
    ```

3.  **Run the Development Server:**

    ```bash
    npm run dev
    ```

4.  **Open in Browser:**
    The application will be available at `http://localhost:5173`.

-----

## 🧠 Assumptions & Design Choices

The assignment intentionally left some details open. Here are the key assumptions and design decisions I made:

1.  **State Management (Zustand):**

      * Zustand was chosen for global state management. For an app of this scale, it provides the perfect balance of simplicity and power, avoiding the boilerplate of Redux or the performance/provider-nesting issues of Context.
      * All business logic (CRUD, local storage) is co-located in the `contactStore.js` file, making components "dumber" and easier to maintain.

2.  **Application Architecture (Routing):**

      * The application is structured with **React Router** to provide a multi-page experience.
      * It is split into a `pages/` directory (for routable components like `ContactListPage`) and a `components/` directory (for reusable UI elements like `Avatar` or `ConfirmModal`). This is a standard, scalable pattern.

3.  **Data Fetching & Local Storage:**

      * The app uses a **"Local Storage-first"** strategy. All interactions with `localStorage` are abstracted away inside the Zustand store.
      * Components simply call actions (e.g., `addContact()`) and the store handles both updating the in-memory state *and* persisting that change to `localStorage`.

4.  **Reusable Modal Component:**

      * The UI uses two primary modal components: a "smart" `AddContactModal.jsx` for both adding and editing, and a reusable `ConfirmModal.jsx` to provide a non-blocking, theme-consistent confirmation before deleting a contact.

5.  **Avatars:**

      * A custom `Avatar.jsx` component dynamically generates user initials and assigns a consistent background color based on their name. This provides a more professional and consistent UI than using external images.

6.  **AI Usage:**

      * AI  was used as a development partner throughout this assignment. It helped brainstorm the application architecture, write boilerplate code (like mock data),write comments and act as a "rubber duck" for debugging complex logic.
      * All code was ultimately written, reviewed, and refactored by me to ensure correctness, maintainability, and a coherent application architecture.