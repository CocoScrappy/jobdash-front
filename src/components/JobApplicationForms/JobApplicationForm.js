import React, { useState, useEffect } from "react";
import Layout from "layouts/MainLayout";
import { Button, Container } from "react-bootstrap";
import Heart from "react-heart";
import { Modal } from "react-bootstrap";
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

  const handleCloseSuccess = () => {
    setModalState("close");
    navigate("/jobpostings");
  };

  const handleCloseFail = () => {
    setModalState("close");
  };

  const submitApplication = () => {
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
        <div className="row">
          <div className="col">
            <div>
              <h2>{post.title}</h2>
              <h3>{post.company}</h3>
            </div>
            <div style={{ width: "1.5rem" }}>
              <h5>Favorite: </h5>
              <Heart isActive={isLiked} onClick={() => setIsLiked(!isLiked)} />
            </div>
            <div>
              <h5>Location: {post.location}</h5>
              <h5>Remote Option: {post.remote_option}</h5>
              <h5>Date Created: {shortDate}</h5>
            </div>
          </div>
          {/* post analyzer */}
          <div className="col text-center">
            <h3>JobPost Analyzer (beta)</h3>
            <div>
              {jobAnalysisResults === undefined ? (
                <>
                  <Button
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
                    {jobAnalysisResults.matching_skills.map((item) => (
                      <Badge bg="success" className="me-1">
                        {item}
                      </Badge>
                    ))}
                  </p>
                  <p>
                    <strong>Missing: </strong>
                    {jobAnalysisResults.missing_skills
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
        </div>
        <div>
          <h5>Job Description: </h5>
          <p>{parse(post.description)}</p>
        </div>
        <div>
          <h5>
            Job Link: <a href={post.link}>{post.link ?? "None"}</a>{" "}
          </h5>
        </div>

        <Form onSubmit={handleSubmit}>
          {/* Notes */}
          <div className="mb-4">
            <h4>Notes</h4>
            <MyEditor
              content={""}
              name="notes"
              placeholder={"Notes..."}
              setConvertedContent={setConvertedNoteContent}
            />
          </div>

          {/* Save Button */}
          <Button
            variant="dark"
            className="btn-jobdash btn-change-text"
            type="submit"
            onClick={submitApplication}
          >
            <i className="button-text-extra bi bi-send-fill"></i>
            <span className="button-text">Apply now </span>
          </Button>
        </Form>
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
