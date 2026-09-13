import React, { useState, useMemo, useCallback } from 'react';
import { Product, CartItem } from './types';
import { products, categories, roastLevels } from './data';

// ============ HEADER COMPONENT ============
function Header({ 
  cartCount, 
  onCartClick, 
  searchQuery, 
  onSearchChange 
}: { 
  cartCount: number; 
  onCartClick: () => void; 
  searchQuery: string; 
  onSearchChange: (q: string) => void;
}) {
  return (
    <header className="sticky top-0 z-40 bg-cream/95 backdrop-blur-md border-b border-latte/30 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20">
          {/* Logo */}
          <div className="flex items-center gap-2">
            <span className="text-2xl sm:text-3xl">☕</span>
            <div>
              <h1 className="text-lg sm:text-xl font-bold text-espresso tracking-tight leading-none">
                Ember & Bean
              </h1>
              <p className="text-[10px] sm:text-xs text-fog tracking-widest uppercase">
                Specialty Coffee
              </p>
            </div>
          </div>

          {/* Search - Desktop */}
          <div className="hidden md:flex flex-1 max-w-md mx-8">
            <div className="relative w-full">
              <input
                type="text"
                placeholder="Search coffees..."
                value={searchQuery}
                onChange={(e) => onSearchChange(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 rounded-full bg-cream-dark border border-latte/40 
                         text-espresso placeholder-fog/60 focus:outline-none focus:border-amber-warm 
                         focus:ring-2 focus:ring-amber-warm/20 transition-all"
              />
              <svg className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-fog" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
          </div>

          {/* Cart Button */}
          <button
            onClick={onCartClick}
            className="relative p-2 sm:p-3 rounded-full hover:bg-cream-dark transition-colors cursor-pointer"
          >
            <svg className="w-6 h-6 text-espresso" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
            </svg>
            {cartCount > 0 && (
              <span className="absolute -top-0.5 -right-0.5 bg-amber-warm text-white text-xs font-bold 
                            w-5 h-5 rounded-full flex items-center justify-center animate-bounce">
                {cartCount}
              </span>
            )}
          </button>
        </div>

        {/* Search - Mobile */}
        <div className="md:hidden pb-3">
          <div className="relative w-full">
            <input
              type="text"
              placeholder="Search coffees..."
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 rounded-full bg-cream-dark border border-latte/40 
                       text-espresso placeholder-fog/60 focus:outline-none focus:border-amber-warm 
                       focus:ring-2 focus:ring-amber-warm/20 transition-all text-sm"
            />
            <svg className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-fog" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>
        </div>
      </div>
    </header>
  );
}

// ============ FILTERS COMPONENT ============
function Filters({ 
  activeCategory, 
  onCategoryChange, 
  activeRoast, 
  onRoastChange 
}: { 
  activeCategory: string; 
  onCategoryChange: (c: string) => void;
  activeRoast: string;
  onRoastChange: (r: string) => void;
}) {
  return (
    <div className="space-y-4 mb-8">
      {/* Category Filters */}
      <div>
        <h3 className="text-sm font-semibold text-fog uppercase tracking-wider mb-3">Category</h3>
        <div className="flex flex-wrap gap-2">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => onCategoryChange(cat)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all cursor-pointer
                ${activeCategory === cat 
                  ? 'bg-espresso text-cream shadow-md' 
                  : 'bg-cream-dark text-espresso hover:bg-latte/40 border border-latte/30'}`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Roast Level Filters */}
      <div>
        <h3 className="text-sm font-semibold text-fog uppercase tracking-wider mb-3">Roast Level</h3>
        <div className="flex flex-wrap gap-2">
          {roastLevels.map((roast) => (
            <button
              key={roast}
              onClick={() => onRoastChange(roast)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all cursor-pointer
                ${activeRoast === roast 
                  ? 'bg-amber-warm text-white shadow-md' 
                  : 'bg-cream-dark text-espresso hover:bg-amber-light/30 border border-latte/30'}`}
            >
              {roast}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

// ============ PRODUCT CARD COMPONENT ============
function ProductCard({ 
  product, 
  onAddToCart, 
  onViewDetails 
}: { 
  product: Product; 
  onAddToCart: (p: Product) => void;
  onViewDetails: (p: Product) => void;
}) {
  const roastColor = {
    'Light': 'bg-yellow-100 text-yellow-800',
    'Light-Medium': 'bg-amber-100 text-amber-800',
    'Medium': 'bg-orange-100 text-orange-800',
    'Medium-Dark': 'bg-orange-200 text-orange-900',
    'Dark': 'bg-amber-900 text-amber-100',
  }[product.roast] || 'bg-gray-100 text-gray-800';

  return (
    <div className="bg-white rounded-2xl overflow-hidden shadow-md card-hover border border-latte/20 group">
      {/* Image */}
      <div className="relative overflow-hidden aspect-square cursor-pointer bg-cream-dark" onClick={() => onViewDetails(product)}>
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          onError={(e) => {
            const target = e.target as HTMLImageElement;
            target.style.display = 'none';
            target.parentElement!.classList.add('flex', 'items-center', 'justify-center');
            const fallback = document.createElement('div');
            fallback.className = 'text-center';
            fallback.innerHTML = '<span style="font-size:3rem">☕</span><p style="color:#8B7355;font-size:0.75rem;margin-top:0.5rem">Ember & Bean</p>';
            target.parentElement!.appendChild(fallback);
          }}
        />
        <div className="absolute top-3 left-3">
          <span className={`px-2.5 py-1 rounded-full text-xs font-semibold ${roastColor}`}>
            {product.roast} Roast
          </span>
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-espresso/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      </div>

      {/* Content */}
      <div className="p-5">
        <div className="flex items-start justify-between gap-2 mb-2">
          <h3 
            className="font-bold text-espresso text-lg leading-tight cursor-pointer hover:text-amber-warm transition-colors"
            onClick={() => onViewDetails(product)}
          >
            {product.name}
          </h3>
          <div className="flex items-center gap-1 text-amber-warm shrink-0">
            <svg className="w-4 h-4 fill-current" viewBox="0 0 20 20">
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
            </svg>
            <span className="text-sm font-medium">{product.rating}</span>
          </div>
        </div>

        <p className="text-sm text-fog mb-3">{product.origin} · {product.weight}</p>
        
        <div className="flex flex-wrap gap-1.5 mb-4">
          {product.notes.slice(0, 3).map((note) => (
            <span key={note} className="px-2 py-0.5 bg-cream-dark rounded text-xs text-mocha">
              {note}
            </span>
          ))}
        </div>

        <div className="flex items-center justify-between">
          <span className="text-xl font-bold text-espresso">${product.price.toFixed(2)}</span>
          <button
            onClick={() => onAddToCart(product)}
            className="btn-primary !px-4 !py-2 text-sm flex items-center gap-2"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
            </svg>
            Add
          </button>
        </div>
      </div>
    </div>
  );
}

// ============ PRODUCT DETAIL MODAL ============
function ProductDetail({ 
  product, 
  onClose, 
  onAddToCart 
}: { 
  product: Product; 
  onClose: () => void;
  onAddToCart: (p: Product, qty: number) => void;
}) {
  const [quantity, setQuantity] = useState(1);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 fade-in" onClick={onClose}>
      <div className="absolute inset-0 bg-espresso/60 backdrop-blur-sm" />
      <div 
        className="relative bg-cream rounded-3xl max-w-3xl w-full max-h-[90vh] overflow-y-auto shadow-2xl slide-up"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 p-2 rounded-full bg-white/80 hover:bg-white 
                   transition-colors shadow-md cursor-pointer"
        >
          <svg className="w-5 h-5 text-espresso" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        <div className="grid md:grid-cols-2 gap-0">
          {/* Image */}
          <div className="aspect-square md:aspect-auto md:h-full bg-cream-dark flex items-center justify-center">
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-full object-cover md:rounded-l-3xl"
              onError={(e) => {
                const target = e.target as HTMLImageElement;
                target.style.display = 'none';
              }}
            />
          </div>

          {/* Details */}
          <div className="p-6 sm:p-8 flex flex-col">
            <div className="mb-2">
              <span className="text-xs font-semibold uppercase tracking-wider text-amber-warm">
                {product.category}
              </span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold text-espresso mb-1">{product.name}</h2>
            <p className="text-fog mb-4">{product.origin}</p>

            <div className="flex items-center gap-4 mb-6">
              <div className="flex items-center gap-1 text-amber-warm">
                <svg className="w-5 h-5 fill-current" viewBox="0 0 20 20">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
                <span className="font-semibold">{product.rating}</span>
              </div>
              <span className="text-sm text-fog">·</span>
              <span className="text-sm text-fog">{product.roast} Roast</span>
              <span className="text-sm text-fog">·</span>
              <span className="text-sm text-fog">{product.weight}</span>
            </div>

            <p className="text-espresso/80 leading-relaxed mb-6 text-sm sm:text-base">
              {product.description}
            </p>

            {/* Tasting Notes */}
            <div className="mb-6">
              <h4 className="text-sm font-semibold text-fog uppercase tracking-wider mb-2">Tasting Notes</h4>
              <div className="flex flex-wrap gap-2">
                {product.notes.map((note) => (
                  <span key={note} className="px-3 py-1.5 bg-cream-dark rounded-full text-sm text-mocha font-medium border border-latte/30">
                    {note}
                  </span>
                ))}
              </div>
            </div>

            {/* Price & Add to Cart */}
            <div className="mt-auto pt-4 border-t border-latte/30">
              <div className="flex items-center justify-between mb-4">
                <span className="text-3xl font-bold text-espresso">${product.price.toFixed(2)}</span>
                
                {/* Quantity Selector */}
                <div className="flex items-center gap-3 bg-cream-dark rounded-full px-3 py-1.5">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="w-7 h-7 rounded-full bg-white shadow-sm flex items-center justify-center 
                             hover:bg-cream-dark transition-colors cursor-pointer"
                  >
                    <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 12H4" />
                    </svg>
                  </button>
                  <span className="font-semibold text-espresso w-6 text-center">{quantity}</span>
                  <button
                    onClick={() => setQuantity(Math.min(10, quantity + 1))}
                    className="w-7 h-7 rounded-full bg-white shadow-sm flex items-center justify-center 
                             hover:bg-cream-dark transition-colors cursor-pointer"
                  >
                    <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                    </svg>
                  </button>
                </div>
              </div>
              <button
                onClick={() => { onAddToCart(product, quantity); onClose(); }}
                className="w-full btn-primary text-center flex items-center justify-center gap-2"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                </svg>
                Add to Cart — ${(product.price * quantity).toFixed(2)}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// ============ CART SIDEBAR ============
function CartSidebar({ 
  isOpen, 
  onClose, 
  items, 
  onUpdateQuantity, 
  onRemoveItem, 
  onCheckout 
}: { 
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  onUpdateQuantity: (id: number, qty: number) => void;
  onRemoveItem: (id: number) => void;
  onCheckout: () => void;
}) {
  const total = items.reduce((sum, item) => sum + item.product.price * item.quantity, 0);
  const itemCount = items.reduce((sum, item) => sum + item.quantity, 0);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 fade-in" onClick={onClose}>
      <div className="absolute inset-0 bg-espresso/50 backdrop-blur-sm" />
      <div 
        className="absolute right-0 top-0 h-full w-full max-w-md bg-cream shadow-2xl slide-in-right flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-latte/30">
          <div>
            <h2 className="text-xl font-bold text-espresso">Your Cart</h2>
            <p className="text-sm text-fog">{itemCount} item{itemCount !== 1 ? 's' : ''}</p>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-full hover:bg-cream-dark transition-colors cursor-pointer"
          >
            <svg className="w-5 h-5 text-espresso" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Items */}
        <div className="flex-1 overflow-y-auto p-6 space-y-4">
          {items.length === 0 ? (
            <div className="text-center py-12">
              <span className="text-5xl mb-4 block">🛒</span>
              <p className="text-fog text-lg">Your cart is empty</p>
              <p className="text-sm text-fog/70 mt-1">Add some delicious coffee!</p>
            </div>
          ) : (
            items.map((item) => (
              <div key={item.product.id} className="flex gap-4 bg-white rounded-xl p-4 shadow-sm border border-latte/20">
                <img
                  src={item.product.image}
                  alt={item.product.name}
                  className="w-16 h-16 rounded-lg object-cover shrink-0 bg-cream-dark"
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.style.display = 'none';
                  }}
                />
                <div className="flex-1 min-w-0">
                  <h4 className="font-semibold text-espresso text-sm truncate">{item.product.name}</h4>
                  <p className="text-xs text-fog">{item.product.weight}</p>
                  <p className="font-bold text-espresso mt-1">${(item.product.price * item.quantity).toFixed(2)}</p>
                </div>
                <div className="flex flex-col items-end gap-2">
                  <button
                    onClick={() => onRemoveItem(item.product.id)}
                    className="text-fog hover:text-red-500 transition-colors cursor-pointer"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                    </svg>
                  </button>
                  <div className="flex items-center gap-2 bg-cream-dark rounded-full px-2 py-1">
                    <button
                      onClick={() => onUpdateQuantity(item.product.id, Math.max(0, item.quantity - 1))}
                      className="w-5 h-5 rounded-full bg-white shadow-sm flex items-center justify-center text-xs cursor-pointer"
                    >
                      −
                    </button>
                    <span className="text-sm font-semibold w-4 text-center">{item.quantity}</span>
                    <button
                      onClick={() => onUpdateQuantity(item.product.id, Math.min(10, item.quantity + 1))}
                      className="w-5 h-5 rounded-full bg-white shadow-sm flex items-center justify-center text-xs cursor-pointer"
                    >
                      +
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer */}
        {items.length > 0 && (
          <div className="p-6 border-t border-latte/30 space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-fog">Subtotal</span>
              <span className="text-lg font-bold text-espresso">${total.toFixed(2)}</span>
            </div>
            <div className="flex justify-between items-center text-sm">
              <span className="text-fog">Shipping</span>
              <span className="text-mocha font-medium">{total >= 50 ? 'Free' : '$5.99'}</span>
            </div>
            <div className="flex justify-between items-center pt-3 border-t border-latte/20">
              <span className="font-bold text-espresso">Total</span>
              <span className="text-xl font-bold text-espresso">
                ${(total + (total >= 50 ? 0 : 5.99)).toFixed(2)}
              </span>
            </div>
            {total < 50 && (
              <p className="text-xs text-amber-warm text-center">
                Add ${(50 - total).toFixed(2)} more for free shipping!
              </p>
            )}
            <button
              onClick={onCheckout}
              className="w-full btn-primary text-center flex items-center justify-center gap-2"
            >
              Proceed to Checkout
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

// ============ CHECKOUT MODAL ============
function CheckoutModal({ 
  isOpen, 
  onClose, 
  items, 
  onComplete 
}: { 
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  onComplete: () => void;
}) {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    name: '', email: '', address: '', city: '', zip: '', cardNumber: '', expiry: '', cvv: ''
  });

  const total = items.reduce((sum, item) => sum + item.product.price * item.quantity, 0);
  const shipping = total >= 50 ? 0 : 5.99;

  if (!isOpen) return null;

  const handleSubmit = () => {
    if (step < 3) {
      setStep(step + 1);
    } else {
      setStep(4); // Success
    }
  };

  const handleComplete = () => {
    onComplete();
    setStep(1);
    setFormData({ name: '', email: '', address: '', city: '', zip: '', cardNumber: '', expiry: '', cvv: '' });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 fade-in" onClick={onClose}>
      <div className="absolute inset-0 bg-espresso/60 backdrop-blur-sm" />
      <div 
        className="relative bg-cream rounded-3xl max-w-lg w-full max-h-[90vh] overflow-y-auto shadow-2xl slide-up"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 p-2 rounded-full bg-white/80 hover:bg-white 
                   transition-colors shadow-md cursor-pointer"
        >
          <svg className="w-5 h-5 text-espresso" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        <div className="p-6 sm:p-8">
          {/* Progress Steps */}
          {step < 4 && (
            <div className="flex items-center justify-center gap-2 mb-8">
              {[1, 2, 3].map((s) => (
                <React.Fragment key={s}>
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold transition-colors
                    ${s <= step ? 'bg-amber-warm text-white' : 'bg-cream-dark text-fog'}`}>
                    {s < step ? '✓' : s}
                  </div>
                  {s < 3 && <div className={`w-12 h-0.5 ${s < step ? 'bg-amber-warm' : 'bg-cream-dark'}`} />}
                </React.Fragment>
              ))}
            </div>
          )}

          {/* Step 1: Shipping */}
          {step === 1 && (
            <div className="space-y-4">
              <h2 className="text-2xl font-bold text-espresso mb-6">Shipping Details</h2>
              <input
                type="text"
                placeholder="Full Name"
                value={formData.name}
                onChange={(e) => setFormData({...formData, name: e.target.value})}
                className="w-full px-4 py-3 rounded-lg bg-white border border-latte/40 text-espresso 
                         placeholder-fog/60 focus:outline-none focus:border-amber-warm focus:ring-2 focus:ring-amber-warm/20"
              />
              <input
                type="email"
                placeholder="Email Address"
                value={formData.email}
                onChange={(e) => setFormData({...formData, email: e.target.value})}
                className="w-full px-4 py-3 rounded-lg bg-white border border-latte/40 text-espresso 
                         placeholder-fog/60 focus:outline-none focus:border-amber-warm focus:ring-2 focus:ring-amber-warm/20"
              />
              <input
                type="text"
                placeholder="Street Address"
                value={formData.address}
                onChange={(e) => setFormData({...formData, address: e.target.value})}
                className="w-full px-4 py-3 rounded-lg bg-white border border-latte/40 text-espresso 
                         placeholder-fog/60 focus:outline-none focus:border-amber-warm focus:ring-2 focus:ring-amber-warm/20"
              />
              <div className="grid grid-cols-2 gap-4">
                <input
                  type="text"
                  placeholder="City"
                  value={formData.city}
                  onChange={(e) => setFormData({...formData, city: e.target.value})}
                  className="w-full px-4 py-3 rounded-lg bg-white border border-latte/40 text-espresso 
                           placeholder-fog/60 focus:outline-none focus:border-amber-warm focus:ring-2 focus:ring-amber-warm/20"
                />
                <input
                  type="text"
                  placeholder="ZIP Code"
                  value={formData.zip}
                  onChange={(e) => setFormData({...formData, zip: e.target.value})}
                  className="w-full px-4 py-3 rounded-lg bg-white border border-latte/40 text-espresso 
                           placeholder-fog/60 focus:outline-none focus:border-amber-warm focus:ring-2 focus:ring-amber-warm/20"
                />
              </div>
              <button onClick={handleSubmit} className="w-full btn-primary mt-4">
                Continue to Payment
              </button>
            </div>
          )}

          {/* Step 2: Payment */}
          {step === 2 && (
            <div className="space-y-4">
              <h2 className="text-2xl font-bold text-espresso mb-6">Payment Details</h2>
              <div className="bg-white rounded-xl p-4 border border-latte/30">
                <div className="flex items-center gap-2 mb-4">
                  <span className="text-lg">💳</span>
                  <span className="font-semibold text-espresso">Card Payment</span>
                </div>
                <input
                  type="text"
                  placeholder="Card Number"
                  value={formData.cardNumber}
                  onChange={(e) => setFormData({...formData, cardNumber: e.target.value})}
                  className="w-full px-4 py-3 rounded-lg bg-cream border border-latte/40 text-espresso 
                           placeholder-fog/60 focus:outline-none focus:border-amber-warm focus:ring-2 focus:ring-amber-warm/20 mb-3"
                />
                <div className="grid grid-cols-2 gap-3">
                  <input
                    type="text"
                    placeholder="MM/YY"
                    value={formData.expiry}
                    onChange={(e) => setFormData({...formData, expiry: e.target.value})}
                    className="w-full px-4 py-3 rounded-lg bg-cream border border-latte/40 text-espresso 
                             placeholder-fog/60 focus:outline-none focus:border-amber-warm focus:ring-2 focus:ring-amber-warm/20"
                  />
                  <input
                    type="text"
                    placeholder="CVV"
                    value={formData.cvv}
                    onChange={(e) => setFormData({...formData, cvv: e.target.value})}
                    className="w-full px-4 py-3 rounded-lg bg-cream border border-latte/40 text-espresso 
                             placeholder-fog/60 focus:outline-none focus:border-amber-warm focus:ring-2 focus:ring-amber-warm/20"
                  />
                </div>
              </div>
              <div className="flex gap-3 mt-4">
                <button onClick={() => setStep(1)} className="flex-1 btn-secondary">
                  Back
                </button>
                <button onClick={handleSubmit} className="flex-1 btn-primary">
                  Review Order
                </button>
              </div>
            </div>
          )}

          {/* Step 3: Review */}
          {step === 3 && (
            <div className="space-y-4">
              <h2 className="text-2xl font-bold text-espresso mb-6">Review Order</h2>
              
              <div className="space-y-3 max-h-48 overflow-y-auto">
                {items.map((item) => (
                  <div key={item.product.id} className="flex items-center gap-3 bg-white rounded-lg p-3 border border-latte/20">
                    <img src={item.product.image} alt={item.product.name} className="w-12 h-12 rounded-lg object-cover bg-cream-dark"
                      onError={(e) => {
                        const target = e.target as HTMLImageElement;
                        target.style.display = 'none';
                      }}
                    />
                    <div className="flex-1 min-w-0">
                      <p className="font-semibold text-espresso text-sm truncate">{item.product.name}</p>
                      <p className="text-xs text-fog">Qty: {item.quantity}</p>
                    </div>
                    <span className="font-bold text-espresso text-sm">${(item.product.price * item.quantity).toFixed(2)}</span>
                  </div>
                ))}
              </div>

              <div className="bg-white rounded-xl p-4 border border-latte/30 space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-fog">Subtotal</span>
                  <span className="text-espresso">${total.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-fog">Shipping</span>
                  <span className="text-espresso">{shipping === 0 ? 'Free' : `$${shipping.toFixed(2)}`}</span>
                </div>
                <div className="flex justify-between font-bold text-espresso pt-2 border-t border-latte/20">
                  <span>Total</span>
                  <span>${(total + shipping).toFixed(2)}</span>
                </div>
              </div>

              <div className="flex gap-3 mt-4">
                <button onClick={() => setStep(2)} className="flex-1 btn-secondary">
                  Back
                </button>
                <button onClick={handleSubmit} className="flex-1 btn-primary">
                  Place Order
                </button>
              </div>
            </div>
          )}

          {/* Step 4: Success */}
          {step === 4 && (
            <div className="text-center py-8">
              <div className="text-6xl mb-4">🎉</div>
              <h2 className="text-2xl font-bold text-espresso mb-2">Order Confirmed!</h2>
              <p className="text-fog mb-2">Thank you for your purchase.</p>
              <p className="text-sm text-fog/70 mb-6">
                A confirmation email has been sent to {formData.email || 'your inbox'}.
                <br />Your coffee will be roasted fresh and shipped within 24 hours.
              </p>
              <div className="bg-white rounded-xl p-4 border border-latte/30 mb-6 text-left">
                <p className="text-sm text-fog mb-1">Order Number</p>
                <p className="font-bold text-espresso">#EB-{Math.random().toString(36).substring(2, 8).toUpperCase()}</p>
              </div>
              <button onClick={handleComplete} className="btn-primary">
                Continue Shopping
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

// ============ HERO SECTION ============
function Hero() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-espresso via-espresso-light to-mocha text-cream py-16 sm:py-24 mb-12">
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-10 left-10 w-40 h-40 rounded-full bg-amber-warm blur-3xl" />
        <div className="absolute bottom-10 right-10 w-60 h-60 rounded-full bg-latte blur-3xl" />
      </div>
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="text-3xl sm:text-5xl lg:text-6xl font-bold mb-4 leading-tight">
          Exceptional Coffee,<br />
          <span className="text-amber-light">Thoughtfully Sourced</span>
        </h2>
        <p className="text-cream/70 text-lg sm:text-xl max-w-2xl mx-auto mb-8">
          Discover our curated selection of single-origin and artisan blends, 
          roasted to perfection and delivered fresh to your door.
        </p>
        <div className="flex flex-wrap justify-center gap-4">
          <div className="flex items-center gap-2 text-cream/80 text-sm">
            <span>🌱</span> Ethically Sourced
          </div>
          <div className="flex items-center gap-2 text-cream/80 text-sm">
            <span>🔥</span> Freshly Roasted
          </div>
          <div className="flex items-center gap-2 text-cream/80 text-sm">
            <span>📦</span> Free Shipping $50+
          </div>
        </div>
      </div>
    </section>
  );
}

// ============ MAIN APP ============
export default function App() {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState('All');
  const [activeRoast, setActiveRoast] = useState('All');

  // Filter products
  const filteredProducts = useMemo(() => {
    return products.filter((product) => {
      const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                           product.origin.toLowerCase().includes(searchQuery.toLowerCase()) ||
                           product.notes.some(n => n.toLowerCase().includes(searchQuery.toLowerCase()));
      const matchesCategory = activeCategory === 'All' || product.category === activeCategory;
      const matchesRoast = activeRoast === 'All' || product.roast === activeRoast;
      return matchesSearch && matchesCategory && matchesRoast;
    });
  }, [searchQuery, activeCategory, activeRoast]);

  // Cart operations
  const addToCart = useCallback((product: Product, quantity: number = 1) => {
    setCart((prev) => {
      const existing = prev.find((item) => item.product.id === product.id);
      if (existing) {
        return prev.map((item) =>
          item.product.id === product.id
            ? { ...item, quantity: Math.min(10, item.quantity + quantity) }
            : item
        );
      }
      return [...prev, { product, quantity }];
    });
  }, []);

  const updateQuantity = useCallback((productId: number, quantity: number) => {
    if (quantity === 0) {
      setCart((prev) => prev.filter((item) => item.product.id !== productId));
    } else {
      setCart((prev) =>
        prev.map((item) =>
          item.product.id === productId ? { ...item, quantity } : item
        )
      );
    }
  }, []);

  const removeItem = useCallback((productId: number) => {
    setCart((prev) => prev.filter((item) => item.product.id !== productId));
  }, []);

  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  const handleCheckout = () => {
    setIsCartOpen(false);
    setIsCheckoutOpen(true);
  };

  const handleCheckoutComplete = () => {
    setCart([]);
    setIsCheckoutOpen(false);
  };

  return (
    <div className="min-h-screen bg-cream">
      <Header
        cartCount={cartCount}
        onCartClick={() => setIsCartOpen(true)}
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
      />

      <Hero />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
        {/* Section Title */}
        <div className="text-center mb-10">
          <h2 className="text-2xl sm:text-3xl font-bold text-espresso mb-2">Our Collection</h2>
          <p className="text-fog">Handpicked beans from the world's finest growing regions</p>
        </div>

        {/* Filters */}
        <Filters
          activeCategory={activeCategory}
          onCategoryChange={setActiveCategory}
          activeRoast={activeRoast}
          onRoastChange={setActiveRoast}
        />

        {/* Products Grid */}
        {filteredProducts.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {filteredProducts.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                onAddToCart={(p) => addToCart(p)}
                onViewDetails={setSelectedProduct}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
            <span className="text-5xl mb-4 block">🔍</span>
            <h3 className="text-xl font-semibold text-espresso mb-2">No coffees found</h3>
            <p className="text-fog">Try adjusting your search or filters</p>
            <button
              onClick={() => { setSearchQuery(''); setActiveCategory('All'); setActiveRoast('All'); }}
              className="btn-secondary mt-4"
            >
              Clear Filters
            </button>
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="bg-espresso text-cream/70 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 mb-8">
            <div>
              <div className="flex items-center gap-2 mb-3">
                <span className="text-2xl">☕</span>
                <span className="font-bold text-cream text-lg">Ember & Bean</span>
              </div>
              <p className="text-sm">Crafting exceptional coffee experiences since 2019. Every bean tells a story.</p>
            </div>
            <div>
              <h4 className="font-semibold text-cream mb-3">Quick Links</h4>
              <ul className="space-y-2 text-sm">
                <li className="hover:text-amber-light cursor-pointer transition-colors">Our Story</li>
                <li className="hover:text-amber-light cursor-pointer transition-colors">Subscriptions</li>
                <li className="hover:text-amber-light cursor-pointer transition-colors">Brewing Guides</li>
                <li className="hover:text-amber-light cursor-pointer transition-colors">Wholesale</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-cream mb-3">Contact</h4>
              <ul className="space-y-2 text-sm">
                <li>hello@emberandbean.co</li>
                <li>(555) 123-4567</li>
                <li>Mon–Fri: 8am–6pm EST</li>
              </ul>
            </div>
          </div>
          <div className="border-t border-cream/10 pt-6 text-center text-sm">
            <p>© 2026 Ember & Bean. All rights reserved.</p>
          </div>
        </div>
      </footer>

      {/* Modals & Overlays */}
      {selectedProduct && (
        <ProductDetail
          product={selectedProduct}
          onClose={() => setSelectedProduct(null)}
          onAddToCart={addToCart}
        />
      )}

      <CartSidebar
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        items={cart}
        onUpdateQuantity={updateQuantity}
        onRemoveItem={removeItem}
        onCheckout={handleCheckout}
      />

      <CheckoutModal
        isOpen={isCheckoutOpen}
        onClose={() => setIsCheckoutOpen(false)}
        items={cart}
        onComplete={handleCheckoutComplete}
      />
    </div>
  );
}
