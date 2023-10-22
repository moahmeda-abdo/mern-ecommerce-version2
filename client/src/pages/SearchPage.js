import axios from "axios";
import React, { useEffect, useReducer } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { getError } from "../utils";
import Col from "react-bootstrap/esm/Col";
import Button from "react-bootstrap/esm/Button";
import Row from "react-bootstrap/esm/Row";
import LoadingBox from "../components/LoadingBox";
import MessageBox from "../components/MessageBox";
import { Helmet } from "react-helmet-async";
import ProductCard from "../components/ProductCard";
import Container from "react-bootstrap/esm/Container";

// Reducer function to manage state updates
const reducer = (state, action) => {
  switch (action.type) {
    case "FETCH_REQUEST":
      return { ...state, loading: true };
    case "FETCH_SUCCESS":
      return {
        ...state,
        products: action.payload.products,
        page: action.payload.page,
        pages: action.payload.pages,
        countProducts: action.payload.countProducts,
        loading: false,
      };
    case "FETCH_FAIL":
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};

export default function SearchPage() {
  const navigate = useNavigate();
  const { search } = useLocation();
  const sp = new URLSearchParams(search);

  // Get the search query and page from the URL
  const query = sp.get("query");
  const page = sp.get("page") || 1;

  // Initialize state using the reducer
  const [{ loading, error, products, pages, countProducts }, dispatch] =
    useReducer(reducer, {
      loading: true,
      error: "",
    });

  useEffect(() => {
    // Fetch products based on the search query and page
    const fetchData = async () => {
      try {
        const { data } = await axios.get(
          `/api/products/search?page=${page}&query=${query}`
        );
        dispatch({ type: "FETCH_SUCCESS", payload: data });
      } catch (err) {
        dispatch({
          type: "FETCH_FAIL",
          payload: getError(error),
        });
      }
    };
    fetchData();
  }, [error, page, query]);

  // Generate URL for pagination and filtering
  const getFilterUrl = (filter) => {
    const filterPage = filter.page || page;
    const filterQuery = filter.query || query;
    return `/search?query=${filterQuery}&page=${filterPage}`;
  };

  return (
    <Container className="search">
      <Helmet>
        <title>Search Products</title>
      </Helmet>
      <Col md={9}>
        {loading ? (
          <LoadingBox></LoadingBox>
        ) : error ? (
          <MessageBox variant="danger">{error}</MessageBox>
        ) : (
          <>
            <Row className="justify-content-between mb-3">
              <Col md={6}>
                <div>
                  {countProducts === 0 ? "No" : countProducts} Results
                  {query !== "all" && " : " + query}
                </div>
              </Col>
            </Row>
            {products.length === 0 ? (
              <MessageBox>No Product Found</MessageBox>
            ) : (
              <Row>
                {products.map((product) => (
                  <Col
                    key={product.slug}
                    sm={6}
                    md={4}
                    lg={3}
                    className="mb-4"
                  >
                    <ProductCard product={product}></ProductCard>
                  </Col>
                ))}
              </Row>
            )}
            <div>
              {[...Array(pages).keys()].map((x) => (
                <Link
                  key={x + 1}
                  className="mx-1"
                  to={getFilterUrl({ page: x + 1 })}
                >
                  <Button
                    className={Number(page) === x + 1 ? "text-bold" : ""}
                    variant="light"
                  >
                    {x + 1}
                  </Button>
                </Link>
              ))}
            </div>
          </>
        )}
      </Col>
    </Container>
  );
}
