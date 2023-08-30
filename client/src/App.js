import { BrowserRouter, Route, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage";
import ProductPage from "./pages/ProductPage";
import Container from "react-bootstrap/esm/Container";
import CartPage from "./pages/CartPage";
import NavigationBar from "./components/NavigationBar";


function App() {
  return (
    <>
      <BrowserRouter>
        <NavigationBar />
        <Container>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/products/:slug" element={<ProductPage />} />
            <Route path="/cart" element={<CartPage />} />
          </Routes>
        </Container>
      </BrowserRouter>
    </>
  );
}

export default App;
