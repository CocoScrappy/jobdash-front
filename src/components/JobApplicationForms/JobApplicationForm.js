import React, { useState, useRef, useEffect } from "react";
import Layout from "layouts/MainLayout";
import { Button, InputGroup, Container } from "react-bootstrap";
import Heart from "react-heart";
import MyCVPage from "containers/MyCVPage";
import { Modal } from "react-bootstrap";
import useStore from "store";
import axios from "axios";
import { Form } from "react-bootstrap";
import MyEditor from "components/MyEditor";
import { useNavigate, useLocation  } from "react-router-dom";


function JobApplicationForm(props) {
  const uId = useStore((state) => state.uId);
  const uCv = useStore((state) => state.cv_id);
  const { jobPostingInfo } = useLocation();
  const [post, setPost] = useState(jobPostingInfo);
  // const state = useStore();
  const ISODate = new Date(post.date_created);
  const shortDate = ISODate.toDateString();
  const [isLiked, setIsLiked] = useState(false);
  const [success, setSuccess] = useState(false);
  const [convertedNoteContent, setConvertedNoteContent] = useState("");
  const [modalShow, setModalShow] = useState(false);
  const [modalContent, setModalContent] = useState("");
  const navigate = useNavigate();

  //handling form inputs
  const [formData, setFormData] = useState({});
  const { notes } = formData;
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // const getJobPostingInfo = (post) => {
  //   return axios
  //     .get(`${process.env.REACT_APP_API_URL}/api/postings/${post.id}/`)
  //     .then((res) => {
  //       console.log(res);
  //       // addJPId(res.data.id);
  //       // addJPTitle(res.data.title);
  //       // //addJPLogoUrl(res.data.logo_url);
  //       // addJPLocation(res.data.location);
  //       // addJPDescription(res.data.description);
  //       // addJPDateCreated(res.data.date_created);
  //       // addJPRemoteOption(res.data.remote_option);
  //       // addJPEmployerId(res.data.employer_id);
  //       // addJPCompanyName(company);
  //       navigate("/jobapplicationform", { state: { ...t } });
  //       return;
  //     })
  //     .catch(() => {
  //       alert("Something wrong with aplying to Job posting");
  //     });
  // };

  const submitApplication = () => {
    var applicationData = {};
    try {
      applicationData = {
        notes: convertedNoteContent,
        favorited: isLiked,
        status: "applied",
        applicant: uId,
        cv: uCv,
        job_posting: post.id,
      };
    } catch (err) {
      console.log(
        "Whoops, something went wrong while assigning the values for the request body"
      );
    }
    console.log("application: " + JSON.stringify(applicationData));
    console.log("submitting application");
    axios
      .post(
        `${process.env.REACT_APP_API_URL}/api/applications/`,
        applicationData
      )
      .then((res) => {
        setModalContent("Application submitted successfully!");
        setModalShow(true);
      })
      .catch((error) => {
        console.log(error.response.data.message);
        setModalContent(error.response.data.message);
        setModalShow(true);
      });

    setSuccess(true);
  };

  function MyVerticallyCenteredModal(props) {
    return (
      <Modal
        {...props}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            Info
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <h4>Good Luck!</h4>
          <p>
            Job application record created successfully!
          </p>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={props.onHide}>Close</Button>
        </Modal.Footer>
      </Modal>
    );
  }


  return (
    <Layout title="JobApplicationForm" content="JobApplicationForm">
      <div>
        <h4>Job Application Form</h4>
      </div>
      <Container>
        <div>
          <h5>Company: {post.company_name}</h5>
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
          <p>{post.description}</p>
        </div>
          <Form>
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
            {/* <Form.Label as="h5">Notes: </Form.Label>
                <Form.Control

                    placeholder="Add your notes here..."
                    onChange={handleChange}
                    name="notes"
                    value={notes} /> */}
            {/* Add CV selector <MyCVsPage/> */}

          {/* Save Button */}
          <Button variant="primary" type="submit" onClick={submitApplication}>
              Apply
          </Button>
          </Form>
      </Container>
      <MyVerticallyCenteredModal
        show={modalShow}
        onHide={() => {setModalShow(false); navigate('/jobpostings')}}
      />
    </Layout>
  );
}

export default JobApplicationForm;
