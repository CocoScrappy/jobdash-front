import DashboardNav from "components/DashboardNav";

const DashboardLayout = ({ children }) => (
  <div
    style={{
      height: "100%",
    }}
  >
    <div className="py-lg-5">
      <DashboardNav />
      {children}
    </div>
  </div>
);

export default DashboardLayout;
