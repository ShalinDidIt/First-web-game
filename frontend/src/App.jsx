import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { AuthProvider } from './context/AuthContext'
import Nav from './components/Nav'
import HomeScreen from './pages/HomeScreen'
import GameScreen from './pages/GameScreen'
import Leaderboards from './pages/Leaderboards'
import HowToPlay from './pages/HowToPlay'
import './styles/App.css'

function App() {
    return (
        <AuthProvider>
            <Router>
                <Nav />
                <div className="main-app">
                    <Routes>
                        <Route path="/" element={<HomeScreen />} />
                        <Route path="/game" element={<GameScreen />} />
                        <Route path="/leaderboards" element={<Leaderboards />} />
                        <Route path="/how-to-play" element={<HowToPlay />} />
                    </Routes>
                </div>
            </Router>
        </AuthProvider>
    )
}

export default App
