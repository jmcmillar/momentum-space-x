import React from 'react';
import './App.css';
import { Route, Routes } from 'react-router-dom';
import { LaunchesPage, NewLaunchPage, LaunchDetailPage } from './pages';
import { Header } from './components/Header';

function App() {
  return (
    <div>
    <Header />
    <Routes>
      <Route path="/" element={<LaunchesPage />} />
      <Route path="/new-launch" element={<NewLaunchPage />} />
      <Route path="/launch/:id" element={<LaunchDetailPage />} />
    </Routes>
    </div>
  );
}

export default App;
