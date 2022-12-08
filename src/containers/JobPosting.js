//React imports
import { useState, useEffect } from "react";
import Container from "react-bootstrap/Container";
import ProgressBar from "react-bootstrap/ProgressBar";
import Button from "react-bootstrap/Button";
import Spinner from "react-bootstrap/Spinner";
import Modal from "react-bootstrap/Modal";
import Pagination from "react-bootstrap/Pagination";
import BootstrapForm from "react-bootstrap/Form";

// import Alert from "react-bootstrap/Alert";

//custom imports
import Layout from "../layouts/MainLayout";
import JobpostingList from "../components/JobpostingList";
import JobpostingForm from "../components/JobpostingForm";
import FlashAlert from "components/FlashAlert";
import GenericPageLayout from "layouts/GenericPageLayout";
import SkeletonCards from "components/SkeletonCards";

//other dependancies
import { Formik, Field, Form } from "formik";
import axios from "axios";
import useStore from "store";

// CSS
import "../css/components/Stylized-letters.css";
import "../css/components/SearchForm.css";
import "../css/components/Pagination.css";
import "../css/components/Loader.css";

//unused?
import { set } from "date-fns";

export const JobPosting = () => {
  //user
  var uRole = useStore((state) => state.role);
  const uId = useStore((state) => state.id);
  //job posting list
  const [jobpostings, setJobpostings] = useState([]);
  const [jobListLoading, setJobListLoading] = useState(false);
  //pagination
  const [pages, setPages] = useState([]);
  const [activePage, setActivePage] = useState(1);
  const [postCount, setPostCount] = useState(0);
  const [offset, setOffset] = useState(0);
  const [limit, setLimit] = useState(10);
  const [limitRanges, setLimitRanges] = useState([
    { limitValue: 10 },
    { limitValue: 20 },
    { limitValue: 50 },
    { limitValue: 80 },
    { limitValue: 100 },
  ]);
  //search
  const [toggleState, setToggleState] = useState(false);
  const [loading, setLoading] = useState(false);
  const [percent, setPercent] = useState(0);

  //add posting modal
  const [showAdd, setShowAdd] = useState(false);

  //alerts
  const [showAlert, setShowAlert] = useState(false);
  const [alertMsg, setAlertMsg] = useState(false);

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
    setActivePage(offset / limit + 1);
  };
  //fetch job posting list and render page
  useEffect(() => {
    setJobListLoading(true);
    axios
      .get(
        `${process.env.REACT_APP_API_URL}/api/postings/get_user_postings/?limit=${limit}&offset=${offset}`,
        {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("atoken"),
          },
        }
      )
      .then(async (res) => {
        // console.log(JSON.stringify(res.data.results));
        setJobpostings(res.data.results);
        setPostCount(res.data.count);
        handlePages();
        setJobListLoading(false);
      })
      .catch((error) => {
        if (error.response.status != 404) {
          setShowAlert(true);
          setAlertMsg(
            `Could not retrieve job posting from database. ` + error.message
          );
        }
      });
  }, [toggleState, offset, limit]);
  //search by keyword and location
  const searchJobs = (data) => {
    const searchString = data.search;
    const searchLocation = data.location;
    const searchEngine = data.searchEngineSelect;
    //select for internal or external search
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
    //default internal search if no search input
    if (searchString === "") {
      setToggleState((t) => !t);
      return;
    }
    //axios call to database for list of internal job posting
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
        // console.log("Result");
        // console.log(res.data);
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
  //pagination by page number
  const renderPagination = (p) => {
    return p.page === activePage ? (
      <Pagination.Item
        key={p.page}
        className="active-jobdash"
        onClick={() => {
          setOffset(p.offset);
        }}
      >
        {p.page}
      </Pagination.Item>
    ) : (
      <Pagination.Item
        key={p.page}
        onClick={() => {
          setOffset(p.offset);
        }}
      >
        {p.page}
      </Pagination.Item>
    );
  };

  return (
    <Layout
      title="Job Dash | Job Postings"
      content="job offers application postings"
      color="var(--color-gray)"
    >
      <GenericPageLayout>
        {/* Alert */}
        {showAlert && (
          <FlashAlert
            setShowAlert={setShowAlert}
            msg={alertMsg}
            variant={"danger"}
          />
        )}
        <div className="pb-5 d-flex flex-column justify-content-start">
          <h2 className="pb-lg-3">What job are you looking for?</h2>
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
        <div className="d-flex align-items-center justify-content-between my-2">
          {/* Recruiter - Modal to add job posting form */}
          {uRole === "employer" && (
            <Button
              variant="dark"
              className="btn-jobdash"
              onClick={() => {
                setShowAdd(true);
              }}
            >
              Add New Job
            </Button>
          )}
          {/* Limit per page section*/}
          <div className="d-flex align-items-center ms-auto">
            <p className="me-2 my-0">Jobs per page: </p>
            <BootstrapForm.Select style={{ width: "auto" }}>
              {limitRanges.map((l) => {
                return (
                  <option
                    key={l.limitValue}
                    value={l.limitValue}
                    onClick={() => {
                      setLimit(l.limitValue);
                      console.log(l.limitValue);
                      if (postCount < l.limitValue) {
                        setOffset(0);
                      }
                    }}
                  >
                    {l.limitValue}
                  </option>
                );
              })}
            </BootstrapForm.Select>
          </div>
        </div>
        {/* Listing jobs */}
        {/* Loading effect */}

        {jobListLoading === true ? (
          // Spinner
          //   <div className="d-flex justify-content-center align-items-center">
          //    <div className="loader"></div>
          //   </div>
          <div className="card-grid">
            <SkeletonCards />
          </div>
        ) : (
          <JobpostingList
            jobpostings={jobpostings}
            setJobpostings={setJobpostings}
          />
        )}
        {/* Pagination Section*/}
        <div
          style={{ height: "150px" }}
          className="d-flex justify-content-center align-items-end"
        >
          <Pagination className="justify-content-center pt-4">
            {offset > 0 ? (
              <Pagination.Prev
                onClick={() => {
                  setOffset(offset - limit);
                }}
              >
                <i class="bi bi-arrow-left"></i>
              </Pagination.Prev>
            ) : (
              <Pagination.Prev
                disabled
                onClick={() => {
                  setOffset(offset - limit);
                }}
              >
                <i class="bi bi-arrow-left"></i>
              </Pagination.Prev>
            )}
            {pages.map(renderPagination)}

            {offset < postCount - limit ? (
              <Pagination.Next
                onClick={() => {
                  setOffset(offset + limit);
                }}
              >
                <i class="bi bi-arrow-right"></i>
              </Pagination.Next>
            ) : (
              <Pagination.Next
                disabled
                onClick={() => {
                  setOffset(offset + limit);
                }}
              >
                <i class="bi bi-arrow-right"></i>
              </Pagination.Next>
            )}
          </Pagination>
        </div>
      </GenericPageLayout>
    </Layout>
  );
};
export default JobPosting;
