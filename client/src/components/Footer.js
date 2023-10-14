import React from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import NavDropdown from "react-bootstrap/NavDropdown";
import Badge from "react-bootstrap/Badge";
import { Link } from "react-router-dom"; // Import Link from react-router-dom

export default function Footer() {
  return (
    <footer className="text-center  text-muted footer">
      <section className="d-flex justify-content-center  p-4 border-bottom">
        <div className="me-5 d-none d-lg-block">
          <span>Get connected with me :</span>
        </div>

        <div>
          <Link
            target="blank"
            to="https://www.facebook.com/profile.php?id=100024121552952"
            className="me-4 text-reset"
          >
            <i class="fab fa-facebook-f"></i>
          </Link>
          <Link
            to="https://wa.me/+201200396069"
            target="blank"
            className="me-4 text-reset"
          >
            <i class="fa-brands fa-whatsapp"></i>
          </Link>

          <Link
            target="blank"
            to="https://www.instagram.com/mohamed_abdel_fatah__/"
            className="me-4 text-reset"
          >
            <i class="fab fa-instagram"></i>
          </Link>
          <Link
            target="blank"
            to="https://www.linkedin.com/in/mohamed-abdel-fatah-b6336421a/"
            className="me-4 text-reset"
          >
            <i class="fab fa-linkedin"></i>
          </Link>
          <Link
            target="blank"
            to="https://github.com/moahmeda-abdo"
            className="me-4 text-reset"
          >
            <i class="fab fa-github"></i>
          </Link>
        </div>
      </section>
      <section>
        <Container className="text-center text-md-start mt-5 mr-5">
          <Row className="mt-3">
            <Col md={2} lg={2} xl={2} mx-auto className="mb-4">
              <h6 className="text-uppercase fw-bold mb-4">E-commerce</h6>
              <p>
                I have created this e-commerce using (React , React-bootstrap ,
                NodeJS , Express , Mongodb)
              </p>
            </Col>

            <Col md={2} lg={2} xl={2} mx-auto className="mb-4">
              <h6 className="text-uppercase fw-bold mb-4">Products</h6>
              <p>
                <span>React</span>
              </p>
              <p>
                <span>NodeJs</span>
              </p>
              <p>
                <span>Express</span>
              </p>
              <p>
                <span>Mongodb</span>
              </p>
            </Col>

            <Col md={2} lg={2} xl={2} mx-auto className="mb-4">
              <h6 className="text-uppercase fw-bold mb-4">Other links</h6>
              <p>
                <span>Pricing</span>
              </p>
              <p>
                <span>Settings</span>
              </p>
              <p>
                <span>Orders</span>
              </p>
              <p>
                <span>Help</span>
              </p>
            </Col>
            <Col md={2} lg={2} xl={2} mx-auto className="mb-4">
              <h6 className="text-uppercase fw-bold mb-4">Contact</h6>
              <p>
                <i class="fas fa-home me-3 text-secondary"></i> Egypt, Zagzig
              </p>
              <p>
                <i class="fas fa-envelope me-3 text-secondary"></i>
                mohamedabdoelatar @gmail.com
              </p>
              <p>
                <i class="fas fa-phone me-3 text-secondary"></i> + 20 120 039
                6069
              </p>
              <p>
                <i class="fas fa-phone me-3 text-secondary"></i> + 20 106 909
                7661
              </p>
            </Col>
            <Col md={4} lg={4} xl={4} mx-auto className="mb-md-0 mb-4">
              <div className="d-flex align-items-center">
                <img
                  src={
                    "https://res.cloudinary.com/drleayhps/image/upload/v1696771134/ekuuk0wvzzkv8r8t2n4u.png"
                  }
                  alt="my Logo"
                  className=" me-3 logo-footer"
                />
                <div>
                  <h6 className=" fw-bold mb-1">
                    <Link
                      target="blank"
                      to="https://wa.me/+201200396069"
                      className="text-reset"
                    >
                      Mohamed El Attar
                    </Link>
                  </h6>
                  <p>MERN stack web develper</p>
                </div>
              </div>
            </Col>
          </Row>
        </Container>
      </section>

      <div className="text-center p-4 copyright border-top">
        © 2023 Copyright: This e-commerce created by{" "}
        <Link
          target="blank"
          to="https://wa.me/+201200396069"
          className="text-reset fw-bold"
        >
          Mohamed El Attar
        </Link>
      </div>
    </footer>
  );
}
