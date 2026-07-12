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

function MainLayout() {
  return (
    <div className="min-h-screen bg-background text-foreground overflow-x-hidden selection:bg-cyan-500/30">
      <HeroSection />
      <PulseIdentity height="h-24 md:h-32" />
      <TrustSection />
      <PulseIdentity height="h-24 md:h-32" />
      <ServicesSection />
      <PulseIdentity height="h-24 md:h-32" />
      <OfferSection />
      <PulseIdentity height="h-24 md:h-32" />
      <HealthCheckSection />
      <PulseIdentity height="h-24 md:h-32" />
      <DeliverySection />
      <PulseIdentity height="h-24 md:h-32" />
      <LocationSection />
      <PulseIdentity height="h-24 md:h-32" />
      <ContactSection />
      <PulseIdentity height="h-24" isEnd />
      <Footer />
    </div>
  );
}

export default function App() {
  const [introComplete, setIntroComplete] = useState(false);

  return (
    <>
      {!introComplete && <IntroAnimation onComplete={() => setIntroComplete(true)} />}
      {introComplete && <MainLayout />}
    </>
  );
}
