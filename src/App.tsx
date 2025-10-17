// นำเข้าเครื่องมือสำหรับ Router
import { BrowserRouter, Route,Routes,NavLink} from 'react-router-dom';

// นำเข้า Components ของ Navbar และ Pages
// import Narbar from './components/Narbar';
import HomePage from './Pages/Home';    // ต้องสร้างไฟล์ Home.jsx
import ShopPage from './Pages/ShopAll';  
import ProductPage from './Pages/Product';
import LoginChageAddressPage from './Pages/Login_chage_address';
import LoginOrderHistoryPage from './Pages/Login_OrderHistory';
import LoginAddressPage from './Pages/Login_address';
import LoginAccountPage from './Pages/Login_account';
import CartPage from './Pages/Cart';
import Cart2Page from './Pages/Cart2';
import CheckoutPage from './Pages/Checkout';
import CustomProductPage from './Pages/CustomizeKeycap';
// ... นำเข้ารูปภาพต่างๆ ที่ใช้ร่วมกัน ...

function App() {
  return (
    <BrowserRouter> 
      
      <Routes>
        <Route path="/" element={<HomePage />} />

        <Route path="/Shop" element={<ShopPage />} />

        <Route path="/Product" element={<ProductPage />} />

        <Route path="/LoginChageAddress" element={<LoginChageAddressPage />} />

        <Route path="/LoginAddress" element={<LoginAddressPage />} />

        <Route path="/Cart" element={<CartPage />} />

        <Route path="/Cart2" element={<Cart2Page />} />

        <Route path="/Checkout" element={<CheckoutPage />} />

        <Route path="/LoginAccount" element={<LoginAccountPage />} />

        <Route path="/LoginOrderHistory" element={<LoginOrderHistoryPage />} />

        <Route path="/CustomizeKeycap" element={<CustomProductPage />} />

        <Route path="*" element={<h1>404 Not Found</h1>} />
      </Routes>
      
      {/* Footer: มักจะวางไว้นอก Routes เพราะต้องการให้แสดงทุกหน้า */}
      
    </BrowserRouter>
  );
}

export default App;
