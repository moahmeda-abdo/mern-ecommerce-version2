// Frontend code
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

  const fetchProducts = async () => {
    try {
      const result = await axios.get(
        `http://localhost:5000/api/products?page=${page}&pageSize=${pageSize}`
      );
      setProducts((prevProducts) => [...prevProducts, ...result.data.products]);
    } catch (error) {
      setError(error.message);
    }
  };

  const handleScroll = () => {
    // if (
    //   window.innerHeight + document.documentElement.scrollTop + 10 >=
    //   document.documentElement.offsetHeight
    // ) {
    //   setPage(page + 1); // Load more products when scrolling near the bottom
    // }
    if (
      document.documentElement.scrollHeight -
        window.innerHeight -
        document.documentElement.scrollTop <=
      600
    ) {
      setPage(page + 1); // Load more products when scrolling is within 600 pixels from the bottom
    }
  };

  useEffect(() => {
    fetchProducts();
  }, [page, pageSize]);

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
