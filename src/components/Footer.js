import React from "react";
import { Container } from "react-bootstrap";
// css
import "../css/components/Footer.css";

const Footer = () => {
  return (
    <footer className="d-none d-lg-block">
      <Container fluid className="footer px-md-5">
        <div className="footer-links">
          <a href="#">
            <i className="bi bi-instagram"></i>
          </a>
          <a href="#">
            <i className="bi bi-facebook"></i>
          </a>
          <a href="#">
            <i className="bi bi-tiktok"></i>
          </a>
          <a href="#">
            <i className="bi bi-linkedin"></i>
          </a>
          <a href="#">
            <i className="bi bi-twitter"></i>
          </a>
        </div>
        <div className="footer-copyright">
          <span>&#169;</span> 2022. Made with{" "}
          <i className="bi bi-heart-fill"></i> at JAC
        </div>
      </Container>
    </footer>
  );
};

export default Footer;
