import React, {useState, useEffect} from 'react'
import { useNavigate } from 'react-router-dom'
import Layout from 'components/Layout'
import { Button, InputGroup, Form, Container } from 'react-bootstrap'
import { FormControl } from 'react-bootstrap'
import Heart from "react-heart"

import axios from "axios";
//zustand
import useStore from "store";
// custom components
import MyEditor from "components/MyEditor";
import {JobpostingForm} from 'components/JobpostingForm';

function ExternalJobApplicationForm() {

  var uId = useStore((state) => state.id);
  const[cv,setCv]=useState({});
  const [record, setRecord] = useState(null);
  const [convertedContent, setConvertedContent] = useState("");
  const [formJPData, setJPFormData] = useState({});
  const [isLiked, setIsLiked] = useState(false);
  const [error, setError] = useState(false);
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

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
  
  const handleChange = (e) => {
    setRecord({ ...record, [e.target.name]: e.target.value });
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
  } = formJPData;

  const handleCreateRecord = async () => {
    // adding job posting first
    console.log(formJPData);
    if (!formJPData) {
      alert("Please provide a valid value for jobposting");
      return;
    }
    formJPData.description = convertedContent;
    formJPData.employer = 14; //14 will be default internal Employer
    

    axios.post(`${process.env.REACT_APP_API_URL}/api/postings/`, formJPData,{
      headers: { Authorization: "Bearer " + localStorage.getItem("atoken") },
    })
      .then((res) => {
        //adding application
        addApplication(res.data.id);
      })
      .catch(() => {
        alert("Something wrong with aplying to Job posting");
      });
  };

  const addApplication = (jpId, notes, isLiked) => {
    try{
      const formAppData = {
        notes: notes,
        favorited: isLiked,
        status: "applied",
        applicant: uId,
        cv: cv.id,
        job_posting: jpId
      }
      axios.post(`${process.env.REACT_APP_API_URL}/api/applications/`, formAppData,{
        headers: { Authorization: "Bearer " + localStorage.getItem("atoken") },
      })
    } catch (err) {
      console.log("Whoops, something went wrong while adding application record")
    }

    navigate("/jobapplications");
  }


  return (
    <Layout title="ExternalJobApplicationForm" content="ExternalJobApplicationForm">
        <div>External Job Application Form</div>
        <Container>
        <Form
            onSubmit={handleCreateRecord}>
        <InputGroup className="mb-4">
            <InputGroup.Text>Title</InputGroup.Text>
            <FormControl
              placeholder="enter title"
              onChange={handleChange}
              isInvalid={!!errors.title}
              name="title"
              value={record ? record.title : ""}
            />
            <Form.Control.Feedback type="invalid">
              {errors.title}
            </Form.Control.Feedback>
          </InputGroup>
          <InputGroup className="mb-4">
            <InputGroup.Text>Logo Url</InputGroup.Text>
            <FormControl
              placeholder="ex. yourHosting/yourImage.ext"
              onChange={handleChange}
              isInvalid={!!errors.logo_url}
              name="logo_url"
              value={logo_url}
            />
          </InputGroup>
          <Form.Control.Feedback type="invalid">
            {errors.logo_url}
          </Form.Control.Feedback>
          <InputGroup className="mb-4">
            <InputGroup.Text>Location</InputGroup.Text>
            <FormControl
            placeholder="ex. Montreal"
            onChange={handleChange}
            isInvalid={!!errors.location}
            name="location"
            value={location}
            />
          <Form.Control.Feedback type="invalid">
            {errors.location}
          </Form.Control.Feedback>
          </InputGroup>
          <InputGroup className="mb-4">
            <InputGroup.Text>Company Name</InputGroup.Text>
            <FormControl
            placeholder="enter Company Name"
            onChange={handleChange}
            isInvalid={!!errors.company}
            name="company"
            value={company}
            />
            <Form.Control.Feedback type="invalid">
              {errors.company}
            </Form.Control.Feedback>
          </InputGroup>
          <InputGroup className="mb-4">
            <InputGroup.Text>Remote options</InputGroup.Text>
            <Form.Select
            aria-label="Default select example"
            onChange={handleChange}
            isInvalid={!!errors.remote_option}
            name="remote_option"
            value={remote_option}
            defaultValue={"#"}
            >
            {/* make the first one unpickable but display first? */}
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
          <InputGroup className="mb-4">
            <InputGroup.Text isInvalid={!!errors.description}>
              Description
            </InputGroup.Text>
            <MyEditor 
              content={""} 
              setConvertedContent={setConvertedContent} 
              placeholder={"Enter Job Description"} />
          </InputGroup>
          <Form.Control.Feedback type="invalid">
            {errors.description}
          </Form.Control.Feedback>
          <Form.Label>Notes</Form.Label>
            <Form.Control as="textarea" rows={3} name="notes"/>
            <div style={{ width: "1.5rem" }}>
                <h5>Favorite: </h5>
                <Heart isActive={isLiked} onClick={() => setIsLiked(!isLiked)}/>
            </div>
              <Button variant="primary" type="submit">
                Save External Application
              </Button>
        </Form>
        </Container>
    </Layout>
  )
}

export default ExternalJobApplicationForm