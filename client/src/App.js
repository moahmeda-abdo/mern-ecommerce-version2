import { BrowserRouter, Route, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage";
import ProductPage from "./pages/ProductPage";
import Container from "react-bootstrap/esm/Container";
import CartPage from "./pages/CartPage";
import NavigationBar from "./components/NavigationBar";
import SignInPage from "./pages/SignInPage";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ShippingAddresspage from "./pages/ShippingAddresspage";

function App() {
  return (
    <>
      <BrowserRouter>
        <NavigationBar />
        <ToastContainer position="bottom-center" limit={1} />
        <Container>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/products/:slug" element={<ProductPage />} />
            <Route path="/cart" element={<CartPage />} />
            <Route path="/signin" element={<SignInPage />} />
            <Route path="/shipping" element={<ShippingAddresspage />} />
            
          </Routes>
        </Container>
      </BrowserRouter>
    </>
  );
}

export default App;
