import { BrowserRouter, Link, Route, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage";
import ProductPage from "./pages/ProductPage";
import Container from "react-bootstrap/esm/Container";
import CartPage from "./pages/CartPage";
import NavigationBar from "./components/NavigationBar";
import SignInPage from "./pages/SignInPage";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ShippingAddresspage from "./pages/ShippingAddresspage";
import SignUpPage from "./pages/Signup";
import PaymentPage from "./pages/PaymentPage";
import PlaceOrderPage from "./pages/PlaceOrderPage";
import OrderPage from "./pages/OrderPage";
import OrderHistory from "./pages/OrderHistory";
import UserProfile from "./pages/UserProfile";
import { useEffect, useState } from "react";
import { Button, Nav } from "react-bootstrap";
import ProtectedRoutes from "./components/ProtectedRoutes";
import AdminRoutes from "./components/AdminRoutes";
import AdminDashbaord from "./pages/AdminDashbaord";
import { getError } from "./utils";
import axios from "axios";
import AdminProductList from "./pages/AdminProductList";
import AdminCreateProduct from "./pages/AdminCreateProduct";
import AdminUpdateProduct from "./pages/AdminUpdateProduct";
import AdminListOrders from "./pages/AdminListOrders";
import AdminListUsers from "./pages/AdminListUsers";
import Footer from "./components/Footer";
import SearchPage from "./pages/SearchPage";
import CategoryPage from "./pages/CategoryPage";
import PageNotFound from "./pages/PageNotFound";

function App() {
  const [isOpen, setIsOpen] = useState(false);

  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const { data } = await axios.get(
          `/api/products/categories`
        );
        setCategories(data);
      } catch (err) {
        toast.error(getError(err)); // Display an error toast if fetching categories fails
      }
    };
    fetchCategories();
  }, []);

  return (
    <>
      <BrowserRouter>
        <NavigationBar />
        <ToastContainer position="bottom-center" limit={1} />
        <div className={isOpen ? "sidebar active-sidebar" : "sidebar"}>
          {" "}
          <div>
            {" "}
            <Nav className="flex-column text-white w-100 p-">
              <Nav.Item>
                <strong>Categories</strong>
              </Nav.Item>
              {categories.map((category) => (
                <Nav.Item key={category}>
                  <Link
                    className="sidebar-link"
                    to={`/category/?query=${category}`}
                  >
                    {category}
                  </Link>
                </Nav.Item>
              ))}
            </Nav>
            <Button
              className="toggle-sidebar"
              onClick={() => setIsOpen(!isOpen)}
            >
              <i class="fa-solid fa-arrows-rotate"></i>
            </Button>{" "}
          </div>
        </div>
        <div className={isOpen ? "active-container" : "normal-container"}>
          <div className="d-flex flex-column site-container">
            <Container>
              <Routes>
                <Route
                  path="https://client-for-ecommerce-ns4i.vercel.app/"
                  element={<HomePage />}
                />
                <Route path="/products/:slug" element={<ProductPage />} />
                <Route path="/cart" element={<CartPage />} />
                <Route path="/signin" element={<SignInPage />} />
                <Route path="/signup" element={<SignUpPage />} />
                <Route path="/shipping" element={<ShippingAddresspage />} />
                <Route path="/payment" element={<PaymentPage />} />
                <Route path="/placeorder" element={<PlaceOrderPage />} />
                <Route path="/order/:id" element={<OrderPage />} />
                <Route path="/search" element={<SearchPage />} />
                <Route path="/category" element={<CategoryPage />} />
                <Route path="*" element={<PageNotFound />} />
                <Route
                  path="/orderhistory"
                  element={
                    <ProtectedRoutes>
                      <OrderHistory />
                    </ProtectedRoutes>
                  }
                />
                <Route
                  path="/profile"
                  element={
                    <ProtectedRoutes>
                      <UserProfile />
                    </ProtectedRoutes>
                  }
                />
                {/* ********admin routes******* */}
                <Route
                  path="/admin/dashboard"
                  element={
                    <AdminRoutes>
                      <AdminDashbaord />
                    </AdminRoutes>
                  }
                />
                <Route
                  path="/admin/products"
                  element={
                    <AdminRoutes>
                      <AdminProductList />
                    </AdminRoutes>
                  }
                />
                <Route
                  path="/admin/products/create"
                  element={
                    <AdminRoutes>
                      <AdminCreateProduct />
                    </AdminRoutes>
                  }
                />
                <Route
                  path="/admin/product/:id"
                  element={
                    <AdminRoutes>
                      <AdminUpdateProduct />
                    </AdminRoutes>
                  }
                />
                <Route
                  path="/admin/orders"
                  element={
                    <AdminRoutes>
                      <AdminListOrders />
                    </AdminRoutes>
                  }
                />
                <Route
                  path="/admin/users"
                  element={
                    <AdminRoutes>
                      <AdminListUsers />
                    </AdminRoutes>
                  }
                />
              </Routes>
            </Container>
          </div>
          <Footer />
        </div>
      </BrowserRouter>
    </>
  );
}

export default App;
