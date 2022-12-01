import React, {useState, useRef, useEffect} from 'react'
import Layout from 'components/Layout'
import { Button, InputGroup, Container } from 'react-bootstrap'
import Heart from "react-heart"
import MyCVPage from 'containers/MyCVPage'

import useStore from 'store'
import axios from 'axios'
import { Formik, Field, Form  } from 'formik'




function JobApplicationForm({posting}) {

  const state = useStore();
  const ISODate = new Date(state.date_created);
  const shortDate = ISODate.toDateString();

  const [isLiked, setIsLiked] = useState(false);
  const [success, setSuccess] = useState(false);
  
  const[cv,setCv]=useState({})
  
  //handling form inputs
  const [formData, setFormData] = useState({});
  const {
    notes
  } = formData;
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  
  const getUserCV = async() => {
    axios
      .get(`${process.env.REACT_APP_API_URL}/api/cvs/get_user_cvs/`, {
        headers: { Authorization: "Bearer " + localStorage.getItem("atoken") },
      })
      .then((response) => {
        setCv(response.data);
      })
      .catch((error) => {
        console.log(error.response.data.message);
        // console.log(UserCVInfo)
      });
  };

  useEffect(()=>{getUserCV()}, []);
 
  
  const submitApplication =  (data) => {
    
    var applicationData={}

    
    console.log('cv ' +cv);
    try{
    applicationData = {
        notes: data.notes,
        favorited: isLiked,
        status: "applied",
        applicant: state.id,
        cv: cv.id,
        job_posting: state.jpid,
      }

    } catch (err) {
      console.log("Whoops, something went wrong while assigning the values for the request body")
    }
    console.log('application: ' + JSON.stringify(applicationData))
    console.log("submitting application")
    axios.post(`${process.env.REACT_APP_API_URL}/api/applications/`, applicationData,{
      headers: { Authorization: "Bearer " + localStorage.getItem("atoken") }})
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
                <Heart isActive={isLiked} onClick={() => setIsLiked(!isLiked)}/>
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
            <Formik
              initialValues={{notes: ''}}
              onSubmit={submitApplication}
            >
            <Form>      
            <label htmlFor="notes">Notes: </label>
            <Field id="notes" name="notes" as="textarea" 
                    rows={3}  placeholder="Notes go here" />        
                {/* <Form.Label as="h5">Notes: </Form.Label>
                <Form.Control 
                    
                    placeholder="Add your notes here..."
                    onChange={handleChange}
                    name="notes"
                    value={notes} /> */}
                {/* Add CV selector <MyCVsPage/> */}
                
                <button variant="primary" type="submit"  >
                  Apply
                </button>
            </Form>
            </Formik>
        </Container>
    </Layout>
  )
}

export default JobApplicationForm