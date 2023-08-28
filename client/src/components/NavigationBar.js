import Navbar from 'react-bootstrap/Navbar';
import Container from 'react-bootstrap/Container';
import { Link } from 'react-router-dom';
import Badge from "react-bootstrap/Badge";
import Nav from "react-bootstrap/Nav";
import { useContext } from "react";
import { Store } from "../pages/Store";
// import Container from 'react-bootstrap/Container';

export default function NavigationBar() {
  const { state } = useContext(Store);
  const { cart } = state;
  return (
    <>
      <Navbar bg="dark" variant="dark">
        <Container>
        <Container to="/">
                <Navbar.Brand>amazona</Navbar.Brand>
              </Container>
              <Nav className="me-auto">
                <Nav.Link href="/cart" className="nav-link ">
                  Cart
                  {cart.cartItems.length > 0 && (
                    <Badge pill bg="danger">
                 {cart.cartItems.reduce((a, c) => a + c.quantity, 0)}
                    </Badge>
                  )}
                </Nav.Link>
              </Nav>
        </Container>
      </Navbar>
    </>
  );
}
