import React from 'react';
import './App.css';
import { Route, Routes } from 'react-router-dom';
import { LaunchesPage, NewLaunchPage, LaunchDetailPage } from './pages';

function App() {
  return (
    <>
    <Routes>
      <Route path="/" element={<LaunchesPage />} />
      <Route path="/new-launch" element={<NewLaunchPage />} />
      <Route path="/launch/:id" element={<LaunchDetailPage />} />
    </Routes>
    </>
  );
}

export default App;
