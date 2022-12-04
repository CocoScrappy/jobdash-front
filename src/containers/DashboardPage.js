import Layout from "layouts/MainLayout";
import useStore from "store";
const DashboardPage = () => {
  var userFirstName = useStore((state) => state.first_name);
  return (
    <Layout title="AuthSite | Dashboard" content="Dashboard Page">
      <h1>Dashboard</h1>
      <p>Hello {userFirstName}</p>
    </Layout>
  );
};
export default DashboardPage;
