import React from 'react';
import Hero from './Hero';
import Services from './Services';
import Manifesto from './Manifesto';
import SystemArchitecture from './SystemArchitecture';
import DataFlow from './DataFlow';
import Footer from './Footer';
import AuroraBackground from './AuroraBackground';

const Home: React.FC = () => {
  return (
    <>
      <AuroraBackground />
      <div className="relative z-10 flex flex-col w-full">
        <Hero />
        <Services />
        <Manifesto />
        <SystemArchitecture />
        <DataFlow />
        <Footer />
      </div>
    </>
  );
};

export default Home;