import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import { CartProvider } from './context/CartContext';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import CartPanel from './components/CartPanel';
import Home from './pages/Home';
import Afisac from './pages/Afisac';
import AfiTextile from './pages/AfiTextile';
import AfiMode from './pages/AfiMode';
import Agroalimentaire from './pages/Agroalimentaire';
import CfpDorcas from './pages/CfpDorcas';
import Fondatrice from './pages/Fondatrice';
import Foires from './pages/Foires';
import Don from './pages/Don';
import Galerie from './pages/Galerie';
import Contact from './pages/Contact';
import Login from './pages/Login';
import Register from './pages/Register';
import ForgotPassword from './pages/ForgotPassword';
import Terms from './pages/Terms';
import Privacy from './pages/Privacy';
import { useTheme } from './context/ThemeContext';

function AppContent() {
  const { dark } = useTheme();
  
  return (
    <HelmetProvider>
      <CartProvider>
        <Router>
          <div 
            className="min-h-screen bg-afi-cream dark:bg-afi-dark-bg transition-colors duration-300 flex flex-col"
            style={{ backgroundColor: dark ? '#1e2433' : '#f5f0e8' }}
          >
            <Navbar />
            <CartPanel />
            <main className="flex-grow">
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/afisac" element={<Afisac />} />
                <Route path="/afi-textile" element={<AfiTextile />} />
                <Route path="/afi-mode" element={<AfiMode />} />
                <Route path="/agroalimentaire" element={<Agroalimentaire />} />
                <Route path="/cfp-dorcas" element={<CfpDorcas />} />
                <Route path="/fondatrice" element={<Fondatrice />} />
                <Route path="/foires" element={<Foires />} />
                <Route path="/don" element={<Don />} />
                <Route path="/galerie" element={<Galerie />} />
                <Route path="/contact" element={<Contact />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/mot-de-passe-oublie" element={<ForgotPassword />} />
                <Route path="/conditions-generales" element={<Terms />} />
                <Route path="/politique-confidentialite" element={<Privacy />} />
              </Routes>
            </main>
            <Footer />
          </div>
        </Router>
      </CartProvider>
    </HelmetProvider>
  );
}

function App() {
  return <AppContent />;
}

export default App;
