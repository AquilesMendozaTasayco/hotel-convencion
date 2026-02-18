"use client";

import { createContext, useContext, useState, useEffect } from "react";
import { getProductPrice } from "@/lib/utils/productPrice";

const CartContext = createContext();

export function CartProvider({ children }) {
  const [cart, setCart] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);

  // Cargar carrito del localStorage al iniciar
  useEffect(() => {
    const savedCart = localStorage.getItem("moccaCart");
    if (savedCart) {
      setCart(JSON.parse(savedCart));
    }
  }, []);

  // Guardar carrito en localStorage cuando cambie
  useEffect(() => {
    localStorage.setItem("moccaCart", JSON.stringify(cart));
  }, [cart]);

  const addToCart = (product) => {
    setCart((prevCart) => {
      const existingItem = prevCart.find((item) => item.id === product.id);
      
      // Calcular el precio final (con descuento si aplica)
      const finalPrice = getProductPrice(product);
      
      if (existingItem) {
        return prevCart.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      
      // Guardar el producto con toda su información incluyendo datos de descuento
      return [...prevCart, { 
        ...product, 
        quantity: 1,
        // Guardar el precio final calculado para evitar recalcular
        finalPrice: finalPrice,
        // Mantener precio original para referencia
        originalPrice: product.price
      }];
    });
    setIsCartOpen(true);
  };

  const removeFromCart = (productId) => {
    setCart((prevCart) => prevCart.filter((item) => item.id !== productId));
  };

  const updateQuantity = (productId, newQuantity) => {
    if (newQuantity < 1) return;
    
    setCart((prevCart) =>
      prevCart.map((item) =>
        item.id === productId ? { ...item, quantity: newQuantity } : item
      )
    );
  };

  const clearCart = () => {
    setCart([]);
  };

  const getCartTotal = () => {
    return cart.reduce((total, item) => {
      // Usar finalPrice si está disponible, sino calcular
      const price = item.finalPrice || getProductPrice(item);
      return total + (price * item.quantity);
    }, 0);
  };

  const getCartCount = () => {
    return cart.reduce((count, item) => count + item.quantity, 0);
  };

  // Nuevo: Obtener total de ahorros en el carrito
  const getCartSavings = () => {
    return cart.reduce((savings, item) => {
      const originalPrice = parseFloat(item.originalPrice || item.price);
      const finalPrice = item.finalPrice || getProductPrice(item);
      const itemSavings = (originalPrice - finalPrice) * item.quantity;
      return savings + (itemSavings > 0 ? itemSavings : 0);
    }, 0);
  };

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        getCartTotal,
        getCartCount,
        getCartSavings,
        isCartOpen,
        setIsCartOpen,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
}