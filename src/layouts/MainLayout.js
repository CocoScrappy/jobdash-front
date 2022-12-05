import Navigation from "components/Navbar";
import Footer from "components/Footer";
import { Helmet } from "react-helmet";
// Bootstrap
import Container from "react-bootstrap/Container";
//css
import "../css/App.css";

const Layout = ({ children, title, content, color }) => (
  <>
    <Helmet>
      <title>{title}</title>
      <meta name="description" content={content} />
    </Helmet>
    <Navigation />
    <Container
      fluid
      className="main-content px-md-5"
      style={{ backgroundColor: color }}
    >
      {children}
    </Container>
    <Footer />
  </>
);

export default Layout;
