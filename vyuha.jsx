import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";

// Satellite Data
const SATELLITE_TYPES = [
  {
    name: "GSAT",
    purpose: "Communication",
    firstDeployment: "2001",
    wiki: "https://en.wikipedia.org/wiki/GSAT",
    img: "https://upload.wikimedia.org/wikipedia/commons/2/24/GSAT-10.png"
  },
  {
    name: "Cartosat",
    purpose: "Earth Observation",
    firstDeployment: "2005",
    wiki: "https://en.wikipedia.org/wiki/Cartosat",
    img: "https://upload.wikimedia.org/wikipedia/commons/5/56/Cartosat-2.png"
  },
  {
    name: "NavIC",
    purpose: "Navigation",
    firstDeployment: "2013",
    wiki: "https://en.wikipedia.org/wiki/IRNSS",
    img: "https://upload.wikimedia.org/wikipedia/commons/d/d3/IRNSS-1A.png"
  },
  {
    name: "Astrosat",
    purpose: "Scientific Missions",
    firstDeployment: "2015",
    wiki: "https://en.wikipedia.org/wiki/ASTROSAT",
    img: "https://upload.wikimedia.org/wikipedia/commons/c/cf/ASTROSAT.jpg"
  },
  {
    name: "Mangalyaan",
    purpose: "Interplanetary Mission",
    firstDeployment: "2013",
    wiki: "https://en.wikipedia.org/wiki/Mars_Orbiter_Mission",
    img: "https://upload.wikimedia.org/wikipedia/commons/0/05/Mars_Orbiter_Mission_Spacecraft_Model_-_001.jpg"
  },
  {
    name: "Chandrayaan-3",
    purpose: "Lunar Mission",
    firstDeployment: "2023",
    wiki: "https://en.wikipedia.org/wiki/Chandrayaan-3",
    img: "https://upload.wikimedia.org/wikipedia/commons/1/1d/Chandrayaan-3.png"
  }
];

// Launch Data for Graph and Calendar
const LAUNCHES = [
  { date: '2020-01-15', satellite: 'GSAT-30', rocket: 'GSLV', location: 'SDSC SHAR' },
  { date: '2020-07-22', satellite: 'Cartosat-3', rocket: 'PSLV', location: 'SDSC SHAR' },
  { date: '2021-02-28', satellite: 'IRNSS-1I', rocket: 'PSLV', location: 'SDSC SHAR' },
  { date: '2021-11-18', satellite: 'GSAT-31', rocket: 'GSLV', location: 'SDSC SHAR' },
  { date: '2023-09-05', satellite: 'Aditya-L1', rocket: 'PSLV', location: 'SDSC SHAR' }
];

export default function VyuhaKnowledgebase() {
  const [countdown, setCountdown] = useState('');

  // Countdown Timer
  useEffect(() => {
    const nextLaunch = new Date('2025-12-01T10:00:00Z');
    const interval = setInterval(() => {
      const now = new Date().getTime();
      const distance = nextLaunch.getTime() - now;
      if(distance > 0){
        const days = Math.floor(distance / (1000*60*60*24));
        const hours = Math.floor((distance % (1000*60*60*24))/(1000*60*60));
        const minutes = Math.floor((distance % (1000*60*60))/(1000*60));
        const seconds = Math.floor((distance % (1000*60))/1000);
        setCountdown(`${days}d ${hours}h ${minutes}m ${seconds}s`);
      } else {
        setCountdown('Launched!');
        clearInterval(interval);
      }
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if(el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="bg-black text-white font-mono">
      {/* Navbar */}
      <header className="fixed top-0 w-full bg-black bg-opacity-80 z-50 flex justify-between items-center px-8 py-4 border-b border-gray-700">
        <h1 className="text-2xl font-bold cursor-pointer" onClick={() => scrollToSection('home')}>🚀 Vyuha</h1>
        <nav className="space-x-6">
          {['home','satellites','launches','graph','about'].map(sec => (
            <button key={sec} onClick={() => scrollToSection(sec)} className="hover:text-orange-400 transition">
              {sec.charAt(0).toUpperCase() + sec.slice(1)}
            </button>
          ))}
        </nav>
      </header>

      {/* Hero Section */}
      <section id="home" className="h-screen flex flex-col justify-center items-center bg-cover bg-center" style={{backgroundImage:"url('https://images.unsplash.com/photo-1446776811953-b23d57bd21aa')"}}>
        <motion.h2 initial={{opacity:0, y:20}} animate={{opacity:1, y:0}} transition={{duration:1}} className="text-5xl font-bold mb-6 text-center">Exploring Space with Vyuha</motion.h2>
        <p className="max-w-2xl text-center mb-6">The Indian Space Research Organisation (ISRO) is India’s national space agency, known for its groundbreaking missions in satellite technology, interplanetary exploration, and scientific research.</p>
        <a href="https://www.isro.gov.in" target="_blank" rel="noreferrer" className="px-6 py-3 bg-orange-500 rounded-lg hover:bg-orange-600 transition">Visit ISRO</a>
        <div className="mt-6 text-yellow-400 text-xl font-bold">Next Launch: {countdown}</div>
      </section>

      {/* Satellite Types */}
      <section id="satellites" className="py-16 bg-black bg-opacity-95">
        <h3 className="text-4xl text-center font-bold mb-10">🛰️ Satellite Types</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 px-8">
          {SATELLITE_TYPES.map(sat => (
            <motion.div whileHover={{scale:1.05}} key={sat.name} className="bg-gray-900 rounded-2xl shadow-lg p-6 cursor-pointer border border-gray-700">
              <img src={sat.img} alt={sat.name} className="w-full h-40 object-contain mb-4" />
              <h4 className="text-xl font-bold mb-2">{sat.name}</h4>
              <p className="text-gray-300">{sat.purpose}</p>
              <p className="text-sm mt-2">First Deployment: {sat.firstDeployment}</p>
              <a href={sat.wiki} target="_blank" rel="noreferrer" className="mt-3 inline-block text-orange-400 hover:text-orange-500">Learn More →</a>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Launch Calendar */}
      <section id="launches" className="py-16 bg-black bg-opacity-95">
        <h3 className="text-4xl text-center font-bold mb-10">📅 Launch Calendar</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 px-8">
          {LAUNCHES.map(launch => (
            <div key={launch.date} className="bg-gray-900 rounded-2xl p-4 border border-gray-700 hover:bg-gray-800 transition">
              <p className="font-bold text-orange-400">{launch.date}</p>
              <p>Satellite: {launch.satellite}</p>
              <p>Rocket: {launch.rocket}</p>
              <p>Location: {launch.location}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Graph Section */}
      <section id="graph" className="py-16 bg-black bg-opacity-95">
        <h3 className="text-4xl text-center font-bold mb-10">📈 Launch Frequency</h3>
        <div className="flex flex-col items-center">
          {LAUNCHES.map((launch, idx) => (
            <div key={idx} className="w-1/2 bg-gray-700 my-2 rounded-full">
              <div className="bg-orange-500 text-right px-2 py-1 rounded-full" style={{width: `${(idx+1)/LAUNCHES.length*100}%`}}>{idx+1}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer id="about" className="bg-gray-900 text-center py-8 border-t border-gray-700">
        <p className="mb-3">© {new Date().getFullYear()} Vyuha | Made with 🚀 & ❤️</p>
        <div className="space-x-6">
          <a href="https://www.isro.gov.in" target="_blank" rel="noreferrer" className="hover:text-orange-400">ISRO Official</a>
          <a href="https://en.wikipedia.org/wiki/List_of_ISRO_missions" target="_blank" rel="noreferrer" className="hover:text-orange-400">Wikipedia Missions</a>
          <button onClick={() => scrollToSection('home')} className="hover:text-orange-400">Back to Top</button>
        </div>
      </footer>
    </div>
  );
}
