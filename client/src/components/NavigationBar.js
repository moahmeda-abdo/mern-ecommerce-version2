import Navbar from 'react-bootstrap/Navbar';
import Container from 'react-bootstrap/Container';
import Badge from "react-bootstrap/Badge";
import Nav from "react-bootstrap/Nav";
import { useContext } from "react";
import { Store } from "../pages/Store";
import { Link } from 'react-router-dom';

export default function NavigationBar() {
  const { state } = useContext(Store);
  const { cart } = state;

  return (
    <>
      <Navbar bg="dark" variant="dark">
        <Container>
          <Container to="/">
            <Navbar.Brand href='/'>amazona</Navbar.Brand>
          </Container>
          <Nav className="me-auto">
            <Link to="/cart" className="nav-link ">
              Cart
              {cart.cartItems.length > 0 && (
                <Badge pill bg="danger">
                  {cart.cartItems.reduce((a, c) => a + c.quantity, 0)}
                </Badge>
              )}
            </Link>
          </Nav>
        </Container>
      </Navbar>
    </>
  );
}
