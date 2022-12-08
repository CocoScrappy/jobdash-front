import Layout from "../layouts/MainLayout";
import { useEffect, useState, useId } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";
import GenericPageLayout from "layouts/GenericPageLayout";

const AllApplicationsForPosting = (props) => {
  const [listApplicants, setListApplications] = useState([]);
  const { state } = useLocation();
  const [post, setPost] = useState(state);
  const id = useId();

  const fetchJobApplications = () => {
    axios
      .get(
        `${process.env.REACT_APP_API_URL}/api/applications/get_jobposting_application/`,
        {
          headers: {
            posting: state.id,
            Authorization: "Bearer " + localStorage.getItem("atoken"),
          },
        }
      )
      .then((response) => {
        setListApplications(response.data.results);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => fetchJobApplications(), []);

  return (
    <Layout
      title="Job Dash | Your job applicants "
      content="applicants"
      color="var(--color-gray)"
    >
      <GenericPageLayout>
        <h1>Your applicants for {post.title}</h1>
        <p>My posting id {post.id}</p>
        {/* cv= a[0] user = a[1] */}
        {listApplicants.map((a) => (
          <div key={a.id}>
            <p>Cv Name{a.cv.name}</p>
            <p>
              User Name{a.applicant.first_name} {a.applicant.last_name}
            </p>
            {/* <p>{a.user}</p> */}
          </div>
        ))}
      </GenericPageLayout>
    </Layout>
  );
};
export default AllApplicationsForPosting;
