import { useState } from 'react';
import IntroAnimation from './components/IntroAnimation';
import HeroSection from './components/HeroSection';
import TrustSection from './components/TrustSection';
import ServicesSection from './components/ServicesSection';
import OfferSection from './components/OfferSection';
import HealthCheckSection from './components/HealthCheckSection';
import DeliverySection from './components/DeliverySection';
import LocationSection from './components/LocationSection';
import ContactSection from './components/ContactSection';
import Footer from './components/Footer';
import PulseIdentity from './components/PulseIdentity';
import CareDock from './components/CareDock';
import DomeEnvironment from './components/DomeEnvironment';
import WorldLayer from './components/WorldLayer';

function MainLayout() {
  return (
    <div className="relative min-h-screen pb-28 md:pb-0 z-10 selection:bg-cyan-500/30">
      <WorldLayer />
      <HeroSection />
      <TrustSection />
      <ServicesSection />
      <OfferSection />
      <HealthCheckSection />
      <DeliverySection />
      <LocationSection />
      <ContactSection />
      <PulseIdentity height="h-24" isEnd />
      <Footer />
    </div>
  );
}

const SESSION_KEY = 'care_one_intro_v2';

export default function App() {
  const [introComplete, setIntroComplete] = useState(
    () => sessionStorage.getItem(SESSION_KEY) === '1'
  );

  const handleIntroComplete = () => {
    sessionStorage.setItem(SESSION_KEY, '1');
    setIntroComplete(true);
  };

  return (
    <>
      {!introComplete && <IntroAnimation onComplete={handleIntroComplete} />}
      {introComplete && (
        <>
          <DomeEnvironment />
          <MainLayout />
          <CareDock />
        </>
      )}
    </>
  );
}
