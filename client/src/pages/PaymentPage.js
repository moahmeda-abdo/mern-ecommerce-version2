import React, { useContext, useEffect, useState } from "react";
import CheckoutSteps from "../components/CheckoutSteps";
import { Helmet } from "react-helmet-async";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { Store } from "./Store";
import { useNavigate } from "react-router-dom";
import Container from "react-bootstrap/esm/Container";

export default function PaymentPage() {
  const navigate = useNavigate();
  const { state, dispatch: ctxDispatch } = useContext(Store);

  // Extract shipping address and payment method from the global state
  const {
    cart: { shippingAddress, paymentMethod },
  } = state;

  // Local state to manage the selected payment method
  const [paymentMethodName, setPaymentMethod] = useState(
    paymentMethod || "PayPal"
  );

  // Redirect to the shipping page if the shipping address is not provided
  useEffect(() => {
    if (!shippingAddress.address) {
      navigate("/shipping");
    }
  }, [shippingAddress, navigate]);

  // Handler for the form submission
  const submitHandler = (e) => {
    e.preventDefault();

    // Dispatch an action to save the selected payment method in the global state
    ctxDispatch({ type: "SAVE_PAYMENT_METHOD", payload: paymentMethodName });

    // Store the payment method in local storage for persistence
    localStorage.setItem('paymentMethod', paymentMethodName);

    // Navigate to the place order page
    navigate('/placeorder');
  };

  return (
    <div>
      <CheckoutSteps step1 step2 step3></CheckoutSteps>
      <Container className="small-container">
        <Helmet>
          <title>Payment Method</title>
        </Helmet>
        <h1 className="main-haeding my-3">Payment Method</h1>
        <Form onSubmit={submitHandler}>
          {/* Radio buttons for payment method selection */}
          <div className="mb-3">
            <Form.Check
              type="radio"
              id="PayPal"
              label="PayPal"
              value="PayPal"
              checked={paymentMethodName === "PayPal"}
              onChange={(e) => setPaymentMethod(e.target.value)}
            />
          </div>
          <div className="mb-3">
            <Form.Check
              type="radio"
              id="Stripe"
              label="Stripe"
              value="Stripe"
              checked={paymentMethodName === "Stripe"}
              onChange={(e) => setPaymentMethod(e.target.value)}
            />
          </div>
          <div className="mb-3">
            <Button type="submit">Continue</Button>
          </div>
        </Form>
      </Container>
    </div>
  );
}
