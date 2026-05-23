import React, { createContext, useContext, useEffect, useState } from "react";

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);

  useEffect(() => {
    const savedCart = JSON.parse(localStorage.getItem("cart")) || [];
    setCart(savedCart);
  }, []);

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  const addToCart = (product) => {
  setCart((prevCart) => {
    const existingItem = prevCart.find(
      (item) => item.id === product.id
    );

    if (existingItem) {
      return prevCart.map((item) =>
        item.id === product.id
          ? {
              ...item,
              quantity: item.quantity + 1,
            }
          : item
      );
    }

    return [
      ...prevCart,
      {
        ...product,
        quantity: 1,
      },
    ];
  });
};

const increaseQuantity = (id) => {
  setCart((prevCart) =>
    prevCart.map((item) =>
      item.id === id
        ? {
            ...item,
            quantity: item.quantity + 1,
          }
        : item
    )
  );
};

const decreaseQuantity = (id) => {
  setCart((prevCart) =>
    prevCart
      .map((item) =>
        item.id === id
          ? {
              ...item,
              quantity: item.quantity - 1,
            }
          : item
      )
      .filter((item) => item.quantity > 0)
  );
};

  const removeFromCart = (id) => {
    setCart((prev) => prev.filter((item) => item.id !== id));
  };

  const clearCart = () => {
    setCart([]);
  };

 const totalAmount = cart.reduce(
  (total, item) =>
    total + item.offer * item.quantity,
  0
);

  return (
   <CartContext.Provider
  value={{
    cart,
    addToCart,
    increaseQuantity,
    decreaseQuantity,
    totalAmount,
  }}
>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);