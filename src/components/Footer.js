import React from "react";
import { Container } from "react-bootstrap";
// css
import "../css/components/Footer.css";

const Footer = () => {
  return (
    // <footer className="d-none d-lg-block">
    //   <Container fluid style={{ height: "50px" }} className="d-flex">
    //     <p>Made with ❤️ at JAC|FSD-04</p>
    //   </Container>
    // </footer>

    <div class="footer">
      <div className="footer-links">
        <a href="#">
          <i className="fab fa-github"></i>
        </a>
        <a href="#">
          <i className="fab fa-instagram"></i>
        </a>
        <a href="#">
          <i className="fab fa-facebook"></i>
        </a>
        <a href="#">
          <i className="fab fa-twitter"></i>
        </a>
        <a href="#">
          <i className="fab fa-linkedin"></i>
        </a>
      </div>
      <div className="footer-copyright">
        This footer is made with <i className="fas fa-heart"></i> at JAC
      </div>
    </div>
  );
};

export default Footer;
