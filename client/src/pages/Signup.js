import React, { useContext, useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";
import Container from "react-bootstrap/esm/Container";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/esm/Button";
import { Link, useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import { Store } from "./Store";
import { getError } from "../utils";
import { toast } from "react-toastify";

export default function SignUpPage() {
  // Initialize necessary hooks and context
  const navigate = useNavigate();
  const { search } = useLocation();
  const redirectInUrl = new URLSearchParams(search).get("redirect");
  const redirect = redirectInUrl ? redirectInUrl : "/";

  // Initialize local state variables for name, email, password, and confirmPassword
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  // Access global state from the context
  const { state, dispatch: ctxDispatch } = useContext(Store);
  const { userInfo } = state;

  // Handle form submission
  const submitHandler = async (e) => {
    e.preventDefault();

    // Check if the passwords match
    if (password !== confirmPassword) {
      toast.error('Passwords do not match');
      return;
    }

    try {
      // Send a POST request to create a new user
      const { data } = await axios.post(
        "https://main--playful-phoenix-2280d5.netlify.app/api/users/signup",
        {
          name,
          email,
          password,
        }
      );

      // Update the global user information
      ctxDispatch({ type: 'USER_SIGNIN', payload: data });

      // Store user information in local storage for persistence
      localStorage.setItem('userInfo', JSON.stringify(data));

      // Navigate to the provided redirect URL or the home page
      navigate(redirect || '/');
    } catch (err) {
      // Display an error message in case of sign-up failure
      toast.error(getError(err));
    }
  };

  // Check if the user is already signed in, and if so, redirect them to the provided URL
  useEffect(() => {
    if (userInfo) {
      navigate(redirect);
    }
  }, [navigate, redirect, userInfo]);

  return (
    <>
      <Container className="small-container">
        <Helmet>
          <title>Sign Up</title>
        </Helmet>
        <h1 className="main-heading my-3">Sign Up</h1>
        <Form onSubmit={submitHandler}>
          <Form.Group className="mb-3">
            <Form.Label>Full Name</Form.Label>
            <Form.Control
              type="name"
              placeholder="Your name"
              required
              onChange={(e) => setName(e.target.value)}
            />
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
              placeholder="Enter a strong password"
              required
              onChange={(e) => setPassword(e.target.value)}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="confirmPassword">
            <Form.Label>Confirm Password</Form.Label>
            <Form.Control
              type="password"
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
              placeholder="Rewrite the password"
            />
          </Form.Group>
          <Button className="mb-3" type="Submit">
            Sign Up
          </Button>
        </Form>
        <div className="mb-3">
          Already have an account?{" "}
          <Link to={`/signin?redirect=${redirect}`} className="text-primary">
            Sign-In
          </Link>
        </div>
      </Container>
    </>
  );
}
