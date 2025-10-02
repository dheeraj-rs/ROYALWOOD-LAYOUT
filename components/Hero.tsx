'use client';

import { ArrowRight, Play } from 'lucide-react';
import Link from 'next/link';
import { useState } from 'react';

const Hero = () => {
  const [isVideoPlaying, setIsVideoPlaying] = useState(false);

  return (
    <section id="home" className="min-h-screen relative flex items-center justify-center overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <img
          src="/shop1.png"
          alt="Luxury Interior"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/60"></div>
        <div className="absolute inset-0 bg-radial-gradient"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 text-center">
        <div className="max-w-4xl mx-auto fade-in-up">
          <h1 className="font-playfair text-4xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight">
            Crafting Dreams into
            <br />
            <span className="gold-text-gradient text-shadow-gold">Reality</span>
          </h1>

          <p className="text-lg md:text-xl text-gray-300 mb-8 max-w-2xl mx-auto leading-relaxed">
            Discover exquisite handcrafted furniture that transforms your space into a masterpiece of elegance and comfort.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12">
            <Link href={"/products"} className="gold-gradient text-black font-semibold px-8 py-4 rounded-lg hover:scale-105 transition-all duration-300 luxury-shadow flex items-center space-x-2">
              <span>Explore Collection</span>
              <ArrowRight size={20} />
            </Link>

            <button
              onClick={() => setIsVideoPlaying(true)}
              className="glass-morphism-dark px-8 py-4 rounded-lg hover:scale-105 transition-all duration-300 flex items-center space-x-2"
            >
              <Play size={20} />
              <span>Watch Story</span>
            </button>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-8 max-w-md mx-auto">
            <div className="text-center">
              <div className="font-playfair text-2xl md:text-3xl font-bold gold-text-gradient">500+</div>
              <div className="text-sm text-gray-400 mt-1">Premium Products</div>
            </div>
            <div className="text-center">
              <div className="font-playfair text-2xl md:text-3xl font-bold gold-text-gradient">50+</div>
              <div className="text-sm text-gray-400 mt-1">Expert Craftsmen</div>
            </div>
            <div className="text-center">
              <div className="font-playfair text-2xl md:text-3xl font-bold gold-text-gradient">25</div>
              <div className="text-sm text-gray-400 mt-1">Years Heritage</div>
            </div>
          </div>
        </div>
      </div>

      {/* Floating Elements */}
      {/* <div className="absolute top-20 left-10 w-2 h-2 bg-yellow-400 rounded-full animate-pulse"></div>
      <div className="absolute top-40 right-20 w-3 h-3 bg-yellow-400 rounded-full animate-pulse delay-300"></div>
      <div className="absolute bottom-32 left-20 w-1 h-1 bg-yellow-400 rounded-full animate-pulse delay-700"></div> */}

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center">
          <div className="w-1 h-3 bg-white/50 rounded-full mt-2 animate-pulse"></div>
        </div>
      </div>
    </section>
  );
};

export default Hero;