import React, { useState, useRef, useEffect } from "react";
import Layout from "layouts/MainLayout";
import { Button, InputGroup, Container } from "react-bootstrap";
import Heart from "react-heart";
import MyCVPage from "containers/MyCVPage";

import useStore from "store";
import axios from "axios";
import { Form } from "react-bootstrap";
import MyEditor from "components/MyEditor";

function JobApplicationForm({ posting }) {
  var uCv = useStore((state) => state.cv_id);
  const state = useStore();
  const ISODate = new Date(state.date_created);
  const shortDate = ISODate.toDateString();
  const [isLiked, setIsLiked] = useState(false);
  const [success, setSuccess] = useState(false);
  const [convertedNoteContent, setConvertedNoteContent] = useState("");
  const [cv, setCv] = useState({});

  //handling form inputs
  const [formData, setFormData] = useState({});
  const { notes } = formData;
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };


  const submitApplication = (data) => {
    var applicationData = {};
    try {
      applicationData = {
        notes: convertedNoteContent,
        favorited: isLiked,
        status: "applied",
        applicant: state.id,
        cv: uCv,
        job_posting: state.jpid,
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
        console.log(res);
        setSuccess(true);
      })
      .catch(() => {
        alert("Something went wrong while calling database.");
      });

    setSuccess(true);
  };

  return (
    <Layout title="JobApplicationForm" content="JobApplicationForm">
      <div>
        <h4>Job Application Form</h4>
      </div>
      <Container>
        <div>
          <h5>Company: {state.company_name}</h5>
          <h5>Job Title: {state.title}</h5>
        </div>
        <div style={{ width: "1.5rem" }}>
          <h5>Favorite: </h5>
          <Heart isActive={isLiked} onClick={() => setIsLiked(!isLiked)} />
        </div>
        <div>
          <h5>Location: {state.location}</h5>
          <h5>Remote Option: {state.remote_option}</h5>
          <h5>Date Created: {shortDate}</h5>
        </div>
        <div>
          <h5>Job Description: </h5>
          <p>{state.description}</p>
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
    </Layout>
  );
}

export default JobApplicationForm;
