import './App.css';
import { useState, useMemo } from 'react';
import Footer from "./components/layouts/Footer/Footer.js"
import { Routes, Route } from "react-router-dom"
import { loadUser } from './actions/userAction';
import { useSelector } from 'react-redux';
import axios from 'axios';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import Home from "./components/home/Home";
import ProductDetails from "./components/Product/ProductDetails.js";
import Products from './components/Product/Products.js'
import Search from './components/Product/Search.js'
import Navbar from './components/layouts/Headers/Navbar';
import LoginSignup from './components/Users/LoginSignup';
import LoginPage from './components/Users/LoginPage';
import SignUpPage from './components/Users/SignUpPage';
import store from "./Store"
import UserOptions from "./components/layouts/Headers/UserOptions.js"
import ProtectedRoute from './components/Routes/ProtectedRoute';
import Profile from "./components/Users/Profile.js"
import EditProfile from "./components/Users/EditProfile.js"
import UpdatePassword from './components/Users/UpdatePassword.js'
import ForgotPassword from './components/Users/ForgotPassword.js'
import ResetPassword from "./components/Users/ResetPassword.js"
import Cart from "./components/Cart/Cart.js"
import Shipping from "./components/Cart/Shipping.js"
import ConfirmOrder from "./components/Cart/ConfirmOrder.js"
import Payment from "./components/Cart/Payment.js"
import OrderSuccess from "./components/Cart/OrderSuccess.js"
import Myorders from "./components/Order/Myorders.js"
import OrderDetails from "./components/Order/OrderDetails.js"
import Dashboard from "./components/Admin/Dashboard.js"
import ProductList from "./components/Admin/ProductList.js"
import NewProduct from './components/Admin/NewProduct';
import UpdateProduct from './components/Admin/UpdateProduct.js';
import OrderList from './components/Admin/OrderList';
import UpdateOrder from './components/Admin/UpdateOrder';
import UsersList from './components/Admin/UsersList';
import UpdateUser from './components/Admin/UpdateUser';
import ProductReviews from './components/Admin/ProductReviews';
import NotFound from './components/layouts/NotFound/NotFound';
import ContactAbt from './components/layouts/Contact/ContactAbt';

function App() {

  const { isAuthenticated, user, loading } = useSelector((state) => state.user);
  const [stripeApiKey, setStripeApiKey] = useState("");

  const getStripeApiKey = async () => {
    const { data } = await axios.get("/api/v1/stripeapikey")
    setStripeApiKey(data.stripeApiKey)
  }

  useMemo(() => {
    store.dispatch(loadUser())
    getStripeApiKey();
  }, [])
  // window.addEventListener("contextmenu", (e) => { e.preventDefault() }) // To Prevent inspect Element

  return (
    <>
      <Navbar isAuthenticated={isAuthenticated} user={user} />
      {!loading && isAuthenticated && <UserOptions user={user} />}
      <Routes>
        <Route exact path='/' element={<Home />} />
        <Route exact path='/product/:id' element={<ProductDetails />} />
        <Route exact path='/products' element={<Products />} />
        {/* ------------------------------------------------------------ */}
        {/* <Route exact path='/products' element={<AllProducts />} /> */}
        {/* ------------------------------------------------------------ */}
        <Route exact path="/products/:keyword" element={<Products />} />
        <Route exact path='/search' element={<Search />} />
        <Route exact path='/user' element={<LoginSignup />}>
          <Route index element={<LoginPage />} />
          <Route path='login' element={<LoginPage />} />
          <Route path='register' element={<SignUpPage />} />
        </Route>
        <Route exact path='/contact' element={<ContactAbt />} />
        <Route exact path='/cart' element={<Cart />} />
        <Route exact path="/password/forgot" element={<ForgotPassword />} />
        <Route exact path="/password/reset/:token" element={<ResetPassword />} />
        {/* Protected Routes  */}
        <Route element={<ProtectedRoute />}>
          <Route path="/account" element={<Profile />} />
          <Route path="/me/update" element={<EditProfile />} />
          <Route path="/password/update" element={<UpdatePassword />} />
          <Route path="/shipping" element={<Shipping />} />
          <Route path="/order/confirm" element={<ConfirmOrder />} />
          {stripeApiKey && <Route path="/process/payment" element={<Elements stripe={loadStripe(stripeApiKey)}>
            <Payment />
          </Elements>} />}
          <Route path="/success" element={<OrderSuccess />} />
          <Route path="/orders" element={<Myorders />} />
          <Route path="/order/:orderId" element={<OrderDetails />} />
        </Route>
        {/* Admin Routes  */}
        <Route element={<ProtectedRoute adminRoute={true} />}>
          <Route exact path="/admin/dashboard" element={<Dashboard />} />
          <Route exact path="/admin/products" element={<ProductList />} />
          <Route exact path="/admin/product" element={<NewProduct />} />
          <Route exact path="/admin/product/:productId" element={<UpdateProduct />} />
          <Route exact path="/admin/orders" element={<OrderList />} />
          <Route exact path="/admin/order/:orderId" element={<UpdateOrder />} />
          <Route exact path="/admin/users" element={<UsersList />} />
          <Route exact path="/admin/user/:userId" element={<UpdateUser />} />
          <Route exact path="/admin/reviews" element={<ProductReviews />} />
        </Route>
        <Route exact path="/*" element={<NotFound />} />
      </Routes>
      <Footer />
    </>


  );
}

export default App;
