import React, { useState, useEffect } from 'react';
import Navbar from './components/layout/Navbar';
import Hero from './components/sections/Hero';
import About from './components/sections/About';
import Skills from './components/sections/Skills';
import Projects from './components/sections/Projects';
import Experience from './components/sections/Experience';
import Contact from './components/sections/Contact';
import Loader from './components/ui/Loader';
import Cursor from './components/ui/Cursor';
import './App.css';

function App() {
  const [loading, setLoading] = useState(true);

  // You can either rely on the Loader's own timer or a fixed timer here
  // But since the loader has its own "fake process", we pass a callback
  const handleLoaderFinish = () => {
    setLoading(false);
  };

  return (
    <div className="App">
      {loading ? (
        <Loader onFinish={handleLoaderFinish} />
      ) : (
        <>
          <Cursor />
          <Navbar />
          <Hero />
          <About />
          <Skills />
          <Projects />
          <Experience />
          <Contact />
        </>
      )}
    </div>
  );
}

export default App;
