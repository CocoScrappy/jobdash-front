import React, { useState } from "react";
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
        saved_dates: [],
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
    <Layout title="JobApplicationForm" content="JobApplicationForm">
      <div>
        <h4>Job Application Form</h4>
      </div>
      <Container>
        <div>
          <h5>Company: {post.company}</h5>
          <h5>Job Title: {post.title}</h5>
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
          <Button variant="primary" type="submit" onClick={submitApplication}>
            Apply
          </Button>
        </Form>
      </Container>
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
