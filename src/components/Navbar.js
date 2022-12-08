import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import useStore from "store";
// React-Bootstrap
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
// Custom CSS
import "../css/components/Navbar.css";

const Navigation = () => {
  const uId = useStore((state) => state.id);
  const uRole = useStore((state) => state.role);
  const user = useStore((state) => state.first_name);
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
        Jobs
      </Nav.Link>
      {uRole === "user" && (
        <Nav.Link as={Link} to="/cv">
          Build CV
        </Nav.Link>
      )}

      <NavDropdown title={user} id="basic-nav-dropdown">
        <NavDropdown.Item as={Link} to="/dashboard">
          Dashboard
        </NavDropdown.Item>
        <NavDropdown.Item as={Link} to="/jobapplications">
          Applications
        </NavDropdown.Item>
        <NavDropdown.Divider />
        <NavDropdown.Item as={Link} onClick={logout}>
          Sign out
        </NavDropdown.Item>
      </NavDropdown>

      {/* <Nav.Link as={Link} to="/jobapplications">
        Applications
      </Nav.Link> */}

      {/* <Nav.Link as={Link} onClick={logout}>
        Sign out
      </Nav.Link> */}
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
    <Navbar
      style={{
        alignSelf: "start",
        position: "sticky",
        top: "0",
        background: "white",
        zIndex: "100",
      }}
      expand="lg"
    >
      <Container fluid className="px-md-5 ">
        <Navbar.Brand>
          {authState ? (
            <Link className="navbar-brand" to="/jobpostings">
              Jobdash
            </Link>
          ) : (
            <Link className="navbar-brand" to="/">
              Jobdash
            </Link>
          )}
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto justify-content-end w-100">
            {authState ? authLinks : guestLinks}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};
export default Navigation;
