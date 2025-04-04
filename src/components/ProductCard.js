import React from 'react';

export default function ProductCard({ product, quantity, onQuantityChange, onAddToCart }) {
  return (
    <div className="product-card">
      <h3>{product.name}</h3>
      <p>Price: ₹{product.price}</p>
      <div className="quantity-controls">
        <button onClick={() => onQuantityChange(product.id, -1)}>-</button>
        <span>{quantity}</span>
        <button onClick={() => onQuantityChange(product.id, 1)}>+</button>
      </div>
      <button className="add-to-cart" onClick={() => onAddToCart(product)}>
        Add to Cart
      </button>
    </div>
  );
}
