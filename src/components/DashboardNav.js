import Nav from "react-bootstrap/Nav";
import { Link } from "react-router-dom";
//css
import "../css/components/Link.css";

const DashboardNav = () => {
  return (
    <Nav className="link-color-inherit" defaultActiveKey="/dashboard" as="ul">
      <Nav.Item as="li">
        <Nav.Link as={Link} to="/dashboard" style={{ paddingLeft: "0" }}>
          Dashboard
        </Nav.Link>
      </Nav.Item>
      <Nav.Item as="li">
        <Nav.Link as={Link} to="/jobapplications">
          Applications
        </Nav.Link>
      </Nav.Item>
    </Nav>
  );
};

export default DashboardNav;
