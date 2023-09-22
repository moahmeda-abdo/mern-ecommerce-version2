import React, { useContext, useEffect } from "react";
import { Store } from "./Store";
import { Link, useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { Container, Row, Col, Card, Form, Button } from "react-bootstrap";

export default function UserProfile() {
  const navigate = useNavigate();

  const { state} = useContext(Store);
  const { userInfo } = state;



  useEffect(() => {
    if (!userInfo) {
      navigate("/signin");
    }
  }, [userInfo, navigate]);

  return (
    <Container className="mt-5">
      <Helmet>User Profile</Helmet>
      {userInfo ? ( // Check if userInfo exists
        <Row className="justify-content-center">
          <Col md={6}>
            <Card>
              <Card.Header>
                <h1 className="h3 mb-0">User Profile</h1>
              </Card.Header>
              <Card.Body>
                <Form.Group>
                  <Form.Label>Name</Form.Label>
                  <Form.Control type="text" value={userInfo.name} readOnly />
                </Form.Group>
                <Form.Group>
                  <Form.Label>Email</Form.Label>
                  <Form.Control type="email" value={userInfo.email} readOnly />
                </Form.Group>
                <Link to="/orderhistory">
                  <Button variant="primary" className="my-3">
                    Order History
                  </Button>
                </Link>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      ) : null} {/* If userInfo doesn't exist, don't render the content */}
    </Container>
  );
}
