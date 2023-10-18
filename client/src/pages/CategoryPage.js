import React, { useEffect, useReducer } from "react";
import { Link, useLocation } from "react-router-dom";
import { getError } from "../utils";
import axios from "axios";
import ProductCard from "../components/ProductCard";
import { Button, Col, Container, Row } from "react-bootstrap";
import MessageBox from "../components/MessageBox";
import LoadingBox from "../components/LoadingBox";
import { Helmet } from "react-helmet-async";

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
  const { search } = useLocation();
  const sp = new URLSearchParams(search);

  const query = sp.get("query");
  const page = sp.get("page") || 1;

  const [{ loading, error, products, pages, countProducts }, dispatch] =
    useReducer(reducer, {
      loading: true,
      error: "",
    });

  useEffect(() => {

    const fetchData = async () => {
      try {
        const { data } = await axios.get(
          `/api/products/category?page=${page}&query=${query}`
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

  const getFilterUrl = (filter) => {
    const filterPage = filter.page || page;
    const filterQuery = filter.query || query;
    return `/category?query=${filterQuery}&page=${filterPage}`;
  };
  return (
    <div>
      {" "}
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
    </div>
  );
}