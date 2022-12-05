import Layout from "layouts/MainLayout";
import useStore from "store";
import DashboardLayout from "layouts/DashboardLayout";

const DashboardPage = () => {
  var userFirstName = useStore((state) => state.first_name);
  var userLastName = useStore((state) => state.last_name);
  return (
    <Layout title="JOBDASH - Dashboard" content="Dashboard Page">
      <DashboardLayout>
        <h1>
          {userFirstName} {userLastName}
        </h1>
      </DashboardLayout>
    </Layout>
  );
};
export default DashboardPage;
