import { useEffect, useState } from "react";
import { Link, NavLink } from "react-router-dom";
import useStore from "store";
// React-Bootstrap
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
// Custom CSS
import "../components/css/components/Navbar.css";

const Navigation = () => {
  const uId = useStore((state) => state.id);
  var isAuthenticated = uId === -1 ? false : true;

  const [authState, setAuthState] = useState(isAuthenticated);

  const addId = useStore((state) => state.addId);
  const addEmail = useStore((state) => state.addEmail);
  const addFirstName = useStore((state) => state.addFirstName);
  const addLastName = useStore((state) => state.addLastName);
  const addRole = useStore((state) => state.addRole);

  const logout = (event) => {
    setAuthState(false);
    localStorage.clear();
    addId(-1);
    // console.log("should be -1 "+uId);
    addEmail("");
    addFirstName("");
    addLastName("");
    addRole("");
  };

  useEffect(() => {}, [authState]);

  const authLinks = (
    <>
      <Nav.Link as={Link} to="/jobpostings">
        Find jobs
      </Nav.Link>
      <Nav.Link as={Link} to="/cv">
        Build CV
      </Nav.Link>
      <Nav.Link as={Link} to="/dashboard">
        Dashboard
      </Nav.Link>

      <Nav.Link as={Link} to="/jobapplications">
        Applications
      </Nav.Link>

      <Nav.Link as={Link} onClick={logout}>
        LogOut
      </Nav.Link>
      {/* WIP - Dropdown */}
      {/* <NavDropdown title="Dropdown" id="basic-nav-dropdown">
        <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
        <NavDropdown.Item href="#action/3.2">Another action</NavDropdown.Item>
        <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
        <NavDropdown.Divider />
        <NavDropdown.Item href="#action/3.4">Separated link</NavDropdown.Item>
      </NavDropdown> */}
    </>
  );

  const guestLinks = (
    <>
      <Nav.Link as={Link} to="/login">
        Login
      </Nav.Link>

      <Nav.Link as={Link} to="/register">
        Register
      </Nav.Link>
    </>
  );

  return (
    <Navbar expand="lg">
      <Container>
        <Navbar.Brand>
          <Link className="navbar-brand" to="/">
            Jobdash
          </Link>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">{authState ? authLinks : guestLinks}</Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};
export default Navigation;
