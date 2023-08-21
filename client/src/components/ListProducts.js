import { useEffect, useState } from "react";
import axios from 'axios';

export default function ListProducts() {
  const [products, setProducts] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      const result = await axios.get("http://localhost:5000/api/products");
      setProducts(result.data);
    };
    fetchData();
  }, []);
  return (
    <main>
      <h1>Featured Products</h1>
      { <div className="products">
        {products.map((product) => (
          <div className="product" key={product.slug}>
            <a href={`/products/${product.slug}`}>
              <img src={product.image} alt={product.name} />
            </a>
            <div className="product-info">
              <a href={`/product/${product.slug}`}>
                <p>{product.name}</p>
              </a>
              <p>
                <strong>${product.price}</strong>
              </p>
              <button>Add to cart</button>
            </div>
          </div>
        ))}
      </div> }
    </main>
  );
}
