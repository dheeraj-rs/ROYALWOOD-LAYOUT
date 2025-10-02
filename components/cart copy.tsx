"use client";

import { X, Minus, Plus, ShoppingBag } from "lucide-react";
import { Button } from "@/components/ui/button";

interface CartProps {
  isOpen: boolean;
  onClose: () => void;
}

export function Cart({ isOpen, onClose }: CartProps) {
  if (!isOpen) return null;

  return (
    <>
      <div
        className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 animate-in fade-in duration-300"
        onClick={onClose}
      />

      <div className="fixed top-0 right-0 h-full w-full sm:w-96 bg-black/95 backdrop-blur-xl border-l border-amber-500/20 z-50 animate-in slide-in-from-right duration-300">
        <div className="flex flex-col h-full">
          <div className="flex items-center justify-between p-6 border-b border-amber-500/20">
            <div className="flex items-center space-x-3">
              <ShoppingBag className="w-6 h-6 text-amber-400" />
              <h2 className="text-xl font-bold text-white">Shopping Cart</h2>
            </div>
            <button
              onClick={onClose}
              className="w-10 h-10 rounded-full bg-white/5 hover:bg-white/10 flex items-center justify-center transition-colors duration-300"
            >
              <X className="w-5 h-5 text-gray-400" />
            </button>
          </div>

          <div className="flex-1 overflow-y-auto p-6">
            <div className="flex flex-col items-center justify-center h-full text-center space-y-4">
              <div className="w-20 h-20 rounded-full bg-amber-500/10 border border-amber-500/20 flex items-center justify-center">
                <ShoppingBag className="w-10 h-10 text-amber-400" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-white mb-2">Your cart is empty</h3>
                <p className="text-sm text-gray-400">Add items to get started</p>
              </div>
            </div>
          </div>

          <div className="border-t border-amber-500/20 p-6 space-y-4">
            <div className="flex items-center justify-between text-lg">
              <span className="text-gray-400">Subtotal</span>
              <span className="font-bold text-white">$0.00</span>
            </div>
            <Button
              size="lg"
              className="w-full bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-black font-semibold shadow-lg shadow-amber-500/50 hover:shadow-amber-500/70 transition-all duration-300"
              disabled
            >
              Checkout
            </Button>
          </div>
        </div>
      </div>
    </>
  );
}
