import { Routes, Route } from 'react-router-dom';
import ContactListPage from './pages/ContactListPage';
import ContactDetailPage from './pages/ContactDetailPage';
import Header from './components/Header';

export default function App() {
  return (
    <div className="min-h-screen">
      <Header />
      <main className="container mx-auto max-w-4xl px-4 py-8">
        <Routes>
          <Route path="/" element={<ContactListPage />} />
          <Route path="/contact/:contactId" element={<ContactDetailPage />} />
          {/* Add more routes here, e.g., a 404 page */}
          <Route path="*" element={<ContactListPage />} /> {/* Fallback to home */}
        </Routes>
      </main>
    </div>
  );
}