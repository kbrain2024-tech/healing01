import React from 'react';
import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './pages/Home';
import WellnessRoutine from './pages/WellnessRoutine';
import HealingChat from './pages/HealingChat';

const App: React.FC = () => {
  return (
    <Router>
      <div className="flex flex-col min-h-screen font-sans text-gray-800">
        <Header />
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/routine" element={<WellnessRoutine />} />
            <Route path="/chat" element={<HealingChat />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
};

export default App;