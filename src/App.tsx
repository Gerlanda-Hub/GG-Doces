import { HashRouter, Routes, Route, useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import { AppProvider } from './contexts/AppContext';
import { ThemeProvider } from './contexts/ThemeContext';
import { LanguageProvider } from './i18n/LanguageContext';
import { isNative } from './capacitor/plugins';
import Navbar from './components/Navbar';
import AppHeader from './components/AppHeader';
import MobileNav from './components/MobileNav';
import Footer from './components/Footer';
import WhatsAppButton from './components/WhatsAppButton';
import ChatBot from './components/ChatBot';
import CookieConsent from './components/CookieConsent';
import OfflineBanner from './components/OfflineBanner';
import { setupPushNotifications } from './capacitor/notifications';
import Home from './pages/Home';
import OrderForm from './pages/OrderForm';
import TrackOrder from './pages/TrackOrder';
import Contact from './pages/Contact';
import About from './pages/About';
import PrivacyPolicy from './pages/PrivacyPolicy';
import ClientLogin from './pages/ClientLogin';
import ClientDashboard from './pages/ClientDashboard';
import AdminLogin from './pages/AdminLogin';
import AdminDashboard from './pages/AdminDashboard';
import Settings from './pages/Settings';

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => { window.scrollTo(0, 0); }, [pathname]);
  return null;
}

// Layout para o SITE (navegador) — tudo visível
function SiteLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Navbar />
      <OfflineBanner />
      {children}
      <Footer />
      <WhatsAppButton />
      <ChatBot />
      <CookieConsent />
    </>
  );
}

// Layout para a APP (APK nativo) — cabeçalho compacto + navegação inferior
function AppLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <AppHeader />
      <OfflineBanner />
      <div className="pb-20">{children}</div>
      <ChatBot />
      <MobileNav />
    </>
  );
}

import { useNavigate } from 'react-router-dom';

function GlobalAdminShortcut() {
  const navigate = useNavigate();

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.ctrlKey && e.shiftKey && e.key.toLowerCase() === 'a') {
        e.preventDefault();
        navigate('/admin');
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [navigate]);

  return null;
}

export default function App() {
  // Configurar push notifications na app nativa
  useEffect(() => {
    setupPushNotifications();
  }, []);

  // Escolhe o layout baseado em Site vs App nativa
  const Layout = isNative() ? AppLayout : SiteLayout;

  return (
    <LanguageProvider>
    <ThemeProvider>
      <AppProvider>
        <HashRouter>
          <ScrollToTop />
          <GlobalAdminShortcut />
          <Routes>
            {/* Public routes */}
            <Route path="/" element={<Layout><Home /></Layout>} />
            <Route path="/sobre" element={<Layout><About /></Layout>} />
            <Route path="/politica-privacidade" element={<Layout><PrivacyPolicy /></Layout>} />

            <Route path="/encomendar" element={<Layout><OrderForm /></Layout>} />
            <Route path="/consultar" element={<Layout><TrackOrder /></Layout>} />
            <Route path="/contato" element={<Layout><Contact /></Layout>} />
            <Route path="/definicoes" element={<Settings />} />

            {/* Client routes */}
            <Route path="/cliente" element={<ClientLogin />} />
            <Route path="/cliente/painel" element={<ClientDashboard />} />

            {/* Admin routes */}
            <Route path="/admin" element={<AdminLogin />} />
            <Route path="/admin/painel" element={<AdminDashboard />} />
          </Routes>
        </HashRouter>
      </AppProvider>
    </ThemeProvider>
    </LanguageProvider>
  );
}
