import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Container } from "react-bootstrap";
import Header from "./components/Header";
import Footer from "./components/Footer";
import HomeScreen from "./screens/HomeScreen";
import ProductScreen from "./screens/ProductScreen";
import CartScreen from "./screens/CartScreen";
import LoginScreen from "./screens/LoginScreen";
import RegisterScreen from "./screens/RegisterScreen";
import ProfileScreen from "./screens/ProfileScreen";
import ShippingScreen from "./screens/ShippingScreen";
import PaymentScreen from "./screens/PaymentScreen";
import PlaceOrderScreen from "./screens/PlaceOrderScreen";
import OrderScreen from "./screens/OrderScreen";
import UserListScreen_ADMINS from "./screens/UserListScreen_ADMINS";
import UserEditScreen_ADMINS from "./screens/UserEditScreen_ADMINS";
import ProductListScreen_ADMINS from "./screens/ProductListScreen_ADMINS";
import ProductEditScreen_ADMINS from "./screens/ProductEditScreen_ADMINS";
import OrderListScreen_ADMINS from "./screens/OrderListScreen_ADMINS";

const App = () => {
  return (
    <Router>
      <Header />
      <main className="py-3">
        <Container>
          <Routes>
            <Route
              path="/admin/orderList"
              element={<OrderListScreen_ADMINS />}
            />
            <Route
              path="/admin/productList"
              element={<ProductListScreen_ADMINS />}
            />
            <Route
              path="/admin/productlist/:pageNumber"
              element={<ProductListScreen_ADMINS />}
            />
            <Route path="/admin/userList" element={<UserListScreen_ADMINS />} />
            <Route path="/order/:id" element={<OrderScreen />} />
            <Route path="/placeorder" element={<PlaceOrderScreen />} />
            <Route path="/payment" element={<PaymentScreen />} />
            <Route path="/shipping" element={<ShippingScreen />} />
            <Route path="/profile" element={<ProfileScreen />} />
            <Route path="/register" element={<RegisterScreen />} />
            <Route path="/login" element={<LoginScreen />} />
            <Route path="/" element={<HomeScreen />} />
            <Route path="/page/:pageNumber" element={<HomeScreen />} />
            <Route path="/search/:keyword" element={<HomeScreen />} />
            <Route
              path="/search/:keyword/page/:pageNumber"
              element={<HomeScreen />}
            />
            <Route path="/product/:id" element={<ProductScreen />} />
            <Route path="/cart/:id?" element={<CartScreen />} />
            <Route
              path="/admin/users/:id/edit"
              element={<UserEditScreen_ADMINS />}
            />
            <Route
              path="/admin/product/:id/edit"
              element={<ProductEditScreen_ADMINS />}
            />
          </Routes>
        </Container>
      </main>
      <Footer />
    </Router>
  );
};

export default App;
