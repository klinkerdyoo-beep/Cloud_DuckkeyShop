import { useState, useEffect } from "react";
import type { CartItem, CustomProductInput } from "../types";

export function useCart() {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [total, setTotal] = useState(0);

  const email = "alice@example.com"; //mock

  // fetch cart from backend
  useEffect(() => {
    fetch(`http://localhost:3001/api/cart/${email}`)
      .then((res) => res.json())
      .then((data: CartItem[]) => setCart(data))
      .catch(console.error);
  }, [email]);

  // calculate total
  useEffect(() => {
    const sum = cart.reduce((acc, item) => acc + item.price * item.quantities, 0);
    setTotal(sum);
  }, [cart]);

  const addToCart = async (item: CartItem) => {
    await fetch("http://localhost:3001/api/cart/add", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email,
        productID: item.product_id,
        quantities: item.quantities,
        customValue: item.customValue,
      }),
    });

    setCart((prev) => {
      const existing = prev.find(
        (p) => p.product_id === item.product_id && p.customValue === item.customValue
      );
      if (existing) {
        return prev.map((p) =>
          p.product_id === item.product_id && p.customValue === item.customValue
            ? { ...p, quantities: p.quantities + item.quantities }
            : p
        );
      }
      return [...prev, item];
    });
  };


  const addCustomProductToCart = async (customData: CustomProductInput) => {
    const formData = new FormData();
    formData.append("userEmail", email);
    formData.append("profile", customData.profile);
    formData.append("keyColor", customData.keyColor);
    formData.append("textColor", customData.textColor);
    formData.append("customText", customData.customText);
    if (customData.notes) formData.append("notes", customData.notes);
    if (customData.customImage) formData.append("customImage", customData.customImage);

    const response = await fetch("http://localhost:3001/api/cart/add-custom", {
      method: "POST",
      body: formData,
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.error || "Failed to create custom product");
    }

    const newItem: CartItem = {
      product_id: data.id,
      productID: data.id,
      productName: `Custom Keycap (${customData.profile})`,
      price: 0,
      quantities: 1,
      customValue: `${customData.profile}-${customData.keyColor}-${customData.textColor}-${customData.customText}`,
      imgURL: data.imagePath || "",
    };

    await addToCart(newItem);
    return data.id;
  };

  const updatequantities = async (id: string, qty: number, customValue: string = "") => {
    await fetch("http://localhost:3001/api/cart/update", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, productID: id, quantities: qty, customValue }),
    });

    setCart((prev) =>
      prev.map((p) =>
        p.product_id === id && p.customValue === customValue
          ? { ...p, quantities: Math.max(1, qty) }
          : p
      )
    );
  };

  const removeFromCart = async (id: string, customValue: string = "") => {
    await fetch("http://localhost:3001/api/cart/remove", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, productID: id, customValue }),
    });

    setCart((prev) =>
      prev.filter((p) => !(p.product_id === id && p.customValue === customValue))
    );
  };

  const clearCart = async () => {
    setCart([]);
  };

  return {
    cart,
    addToCart,
    addCustomProductToCart, // 👈 new export
    updatequantities,
    removeFromCart,
    clearCart,
    total,
  };
}
