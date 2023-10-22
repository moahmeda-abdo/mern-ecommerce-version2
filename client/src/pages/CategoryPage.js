import React, { useEffect, useReducer } from "react";
import { Link, useLocation } from "react-router-dom";
import { getError } from "../utils";
import axios from "axios";
import ProductCard from "../components/ProductCard";
import { Button, Col, Container, Row } from "react-bootstrap";
import MessageBox from "../components/MessageBox";
import LoadingBox from "../components/LoadingBox";
import { Helmet } from "react-helmet-async";

// Define a reducer function to manage component state based on actions
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

export default function CategoryPage() {
  // Get the current URL query parameters using the `useLocation` hook
  const { search } = useLocation();
  const sp = new URLSearchParams(search);

  // Extract query and page values from the URL query parameters
  const query = sp.get("query");
  const page = sp.get("page") || 1;

  // Initialize component state using the reducer
  const [{ loading, error, products, pages, countProducts }, dispatch] =
    useReducer(reducer, {
      loading: true,
      error: "",
    });

  useEffect(() => {
    // Fetch and load data when the component mounts or when query or page changes
    const fetchData = async () => {
      try {
        // Fetch products based on the category and page from the API
        const { data } = await axios.get(
          `https://main--playful-phoenix-2280d5.netlify.app/api/products/category?page=${page}&query=${query}`
        );
        dispatch({ type: "FETCH_SUCCESS", payload: data });
      } catch (err) {
        // Handle fetch error
        dispatch({
          type: "FETCH_FAIL",
          payload: getError(error),
        });
      }
    };
    fetchData();
  }, [error, page, query]);

  // Function to generate the URL for filtering products
  const getFilterUrl = (filter) => {
    const filterPage = filter.page || page;
    const filterQuery = filter.query || query;
    return `/category?query=${filterQuery}&page=${filterPage}`;
  };

  return (
    <div>
      <Container className="search">
        <Helmet>
          <title>Search Products</title>
        </Helmet>
        <Col md={9}>
          {loading ? (
            // Display a loading spinner while fetching data
            <LoadingBox></LoadingBox>
          ) : error ? (
            // Display an error message if data fetching fails
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
                // Display a message if no products are found
                <MessageBox>No Product Found</MessageBox>
              ) : (
                <Row>
                  {products.map((product) => (
                    // Display product cards for each product found
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
                {/* Create pagination buttons for navigating through pages */}
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
    </div>
  );
}
