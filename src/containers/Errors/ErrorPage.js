import Layout from "layouts/MainLayout";
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";

const ErrorPage = () => {
  const params = useParams();

  const errorCode = params.errorCode;

  console.log(errorCode);

  return (
    <Layout title="AuthSite | Homepage" content="Homepage">
      <div className="text-center">
        {errorCode === "404" ? (
          <h1>Not Found (404)</h1>
        ) : errorCode === "500" ? (
          <h1>WHOOPS, something went wrong (500)</h1>
        ) : (
          <></>
        )}

        <Link to="/dashboard">Go to Dashboard</Link>
      </div>
    </Layout>
  );
};
export default ErrorPage;
