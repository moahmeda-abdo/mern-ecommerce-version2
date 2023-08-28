import Navbar from 'react-bootstrap/Navbar';
import Container from 'react-bootstrap/Container';
import Badge from "react-bootstrap/Badge";
import Nav from "react-bootstrap/Nav";
import { useContext } from "react";
import { Store } from "../pages/Store";
import { Link } from 'react-router-dom';
// import Container from 'react-bootstrap/Container';.


export default function NavigationBar() {

  const { state } = useContext(Store);
  const { cart } = state;

  return (
    <>
      <Navbar bg="dark" variant="dark">
        <Container>
          <Container to="/">
            <Navbar.Brand>
              <a href="/" className="nav-link ">
                amazona
              </a>
            </Navbar.Brand>
          </Container>
          <Nav className="me-auto">
            <Link onClick={handleLink} href="/cart" className="nav-link ">
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
