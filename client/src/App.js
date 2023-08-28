

import { BrowserRouter, Route, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage";
import ProductPage from "./pages/ProductPage";

import NavigationBar from "./components/NavigationBar";
import Container from "react-bootstrap/esm/Container";
import CartPage from "./pages/CartPage";

function App() {
  return (
    <>

      <NavigationBar/>

      <BrowserRouter>
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
