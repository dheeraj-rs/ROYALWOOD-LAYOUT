'use client';

import { useState, useEffect } from 'react';
import { ShoppingCart, User, Menu, X, Crown, ArrowLeft } from 'lucide-react';
import { useApp } from '@/app/providers';
import Cart from './Cart';
import AuthModal from './AuthModal';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

const SubHeader = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isAuthOpen, setIsAuthOpen] = useState(false);
  const { state } = useApp();

  const [cartItems, setCartItems] = useState<any[]>([]);
  const router = useRouter();

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
      <header className='bg-transparent py-2'
      >
        <div className="mx-auto px-4">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <button
              onClick={() => router.back()}
              className={`bg-white/10 border-white/20 text-white flex items-center justify-center rounded-lg hover:text-white px-4 py-2`}
            >
              <ArrowLeft className="w-4 h-4" />
            </button>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center space-x-8">
              <Link href="/" className="hover:text-yellow-400 transition-colors">Home</Link>
              <Link href="/gallery" className="hover:text-yellow-400 transition-colors">Gallery</Link>
              <Link href="/products" className="hover:text-yellow-400 transition-colors">Products</Link>
              <Link href="/about" className="hover:text-yellow-400 transition-colors">About</Link>
              <Link href="/contact" className="hover:text-yellow-400 transition-colors">Contact</Link>
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
              <Link href="/" className="hover:text-yellow-400 transition-colors">Home</Link>
              <Link href="/gallery" className="hover:text-yellow-400 transition-colors">Gallery</Link>
              <Link href="/products" className="hover:text-yellow-400 transition-colors">Products</Link>
              <Link href="/about" className="hover:text-yellow-400 transition-colors">About</Link>
              <Link href="/contact" className="hover:text-yellow-400 transition-colors">Contact</Link>
            </nav>
          </div>
        )}
      </header>

      <Cart isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
      <AuthModal isOpen={isAuthOpen} onClose={() => setIsAuthOpen(false)} />
    </>
  );
};

export default SubHeader;