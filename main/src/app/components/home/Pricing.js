// FILE: src/app/components/home/Pricing.js
'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { FileText, Calendar, Star } from 'lucide-react';
import BookingModal from '../BookingModal';

export default function Pricing({ products, onPurchaseNow }) {
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [showBookingModal, setShowBookingModal] = useState(false);
  const router = useRouter();

  const formatPrice = (cents) => `$${(cents / 100).toFixed(0)}`;

  const getProductIcon = (type) => {
    const iconProps = { size: 40, className: "mx-auto text-yellow-400" };
    switch (type) {
      case 'pdf': return <FileText {...iconProps} />;
      case 'coaching_individual':
      case 'coaching_team': return <Calendar {...iconProps} />;
      default: return <FileText {...iconProps} />;
    }
  };

  const getProductButtonText = (type) => {
    if (type === 'pdf') {
      return [
        { text: '📄 Re-Download PDF', primary: false },
        { text: 'Purchase Now →', primary: true }
      ];
    }
    return [{ text: '📅 Book Coaching Session', primary: true }];
  };

  const handleProductAction = (product, isPrimary) => {
    if (product.type === 'coaching_individual' || product.type === 'coaching_team') {
      if (isPrimary) {
        setSelectedProduct(product);
        setShowBookingModal(true);
      }
    } else if (product.type === 'pdf') {
      if (isPrimary) {
        // Primary button = Purchase Now
        onPurchaseNow(product);
      } else {
        // Non-primary button = Re-Download PDF
        router.push('/download');
      }
    } else {
      // For other product types, use the regular purchase flow
      onPurchaseNow(product);
    }
  };

  return (
    <section id="services" className="relative section-padding bg-[#0f1729] overflow-hidden">
      
      <div className="relative content-container container-padding z-10">
        <div className="text-center mb-12">
          <h2 className="text-section font-heading mb-4 text-white">Pricing Plans</h2>
          <div className="w-24 h-1 bg-gradient-to-r from-yellow-400 to-orange-400 mx-auto rounded-full"></div>
        </div>
        
        {products.length === 0 ? (
          <div className="text-center text-white/60">
            No pricing plans available at the moment.
          </div>
        ) : (
          <div className="grid md:grid-cols-3 gap-8">
            {products.map((product) => (
              <div 
                key={product.id} 
                className={`card-ui ${product.is_popular ? 'card-popular-ui' : ''} relative group hover:scale-105 hover:-translate-y-2 transition-all duration-300 transform`}
              >
                {product.is_popular && (
                  <div className="popular-badge-ui">Popular</div>
                )}
                
                <div className="text-center p-6 relative">
                  {/* Subtle background glow on hover */}
                  <div className="absolute inset-0 bg-gradient-to-br from-purple-500/0 to-pink-500/0 group-hover:from-purple-500/20 group-hover:to-pink-500/10 rounded-lg transition-all duration-300"></div>
                  
                  <div className="relative z-10 mb-4">
                    <div className="inline-block p-3 rounded-full bg-white/5 border border-white/10 group-hover:scale-110 transition-transform duration-300">
                      {getProductIcon(product.type)}
                    </div>
                  </div>
                  <h3 className="font-heading font-semibold text-2xl mb-2 text-white">
                    {product.name}
                  </h3>
                  <div className="text-4xl font-bold text-yellow-400 mb-4">
                    {formatPrice(product.price)}
                  </div>
                  <p className="text-white/80 mb-6 min-h-[48px]">
                    {product.description}
                  </p>
                  
                  <ul className="text-sm space-y-3 mb-8 text-left text-white/70">
                    {(() => {
                      // Handle different feature formats: array, string, or empty
                      let features = [];
                      if (Array.isArray(product.features)) {
                        features = product.features;
                      } else if (typeof product.features === 'string' && product.features.trim()) {
                        features = product.features.split(',').map(f => f.trim()).filter(f => f);
                      }
                      
                      return features.map((feature, index) => (
                        <li key={index} className="flex items-start">
                          <Star size={16} className="mr-2 mt-1 text-yellow-400 flex-shrink-0 fill-yellow-400" />
                          <span>{feature}</span>
                        </li>
                      ));
                    })()}
                  </ul>
                  
                  <div className="mb-4 p-3 bg-white/5 rounded-lg border border-white/10">
                    <p className="text-xs text-white/90 text-center">
                      <span className="inline-block w-2 h-2 bg-green-500 rounded-full mr-2"></span>
                      <strong>No account required!</strong> Purchase now, create password after payment
                    </p>
                  </div>
                  
                  <div className="space-y-3 relative z-10">
                    {getProductButtonText(product.type).map((button, index) => (
                      <button 
                        key={index}
                        onClick={() => handleProductAction(product, button.primary)}
                        className={`w-full text-button ${button.primary ? 'btn-primary hover:scale-105 hover:-translate-y-1' : 'btn-secondary hover:scale-105 hover:-translate-y-1'} transition-all duration-300 transform relative overflow-hidden group`}
                      >
                        <span className="relative z-10">{button.text}</span>
                        {button.primary && (
                          <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-purple-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                        )}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Booking Modal */}
        <BookingModal
          isOpen={showBookingModal}
          onClose={() => setShowBookingModal(false)}
          product={selectedProduct}
          onBookingComplete={(bookingData) => {
            setShowBookingModal(false);
            // Handle successful booking if needed
            console.log('Booking completed:', bookingData);
          }}
        />
      </div>
    </section>
  );
}
