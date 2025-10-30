import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { UserProvider } from './contexts/UserContext';

// Pages
import HomePage from './Pages/Home';
import ShopPage from './Pages/ShopAll';
import ProductPage from './Pages/Product';
import LoginChageAddressPage from './Pages/Login_chage_address';
import LoginAddAddressPage from './Pages/Login_add_address';
import LoginOrderHistoryPage from './Pages/Login_OrderHistory';
import LoginAddressPage from './Pages/Login_address';
import LoginAccountPage from './Pages/Login_account';
import CartPage from './Pages/Cart';
import Cart2Page from './Pages/Cart2';
import CheckoutPage from './Pages/Checkout';
import CustomProductPage from './Pages/CustomizeKeycap';
import SingInPage from './Pages/SignIn';
import SingUpPage from './Pages/SignUp';

// Admin Pages
import AdminProductList from './Pages/Admin/admin_productlist';
import AdminProductDelete from './Pages/Admin/admin_product_delete';
import AdminProductAdd from './Pages/Admin/admin_product_add';
import AdminProductEdit from './Pages/Admin/admin_product_edit';
import AdminOrderList from './Pages/Admin/admin_orderlist';
import AdminOrderManage from './Pages/Admin/admin_order_manage';
import AdminCategoryAdd from './Pages/Admin/admin_category_add';

function App() {
  return (
    <UserProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/Product" element={<ShopPage />} />
          <Route path="/Product/:id" element={<ProductPage />} />
          <Route path="/LoginChangeAddress/:id" element={<LoginChageAddressPage />} />
          <Route path="/LoginAddAddress" element={<LoginAddAddressPage />} />
          <Route path="/LoginAddress" element={<LoginAddressPage />} />
          <Route path="/Cart" element={<CartPage />} />
          <Route path="/Cart2" element={<Cart2Page />} />
          <Route path="/Checkout" element={<CheckoutPage />} />
          <Route path="/LoginAccount" element={<LoginAccountPage />} />
          <Route path="/LoginOrderHistory" element={<LoginOrderHistoryPage />} />
          <Route path="/CustomizeKeycap" element={<CustomProductPage />} />

          {/* admin pages */}
          <Route path="/admin/ProductList" element={<AdminProductList />} />
          <Route path="/admin/ProductDelete" element={<AdminProductDelete />} />
          <Route path="/admin/ProductAdd" element={<AdminProductAdd />} />
          <Route path="/admin/ProductEdit/:id" element={<AdminProductEdit />} />
          <Route path="/admin/OrderList" element={<AdminOrderList />} />
          <Route path="/admin/order/:id" element={<AdminOrderManage />} />
          <Route path="/admin/CategoryAdd" element={<AdminCategoryAdd />} />

          <Route path="/login" element={<SingInPage />} />
          <Route path="/signup" element={<SingUpPage />} />

          <Route path="*" element={<h1>404 Not Found</h1>} />
        </Routes>
      </BrowserRouter>
    </UserProvider>
  );
}

export default App;
