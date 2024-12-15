import React from 'react';
import '../styles/MainSection.css';
import Header from '../components/Header';
import HeroSection from '../components/HeroSection';

function Home() {
  return (
    <div className="App">
      <Header />
      <HeroSection />
    </div>
  );
}

export default Home;
