import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ToastProvider } from './components/Toast';
import { EventProvider } from './context/EventContext';
import Home from './pages/Home';
import HostEvent from './section/HostEvent';
import EventDetail from './section/EventDetail';

export default function App() {
  return (
    <EventProvider>
      <ToastProvider placement="top-right" />
      <Router>
        <div className="min-h-screen bg-[#262626] text-white">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/host" element={<HostEvent />} />
            <Route path="/events/:id" element={<EventDetail />} />
          </Routes>
        </div>
      </Router>
    </EventProvider>
  );
}
