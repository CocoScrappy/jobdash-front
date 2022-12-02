import Layout from "layouts/MainLayout";
import JobApplicationList from "components/JobApplicationList/JobApplicationList";
import { Container } from "react-bootstrap";

function JobApplicationListingPage() {
  return (
    <Layout title="JobApplications" content="JobApplications">
      <div>Job Applications</div>
      <div>Submenu</div>
      <div>Search Bar</div>
      <Container>
        <JobApplicationList />
      </Container>
    </Layout>
  );
}

export default JobApplicationListingPage;
