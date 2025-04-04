// App.js
import React, { useState, useEffect } from 'react';
import './App.css';
import ProductCard from './components/ProductCard';
import CartItem from './components/CartItem';

const PRODUCTS = [
  { id: 1, name: 'T-shirt', price: 300 },
  { id: 2, name: 'Jeans', price: 500 },
  { id: 3, name: 'Shoes', price: 800 },
];

const FREE_GIFT = { id: 'gift', name: 'Free Cap', price: 0 };
const THRESHOLD = 1000;

export default function ShoppingCartApp() {
  const [quantities, setQuantities] = useState({});
  const [cart, setCart] = useState([]);
  const [subtotal, setSubtotal] = useState(0);
  const [showGiftMsg, setShowGiftMsg] = useState(false);

  const handleQuantityChange = (id, change) => {
    setQuantities((prev) => ({
      ...prev,
      [id]: Math.max(1, (prev[id] || 1) + change),
    }));
  };

  const addToCart = (product) => {
    const quantity = quantities[product.id] || 1;
    setCart((prev) => {
      const existing = prev.find((item) => item.id === product.id);
      if (existing) {
        return prev.map((item) =>
          item.id === product.id ? { ...item, quantity: item.quantity + quantity } : item
        );
      }
      return [...prev, { ...product, quantity }];
    });
  };

  const removeFromCart = (id) => {
    setCart((prev) => prev.filter((item) => item.id !== id));
  };

  const updateCartQuantity = (id, change) => {
    setCart((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, quantity: Math.max(1, item.quantity + change) } : item
      )
    );
  };

  useEffect(() => {
    const total = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);
    setSubtotal(total);
  }, [cart]);

  useEffect(() => {
    const hasGift = cart.some((item) => item.id === 'gift');
    if (subtotal >= THRESHOLD && !hasGift) {
      setCart((prev) => [...prev, { ...FREE_GIFT, quantity: 1 }]);
      setShowGiftMsg(true);
      setTimeout(() => setShowGiftMsg(false), 3000);
    } else if (subtotal < THRESHOLD && hasGift) {
      setCart((prev) => prev.filter((item) => item.id !== 'gift'));
    }
  }, [subtotal]);

  const amountToGift = Math.max(0, THRESHOLD - subtotal);
  const progressValue = Math.min(100, (subtotal / THRESHOLD) * 100);

  return (
    <div className="container">
      <h1>Products</h1>
      <div className="product-grid">
        {PRODUCTS.map((product) => (
          <ProductCard
            key={product.id}
            product={product}
            quantity={quantities[product.id] || 1}
            onQuantityChange={handleQuantityChange}
            onAddToCart={addToCart}
          />
        ))}
      </div>

      <div className="progress-section">
        <progress value={progressValue} max="100"></progress>
        <p>
          {subtotal >= THRESHOLD
            ? 'Free gift added to your cart!'
            : `Add ₹${amountToGift} more to get a free gift.`}
        </p>
      </div>

      <h1>Shopping Cart</h1>
      {cart.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <div className="cart-list">
          {cart.map((item) => (
            <CartItem
              key={item.id}
              item={item}
              onQuantityChange={updateCartQuantity}
              onRemove={removeFromCart}
            />
          ))}
          <div className="subtotal">Subtotal: ₹{subtotal}</div>
        </div>
      )}

      {showGiftMsg && (
        <div className="gift-message">🎁 Congratulations! You've unlocked a free gift!</div>
      )}
    </div>
  );
}
