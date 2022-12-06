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
import ProgressBar from "react-bootstrap/ProgressBar";
import GenericPageLayout from "layouts/GenericPageLayout";
// CSS
import "../css/components/Stylized-letters.css";
import "../css/components/SearchForm.css";

export const JobPosting = () => {
  var uRole = useStore((state) => state.role);
  const uId = useStore((state) => state.id);
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

  const [loading, setLoading] = useState(false);
  const [percent, setPercent] = useState(0);

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
      // console.log(`pageArray[${i - 1}].offset = ${pageArray[i - 1].offset}`);
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
        console.log(JSON.stringify(res.data.results));
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
    const searchLocation = data.location;
    const searchEngine = data.searchEngineSelect;

    if (searchEngine === "monster") {
      const message = {
        searchTerm: searchString,
        searchLocation: searchLocation,
      };
      setJobpostings([]);
      const socket = new WebSocket(
        `${process.env.REACT_APP_API_URL_WS}/ws/search/userId/${uId}/`
      );
      socket.onopen = function (e) {
        console.log("connection established");
        socket.send(JSON.stringify(message));
      };

      socket.onmessage = function (event) {
        var res = JSON.parse(event.data);
        // console.log("event occured, data is ="+res.message)
        if (res.message === "Beginning search") {
          console.log("Recognized Begin Search");
          setLoading(true);
        }
        if (res.percent !== undefined) {
          setPercent(res.percent);
          console.log("Recognized Begin Percentage");
        }

        if (res.payload !== undefined) {
          setLoading(false);
          console.log(res.payload);
          setJobpostings(JSON.parse(res.payload)); //res
          setPercent(0);
        }
      };

      socket.onclose = function (event) {
        if (event.wasClean) {
          console.log("Clean Exit");
        } else {
          console.log("Connection died");
        }
      };
      return;
    }

    if (searchString === "") {
      setToggleState((t) => !t);
      return;
    }

    axios
      .get(
        `${process.env.REACT_APP_API_URL}/api/postings/search/${searchString}/${searchLocation}`,
        {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("atoken"),
          },
        }
      )
      .then((res) => {
        console.log("Result");
        console.log(res.data);
        const result = [];
        //res.data.results.forEach((match) => result.push(match.fields));
        setJobpostings(res.data.results);
        setPostCount(res.data.count);
        handlePages();
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
      color="var(--color-gray)"
    >
      <GenericPageLayout>
        <div className="pb-5">
          <h2 className="pb-lg-3">What job are you looking for?</h2>
          {/* FIXME Extract this form into its own component for cleaner code */}
          <Formik
            initialValues={{ search: "", location: "" }}
            onSubmit={searchJobs}
          >
            <Form className="border search-form-jobdash shadow-lg">
              <div>
                <div className="search-icon">
                  <i class="bi bi-search"></i>
                </div>
                <Field
                  id="search"
                  name="search"
                  placeholder="Job title or keyword"
                />
              </div>
              <div>
                <Field id="location" name="location" placeholder="Location" />
              </div>
              <div>
                <Field
                  as="select"
                  name="searchEngineSelect"
                  aria-label="Search Engine Select"
                  id="searchEngineSelect"
                >
                  <option value="jobdash">JobDash</option>
                  <option value="monster">Monster</option>
                </Field>
              </div>
              <button type="submit">Search</button>
            </Form>
          </Formik>
        </div>
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

        {loading === true && <ProgressBar animated now={percent} />}

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
      </GenericPageLayout>
    </Layout>
  );
};
export default JobPosting;
