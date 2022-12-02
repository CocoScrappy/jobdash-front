import Navigation from "components/Navbar";
import Footer from "components/Footer";
import { Helmet } from "react-helmet";

const Layout = ({ children, title, content }) => (
  <>
    <Helmet>
      <title>{title}</title>
      <meta name="description" content={content} />
    </Helmet>
    <Navigation />
    <div>{children}</div>
    <Footer />
  </>
);

export default Layout;
