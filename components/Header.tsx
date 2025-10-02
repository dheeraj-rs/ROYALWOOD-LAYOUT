'use client';

import { useState, useEffect } from 'react';
import { ShoppingCart, User, Menu, X, Crown } from 'lucide-react';
import { useApp } from '@/app/providers';
import Cart from './Cart';
import AuthModal from './AuthModal';
import Link from 'next/link';

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isAuthOpen, setIsAuthOpen] = useState(false);
  const { state } = useApp();

  const [cartItems, setCartItems] = useState<any[]>([]);

  // Load cart items from localStorage
  useEffect(() => {
    const loadCart = () => {
      const items = JSON.parse(localStorage.getItem('cart') || '[]');
      setCartItems(items);
    };

    // Initial load
    loadCart();

    // Listen for storage events (from other tabs/windows)
    window.addEventListener('storage', loadCart);

    // Listen for custom cart update events (same page)
    window.addEventListener('cartUpdated', loadCart);

    return () => {
      window.removeEventListener('storage', loadCart);
      window.removeEventListener('cartUpdated', loadCart);
    };
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const cartItemsCount = state.cart.reduce((total, item) => total + item.quantity, 0);

  return (
    <>
      <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled ? 'glass-morphism py-4' : 'bg-transparent py-6'
        }`}>
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <Link href="/" className="flex items-center space-x-2 group">
              <Crown className="h-8 w-8 text-gold group-hover:rotate-12 transition-transform duration-300" />
              <span className="font-playfair font-bold text-2xl gold-text-gradient">Royalwood</span>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center space-x-8">
              <a href="#home" className="hover:text-yellow-400 transition-colors">Home</a>
              <a href="#products" className="hover:text-yellow-400 transition-colors">Products</a>
              <a href="#about" className="hover:text-yellow-400 transition-colors">About</a>
              <a href="#contact" className="hover:text-yellow-400 transition-colors">Contact</a>
            </nav>

            {/* Actions */}
            <div className="flex items-center space-x-4">
              <Link href="/cart"
                className="p-2 hover:bg-white/10 rounded-lg transition-colors relative"
              >
                <ShoppingCart size={20} />
                {cartItems.length > 0 && (
                  <span className="absolute -top-1 -right-1 bg-yellow-400 text-black text-xs rounded-full w-5 h-5 flex items-center justify-center font-semibold">
                    {cartItems.length}
                  </span>
                )}
              </Link>

              <button
                onClick={() => setIsAuthOpen(true)}
                className="p-2 hover:bg-white/10 rounded-lg transition-colors"
              >
                <User size={20} />
              </button>

              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="md:hidden p-2 hover:bg-white/10 rounded-lg transition-colors"
              >
                {isMobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden mt-4 glass-morphism-dark mx-4 rounded-lg p-6">
            <nav className="flex flex-col space-y-4">
              <a href="#home" className="hover:text-yellow-400 transition-colors">Home</a>
              <a href="#products" className="hover:text-yellow-400 transition-colors">Products</a>
              <a href="#about" className="hover:text-yellow-400 transition-colors">About</a>
              <a href="#contact" className="hover:text-yellow-400 transition-colors">Contact</a>
            </nav>
          </div>
        )}
      </header>

      <Cart isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
      <AuthModal isOpen={isAuthOpen} onClose={() => setIsAuthOpen(false)} />
    </>
  );
};

export default Header;