import Layout from "layouts/MainLayout";
import JobApplicationDetails from "components/JobApplicationDetails";
import { useParams } from "react-router-dom";
import GenericPageLayout from "layouts/GenericPageLayout";

function JobApplicationInfoPage() {
  const params = useParams();

  const applicationId = params.appId;

  return (
    <Layout
      title="JOBDASH - Job Application Details"
      content="JobApplication"
      color="var(--color-gray)"
    >
      <GenericPageLayout>
        <JobApplicationDetails applicationId={applicationId} />
      </GenericPageLayout>
    </Layout>
  );
}

export default JobApplicationInfoPage;
