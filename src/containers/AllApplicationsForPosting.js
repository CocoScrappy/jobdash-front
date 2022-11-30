import Layout from "components/Layout";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";

const AllApplicationsForPosting = (props) => {
  const [listApplications, setListApplications] = useState([]);
  const { state } = useLocation();

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
        console.log(response);
        setListApplications(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(fetchJobApplications, []);

  return (
    <Layout title="Job Dash | Your job applicants " content="applicants">
      <h1>Your applicants for {state.title}</h1>
      <p>My posting id {state.id}</p>
    </Layout>
  );
};
export default AllApplicationsForPosting;
