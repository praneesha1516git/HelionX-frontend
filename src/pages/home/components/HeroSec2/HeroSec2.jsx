import React, { useState } from 'react';
import { ArrowRight, Zap, Maximize2, RefreshCw } from 'lucide-react';
import solarImg from "./panel2.jpeg";

export default function SunrockLanding() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Background Image */}
      <div 
        className="absolute inset-0 z-0"
        style={{
          backgroundImage: `url(${solarImg})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        <div className="absolute inset-0"></div>
      </div>

      {/* Content */}
      <div className="relative z-10">
        {/* Hero Section */}
        <div className="flex flex-col items-center justify-center px-8 pt-32 pb-32">
          <h1 className="text-5xl md:text-7xl  font-Inter  font-bold text-white text-center max-w-5xl mt-18 leading-tight mb-6">
            Clean and smart solar energy for your Home.
          </h1>
          
          <p className="text-xl md:text-2xl text-white/90 text-center max-w-2xl mb-12">
            Sustainable energy solutions made easy, reliable, and tailor-made for You.
          </p>

        
        </div>
      </div>
    </div>
  );
}
