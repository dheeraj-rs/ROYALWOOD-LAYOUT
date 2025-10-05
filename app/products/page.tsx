'use client';

import { useState, useEffect, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Star, ShoppingCart, Eye, Heart, Grid, List, Search, X, ArrowLeft, RefreshCcw, User, Menu, ChevronLeft } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { products } from '@/lib/products';
import Footer from '@/components/Footer';
import Header from '@/components/Header';
import AuthModal from '@/components/AuthModal';
import SubHeader from '@/components/SubHeader';

export default function ProductsPage() {
  const [filteredProducts, setFilteredProducts] = useState(products);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [selectedWoodTypes, setSelectedWoodTypes] = useState<string[]>([]);
  const [priceRange, setPriceRange] = useState([0, 4000]);
  const [sortBy, setSortBy] = useState('featured');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [showFilters, setShowFilters] = useState(false);
  const [mobileFilterTypesOpen, setMobileFiltersOpen] = useState('none');

  const router = useRouter();

  const categoryRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const woodTypeRefs = useRef<(HTMLButtonElement | null)[]>([]);

  useEffect(() => {
    const filtered = products.filter(product => {
      const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.description.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCategory = selectedCategories.length === 0 || selectedCategories.includes(product.category);
      const matchesWoodType = selectedWoodTypes.length === 0 || selectedWoodTypes.includes(product.woodType);
      const matchesPrice = product.price >= priceRange[0] && product.price <= priceRange[1];

      return matchesSearch && matchesCategory && matchesWoodType && matchesPrice;
    });

    switch (sortBy) {
      case 'price-low':
        filtered.sort((a, b) => a.price - b.price);
        break;
      case 'price-high':
        filtered.sort((a, b) => b.price - a.price);
        break;
      case 'rating':
        filtered.sort((a, b) => b.rating - a.rating);
        break;
      case 'newest':
        filtered.sort((a, b) => (b.isNew ? 1 : 0) - (a.isNew ? 1 : 0));
        break;
      default:
        break;
    }

    setFilteredProducts(filtered);
  }, [searchTerm, selectedCategories, selectedWoodTypes, priceRange, sortBy]);

  const toggleCategory = (category: string) => {
    setSelectedCategories(prev =>
      prev.includes(category)
        ? prev.filter(c => c !== category)
        : [...prev, category]
    );
  };

  const toggleWoodType = (woodType: string) => {
    setSelectedWoodTypes(prev =>
      prev.includes(woodType)
        ? prev.filter(w => w !== woodType)
        : [...prev, woodType]
    );
  };

  const clearAllFilters = () => {
    setSelectedCategories([]);
    setSelectedWoodTypes([]);
    setSearchTerm('');
    setPriceRange([0, 4000]);
  };

  const categories = ["Living Room", "Bedroom", "Dining Room", "Office", "Outdoor"];
  const woodTypes = ["Oak", "Walnut", "Maple", "Cherry", "Pine"];

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

  return (
    <div className="min-h-screen  bg-gradient-to-br from-gray-900 via-black to-gray-900">
      <SubHeader />
      {/* Hero Section */}
      <section className="py-8">

        <div className="mx-auto px-4 sm:px-6 lg:px-8">

          {/* 
          <div className="flex items-center justify-between space-x-4">
            <button
              onClick={() => router.back()}
              className={`bg-white/10 border-white/20 text-white flex items-center justify-center rounded-lg hover:text-white px-4 py-2`}
            >
              <ArrowLeft className="w-4 h-4" />
            </button>
            <div className="flex items-center gap-3.5">
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
            </div>
          </div>

          <AuthModal isOpen={isAuthOpen} onClose={() => setIsAuthOpen(false)} /> */}

          <div className="text-center">
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold font-playfair text-white mb-4">
              Our <span className="text-amber-500">Products</span>
            </h1>
            <p className="text-lg sm:text-xl text-gray-300 max-w-2xl mx-auto">
              Discover our complete collection of premium furniture pieces
            </p>
          </div>
        </div>
      </section>


      {/* Filters and Search */}
      <section className="py-2 bg-gray-900/50 backdrop-blur-sm lg:sticky lg:top-0 z-40 border-b border-white/10">
        <div className="mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-row gap-2 items-center justify-between">
            {/* Search */}
            <div className="flex items-center gap-4 w-full relative">

              {/* Mobile Search */}
              <div className={`relative flex-1 max-w-md w-full transition-all duration-300 ${mobileFilterTypesOpen === 'search' ? 'block' : 'hidden lg:block'
                }`}>
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <Input
                  placeholder="Search products..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 pr-10 bg-white/10 border-white/20 text-white placeholder:text-gray-400"
                />
                {searchTerm && (
                  <button
                    onClick={() => setSearchTerm('')}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white transition-colors flex items-center justify-center"
                  >
                    <X className="w-4 h-4" />
                  </button>
                )}
              </div>

              {/* Mobile Category Filters */}
              <div className={`flex gap-2 px-4 lg:hidden overflow-x-scroll scrollbar-hide [scrollbar-width:none] ${mobileFilterTypesOpen === 'category' ? 'block' : 'hidden'
                }`}>
                {categories.map((category, index) => (
                  <Button
                    ref={el => categoryRefs.current[index] = el}
                    key={category}
                    variant={selectedCategories.includes(category) ? 'default' : 'ghost'}
                    onClick={() => toggleCategory(category)}
                    className={`whitespace-nowrap flex-shrink-0 ${selectedCategories.includes(category)
                      ? 'bg-amber-500 text-black hover:bg-amber-500'
                      : 'text-white/60 hover:text-white hover:bg-white/10'
                      }`}
                  >
                    {category}
                  </Button>
                ))}
              </div>

              {/* Mobile Wood Type Filters */}
              <div className={`lg:hidden overflow-x-auto scrollbar-hide [scrollbar-width:none] ${mobileFilterTypesOpen === 'woodType' ? 'block' : 'hidden'
                }`}>
                <div className="flex gap-2 px-4">
                  {woodTypes.map((woodType, index) => (
                    <Button
                      ref={el => woodTypeRefs.current[index] = el}
                      key={woodType}
                      variant={selectedWoodTypes.includes(woodType) ? 'default' : 'ghost'}
                      onClick={() => toggleWoodType(woodType)}
                      className={`whitespace-nowrap flex-shrink-0 ${selectedWoodTypes.includes(woodType)
                        ? 'bg-amber-500 text-black hover:bg-amber-500'
                        : 'text-white/60 hover:text-white hover:bg-white/10'
                        }`}
                    >
                      {woodType}
                    </Button>
                  ))}
                </div>
              </div>

              <button
                onClick={() => { setMobileFiltersOpen('none'); }}
                className={`bg-white/10 border-white/20 text-white flex items-center justify-center rounded-lg hover:text-white lg:hidden px-4 py-2 ${mobileFilterTypesOpen === 'none' ? 'hidden' : 'flex'
                  }`}
              >
                {/* <ChevronLeft className="w-4 h-4" /> */}
                Back
              </button>


            </div>

            {/* Controls */}
            <div className="flex-1 items-center justify-end gap-4 w-full lg:w-1/2 relative">
              <div className={`flex items-center gap-2 w-full lg:w-auto transition-all duration-300 ${mobileFilterTypesOpen !== 'none' ? 'hidden' : 'flex'
                }`}>
                {/* Mobile Buttons */}

                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setMobileFiltersOpen('category')}
                  className="lg:hidden border-white/20 text-white bg-white/10 relative"
                >
                  Category
                  {selectedCategories.length > 0 && (
                    <Badge className="ml-1 h-5 w-5 p-0 flex items-center justify-center bg-amber-500 text-black text-xs">
                      {selectedCategories.length}
                    </Badge>
                  )}
                </Button>

                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setMobileFiltersOpen('woodType')}
                  className="lg:hidden border-white/20 text-white bg-white/10 relative"
                >
                  Wood Type
                  {selectedWoodTypes.length > 0 && (
                    <Badge className="ml-1 h-5 w-5 p-0 flex items-center justify-center bg-amber-500 text-black text-xs">
                      {selectedWoodTypes.length}
                    </Badge>
                  )}
                </Button>

                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setMobileFiltersOpen('search')}
                  className="lg:hidden border-white/20 text-white bg-white/10"
                >
                  <Search className={`w-4 h-4 ${searchTerm ? 'text-yellow-400' : ''}`} />
                </Button>

                <Button
                  variant="outline"
                  size="sm"
                  onClick={clearAllFilters}
                  className="lg:hidden border-white/20 text-white bg-white/10"
                >
                  <RefreshCcw className="w-4 h-4" />
                </Button>


                {/* View Mode Toggle */}
                <div className="border border-white/20 rounded-lg overflow-hidden hidden lg:flex">
                  <Button
                    variant={viewMode === 'grid' ? 'default' : 'ghost'}
                    size="sm"
                    onClick={() => setViewMode('grid')}
                    className="rounded-none text-white"
                  >
                    <Grid className="w-4 h-4" />
                  </Button>
                  <Button
                    variant={viewMode === 'list' ? 'default' : 'ghost'}
                    size="sm"
                    onClick={() => setViewMode('list')}
                    className="rounded-none text-white"
                  >
                    <List className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar Filters */}
          <aside className={`lg:w-64 ${showFilters ? 'block' : 'hidden lg:block'}`}>
            <div className="space-y-6 sticky top-24">
              <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-amber-500/10">
                <h3 className="text-lg font-bold text-white mb-4">Categories</h3>
                <div className="space-y-3">
                  {categories.map((category) => (
                    <label key={category} className="flex items-center space-x-3 cursor-pointer group">
                      <input
                        type="checkbox"
                        checked={selectedCategories.includes(category)}
                        onChange={() => toggleCategory(category)}
                        className="w-5 h-5 rounded border-amber-500/30 bg-white/5 text-amber-500 focus:ring-amber-500 focus:ring-offset-0"
                      />
                      <span className="text-gray-400 group-hover:text-amber-400 transition-colors duration-300">
                        {category}
                      </span>
                    </label>
                  ))}
                </div>
              </div>

              <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-amber-500/10">
                <h3 className="text-lg font-bold text-white mb-4">Wood Type</h3>
                <div className="space-y-3">
                  {woodTypes.map((woodType) => (
                    <label key={woodType} className="flex items-center space-x-3 cursor-pointer group">
                      <input
                        type="checkbox"
                        checked={selectedWoodTypes.includes(woodType)}
                        onChange={() => toggleWoodType(woodType)}
                        className="w-5 h-5 rounded border-amber-500/30 bg-white/5 text-amber-500 focus:ring-amber-500 focus:ring-offset-0"
                      />
                      <span className="text-gray-400 group-hover:text-amber-400 transition-colors duration-300">
                        {woodType}
                      </span>
                    </label>
                  ))}
                </div>
              </div>

              {(selectedCategories.length > 0 || selectedWoodTypes.length > 0) && (
                <Button
                  onClick={clearAllFilters}
                  className="w-full bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-black font-semibold"
                >
                  Clear Filters
                </Button>
              )}
            </div>
          </aside>

          {/* Products Grid */}
          <main className="flex-1">
            <div className="mb-4 text-gray-400">
              Showing {filteredProducts.length} of {products.length} products
            </div>

            <div className={`grid gap-6 ${viewMode === 'grid'
              ? 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3'
              : 'grid-cols-1'
              }`}>
              {filteredProducts.map((product, index) => (
                <Card
                  key={product.id}
                  className={`group glass border-white/20 overflow-hidden hover:scale-105 transition-all duration-300 animate-fade-up ${viewMode === 'list' ? 'flex flex-row' : ''
                    }`}
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <div className={`relative ${viewMode === 'list' ? 'w-48 flex-shrink-0' : ''}`}>
                    <Image
                      src={product.image}
                      alt={product.name}
                      width={400}
                      height={300}
                      className={`object-cover transition-transform duration-300 group-hover:scale-110 ${viewMode === 'list' ? 'w-full h-full' : 'w-full h-64'
                        }`}
                    />

                    <div className="absolute top-4 left-4 flex flex-col gap-2">
                      {product.isNew && (
                        <Badge className="bg-green-500 text-white">New</Badge>
                      )}
                      {product.isBestseller && (
                        <Badge className="bg-red-500 text-white">Bestseller</Badge>
                      )}
                      {product.discount > 0 && (
                        <Badge className="gradient-gold text-black font-semibold">
                          {product.discount}% OFF
                        </Badge>
                      )}
                    </div>

                    <div className="absolute top-4 right-4 flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition-all duration-300">
                      <Button size="icon" variant="secondary" className="h-8 w-8 glass">
                        <Heart className="h-4 w-4" />
                      </Button>
                      <Link href={`/products/${product.id}`} className="h-8 w-8 glass">
                        <Eye className="h-4 w-4" />
                      </Link>
                    </div>
                  </div>

                  <CardContent className={`p-6 ${viewMode === 'list' ? 'flex-1' : ''}`}>
                    <div className="flex gap-2 mb-3">
                      <Badge variant="outline" className="text-gray-300 border-gray-600">
                        {product.category}
                      </Badge>
                      <Badge variant="outline" className="text-gray-300 border-gray-600">
                        {product.woodType}
                      </Badge>
                    </div>

                    <h3 className="text-lg font-semibold text-white mb-2 group-hover:text-yellow-400 transition-colors">
                      <Link href={`/products/${product.id}`}>
                        {product.name}
                      </Link>
                    </h3>

                    <p className="text-gray-300 text-sm mb-3">{product.description}</p>

                    <div className="flex items-center mb-3">
                      <div className="flex items-center">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            className={`w-4 h-4 ${i < Math.floor(product.rating)
                              ? 'text-yellow-400 fill-current'
                              : 'text-gray-600'
                              }`}
                          />
                        ))}
                      </div>
                      <span className="text-sm text-gray-300 ml-2">
                        {product.rating} ({product.reviews})
                      </span>
                    </div>

                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center gap-2">
                        <span className="text-2xl font-bold text-gradient">
                          ${product.price}
                        </span>
                        {product.originalPrice > product.price && (
                          <span className="text-lg text-gray-500 line-through">
                            ${product.originalPrice}
                          </span>
                        )}
                      </div>
                    </div>

                    <Button className="w-full gradient-gold text-black font-semibold hover:scale-105 transition-transform duration-200"
                      onClick={() => {
                        if (product.id) {
                          // Add to cart functionality
                          const cartItems = JSON.parse(localStorage.getItem('cart') || '[]');
                          const existingItem = cartItems.find((item: any) => item.id === product.id);

                          if (existingItem) {
                            existingItem.quantity += 1;
                          } else {
                            cartItems.push({ ...product, quantity: 1 });
                          }

                          localStorage.setItem('cart', JSON.stringify(cartItems));

                          // Dispatch custom event to notify other components
                          window.dispatchEvent(new Event('cartUpdated'));
                        }
                      }}>
                      <ShoppingCart className="w-4 h-4 mr-2" />
                      Add to Cart
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>

            {filteredProducts.length === 0 && (
              <div className="text-center py-12">
                <div className="text-gray-400 text-lg mb-4">No products found</div>
                <p className="text-gray-500 mb-4">Try adjusting your filters or search terms</p>
                <Button onClick={clearAllFilters} className="gradient-gold text-black">
                  Clear All Filters
                </Button>
              </div>
            )}
          </main>
        </div>
      </div>
      <Footer />
    </div>
  );
}