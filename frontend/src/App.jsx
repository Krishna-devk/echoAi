import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { motion } from 'framer-motion';
import { TooltipProvider } from '@/components/ui/tooltip';
import LandingPage from './pages/LandingPage';
import Dashboard from './pages/Dashboard';
import LoginPage from './pages/LoginPage';

function App() {
  return (
    <TooltipProvider>
      <Router>
        <div className="bg-background selection:bg-primary/30">
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/get-started" element={<LoginPage />} />
            <Route path="/dashboard" element={<Dashboard />} />
          </Routes>
        </div>
      </Router>
    </TooltipProvider>
  );
}

export default App;
