import DashboardNav from "components/DashboardNav";
import { Container } from "react-bootstrap";

const DashboardLayout = ({ children }) => (
  <div
    style={{
      height: "100%",
    }}
  >
    <Container className="py-lg-5">
      <DashboardNav />
      {children}
    </Container>
  </div>
);

export default DashboardLayout;
