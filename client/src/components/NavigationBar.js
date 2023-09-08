import Navbar from 'react-bootstrap/Navbar';
import Container from 'react-bootstrap/Container';
import Badge from "react-bootstrap/Badge";
import Nav from "react-bootstrap/Nav";
import { useContext, useEffect } from "react";
import { Store } from "../pages/Store";
import { Link } from 'react-router-dom';
import NavDropdown from "react-bootstrap/NavDropdown";
// import { LinkContainer } from "react-router-bootstrap";

export default function NavigationBar() {
  const { state, dispatch: ctxDispatch } = useContext(Store);
  const { cart, userInfo } = state;
  
  
  const signoutHandler = () => {
    ctxDispatch({ type: "USER_SIGNOUT" });
    localStorage.removeItem("userInfo");
    localStorage.removeItem("shippingAddress");
    localStorage.removeItem("paymentMethod");
  };

  return (
    <>
      <Navbar bg="dark" variant="dark">
        <Container>
          <Container to="/">
            <Navbar.Brand href="/">amazona</Navbar.Brand>
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
            {userInfo ? (
              <NavDropdown title={userInfo.name} id="basic-nav-dropdown">
                <Link to="/profile">
                  <NavDropdown.Item>User Profile</NavDropdown.Item>
                </Link>
                <Link to="/orderhistory">
                  <NavDropdown.Item>Order History</NavDropdown.Item>
                </Link>
                <NavDropdown.Divider />
                <Link
                  className="dropdown-item"
                  onClick={signoutHandler}
                >
                  Sign Out
                </Link>
              </NavDropdown>
            ) : (
              <Link className="nav-link" to="/signin">
                Sign In
              </Link>
            )}
          </Nav>
        </Container>
      </Navbar>
    </>
  );
}
