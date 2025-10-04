"use client";

import React, { useState, useEffect } from 'react';
import Footer from '@/components/Footer';
import Link from 'next/link';
import { Minus, Plus, Trash2, ShoppingBag, ArrowRight } from 'lucide-react';
import SubHeader from '@/components/SubHeader';

interface CartItem {
  id: number;
  name: string;
  price: number;
  image: string;
  quantity: number;
  category: string;
}

const CartPage = () => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadCart = () => {
      const items = JSON.parse(localStorage.getItem('cart') || '[]');
      setCartItems(items);
    };

    loadCart();
    setIsLoading(false);

    // Listen for cart updates
    window.addEventListener('cartUpdated', loadCart);
    return () => window.removeEventListener('cartUpdated', loadCart);
  }, []);

  const updateQuantity = (id: number, newQuantity: number) => {
    if (newQuantity === 0) {
      removeItem(id);
      return;
    }

    const updatedItems = cartItems.map(item =>
      item.id === id ? { ...item, quantity: newQuantity } : item
    );
    setCartItems(updatedItems);
    localStorage.setItem('cart', JSON.stringify(updatedItems));
    window.dispatchEvent(new Event('cartUpdated'));
  };

  const removeItem = (id: number) => {
    const updatedItems = cartItems.filter(item => item.id !== id);
    setCartItems(updatedItems);
    localStorage.setItem('cart', JSON.stringify(updatedItems));
    window.dispatchEvent(new Event('cartUpdated'));
  };

  const clearCart = () => {
    setCartItems([]);
    localStorage.removeItem('cart');
    window.dispatchEvent(new Event('cartUpdated'));
  };

  const subtotal = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const tax = subtotal * 0.08; // 8% tax
  const shipping = subtotal > 2000 ? 0 : 199; // Free shipping over $2000
  const total = subtotal + tax + shipping;

  if (isLoading) {
    return (
      <div className="min-h-screen bg-slate-900 flex items-center justify-center">
        <div className="text-white">Loading...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900">
      <SubHeader />

      <div className="pt-20 pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

          {cartItems.length === 0 ? (
            <div className="text-center py-16">
              <ShoppingBag className="mx-auto mb-4 text-gray-400" size={64} />
              <h2 className="text-2xl font-semibold text-white mb-4">Your cart is empty</h2>
              <p className="text-gray-400 mb-8">Discover our beautiful furniture collection</p>
              <Link
                href="/products"
                className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-amber-500 to-orange-600 text-white font-semibold rounded-lg hover:from-amber-600 hover:to-orange-700 transition-all duration-300"
              >
                Browse Catalog
                <ArrowRight size={20} className="ml-2" />
              </Link>
            </div>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Cart Items */}
              <div className="lg:col-span-2 space-y-4">
                {cartItems.map((item) => (
                  <div key={item.id} className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/10">
                    <div className="flex flex-col sm:flex-row gap-4">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-full sm:w-24 h-48 sm:h-24 object-cover rounded-lg"
                      />

                      <div className="flex-1">
                        <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between mb-4">
                          <div>
                            <h3 className="text-lg font-semibold text-white mb-1">{item.name}</h3>
                            <p className="text-amber-400 text-sm capitalize">{item.category}</p>
                          </div>
                          <div className="text-right mt-2 sm:mt-0">
                            <div className="text-xl font-bold text-white">${item.price.toLocaleString()}</div>
                            <div className="text-sm text-gray-400">each</div>
                          </div>
                        </div>

                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-3">
                            <button
                              onClick={() => updateQuantity(item.id, item.quantity - 1)}
                              className="p-2 bg-white/10 rounded-lg hover:bg-white/20 transition-colors"
                            >
                              <Minus size={16} className="text-white" />
                            </button>
                            <span className="text-white font-medium w-8 text-center">{item.quantity}</span>
                            <button
                              onClick={() => updateQuantity(item.id, item.quantity + 1)}
                              className="p-2 bg-white/10 rounded-lg hover:bg-white/20 transition-colors"
                            >
                              <Plus size={16} className="text-white" />
                            </button>
                          </div>

                          <div className="flex items-center space-x-4">
                            <div className="text-lg font-semibold text-white">
                              ${(item.price * item.quantity).toLocaleString()}
                            </div>
                            <button
                              onClick={() => removeItem(item.id)}
                              className="p-2 text-red-400 hover:text-red-300 transition-colors"
                            >
                              <Trash2 size={16} />
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}

                <div className="flex justify-between items-center pt-4">
                  <button
                    onClick={clearCart}
                    className="text-red-400 hover:text-red-300 transition-colors"
                  >
                    Clear Cart
                  </button>
                  <Link
                    href="/products"
                    className="text-amber-400 hover:text-amber-300 transition-colors"
                  >
                    Continue Shopping
                  </Link>
                </div>
              </div>

              {/* Order Summary */}
              <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/10 h-fit">
                <h2 className="text-2xl font-bold text-white mb-6">Order Summary</h2>

                <div className="space-y-4 mb-6">
                  <div className="flex justify-between">
                    <span className="text-gray-300">Subtotal</span>
                    <span className="text-white">${subtotal.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-300">Tax</span>
                    <span className="text-white">${tax.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-300">Shipping</span>
                    <span className="text-white">
                      {shipping === 0 ? 'Free' : `$${shipping}`}
                    </span>
                  </div>
                  <div className="border-t border-white/10 pt-4">
                    <div className="flex justify-between text-lg font-semibold">
                      <span className="text-white">Total</span>
                      <span className="text-white">${total.toFixed(2)}</span>
                    </div>
                  </div>
                </div>

                <Link
                  href="/checkout"
                  className="w-full flex items-center justify-center px-6 py-4 bg-gradient-to-r from-amber-500 to-orange-600 text-white font-semibold rounded-lg hover:from-amber-600 hover:to-orange-700 transition-all duration-300"
                >
                  Proceed to Checkout
                  <ArrowRight size={20} className="ml-2" />
                </Link>

                <div className="mt-4 text-center">
                  <p className="text-sm text-gray-400">
                    {shipping > 0 && `Free shipping on orders over $2,000`}
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default CartPage;