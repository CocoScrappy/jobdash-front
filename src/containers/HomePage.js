// Custom Layout
import Layout from "layouts/MainLayout";
import LargeBannerLayout from "../layouts/LargeBannerLayout";

// React-Bootstrap
import Button from "react-bootstrap/Button";

// Css
import "../css/components/Button.css";

const HomePage = () => {
  return (
    <Layout title="AuthSite | Homepage" content="Homepage">
      <LargeBannerLayout>
        <div
          className="d-flex flex-column justify-content-around"
          style={{ height: "400px" }}
        >
          <h1 style={{ fontSize: "4rem" }}>Job searching made easy.</h1>
          <p style={{ fontSize: "1.5rem", opacity: "0.8" }}>
            All the jobs, all in 1 place. Stay organized and get hired, with
            Jobdash.
          </p>
          <div
            className="d-flex flex-column flex-lg-row justify-content-between"
            style={{ gap: "8px" }}
          >
            <Button variant="dark" className="btn-jobdash w-100" size="lg">
              Login
            </Button>
            <Button variant="dark" className="btn-jobdash w-100" size="lg">
              Register
            </Button>
          </div>
        </div>
      </LargeBannerLayout>
    </Layout>
  );
};
export default HomePage;
