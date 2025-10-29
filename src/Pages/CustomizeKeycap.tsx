import { useState } from "react";
import Navbar from "../components/Narbar";
import Path from "../components/Path";
import bg1 from "../assets/img/bg1.png";
import { useCart } from "../hooks/useCart";

import noImg from "../assets/img/no-img-rec.png";
import OEMImg from "../assets/img/KC_CUSTOM/OEM.png";
import CherryImg from "../assets/img/KC_CUSTOM/Cherry.png";
import SAImg from "../assets/img/KC_CUSTOM/SA.png";


export default function CustomKeycap() {
  const [profile, setProfile] = useState("");
  const [keyColor, setKeyColor] = useState("");
  const [textColor, setTextColor] = useState("");
  const [customText, setCustomText] = useState("");
  const [notes, setnotes] = useState("");

  const { addCustomProductToCart } = useCart();

  const handleAddToCart = async () => {
    if (!profile) {
      alert("Please select profile");
      return;
    }
    else if (keyColor == textColor) {
      alert("Key Color and Text Color can't be the same");
      return;
    }
    else if (keyColor == "") {
      setKeyColor("#000000");
    }
    else if (textColor  == "") {
      setTextColor("#000000");
    }

    const customData = {
      profile,
      keyColor,
      textColor,
      customText,
      notes,
      customImage: null,
    };

    try {
      const newId = await addCustomProductToCart(customData);
      alert(`Custom keycap added to cart! (ID: ${newId})`);
    } catch (err) {
      console.error(err);
      alert("Failed to add custom keycap");
    }
  };

  const keycapImg = (() => {
    switch (profile) {
      case "OEM":
        return OEMImg;
      case "Cherry":
        return CherryImg;
      case "SA":
        return SAImg;
      default:
        return noImg;
    }
  })();

  return (
    <div
      style={{ backgroundImage: `url(${bg1})` }}
      className="bg-cover bg-fixed bg-center min-h-screen"
    >
      <Navbar />
      <Path />

      <div className="p-10 py-10 justify-center bg-white/90 items-center w-full text-center">
        <h1>Customize Your Keycap</h1>
        <p>
          Create a keycap that reflects your style. Pick your favorite colors,
          add text, and bring your dream keycap to life!
        </p>
      </div>

      <div className="max-w-4xl mx-auto p-10 bg-white rounded-xl shadow mt-10">
        <div className="flex flex-col md:flex-row gap-10">
          {/* รูป Keycap */}
          <div className="flex-1 flex justify-center items-center">
            <img
              src={keycapImg}
              alt="Custom Keycap"
              className="rounded-xl shadow-lg w-60 object-cover"
            />
          </div>

          {/* ฟอร์ม Customize */}
          <div className="flex-1 flex flex-col gap-4">
            <label className="flex flex-col">
              Profile:
              <select
                value={profile}
                onChange={(e) => setProfile(e.target.value)}
                className="mt-2 p-2 border rounded"
              >
                <option value="">Select Profile</option>
                <option value="OEM">OEM</option>
                <option value="Cherry">Cherry</option>
                <option value="SA">SA</option>
              </select>
            </label>

            <label className="flex flex-col">
              Key Color:
              <input
                type="color"
                value={keyColor}
                onChange={(e) => setKeyColor(e.target.value)}
                className="mt-2 w-16 h-10 border rounded p-1"
              />
            </label>

            <label className="flex flex-col">
              Text Color:
              <input
                type="color"
                value={textColor}
                onChange={(e) => setTextColor(e.target.value)}
                className="mt-2 w-16 h-10 border rounded p-1"
              />
            </label>

            <label className="flex flex-col">
              Custom Text:
              <input
                type="text"
                value={customText}
                onChange={(e) => setCustomText(e.target.value)}
                placeholder="Enter text on keycap"
                className="mt-2 p-2 border rounded"
                maxLength={2}
              />
            </label>

            <label className="flex flex-col">
              Additional Notes:
              <textarea
                value={notes}
                onChange={(e) => setnotes(e.target.value)}
                placeholder="Any special instructions for your keycap..."
                className="mt-2 p-2 border rounded resize-none"
                rows={4}
              />
            </label>

            <button
              onClick={handleAddToCart}
              className="mt-4 bg-green-500 text-white p-3 rounded-lg hover:bg-green-600 transition"
            >
              Add to Cart
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
