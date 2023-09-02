import React from "react";
import { Helmet } from "react-helmet-async";
import Container from "react-bootstrap/esm/Container";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/esm/Button";
import { Link, useLocation } from "react-router-dom";

export default function SignInPage() {
  const { search } = useLocation();
  const redirectInUrl = new URLSearchParams(search).get('redirect');
  const redirect = redirectInUrl ? redirectInUrl : '/';
  return (
    <>
      <Container className="small-container">
        <Helmet>
          <title>Sign In</title>
        </Helmet>
        <h1 className="my-3">Sign In</h1>
        <Form>
          <Form.Group className="mb-3">
            <Form.Label>Email address</Form.Label>
            <Form.Control type="email" placeholder="name@example.com" />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Password</Form.Label>
            <Form.Control type="password" placeholder="password" />
          </Form.Group>
          <Button className="mb-3" type="Submit">Sumbit</Button>
        </Form>
        <div className="mb-3">
          New customer?{" "}
          <Link className="text-primary " to={`/signup?redirect=${redirect}`}>Create your account</Link>
        </div>
      </Container>
    </>
  );
}
