import React, {useState, useRef, useEffect} from 'react'
import { useLocation } from 'react-router-dom'
import Layout from 'components/Layout'
import { Button, InputGroup, Form, Container } from 'react-bootstrap'
import Heart from "react-heart"

import MyCVPage from 'containers/MyCVPage'

import useStore from 'store'
import axios from 'axios'



function JobApplicationForm({posting}) {

  const state = useStore();
  const location = useLocation();

  const [isLiked, setIsLiked] = useState(false);
  const [success, setSuccess] = useState(false);

  const [formData, setFormData] = useState({});
  const {
    notes
  } = formData;

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const applicationData = {};

  const submitApplication = async (e) => {
    e.preventDefault();
    applicationData = {
        notes: notes.value,
        favorited: isLiked,
        status: "Applied",
        applicant_id: state.id,
        cv_id: await MyCVPage.getUserCV().id,
        job_posting_id: state.jpid,
      }

    console.log("submitting application")
    axios.post(`${process.env.REACT_APP_API_URL}/api/applications/`, applicationData)
          .then((res) => {
            console.log(res)
            setSuccess(true)
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
            <Form>
                <Form.Label>Company</Form.Label>
                <Form.Control type='text' disabled value={state.company_name} />
                <Form.Label>Job Title</Form.Label>
                <Form.Control type="text" placeholder="Job Title" className="" disabled value={state.title}/>
                
                <Form.Label>Favorite</Form.Label>
                <div style={{ width: "1.5rem" }}>
                  <Heart isActive={isLiked} onClick={() => setIsLiked(!isLiked)}/>
                </div>

                <br/>

                <Form.Label>Notes</Form.Label>
                <Form.Control 
                    as="textarea" 
                    rows={3} 
                    placeholder="Add Notes..."
                    onChange={handleChange}
                    name="notes"
                    value={notes} />
                {/* Add CV selector <MyCVsPage/> */}
                
                <Button variant="primary" type="submit" onSubmit={submitApplication} >
                  Apply
                </Button>
            </Form>
        </Container>
    </Layout>
  )
}

export default JobApplicationForm