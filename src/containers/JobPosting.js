import { useState, useEffect } from "react";
import Container from "react-bootstrap/Container";
import JobpostingList from "../components/JobpostingList";
import JobpostingForm from "../components/JobpostingForm";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { MdEdit } from "react-icons/md";
import axios from "axios";
import Layout from "../layouts/MainLayout";
import useStore from "store";
import { Formik, Field, Form } from "formik";
import { set } from "date-fns";

export const JobPosting = () => {
  var uRole = useStore((state) => state.role);
  const [jobpostings, setJobpostings] = useState([]);
  const [postCount, setPostCount] = useState(0);
  const [offset, setOffset] = useState(0);
  const [limit, setLimit] = useState(5);
  const [limitRanges, setLimitRanges] = useState([
    { value: 5 },
    { value: 15 },
    { value: 30 },
    { value: 50 },
    { value: 100 },
  ]);
  const [pages, setPages] = useState([]);
  const [toggleState, setToggleState] = useState(false);

  const [showAdd, setShowAdd] = useState(false);

  const handleCloseAdd = () => {
    setShowAdd(false);
  };

  const handlePages = () => {
    //Calculate the number of page objects needed
    let leftOver = postCount % limit;
    let extraPage = 0;
    if (leftOver) extraPage = 1;
    let totalPages = postCount / limit + extraPage;

    //Create each page button object to be mapped
    let pageArray = [];
    for (let i = 1; i <= totalPages; i++) {
      pageArray.push({ page: i, offset: limit * (i - 1) });
      console.log(`pageArray[${i - 1}].offset = ${pageArray[i - 1].offset}`);
    }
    setPages(pageArray);
  };

  useEffect(() => {
    // if (uRole === "employer") {
    //FIXME: add filtered route here
    axios
      .get(
        `${process.env.REACT_APP_API_URL}/api/postings/get_user_postings/?limit=${limit}&offset=${offset}`,
        {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("atoken"),
          },
        }
      ) //FIXME : trailing / ?
      .then((res) => {
        setJobpostings(res.data.results);
        setPostCount(res.data.count);
        handlePages();
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
  }, [toggleState, offset, limit]);

  const searchJobs = (data) => {
    const searchString = data.search;
    if (searchString === "") {
      setToggleState((t) => !t);
      return;
    }

    axios
      .get(
        `${process.env.REACT_APP_API_URL}/api/postings/search/${searchString}`,
        {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("atoken"),
          },
        }
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

  const renderPagination = (p) => {
    return (
      <li
        key={p.page}
        style={{
          cursor: "pointer",
          listStyle: "none",
          marginRight: 1,
          marginLeft: 1,
        }}
        onClick={() => {
          setOffset(p.offset);
        }}
      >
        {p.page}
      </li>
    );
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
        <ul
          style={{
            display: "inline-flex",
          }}
        >
          {offset > 0 && (
            <li
              style={{
                cursor: "pointer",
                listStyle: "none",
              }}
              onClick={() => {
                setOffset(offset - limit);
              }}
            >
              Previous
            </li>
          )}
          <p> Page: </p>
          {pages.map(renderPagination)}

          {offset < postCount - limit && (
            <li
              style={{
                cursor: "pointer",
                listStyle: "none",
              }}
              onClick={() => {
                setOffset(offset + limit);
              }}
            >
              Next
            </li>
          )}
        </ul>
        <br />
        <ul
          style={{
            display: "inline-flex",
          }}
        >
          Limit:
          {limitRanges.map((l) => {
            return (
              <li
                key={l.value}
                style={{
                  cursor: "pointer",
                  listStyle: "none",
                  marginRight: 1,
                  marginLeft: 1,
                }}
                onClick={() => {
                  setLimit(l.value);
                  if (postCount < l.value) {
                    setOffset(0);
                  }
                }}
              >
                {l.value}
              </li>
            );
          })}
        </ul>
      </Container>
    </Layout>
  );
};
export default JobPosting;
