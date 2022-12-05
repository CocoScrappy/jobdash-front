import DashboardNav from "components/DashboardNav";

const DashboardLayout = ({ children }) => (
  <div
    style={{
      backgroundColor: "var(--color-gray)",
      height: "100%",
      borderRadius: "50px",
    }}
  >
    <div className="p-lg-5">
      <DashboardNav />
      {children}
    </div>
  </div>
);

export default DashboardLayout;
