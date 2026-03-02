import { useState, useEffect } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
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
import AdminLogin from './pages/AdminLogin/AdminLogin';
import AdminDashboard from './pages/AdminDashboard/AdminDashboard';
import './App.css';

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
      {loading ? (
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
              <Route path="/admin/login" element={<AdminLogin />} />
              <Route path="/admin/dashboard" element={<AdminDashboard />} />
            </Routes>
          </div>
        </Router>
      </AnalyticsProvider>
    </ThemeProvider>
  );
}

export default App;
