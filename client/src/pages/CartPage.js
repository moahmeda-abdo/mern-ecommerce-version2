import React, { useContext } from "react";
import { Store } from "./Store";
import { Helmet } from "react-helmet-async";
import Row from "react-bootstrap/esm/Row";
import Col from "react-bootstrap/esm/Col";
import MessageBox from "../components/MessageBox";
import { Link, useNavigate } from "react-router-dom";
import ListGroup from "react-bootstrap/ListGroup";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/esm/Button";
import axios from "axios";

export default function CartPage() {
  // Access the React Router's navigation function
  const navigate = useNavigate();

  // Access the global state and dispatch function using the Context API
  const { state, dispatch: ctxDispatch } = useContext(Store);

  // Extract user information from the global state
  const { userInfo } = state;

  // Extract cart items from the global state
  const {
    cart: { cartItems },
  } = state;

  // Handler for updating the quantity of a cart item
  const updateCartHandler = async (item, quantity) => {
    // Fetch product data from the API to check if it's in stock
    const { data } = await axios.get(
      `https://main--playful-phoenix-2280d5.netlify.app/api/products/${item._id}`
    );

    // Check if the requested quantity exceeds the available stock
    if (data.countInStock < quantity) {
      window.alert("Sorry. Product is out of stock");
      return;
    }

    // Dispatch an action to update the cart in the global state
    ctxDispatch({
      type: "CART_ADD_ITEM",
      payload: { ...item, quantity },
    });
  };

  // Handler for removing an item from the cart
  const removeItemHandler = (item) => {
    ctxDispatch({ type: "CART_REMOVE_ITEM", payload: item });
  };

  // Handler for navigating to the checkout page
  const checkoutHandler = () => {
    if (userInfo) {
      navigate("/shipping");
    } else {
      navigate("/signin");
    }
  };

  return (
    <div>
      <Helmet>
        <title>Shopping Cart</title>
      </Helmet>

      {/* Page title */}
      <h1 className="main-heading my-3">Shopping Cart</h1>

      <Row>
        <Col md={8}>
          {/* Render cart items list */}
          {cartItems.length === 0 ? (
            <MessageBox>
              Cart is empty. <Link to="/">Go Shopping</Link>
            </MessageBox>
          ) : (
            <ListGroup>
              {cartItems.map((item) => (
                <ListGroup.Item key={item._id}>
                  <Row className="align-items-center">
                    <Col md={4}>
                      {/* Product image and name */}
                      <img
                        src={item.image}
                        alt={item.name}
                        className="img-fluid rounded img-thumbnail"
                      ></img>
                      <Link className="m-3" to={`/product/${item.slug}`}>
                        {item.name}
                      </Link>
                    </Col>
                    <Col md={3}>
                      {/* Quantity control buttons */}
                      <Button variant="light" disabled={item.quantity === 1}>
                        <i
                          className="fas fa-minus-circle"
                          onClick={() =>
                            updateCartHandler(item, item.quantity - 1)
                          }
                        ></i>
                      </Button>{" "}
                      <span>{item.quantity}</span>{" "}
                      <Button
                        variant="light"
                        disabled={item.quantity === item.countInStock}
                      >
                        <i
                          className="fas fa-plus-circle"
                          onClick={() =>
                            updateCartHandler(item, item.quantity + 1)
                          }
                        ></i>
                      </Button>
                    </Col>
                    <Col md={3}>${item.price}</Col>
                    <Col md={2}>
                      {/* Remove item button */}
                      <Button variant="light">
                        <i
                          className="fas fa-trash"
                          onClick={() => removeItemHandler(item)}
                          variant="light"
                        ></i>
                      </Button>
                    </Col>
                  </Row>
                </ListGroup.Item>
              ))}
            </ListGroup>
          )}
        </Col>
        <Col md={4}>
          <Card>
            <Card.Body>
              <ListGroup variant="flush">
                <ListGroup.Item>
                  <h3>
                    Subtotal ({cartItems.reduce((a, c) => a + c.quantity, 0)}{" "}
                    items) : $
                    {cartItems.reduce((a, c) => a + c.price * c.quantity, 0)}
                  </h3>
                </ListGroup.Item>
                <ListGroup.Item>
                  <div className="d-grid">
                    {/* Checkout button */}
                    <Button
                      type="button"
                      variant="primary"
                      disabled={cartItems.length === 0}
                      onClick={checkoutHandler}
                    >
                      Proceed to Checkout
                    </Button>
                  </div>
                </ListGroup.Item>
              </ListGroup>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </div>
  );
}
