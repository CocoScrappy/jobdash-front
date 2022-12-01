import Navigation from "components/Navbar";
import { Helmet } from "react-helmet";

const Layout = ({ children, title, content }) => (
  <>
    <Helmet>
      <title>{title}</title>
      <meta name="description" content={content} />
    </Helmet>
    <Navigation />
    <div className="container mt-5">{children}</div>
  </>
);

export default Layout;
