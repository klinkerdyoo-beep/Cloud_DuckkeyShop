import logo from "../assets/img/logo-duckkey.png";
import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { useUser } from "../contexts/UserContext";
import { HiOutlineLogin } from "react-icons/hi";

export default function Navbar() {
  const { user } = useUser();
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState<{ productID: string; productName: string }[]>([]);
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_URL}/api/check-admin`, {
      credentials: "include"
    })
      .then(res => res.json())
      .then(data => setIsAdmin(data.isAdmin))
      .catch(err => console.error(err));
  }, []);


  // Fetch search results
  useEffect(() => {
    if (searchQuery.trim() === "") {
      setSearchResults([]);
      return;
    }

    const controller = new AbortController(); // cancel previous request
    fetch(`${import.meta.env.VITE_API_URL}/api/products/search/${searchQuery}`, { signal: controller.signal })
      .then((res) => res.json())
      .then((data) => setSearchResults(data))
      .catch((err) => {
        if (err.name !== "AbortError") console.error(err);
      });

    return () => controller.abort();
  }, [searchQuery]);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (!target.closest(".search-container")) {
        setSearchResults([]);
      }
    };
    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, []);

  return (
    <nav className="fixed top-0 left-0 w-full bg-white/90 backdrop-blur-md z-50 shadow-md rounded-b-2xl">
      <div className="max-w-7xl mx-auto flex items-center justify-between p-4">

        {/* Logo */}
        <div className="flex items-center gap-2">
          <img src={logo} alt="DuckKey Logo" className="w-16 h-auto" />
          <div className="font-bold text-xl sm:text-2xl">
            <h2>Duckkey</h2>
            <h2>Shop</h2>
          </div>
        </div>

        {/* Menu Links (Desktop) */}
        <ul className="hidden md:flex items-center gap-6">
          <li>
            <Link to="/" className="hover:text-amber-500 transition">Home</Link>
          </li>
          <li>
            <Link to="/Product" className="hover:text-amber-500 transition">Shop All</Link>
          </li>
          <li>
            <Link to="/CustomizeKeycap" className="hover:text-amber-500 transition">Customize Keycap</Link>
          </li>
        </ul>

        {/* Search + Icons */}
        <div className="flex items-center gap-4">
          <div className="relative search-container hidden md:flex items-center bg-amber-200 rounded-2xl shadow-md px-3 py-1">
            <input
              type="text"
              placeholder="Search..."
              className="outline-none px-2 bg-transparent text-gray-950"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <button
              className="ml-2 px-3 py-1 bg-amber-950 text-white rounded hover:bg-blue-400 transition"
              onClick={() => {
                if (searchResults[0]) {
                  navigate(`/product/${searchResults[0].productID}`);
                }
              }}
            >
              Go
            </button>

            {/* Dropdown */}
            {searchResults.length > 0 && (
              <ul className="absolute top-full left-0 w-full bg-white border rounded shadow-lg max-h-60 overflow-auto z-50">
                {searchResults.map((item) => (
                  <li
                    key={item.productID}
                    className="p-2 hover:bg-amber-100 cursor-pointer"
                    onClick={() => navigate(`/product/${item.productID}`)}
                  >
                    {item.productName}
                  </li>
                ))}
              </ul>
            )}
          </div>

          {/* Cart */}
          {user && (
            <Link to="/Cart" className="text-gray-600 hover:text-amber-500 transition">
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
                />
              </svg>
            </Link>
          )}

          {/* Profile / Login Icon */}
          <li className="relative group cursor-pointer">
            {user ? (
              <>
                {/* Profile icon if logged in */}
                <Link
                  to="/LoginAccount"
                  className="flex items-center text-gray-600 hover:text-amber-500 transition"
                >
                  <svg
                    className="w-6 h-6"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                    />
                  </svg>
                </Link>

                {/* Dropdown for logged in user */}
                <ul className="absolute left-0 top-full mt-2 w-40 bg-white border rounded-lg shadow-lg opacity-0 max-h-0 overflow-hidden transition-all duration-300 group-hover:opacity-100 group-hover:max-h-96">
                  <li className="p-2 hover:bg-amber-100 rounded">
                    <Link to="/LoginAccount">Account</Link>
                  </li>
                  <li className="p-2 hover:bg-amber-100 rounded">
                    <Link to="/LoginAddress">Address</Link>
                  </li>
                  <li className="p-2 hover:bg-amber-100 rounded">
                    <Link to="/LoginOrderHistory">History</Link>
                  </li>
                  {isAdmin && (
                    <li className="p-2 hover:bg-amber-100 rounded">
                      <Link to="/admin/OrderList">Admin Panel</Link>
                    </li>
                  )}
                  <li
                    className="p-2 hover:bg-amber-100 rounded cursor-pointer"
                    onClick={async () => {
                      try {
                        await fetch(`${import.meta.env.VITE_API_URL}/api/logout`, {
                          method: "POST",
                          credentials: "include",
                        });
                        window.location.href = "/";
                      } catch (err) {
                        console.error("Logout failed:", err);
                      }
                    }}
                  >
                    Logout
                  </li>
                </ul>
              </>
            ) : (
              <Link
                to="/Login"
                className="flex items-center text-gray-600 hover:text-amber-500 transition"
              >
                <HiOutlineLogin className="w-6 h-6" />
              </Link>
            )}
          </li>

          {/* Hamburger Menu (Mobile) */}
          <button className="md:hidden p-2" onClick={() => setMenuOpen(!menuOpen)}>
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d={menuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"}
              ></path>
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <ul className="md:hidden flex flex-col bg-white border-t border-gray-200 shadow-lg">
          <li className="p-4 border-b">
            <Link to="/">Home</Link>
          </li>
          <li className="p-4 border-b">
            <Link to="/Shop">Shop All</Link>
          </li>
          <li className="p-4 border-b">
            <Link to="/CustomProduct">Customize Keycap</Link>
          </li>
          <li className="p-4 border-b">Contact</li>
        </ul>
      )}
    </nav>
  );
}
