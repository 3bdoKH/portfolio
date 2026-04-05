import React, { useState, useEffect, Suspense } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { SpeedInsights } from '@vercel/speed-insights/react';
import { AnalyticsProvider } from './context/AnalyticsContext';
import { ThemeProvider } from './context/ThemeContext';
import Navbar from './components/layout/Navbar';
import Hero from './components/sections/Hero/Hero';
import About from './components/sections/About/About';
import Skills from './components/sections/Skills/Skills';
import Projects from './components/sections/Projects/Projects';
import Experience from './components/sections/Experience/Experience';
import Contact from './components/sections/Contact/Contact';
import Loader from './components/ui/Loader/Loader';
import Cursor from './components/ui/Cursor/Cursor';
import ScrollProgressBar from './components/ui/ScrollProgressBar/ScrollProgressBar';
import KonamiCode from './components/ui/KonamiCode/KonamiCode';
import EasterEggHints from './components/ui/EasterEggHints/EasterEggHints';
import placeholder from './images/placeholder.jpeg';
import './App.css';

// Lazy loaded components for better performance
const AdminLogin = React.lazy(() => import('./pages/AdminLogin/AdminLogin'));
const AdminDashboard = React.lazy(() => import('./pages/AdminDashboard/AdminDashboard'));
const NotFound = React.lazy(() => import('./pages/NotFound/NotFound'));
const isDown = false;
const SarcasticPlaceholder = () => (
  <div style={{
    height: '100vh',
    width: '100vw',
    backgroundColor: '#050510',
    color: '#00f0ff',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    fontFamily: '"Fira Code", monospace, sans-serif',
    textAlign: 'center',
    padding: '20px',
    boxSizing: 'border-box',
    position: 'absolute',
    top: 0,
    left: 0,
    zIndex: 9999
  }}>
    <img src={placeholder} alt="down" />
    <h1 style={{ fontSize: '2.5rem', marginBottom: '20px', textShadow: '0 0 15px rgba(0, 240, 255, 0.5)', letterSpacing: '2px' }}>
      DATABASE IS FUCKING DOWN
    </h1>
    <div style={{ width: '50px', height: '2px', backgroundColor: '#ff003c', marginBottom: '20px', boxShadow: '0 0 10px rgba(255, 0, 60, 0.8)' }}></div>
    <p style={{ fontSize: '1.2rem', color: '#a0a0b0', maxWidth: '600px', lineHeight: '1.6' }}>
      My MongoDB cluster decided to take a vacation. <br />

      Check back later today.
    </p>
  </div>
);

function PortfolioHome() {
  useEffect(() => {
    AOS.init({
      duration: 800,
      once: true,
      offset: 100
    });
  }, []);
  const [loading, setLoading] = useState(true);

  const handleLoaderFinish = () => {
    setLoading(false);
  };

  return (
    <>
      {
        isDown ? (
          <SarcasticPlaceholder />
        ) : loading ? (
          <Loader onFinish={handleLoaderFinish} />
        ) : (
          <>
            <Cursor />
            <ScrollProgressBar />
            <KonamiCode />
            <EasterEggHints />
            <Navbar />
            <Hero />
            <About />
            <Skills />
            <Projects />
            <Experience />
            <Contact />

          </>
        )}
    </>
  );
}

function App() {
  return (
    <ThemeProvider>
      <AnalyticsProvider>
        <Router>
          <div className="App">
            <Routes>
              <Route path="/" element={<PortfolioHome />} />
              <Route
                path="/admin/login"
                element={
                  <Suspense fallback={<div style={{ height: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center' }}><Loader /></div>}>
                    <AdminLogin />
                  </Suspense>
                }
              />
              <Route
                path="/admin/dashboard"
                element={
                  <Suspense fallback={<div style={{ height: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center' }}><Loader /></div>}>
                    <AdminDashboard />
                  </Suspense>
                }
              />
              <Route
                path="*"
                element={
                  <Suspense fallback={<div style={{ height: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center' }}><Loader /></div>}>
                    <NotFound />
                  </Suspense>
                }
              />
            </Routes>
            <SpeedInsights />
          </div>
        </Router>
      </AnalyticsProvider>
    </ThemeProvider>
  );
}

export default App;
