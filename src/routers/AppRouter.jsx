import { Navigate, Route, Routes } from 'react-router-dom';
import Login from '@/pages/Login';
import Register from '@/pages/Register';
import PrivateRouter from './PrivateRouter.jsx';
import HomePrivate from '@/pages/HomePrivate.jsx';
import HomePublic from '@/pages/HomePublic';
import Manager from '@/pages/Manager.jsx';
import Manager_userInfo from '@/components/manager/Manager_userInfo.jsx';
import Manager_overview from '@/components/manager/Manager_overview.jsx';
import Manage_purchase_history from '@/components/manager/Manager_purchase_history.jsx';
import Manage_membership_levels_and_benefits from '@/components/manager/Manager_membership_levels_and_benefits.jsx';
import SearchPageByCategory from '@/pages/SearchPageByCategory.jsx';
import ProductDetailsWrapper from '@/pages/ProductDetailsWrapper.jsx';
import CartPage from '@/pages/CartPage.jsx';
import { ToastContainer } from "react-toastify";
import OrderPage from '../pages/OrderPage.jsx';
import Unauthorized from '../pages/Unauthorized.jsx'
import Admin_dashboard_page from '../pages/Admin_Dashoard_Page.jsx';
import Admin_Dashoard_Page from '../pages/Admin_Dashoard_Page.jsx';
import ForgotPasswordPage from '../pages/Forgot_password_Page.jsx';
import Forgot_password_otp_page from '../pages/Forgot_password_otp_page.jsx';
import MainLayout from '../layouts/MainLayout.jsx';
import ProductSearch_Page from '../pages/ProductSearch_Page.jsx';
import Order_Details from '../pages/Order_Details.jsx';

const ROLES = {
  USER: 'USER',
  ADMIN: 'ADMIN',
};

export default function AppRouter() {
  return (
    <>
        <Routes>
          {/* Layout wrapper */}
          <Route element={<MainLayout />}>
            <Route path='/' element={<HomePublic />} />
            <Route path="search-page-by-category" element={<SearchPageByCategory />} />
            <Route path="product-details" element={<ProductDetailsWrapper />} />
            <Route path="unauthorized" element={<Unauthorized />} />


            {/* USER */}
            <Route element={<PrivateRouter allowedRoles={[ROLES.USER]} />}>
              <Route path="home-private" element={<HomePrivate />} />
              <Route path="shop-cart" element={<CartPage />} />

              <Route path="order" element={<OrderPage />} />
              <Route path="order-details/:orderId" element={<Order_Details />} />


              <Route path="search-product" element={<ProductSearch_Page />} />


              <Route path="manager" element={<Manager />}>
                <Route path="manager-userinfo" element={<Manager_userInfo />} />
                <Route path="manager-overview" element={<Manager_overview />} />
                <Route path="manage-purchase-history" element={<Manage_purchase_history />} />
                <Route path="manage-membership-levels-and-benefits" element={<Manage_membership_levels_and_benefits />} />
              </Route>
            </Route>
          </Route>

          {/* ADMIN */}
          <Route element={<PrivateRouter allowedRoles={[ROLES.ADMIN]} />}>
            <Route path="/admin" element={<Admin_Dashoard_Page />} >
              <Route index element={<Navigate to="dashboard" replace />} />
              <Route path="dashboard" element={<Admin_dashboard_page />} />
            </Route>
          </Route>

          {/* Auth Pages */}
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/forgot-password" element={<ForgotPasswordPage />} />
          <Route path="/forgot-password-otp" element={<Forgot_password_otp_page />} />


          {/* Catch all: Redirect unknown routes */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>

      {/* Toast container */}
      <ToastContainer />
    </>
  );
}
