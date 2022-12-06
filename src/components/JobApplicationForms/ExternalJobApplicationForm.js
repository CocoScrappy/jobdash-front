import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Layout from "../../layouts/MainLayout";
import { Button, InputGroup, Form, Container } from "react-bootstrap";
import Modal from "react-bootstrap/Modal";
import { FormControl } from "react-bootstrap";
import Heart from "react-heart";
import parse from "html-react-parser";

import axios from "axios";
//zustand
import useStore from "store";
// custom components
import MyEditor from "components/MyEditor";
import { JobpostingForm } from "components/JobpostingForm";

function ExternalJobApplicationForm() {
  const handleSubmit = (event) => {
    event.preventDefault();
  };

  var uId = useStore((state) => state.id);
  var uCv = useStore((state) => state.cv_id);
  const [convertedDescContent, setConvertedDescContent] = useState("");
  const [convertedNoteContent, setConvertedNoteContent] = useState("");
  const [formData, setFormData] = useState({});
  const [isLiked, setIsLiked] = useState(false);
  const [error, setError] = useState(false);
  const [errors, setErrors] = useState({});
  const [success, setSuccess] = useState(false);

  const navigate = useNavigate();

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

  const {
    // jobposting fields
    employer,
    title,
    logo_url,
    location,
    description,
    company,
    remote_option,
  } = formData;

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleCreateRecord = async () => {
    // adding job posting first

    formData.description = convertedDescContent;
    formData.employer = 14; //14 will be default internal Employer

    console.log("this func is running");
    console.log(formData);
    axios
      .post(`${process.env.REACT_APP_API_URL}/api/postings/`, formData, {
        headers: { Authorization: "Bearer " + localStorage.getItem("atoken") },
      })
      .then((res) => {
        console.log("job posting : " + res.data);

        //adding application
        const formAppData = {
          notes: convertedNoteContent,
          favorited: isLiked,
          status: "applied",
          // applicant: uId,
          cv: uCv,
          job_posting: res.data.id,
        };
        axios
          .post(
            `${process.env.REACT_APP_API_URL}/api/applications/`,
            formAppData,
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
            setSuccess(false);
            handleShowModalFail(error);
          });
      })
      // .then((res) => {
      //   console.log(res.data);
      // })
      .catch((error) => {
        alert("Something wrong with creating job posting record");
      });
  };

  function MyVerticallyCenteredModal(props) {
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
            <Button variant="secondary" onClick={handleCloseSuccess}>
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
          <Modal.Body>
            Oops, something went wrong with your request. Try again later.{" "}
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
      title="ExternalJobApplicationForm"
      content="ExternalJobApplicationForm"
    >
      <div>External Job Application Form</div>
      <Container>
        <Form onSubmit={handleSubmit}>
          {/* Title */}
          <InputGroup className="mb-4">
            <InputGroup.Text>Title</InputGroup.Text>
            <FormControl
              placeholder="enter title"
              onChange={handleChange}
              name="title"
              defaultValue={title || ""}
            />
            <Form.Control.Feedback type="invalid">
              {errors.title}
            </Form.Control.Feedback>
          </InputGroup>

          {/* Logo Url */}
          <InputGroup className="mb-4">
            <InputGroup.Text>Logo Url</InputGroup.Text>
            <FormControl
              placeholder="ex. yourHosting/yourImage.ext"
              onChange={handleChange}
              name="logo_url"
              defaultValue={logo_url || ""}
            />
          </InputGroup>
          <Form.Control.Feedback type="invalid">
            {errors.logo_url}
          </Form.Control.Feedback>

          {/* Location */}
          <InputGroup className="mb-4">
            <InputGroup.Text>Location</InputGroup.Text>
            <FormControl
              placeholder="ex. Montreal"
              onChange={handleChange}
              name="location"
              defaultValue={location || ""}
            />
            <Form.Control.Feedback type="invalid">
              {errors.location}
            </Form.Control.Feedback>
          </InputGroup>

          {/* Company Name */}
          <InputGroup className="mb-4">
            <InputGroup.Text>Company Name</InputGroup.Text>
            <FormControl
              placeholder="enter Company Name"
              onChange={handleChange}
              name="company"
              defaultValue={company || ""}
            />
            <Form.Control.Feedback type="invalid">
              {errors.company}
            </Form.Control.Feedback>
          </InputGroup>

          {/* Remote Options Selector */}
          <InputGroup className="mb-4">
            <InputGroup.Text>Remote options</InputGroup.Text>
            <Form.Select
              aria-label="Default select example"
              onChange={handleChange}
              name="remote_option"
              defaultValue={"#"}
            >
              <option disabled value="#">
                Pick one
              </option>
              <option value="remote">Remote</option>
              <option value="hybrid">Hybrid</option>
              <option value="in-person">In-Person</option>
            </Form.Select>
            <Form.Control.Feedback type="invalid">
              {errors.remote_option}
            </Form.Control.Feedback>
          </InputGroup>

          {/* Description */}
          <div className="mb-4">
            <h4>Job Description</h4>
            <MyEditor
              content={""}
              name="description"
              setConvertedContent={setConvertedDescContent}
              defaultValue={description || ""}
            />
          </div>
          <Form.Control.Feedback type="invalid">
            {errors.description}
          </Form.Control.Feedback>

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

          {/* Like Button */}
          <div style={{ width: "1.5rem" }}>
            <Heart isActive={isLiked} onClick={() => setIsLiked(!isLiked)} />
          </div>

          {/* Save Button */}
          <Button
            variant="secondary"
            type="submit"
            onClick={() => {
              handleCreateRecord();
            }}
          >
            Save External Application
          </Button>
        </Form>
      </Container>
      <MyVerticallyCenteredModal
        show={modalShow}
        onHide={() => setModalShow(false)}
      />
    </Layout>
  );
}

export default ExternalJobApplicationForm;
