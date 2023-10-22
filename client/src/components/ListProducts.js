import { useEffect, useState } from "react";
import axios from "axios";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import ProductCard from "../components/ProductCard";
import MessageBox from "../components/MessageBox";

export default function ListProducts() {
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(20);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Function to fetch products from the server
  const fetchProducts = async () => {
    try {
      const result = await axios.get(
        `https://main--playful-phoenix-2280d5.netlify.app/api/products?page=${page}&pageSize=${pageSize}`
      );

      // Filter out products that are already in the 'products' array
      const newProducts = result.data.products.filter((product) => {
        return !products.some(
          (existingProduct) => existingProduct._id === product._id
        );
      });

      // Update 'products' state with the new products
      setProducts((prevProducts) => [...prevProducts, ...newProducts]);
    } catch (error) {
      setError(error.message);
    }
  };

  // Function to handle scrolling and trigger more product loading
  const handleScroll = () => {
    if (
      document.documentElement.scrollHeight -
        window.innerHeight -
        document.documentElement.scrollTop <=
      700
    ) {
      setPage(page + 1);
    }
  };

  // Fetch products when the component mounts and when page or page size changes
  useEffect(() => {
    fetchProducts();
  }, [page, pageSize]);

  // Add and remove scroll event listener
  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [page]);

  return (
    <main>
      <div className="products">
        {error && <MessageBox variant="danger">{error}</MessageBox>}
        <Row>
          {products.map((product) => (
            <Col key={product._id} sm={6} md={4} lg={3} className="mb-3">
              <ProductCard product={product}></ProductCard>
            </Col>
          ))}
        </Row>
      </div>
    </main>
  );
}
