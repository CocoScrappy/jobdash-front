import Layout from "components/Layout";
import { useEffect, useState, useId } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";

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
        setListApplications(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => fetchJobApplications(), []);

  return (
    <Layout title="Job Dash | Your job applicants " content="applicants">
      <h1>Your applicants for {post.title}</h1>
      <p>My posting id {post.id}</p>
      {/* cv= a[0] user = a[1] */}
      {listApplicants.map((a, index) => (
        <div key={index}>
          <p>Cv Name{a[0].name}</p>
          <p>
            User Name{a[1].first_name} {a[1].last_name}
          </p>
          {/* <p>{a.user}</p> */}
        </div>
      ))}
    </Layout>
  );
};
export default AllApplicationsForPosting;
