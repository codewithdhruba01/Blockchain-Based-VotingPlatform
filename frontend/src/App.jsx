import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Web3Provider } from './context/Web3Context';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import AdminDashboard from './pages/AdminDashboard';
import VoterDashboard from './pages/VoterDashboard';
import Results from './pages/Results';
import ElectionHistory from './pages/ElectionHistory';

function App() {
  return (
    <Web3Provider>
      <Router>
        <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
          <Navbar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/admin" element={<AdminDashboard />} />
            <Route path="/voter" element={<VoterDashboard />} />
            <Route path="/results" element={<Results />} />
            <Route path="/history" element={<ElectionHistory />} />
          </Routes>
        </div>
      </Router>
    </Web3Provider>
  );
}

export default App;
