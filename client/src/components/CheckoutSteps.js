import React from "react";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

export default function CheckoutSteps(props) {
  return (
    <Row className="checkout-steps my-3">
      {/* Display the "Sign-In" step and apply the "active" class if step1 is true */}
      <Col className={props.step1 ? "active" : ""}>Sign-In</Col>
      {/* Display the "Shipping" step and apply the "active" class if step2 is true */}
      <Col className={props.step2 ? "active" : ""}>Shipping</Col>
      {/* Display the "Payment" step and apply the "active" class if step3 is true */}
      <Col className={props.step3 ? "active" : ""}>Payment</Col>
      {/* Display the "Place Order" step and apply the "active" class if step4 is true */}
      <Col className={props.step4 ? "active" : ""}>Place Order</Col>
    </Row>
  );
}
