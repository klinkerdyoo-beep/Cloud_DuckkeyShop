import { useState, useEffect } from "react";
import type { CartItem, CustomProductInput } from "../types";
import { useUser } from "../contexts/UserContext";

const API_URL = import.meta.env.VITE_API_URL;

export function useCart() {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(false);

  const { user } = useUser();
  const email = user?.email;
  useEffect(() => {
    if (!email) {
      setCart([]);
      return;
    }

    setLoading(true);
    fetch(`${API_URL}/api/cart/${email}`, { credentials: "include" })
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch cart");
        return res.json();
      })
      .then((data: CartItem[]) => setCart(data))
      .catch((err) => console.error("Cart fetch error:", err))
      .finally(() => setLoading(false));
  }, [email]);
  // calculate total
  useEffect(() => {
    const sum = cart.reduce((acc, item) => acc + item.price * item.quantities, 0);
    setTotal(sum);
  }, [cart]);

  const addToCart = async (item: CartItem) => {
    await fetch(`${API_URL}/api/cart/add`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email,
        productID: item.product_id,
        quantities: item.quantities,
        customValue: item.customValue,
      }),
      credentials: "include",
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
    if (!email) return alert("Please log in first.");
    const formData = new FormData();

  
    formData.append("userEmail", email);

    formData.append("profile", customData.profile);
    formData.append("keyColor", customData.keyColor);
    formData.append("textColor", customData.textColor);
    formData.append("customText", customData.customText);

    if (customData.notes) formData.append("notes", customData.notes);
    if (customData.customImage) formData.append("customImage", customData.customImage);

    const response = await fetch(`${API_URL}/api/cart/add-custom`, {
      method: "POST",
      body: formData,
      credentials: "include",
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

  const updatequantities = async (item: CartItem, qty: number) => {
    if (!email) return;

    const id = item.custom_product_id ?? item.product_id;
    const customValue = item.custom_product_id ? item.customValue : "";

    await fetch(`${API_URL}/api/cart/update`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, productID: id, quantities: qty, customValue }),
      credentials: "include",
    });

    setCart((prev) =>
      prev.map((p) => {
        const matchId = p.custom_product_id ?? p.product_id;
        const matchCustom = p.custom_product_id ? p.customValue : "";
        if (matchId === id && matchCustom === customValue) {
          return { ...p, quantities: Math.max(1, qty) };
        }
        return p;
      })
    );
  };

  const removeFromCart = async (item: CartItem) => {
    if (!email) return;

    const id = item.custom_product_id ?? item.product_id;
    const customValue = item.custom_product_id ? item.customValue : "";

    await fetch(`${API_URL}/api/cart/remove`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, productID: id, customValue }),
      credentials: "include",
    });

    setCart((prev) =>
      prev.filter((p) => {
        const matchId = p.custom_product_id ?? p.product_id;
        const matchCustom = p.custom_product_id ? p.customValue : "";
        return !(matchId === id && matchCustom === customValue);
      })
    );
  };

  const clearCart = async () => {
    if (!email) return;
    setCart([]);
  };

  return {
    cart,
    addToCart,
    addCustomProductToCart,
    updatequantities,
    removeFromCart,
    clearCart,
    total,
    loading,
  };
}