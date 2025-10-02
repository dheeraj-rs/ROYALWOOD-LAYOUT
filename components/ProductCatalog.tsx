'use client';

import { useState, useMemo } from 'react';
import { Search, Filter, Grid, List, Star } from 'lucide-react';
import ProductCard from './ProductCard';
import { useApp } from '@/app/providers';
import type { Product } from '@/app/providers';

const mockProducts: Product[] = [
  {
    id: '1',
    name: 'Royal Velvet Sofa',
    price: 3299,
    originalPrice: 3999,
    image: 'https://images.pexels.com/photos/1571460/pexels-photo-1571460.jpeg?auto=compress&cs=tinysrgb&w=800',
    category: 'Living Room',
    description: 'Luxurious velvet sofa with golden accents and premium comfort',
    images: [
      'https://images.pexels.com/photos/1571460/pexels-photo-1571460.jpeg?auto=compress&cs=tinysrgb&w=800',
      'https://images.pexels.com/photos/1571463/pexels-photo-1571463.jpeg?auto=compress&cs=tinysrgb&w=800'
    ],
    features: ['Premium Velvet', 'Hardwood Frame', 'Memory Foam', 'Golden Accents'],
    materials: ['Italian Velvet', 'Solid Oak', 'Brass Details'],
    dimensions: '220cm x 95cm x 85cm',
    inStock: true
  },
  {
    id: '2',
    name: 'Empire Dining Table',
    price: 2899,
    image: 'https://images.pexels.com/photos/1350789/pexels-photo-1350789.jpeg?auto=compress&cs=tinysrgb&w=800',
    category: 'Dining Room',
    description: 'Handcrafted dining table with marble top and golden legs',
    images: [
      'https://images.pexels.com/photos/1350789/pexels-photo-1350789.jpeg?auto=compress&cs=tinysrgb&w=800'
    ],
    features: ['Marble Top', 'Brass Legs', 'Seats 8', 'Scratch Resistant'],
    materials: ['Carrara Marble', 'Brass', 'Solid Wood Base'],
    dimensions: '240cm x 110cm x 75cm',
    inStock: true
  },
  {
    id: '3',
    name: 'Majestic King Bed',
    price: 4299,
    originalPrice: 4999,
    image: 'https://images.pexels.com/photos/1743229/pexels-photo-1743229.jpeg?auto=compress&cs=tinysrgb&w=800',
    category: 'Bedroom',
    description: 'Regal king bed with tufted headboard and premium finishes',
    images: [
      'https://images.pexels.com/photos/1743229/pexels-photo-1743229.jpeg?auto=compress&cs=tinysrgb&w=800'
    ],
    features: ['Tufted Headboard', 'Storage Base', 'Premium Upholstery', 'LED Lighting'],
    materials: ['Italian Leather', 'Solid Wood', 'Memory Foam'],
    dimensions: '210cm x 190cm x 130cm',
    inStock: true
  },
  {
    id: '4',
    name: 'Executive Office Chair',
    price: 1599,
    image: 'https://images.pexels.com/photos/2062431/pexels-photo-2062431.jpeg?auto=compress&cs=tinysrgb&w=800',
    category: 'Office',
    description: 'Ergonomic executive chair with leather upholstery',
    images: [
      'https://images.pexels.com/photos/2062431/pexels-photo-2062431.jpeg?auto=compress&cs=tinysrgb&w=800'
    ],
    features: ['Ergonomic Design', 'Genuine Leather', 'Adjustable Height', 'Lumbar Support'],
    materials: ['Premium Leather', 'Steel Frame', 'Memory Foam'],
    dimensions: '70cm x 70cm x 120cm',
    inStock: true
  },
  {
    id: '5',
    name: 'Crystal Chandelier',
    price: 2199,
    image: 'https://images.pexels.com/photos/1090638/pexels-photo-1090638.jpeg?auto=compress&cs=tinysrgb&w=800',
    category: 'Lighting',
    description: 'Magnificent crystal chandelier with gold-plated finish',
    images: [
      'https://images.pexels.com/photos/1090638/pexels-photo-1090638.jpeg?auto=compress&cs=tinysrgb&w=800'
    ],
    features: ['Crystal Drops', 'Gold Plated', 'Dimmable LEDs', 'Remote Control'],
    materials: ['Austrian Crystal', '24K Gold Plate', 'LED Bulbs'],
    dimensions: '80cm x 80cm x 100cm',
    inStock: true
  },
  {
    id: '6',
    name: 'Luxury Armchair',
    price: 1899,
    originalPrice: 2299,
    image: 'https://images.pexels.com/photos/1571468/pexels-photo-1571468.jpeg?auto=compress&cs=tinysrgb&w=800',
    category: 'Living Room',
    description: 'Sophisticated armchair with velvet upholstery and golden frame',
    images: [
      'https://images.pexels.com/photos/1571468/pexels-photo-1571468.jpeg?auto=compress&cs=tinysrgb&w=800'
    ],
    features: ['Velvet Upholstery', 'Brass Frame', 'Swivel Base', 'Ottoman Included'],
    materials: ['Premium Velvet', 'Brass', 'Solid Wood'],
    dimensions: '85cm x 90cm x 105cm',
    inStock: false
  }
];

const categories = ['All', 'Living Room', 'Bedroom', 'Dining Room', 'Office', 'Lighting'];

const ProductCatalog = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [priceRange, setPriceRange] = useState([0, 5000]);
  const [sortBy, setSortBy] = useState('name');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [showFilters, setShowFilters] = useState(false);

  const filteredProducts = useMemo(() => {
    let filtered = mockProducts.filter(product => {
      const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCategory = selectedCategory === 'All' || product.category === selectedCategory;
      const matchesPrice = product.price >= priceRange[0] && product.price <= priceRange[1];
      
      return matchesSearch && matchesCategory && matchesPrice;
    });

    // Sort products
    filtered.sort((a, b) => {
      switch (sortBy) {
        case 'price-low':
          return a.price - b.price;
        case 'price-high':
          return b.price - a.price;
        case 'name':
          return a.name.localeCompare(b.name);
        default:
          return 0;
      }
    });

    return filtered;
  }, [searchTerm, selectedCategory, priceRange, sortBy]);

  return (
    <section id="products" className="py-20 bg-gradient-to-b from-black via-gray-900 to-black">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="font-playfair text-4xl md:text-5xl font-bold mb-4">
            Our <span className="gold-text-gradient">Collection</span>
          </h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            Discover handcrafted furniture pieces that embody luxury, comfort, and timeless design
          </p>
        </div>

        {/* Search and Filters */}
        <div className="glass-morphism rounded-2xl p-6 mb-8">
          <div className="flex flex-col lg:flex-row gap-4 items-center">
            {/* Search */}
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
              <input
                type="text"
                placeholder="Search furniture..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 bg-black/20 border border-white/10 rounded-lg focus:border-yellow-400 focus:outline-none transition-colors"
              />
            </div>

            {/* Category Filter */}
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="px-4 py-3 bg-black/20 border border-white/10 rounded-lg focus:border-yellow-400 focus:outline-none"
            >
              {categories.map(category => (
                <option key={category} value={category} className="bg-black">
                  {category}
                </option>
              ))}
            </select>

            {/* Sort */}
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="px-4 py-3 bg-black/20 border border-white/10 rounded-lg focus:border-yellow-400 focus:outline-none"
            >
              <option value="name" className="bg-black">Name</option>
              <option value="price-low" className="bg-black">Price: Low to High</option>
              <option value="price-high" className="bg-black">Price: High to Low</option>
            </select>

            {/* View Mode */}
            <div className="flex border border-white/10 rounded-lg overflow-hidden">
              <button
                onClick={() => setViewMode('grid')}
                className={`p-3 ${viewMode === 'grid' ? 'bg-yellow-400 text-black' : 'bg-black/20'} transition-colors`}
              >
                <Grid size={20} />
              </button>
              <button
                onClick={() => setViewMode('list')}
                className={`p-3 ${viewMode === 'list' ? 'bg-yellow-400 text-black' : 'bg-black/20'} transition-colors`}
              >
                <List size={20} />
              </button>
            </div>

            {/* Filter Toggle */}
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="flex items-center space-x-2 px-4 py-3 bg-black/20 border border-white/10 rounded-lg hover:border-yellow-400 transition-colors"
            >
              <Filter size={20} />
              <span>Filters</span>
            </button>
          </div>

          {/* Advanced Filters */}
          {showFilters && (
            <div className="mt-6 pt-6 border-t border-white/10">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium mb-2">Price Range</label>
                  <div className="flex items-center space-x-4">
                    <input
                      type="range"
                      min="0"
                      max="5000"
                      value={priceRange[1]}
                      onChange={(e) => setPriceRange([0, parseInt(e.target.value)])}
                      className="flex-1"
                    />
                    <span className="text-sm text-gray-400">${priceRange[0]} - ${priceRange[1]}</span>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Products Grid */}
        <div className={`${
          viewMode === 'grid' 
            ? 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8' 
            : 'space-y-6'
        }`}>
          {filteredProducts.map((product, index) => (
            <ProductCard 
              key={product.id} 
              product={product} 
              viewMode={viewMode}
              className="fade-in-up"
              style={{ animationDelay: `${index * 0.1}s` }}
            />
          ))}
        </div>

        {/* Empty State */}
        {filteredProducts.length === 0 && (
          <div className="text-center py-16">
            <div className="w-24 h-24 mx-auto mb-6 bg-white/5 rounded-full flex items-center justify-center">
              <Search size={32} className="text-gray-400" />
            </div>
            <h3 className="text-xl font-semibold mb-2">No products found</h3>
            <p className="text-gray-400">Try adjusting your search criteria</p>
          </div>
        )}
      </div>
    </section>
  );
};

export default ProductCatalog;