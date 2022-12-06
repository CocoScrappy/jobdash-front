import Layout from "layouts/MainLayout";
import SavedDateDetails from "components/SavedDateDetails";
import { Container } from "react-bootstrap";
import { useParams } from "react-router-dom";

function SavedDateInfoPage(props) {
  const params = useParams();

  //   const { dateInfo } = route.params;

  const dateId = params.dateId;

  console.log(params);

  return (
    <Layout title="Job Application Details" content="JobApplication">
      <Container>
        <SavedDateDetails dateId={dateId} />
      </Container>
    </Layout>
  );
}

export default SavedDateInfoPage;
