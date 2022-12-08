import React, { useState } from "react";
import Layout from "layouts/MainLayout";
import Heart from "react-heart";
import { Button, Modal } from "react-bootstrap";
import useStore from "store";
import axios from "axios";
import { Form } from "react-bootstrap";
import MyEditor from "components/MyEditor";
import { useNavigate, useLocation } from "react-router-dom";
import parse from "html-react-parser";
import GenericPageLayout from "layouts/GenericPageLayout";
import Spinner from "react-bootstrap/Spinner";
import DonutChart from "react-donut-chart";
import Badge from "react-bootstrap/Badge";

// custom components
import Tag from "../Tag";
import ClosePage from "../ClosePage";

// css
import "../../css/components/Card.css";
import "../UserCV/UserCV.css";
import "../../css/components/Button.css";

function JobApplicationForm() {
  const handleSubmit = (event) => {
    event.preventDefault();
  };

  const store = useStore();
  const uId = store.id;
  const uCv = store.cv_id;
  const navigate = useNavigate();
  const jobPostingInfo = useLocation();

  const [post, setPost] = useState(jobPostingInfo.state);
  const ISODate = new Date(post.date_created);
  const shortDate = ISODate.toDateString();
  const [isLiked, setIsLiked] = useState(false);
  const [success, setSuccess] = useState(false);
  const [convertedNoteContent, setConvertedNoteContent] = useState("");
  const [failModalMsg, setFailModalMsg] = useState("");

  const [modalShow, setModalShow] = useState(false);
  const [modalState, setModalState] = useState("close");

  const [jobAnalysisResults, setJobAnalysisResults] = useState();
  const [analysisLoading, setAnalysisLoading] = useState(false);
  const [analysisDisabled, setAnalysisDisabled] = useState(false);

  // const submitApplication = () => {
  //   var applicationData = {};
  //   try {
  //     applicationData = {
  //       notes: convertedNoteContent,
  //       favorited: isLiked,
  //       status: "applied",
  //       // applicant: uId,
  //       cv: uCv,
  //       job_posting: post.id,
  //     };
  //   } catch (err) {
  //     console.log(
  //       "Whoops, something went wrong while assigning the values for the request body"
  //     );
  //   }
  //   axios
  //     .post(
  //       `${process.env.REACT_APP_API_URL}/api/applications/`,
  //       applicationData,
  //       {
  //         headers: {
  //           Authorization: "Bearer " + localStorage.getItem("atoken"),
  //         },
  //       }
  //     )
  //     .then((res) => {
  //       if (res.status === 201) {
  //         handleShowModalSuccess();
  //         setSuccess(true);
  //       }
  //     })
  //     .catch((error) => {
  //       console.log(error);
  //       setSuccess(false);
  //       setFailModalMsg(error.response.data.message);
  //       handleShowModalFail();
  //     });
  // };

  // useEffect(() => {
  //   setJobAnalysisResults({
  //     matching_score: 13.79,
  //     matching_skills_results: {
  //       matching_skills: [
  //         "spring",
  //         "scalable",
  //         "frameworks",
  //         "science",
  //         "stack",
  //         "work",
  //         "java",
  //         "experience",
  //       ],
  //       missing_skills: [
  //         "type",
  //         "code",
  //         "design",
  //         "testing",
  //         "computer",
  //         "understanding",
  //         "types",
  //         "building",
  //         "web",
  //         "agile",
  //         "ny",
  //         "development",
  //         "cd",
  //         "knowledge",
  //         "fitness",
  //         "principles",
  //         "position",
  //         "degree",
  //         "style",
  //       ],
  //     },
  //   });
  // }, []);

  const handleShowModalSuccess = () => {
    setModalState("modal-success");
  };

  const handleShowModalFail = () => {
    setModalState("modal-fail");
  };

  const handleShowModalNoCV = () => {
    setModalState("modal-no-CV");
  };

  const handleCloseSuccess = () => {
    setModalState("close");
    navigate("/jobpostings");
  };

  const handleCloseFail = () => {
    setModalState("close");
  };

  const submitApplication = (e) => {
    var applicationData = {};
    try {
      applicationData = {
        notes: convertedNoteContent,
        favorited: isLiked,
        status: "applied",
        // applicant: uId,
        cv: uCv,
        job_posting: post.id,
      };
    } catch (err) {
      console.log(
        "Whoops, something went wrong while assigning the values for the request body"
      );
    }

    if (uCv == "") {
      setSuccess(false);
      handleShowModalNoCV();
    } else {
      axios
        .post(
          `${process.env.REACT_APP_API_URL}/api/applications/`,
          applicationData,
          {
            headers: {
              Authorization: "Bearer " + localStorage.getItem("atoken"),
            },
          }
        )
        .then((res) => {
          if (res.status === 201) {
            handleShowModalSuccess();
            setSuccess(true);
          }
        })
        .catch((error) => {
          console.log(error);
          setSuccess(false);
          setFailModalMsg(error.response.data.message);
          handleShowModalFail();
        });
    }
  };

  const runCVAnalyzer = () => {
    setAnalysisLoading(true);
    setAnalysisDisabled(true);
    const data = { jobId: post.id };
    axios
      .post(`${process.env.REACT_APP_API_URL}/api/postings/analyzer/`, data, {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("atoken"),
        },
      })
      .then((res) => {
        setJobAnalysisResults(res.data);
        setAnalysisLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setAnalysisLoading(false);
      });
  };

  function MyVerticallyCenteredModal() {
    return (
      <>
        <Modal
          show={modalState === "modal-success"}
          size="lg"
          aria-labelledby="contained-modal-title-vcenter"
          centered
        >
          <Modal.Header closeButton>
            <Modal.Title id="contained-modal-title-vcenter">Status</Modal.Title>
          </Modal.Header>
          <Modal.Body>Job application record created successfully!</Modal.Body>
          <Modal.Footer>
            <Button variant="primary" onClick={handleCloseSuccess}>
              Close
            </Button>
          </Modal.Footer>
        </Modal>

        <Modal
          show={modalState === "modal-fail"}
          size="lg"
          aria-labelledby="contained-modal-title-vcenter"
          centered
        >
          <Modal.Header closeButton>
            <Modal.Title id="contained-modal-title-vcenter">Status</Modal.Title>
          </Modal.Header>
          <Modal.Body>{failModalMsg}</Modal.Body>
          <Modal.Footer>
            <Button variant="primary" onClick={handleCloseFail}>
              Close
            </Button>
          </Modal.Footer>
        </Modal>

        <Modal
          show={modalState === "modal-no-CV"}
          size="lg"
          aria-labelledby="contained-modal-title-vcenter"
          centered
        >
          <Modal.Header closeButton>
            <Modal.Title id="contained-modal-title-vcenter">
              Warning!
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            Oops, looks like you haven't created a CV. Create it and try again.{" "}
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleCloseFail}>
              Close
            </Button>
          </Modal.Footer>
        </Modal>
      </>
    );
  }

  return (
    <Layout
      title="Job Dash | Apply to a Job"
      content="JobApplicationForm"
      color="var(--color-gray)"
    >
      <GenericPageLayout>
        <div className="cv-builder-card shadow-lg">
          {/* Close & Go Back to Previous Page */}
          <ClosePage />
          <div>
            <p>Posted: {shortDate}</p>
            <Tag tag={post.remote_option} />
          </div>
          {/* Company Info */}
          <div className="d-flex justify-content-between mb-5 ">
            <div>
              <h2>{post.title}</h2>
              <h3>{post.company}</h3>
              <p>{post.location}</p>
              <div style={{ width: "32px" }}>
                <Heart
                  isActive={isLiked}
                  onClick={() => setIsLiked(!isLiked)}
                />
              </div>
            </div>
            {/* Image */}
            <div
              style={{
                fontSize: "6rem",
                backgroundColor: "var(--color-dark-gray)",
                color: "white",
                width: "9rem",
                height: "9rem",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                borderRadius: "50%",
              }}
            >
              <i className="bi bi-buildings" style={{ color: "inherit" }}></i>
            </div>
          </div>

          {/* post analyzer */}
          <div className="mb-5">
            <h3>
              Job Match Analyzer (Beta) <i class="bi bi-activity"></i>
            </h3>
            <hr />
            <div>
              {jobAnalysisResults === undefined ? (
                <>
                  <Button
                    variant="dark"
                    className="btn-jobdash"
                    disabled={analysisDisabled}
                    onClick={() => runCVAnalyzer()}
                  >
                    {analysisLoading ? (
                      <>
                        <Spinner
                          as="span"
                          animation="border"
                          size="sm"
                          role="status"
                          aria-hidden="true"
                          className="me-3"
                          variant="light"
                        />
                        Loading...
                      </>
                    ) : (
                      "Start"
                    )}
                  </Button>
                </>
              ) : (
                <div>
                  <DonutChart
                    data={[
                      {
                        label: "Match",
                        value: jobAnalysisResults.matching_score,
                      },
                      {
                        label: "",
                        value: 100 - jobAnalysisResults.matching_score,
                        isEmpty: true,
                      },
                    ]}
                    height={100}
                    width={100}
                    colors={["MediumBlue", "lightgrey"]}
                    legend={false}
                    emptyColor="lightgrey"
                    strokeColor="white"
                    clickToggle={false}
                    interactive={true}
                    formatValues={(values, total) => `${values.toFixed(0)}%`}
                  />
                  <p>
                    <strong>Matching: </strong>
                    {jobAnalysisResults.matching_skills_results.matching_skills.map(
                      (item) => (
                        <Badge bg="success" className="me-1">
                          {item}
                        </Badge>
                      )
                    )}
                  </p>
                  <p>
                    <strong>Missing: </strong>
                    {jobAnalysisResults.matching_skills_results.missing_skills
                      .slice(0, 10)
                      .map((item) => (
                        <Badge bg="warning" className="me-1">
                          {item}
                        </Badge>
                      ))}
                  </p>
                </div>
              )}
            </div>
          </div>

          <div className="mb-5">
            <h3>Description</h3>
            <hr />
            <p>{parse(post.description)}</p>
          </div>
          {/* Links */}
          <div>
            {post.link && (
              <>
                <p>Website:</p>
                <a href={post.link}></a>
              </>
            )}
          </div>

          <Form onSubmit={handleSubmit}>
            {/* Notes */}
            <div className="mb-5">
              <h3>Notes</h3>
              <MyEditor
                content={""}
                name="notes"
                placeholder={"Notes..."}
                setConvertedContent={setConvertedNoteContent}
                height={"10vh"}
              />
            </div>

            {/* Save Button */}
            <div className="d-flex justify-content-end w-100">
              <Button
                variant="dark"
                className="btn-jobdash btn-change-text"
                type="submit"
                onClick={submitApplication}
              >
                <i className="button-text-extra bi bi-send-fill"></i>
                <span className="button-text">Save and apply </span>
              </Button>
            </div>
          </Form>
        </div>
      </GenericPageLayout>
      <MyVerticallyCenteredModal
        show={modalShow}
        onHide={() => {
          setModalShow(false);
          navigate("/jobpostings");
        }}
      />
    </Layout>
  );
}

export default JobApplicationForm;
