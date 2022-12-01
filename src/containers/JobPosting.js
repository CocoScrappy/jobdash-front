import { useState, useEffect } from "react";
import Container from "react-bootstrap/Container";
import JobpostingList from "../components/JobpostingList";
import JobpostingForm from "../components/JobpostingForm";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { MdEdit } from "react-icons/md";
import axios from "axios";
import Layout from "components/Layout";
import useStore from "store";
import { Formik, Field, Form } from "formik";

export const JobPosting = () => {
  var uRole = useStore((state) => state.role);
  const [jobpostings, setJobpostings] = useState([]);
  const [token, setToken] = useState("");
  const [me, setMe] = useState({});
  const [toggleState, setToggleState] = useState(false);

  const [showAdd, setShowAdd] = useState(false);

  const handleCloseAdd = () => {
    setShowAdd(false);
  };

  useEffect(() => {
    // if (uRole === "employer") {
    //FIXME: add filtered route here
    axios
      .get(
        `${process.env.REACT_APP_API_URL}/api/postings/get_user_postings/?limit=5&offset=5`,
        {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("atoken"),
          },
        }
      ) //FIXME : trailing / ?
      .then((res) => {
        setJobpostings(res.data);
      })
      .catch(() => {
        alert("Something went wrong fetching the list of job postings.");
      });
    // } else {
    //   axios
    //     .get(`${process.env.REACT_APP_API_URL}/api/postings/default`) //FIXME : trailing / ?
    //     .then((res) => {
    //       setJobpostings(res.data);
    //     })
    //     .catch(() => {
    //       alert("Something went wrong fetching the list of job postings.");
    //     });
    // }
  }, [toggleState]);

  const searchJobs = (data) => {
    const searchString = data.search;
    if (searchString === "") {
      setToggleState((t) => !t);
      return;
    }

    axios
      .get(
        `${process.env.REACT_APP_API_URL}/api/postings/search/${searchString}`
      )
      .then((res) => {
        console.log(res.data);
        const result = [];
        res.data.forEach((match) => result.push(match.fields));
        setJobpostings(result);
        // res.data.foreach(match=>console.log(match.fields));
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <Layout
      title="Job Dash | Job Postings"
      content="job offers application postings"
    >
      <Container>
        <h2>Job Postings</h2>
        <h3>Search by Keyword</h3>
        <Formik initialValues={{ search: "" }} onSubmit={searchJobs}>
          <Form>
            <label htmlFor="search">Search</label>
            <Field id="search" name="search" placeholder="Search Jobs..." />
            <button type="submit">Search</button>
          </Form>
        </Formik>
        {/* Modal to add job posting form */}
        <div
          style={{
            cursor: "pointer",
            marginRight: "12px",
          }}
          onClick={() => {
            setShowAdd(true);
          }}
        >
          <strong>Add job posting</strong>
        </div>
        <Modal show={showAdd} onHide={handleCloseAdd}>
          <Modal.Header closeButton>
            <Modal.Title>Add Jobposting</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <JobpostingForm
              jobpostings={jobpostings}
              setJobpostings={setJobpostings}
            />
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleCloseAdd}>
              Close
            </Button>
          </Modal.Footer>
        </Modal>
        {/* Listing jobs */}
        <JobpostingList
          jobpostings={jobpostings}
          setJobpostings={setJobpostings}
        />
      </Container>
    </Layout>
  );
};
export default JobPosting;
