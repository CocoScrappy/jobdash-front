import Layout from "components/Layout";
import JobApplicationDetails from "components/JobApplicationDetails";
import { Container } from "react-bootstrap";
import { useParams } from "react-router-dom";

function JobApplicationInfoPage() {
  const params = useParams();

  const applicationId = params.appId;

  return (
    <Layout title="Job Application Details" content="JobApplication">
      <Container>
        <JobApplicationDetails applicationId={applicationId} />
      </Container>
    </Layout>
  );
}

export default JobApplicationInfoPage;
