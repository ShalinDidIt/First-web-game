import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomeScreen from './pages/HomeScreen';
import GameScreen from './pages/GameScreen';
import Leaderboards from './pages/Leaderboards';
import './App.css';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomeScreen />} />
        <Route path="/game" element={<GameScreen />} />
        <Route path="/leaderboards" element={<Leaderboards />} />
      </Routes>
    </Router>
  );
}

export default App;
