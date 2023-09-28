import axios from "axios";
import { useContext, useEffect, useReducer, useState } from "react";
import { Store } from "./Store";
import { getError } from "../utils";
import LoadingBox from "../components/LoadingBox";
import MessageBox from "../components/MessageBox";
import { Helmet } from "react-helmet-async";
import { useNavigate } from "react-router-dom";
import { Button, Toast } from "react-bootstrap";
import { toast } from "react-toastify";

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

export default function AdminProductList() {
  const navigate = useNavigate();
  const { state } = useContext(Store);
  const { userInfo } = state;
  const [{ products, loading, error }, dispatch] = useReducer(reducer, {
    loading: true,
    error: "",
    products: [],
  });
  const handleDelete = async (productId) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this product?"
    );
    if (confirmed) {
      try {
        const { response } = await axios.delete(`/api/products/${productId}`, {
          headers: { authorization: `Bearer ${userInfo.token}` },
        });
        setTimeout(function () {
          window.location.reload();
        }, 3000);
        toast.success("Product deleted successfully", {
          position: "bottom-center",
          autoClose: 3000,
        });
      } catch (error) {

        Toast.error("Error deleting product. Please try again.", {
          position: "top-right",
          autoClose: 3000,
        });
      }
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        dispatch({ type: "FETCH_REQUEST" });
        const { data } = await axios.get("/api/products/admin", {
          headers: { authorization: `Bearer ${userInfo.token}` },
        });
        dispatch({ type: "FETCH_SUCCESS", payload: data });
      } catch (error) {
        dispatch({ type: "FETCH_FAIL", payload: getError(error) });
      }
    };
    fetchData();
  }, [userInfo]);

  return loading ? (
    <LoadingBox />
  ) : error ? (
    <MessageBox>{error}</MessageBox>
  ) : (
    <div>
      <Helmet>
        <title>All products</title>
      </Helmet>
      <h1>All Products</h1>
      <table className="table">
        <thead>
          <tr>
            <td>
              <strong>ID</strong>
            </td>
            <td>
              <strong>NAME</strong>
            </td>
            <td>
              <strong>PRICE</strong>
            </td>
            <td>
              <strong>CATEGORY</strong>
            </td>
            <td>
              <strong>BRAND</strong>
            </td>
            <td>
              <strong>AVAILABLITY</strong>
            </td>
            <td>
              <strong>CREATION DATE</strong>
            </td>
          </tr>
        </thead>
        <tbody>
          {products.map((product) => (
            <tr key={product._id}>
              <td>{product._id}</td>
              <td>{product.name}</td>
              <td>{product.price}</td>
              <td>{product.category}</td>
              <td>{product.brand}</td>
              <td>{product.countInStock}</td>
              <td>{product.createdAt.slice(0,10)}</td>
              <td>
                {" "}
                <Button
                  type="button"
                  variant="light"
                  onClick={() => {
                    navigate(`/products/${product.slug}`);
                  }}
                >
                  View
                </Button>
              </td>
              <td>
                <Button
                  variant="danger"
                  onClick={() => handleDelete(product._id)}
                >
                  <i className="fas fa-trash"></i>
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}