import React from 'react';
import Navbar from '../section/Navbar';
import Banner from '../section/Banner';
import EventList from '../section/EventList';

export default function Home() {
  return (
    <>
      <Navbar />
      <Banner />
      <EventList />
    </>
  );
}
