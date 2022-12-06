import Layout from "layouts/MainLayout";
import JobApplicationList from "components/JobApplicationList/JobApplicationList";
import DashboardLayout from "layouts/DashboardLayout";

/**
 * A function that updatest he favorited status of an application
 * @returns
 */
function JobApplicationListingPage() {
  return (
    <Layout
      title="JOBDASH - Applications"
      content="JobApplications"
      color="var(--color-gray)"
    >
      <DashboardLayout>
        <JobApplicationList />
      </DashboardLayout>
    </Layout>
  );
}

export default JobApplicationListingPage;
