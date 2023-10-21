import React, { useContext, useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";
import Container from "react-bootstrap/esm/Container";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/esm/Button";
import { Link, useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import { Store } from "./Store";
import { getError } from "../utils";
import { toast } from 'react-toastify';

export default function SignInPage() {
  // Initialize necessary hooks and context
  const navigate = useNavigate();
  const { search } = useLocation();
  const redirectInUrl = new URLSearchParams(search).get("redirect");
  const redirect = redirectInUrl ? redirectInUrl : "/";

  // Initialize local state variables for email and password
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // Access global state from the context
  const { state, dispatch: ctxDispatch } = useContext(Store);
  const { userInfo } = state;

  // Handle form submission
  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      // Send a POST request to sign in the user
      const { data } = await axios.post("/api/users/signin", {
        email,
        password,
      });

      // Update the global user information
      ctxDispatch({ type: "USER_SIGNIN", payload: data });

      // Store user information in local storage for persistence
      localStorage.setItem("userInfo", JSON.stringify(data));

      // Navigate to the provided redirect URL or the home page
      navigate(redirect || "/");
    } catch (err) {
      // Display an error message in case of authentication failure
      toast.error(getError(err));
    }
  };

  // Check if the user is already signed in, and if so, redirect them to the home page
  useEffect(() => {
    if (userInfo) {
      navigate("/");
    }
  }, [navigate, redirect, userInfo]);
  
  return (
    <>
      <Container className="small-container">
        <Helmet>
          <title>Sign In</title>
        </Helmet>
        <h1 className="main-heading my-3">Sign In</h1>
        <Form onSubmit={submitHandler}>
          <Form.Group className="mb-3">
            <Form.Label>Email address</Form.Label>
            <Form.Control
              type="email"
              placeholder="name@example.com"
              required
              onChange={(e) => setEmail(e.target.value)}
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              autoComplete="section-blue shipping postal-code"
              required
              onChange={(e) => setPassword(e.target.value)}
            />
          </Form.Group>
          <Button className="mb-3" type="Submit">
            Submit
          </Button>
        </Form>
        <div className="mb-3">
          New customer?{" "}
          <Link className="text-primary" to={`/signup?redirect=${redirect}`}>
            Create your account
          </Link>
        </div>
      </Container>
    </>
  );
}
