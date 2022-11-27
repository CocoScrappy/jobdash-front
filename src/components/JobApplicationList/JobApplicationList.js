import React from 'react'
import ListGroup from "react-bootstrap/ListGroup";

function JobApplicationList({ jobApplications = [], setJobApplications }) {

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
      
      <ListGroup>{jobApplications.map(renderListGroupItem)}</ListGroup>
    </>
  )
}

export default JobApplicationList