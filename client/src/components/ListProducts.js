import { useEffect, useReducer } from "react";
import axios from "axios";
import logger from "use-reducer-logger";
export default function ListProducts() {
  const reducer = (state, action) => {
    switch (action.type) {
      case "FETCH_REQUEST":
        return { ...state, loading: true };
      case "FETCH_SUCCESS":
        return { ...state, loading: false, products: action.payload };
      case "FETCH_FAIL":
        return { ...state, loading: false, error: action.payload };
      default:
        return state;
    }
  };
  const [{ loading, error, products }, dispatch] = useReducer(logger(reducer), {
    products: [],
    loading: true,
    error: "",
  });

  // const [products, setProducts] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      dispatch({ type: "FETCH_REQUEST" });

      try {
        const result = await axios.get("http://localhost:5000/api/products");
        dispatch({ type: "FETCH_SUCCESS", payload: result.data });
      } catch (error) {
        dispatch({ type: "FETCH_FAIL", payload: error.message });
      }
    };
    fetchData();
  }, []);
  return (
    <main>
      <h1>Featured Products</h1>
      {
        <div className="products">
          {loading ? (
            <span className="loader"></span>
          ) : error ? (
            <div>{error.message}</div>
          ) : (
            products.map((product) => (
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
            ))
          )}
        </div>
      }
    </main>
  );
}
