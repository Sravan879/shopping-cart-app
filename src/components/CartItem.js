import React from 'react';

export default function CartItem({ item, onQuantityChange, onRemove }) {
  return (
    <div className="cart-item">
      <div>
        <strong>{item.name}</strong> - ₹{item.price} × {item.quantity}
      </div>
      {item.id !== 'gift' && (
        <div className="cart-controls">
          <button onClick={() => onQuantityChange(item.id, -1)}>-</button>
          <button onClick={() => onQuantityChange(item.id, 1)}>+</button>
          <button className="remove" onClick={() => onRemove(item.id)}>Remove</button>
        </div>
      )}
    </div>
  );
}