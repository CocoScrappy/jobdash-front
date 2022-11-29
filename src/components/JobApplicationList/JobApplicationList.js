import React, {useState, useEffect} from 'react'
import ListGroup from "react-bootstrap/ListGroup";
import axios from "axios"

function JobApplicationList(props) {

  const [jobApplications, setJobApplications] = useState([]);

  const fetchUserApplications = () => {
    axios
      .get(`${process.env.REACT_APP_API_URL}/api/applications/get_user_applications/`, {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("atoken"),
        },
      })
      .then((response) => {
        console.log(response);
        setJobApplications(response.data);
      })
      .catch((error) => {
        if(error.response.data && error.response.status === 404)
        {
          setJobApplications(error.response.data.data);
        }
        console.log(error);
      });
  };

  useEffect(fetchUserApplications, []);

  const renderListGroupItem = (t) => {
    return (
      <ListGroup.Item
        key={t.id}
        className="d-flex justify-content-between align-items-center"
      >
      <div className="d-flex justify-content-center">
          {t.job_posting.title}
        </div>
        <div className="d-flex justify-content-center">
          {t.job_posting.company}
        </div>
        <div className="d-flex justify-content-center">
          {t.application_date}
        </div>
        <div className="d-flex justify-content-center">
          {t.status}
        </div>
        <div className="d-flex justify-content-center">
          {"" + t.favorited}
        </div>
      </ListGroup.Item>
    );
  }

  return (
    <>
      <ListGroup>
        <ListGroup.Item
          className="d-flex justify-content-between align-items-center"
        >
          <div className="d-flex justify-content-center">
            <h4>Title</h4>
          </div>
          <div className="d-flex justify-content-center">
            <h4>Company</h4>
          </div>
          <div className="d-flex justify-content-center">
            <h4>Date Applied</h4>
          </div>
          <div className="d-flex justify-content-center">
            <h4>Status</h4>
          </div>
          <div className="d-flex justify-content-center">
            <h4>Favorite</h4>
          </div>
        </ListGroup.Item>
      </ListGroup>
      
      <ListGroup>
      {
        jobApplications.map((application) => (renderListGroupItem(application)))
        }</ListGroup>
    </>
  )
}

export default JobApplicationList