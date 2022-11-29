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
          {t.company}
        </div>
        <div className="d-flex justify-content-center">
          {t.job_title}
        </div>
        <div className="d-flex justify-content-center">
          {t.notes}
        </div>
        <div className="d-flex justify-content-center">
          {t.cv}
        </div>
      </ListGroup.Item>
    );
  }

  return (
    <>
      <ListGroup>
        <ListGroup.Item
          key={0}
          className="d-flex justify-content-between align-items-center"
        >
          <div className="d-flex justify-content-center">
            <h4>Job</h4>
          </div>
          <div className="d-flex justify-content-center">
            <h4>Status</h4>
          </div>
          <div className="d-flex justify-content-center">
            <h4>Date Applied</h4>
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