import React, { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { ProviderComparison } from './components/ProviderComparison';
import { Features } from './components/Features';
import { HowItWorks } from './components/HowItWorks';
import { Testimonials } from './components/Testimonials';
import { FAQ } from './components/FAQ';
import { Footer } from './components/Footer';
import { AuthProvider } from './contexts/AuthContext';
import { SearchProvider } from './contexts/SearchContext';
import { LoginForm } from './components/auth/LoginForm';
import { RegisterForm } from './components/auth/RegisterForm';
import { AdminDashboard } from './components/admin/AdminDashboard';
import { useAuth } from './contexts/AuthContext';

function AppContent() {
  const { user } = useAuth();
  const [showRegister, setShowRegister] = useState(false);
  const [showLogin, setShowLogin] = useState(false);

  // Function to switch from register to login
  const switchToLogin = () => {
    setShowRegister(false);
    setShowLogin(true);
    
  };
  

  // Function to switch from login to register
  const switchToRegister = () => {
    setShowLogin(false);
    setShowRegister(true);
  };

  // Prevent background scroll when modal is open
  useEffect(() => {
    if (showLogin || showRegister) {
      document.body.classList.add('overflow-hidden');
    } else {
      document.body.classList.remove('overflow-hidden');
    }
  }, [showLogin, showRegister]);

  if (user?.role === 'admin') {
    return <AdminDashboard />;
  }

  return (
    <div className="flex flex-col min-h-screen bg-white">
      <Header
        onRegisterClick={() => setShowRegister(true)}
        onLoginClick={() => setShowLogin(true)}
      />

      {showRegister && (
        <RegisterForm
          onClose={() => setShowRegister(false)}
          onSuccess={() => setShowRegister(false)}
          onSwitchToLogin={switchToLogin}
        />
      )}

      {showLogin && (
        <LoginForm
          onClose={() => setShowLogin(false)}
          onSuccess={() => setShowLogin(false)}
          onSwitchToRegister={switchToRegister}
        />
      )}

      <main className="flex-grow">
        <Hero />
        <Features />
        <ProviderComparison />
        <HowItWorks />
        <Testimonials />
        <FAQ />
      </main>

      <Footer />
    </div>
  );
}

export function App() {
  return (
    <AuthProvider>
      <SearchProvider>
        <AppContent />
      </SearchProvider>
    </AuthProvider>
  );
}
