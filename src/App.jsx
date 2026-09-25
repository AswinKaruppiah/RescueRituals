import React from 'react';
import Banner from './section/Banner';
import EventList from './section/EventList';

export default function App() {
  return (
    <div className="min-h-screen bg-[#262626] text-white">
      <Banner />
      <EventList />
    </div>
  );
}
