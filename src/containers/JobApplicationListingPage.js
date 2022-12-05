import Layout from "layouts/MainLayout";
import JobApplicationList from "components/JobApplicationList/JobApplicationList";
import { Container } from "react-bootstrap";

/**
 * A function that updatest he favorited status of an application
 * @returns
 */
function JobApplicationListingPage() {
  return (
    <Layout title="JobApplications" content="JobApplications">
      <Container>
        <JobApplicationList />
      </Container>
    </Layout>
  );
}

export default JobApplicationListingPage;
