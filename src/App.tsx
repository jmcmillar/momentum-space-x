import React from 'react';
import './App.css';
import { Route, Routes } from 'react-router-dom';
import { LaunchesPage, NewLaunchPage } from './pages';
import { Header } from './components/Header';

function App() {
  return (
    <div>
    <Header />
    <Routes>
      <Route path="/" element={<LaunchesPage />} />
      <Route path="/new-launch" element={<NewLaunchPage />} />
    </Routes>
    </div>
  );
}

export default App;
