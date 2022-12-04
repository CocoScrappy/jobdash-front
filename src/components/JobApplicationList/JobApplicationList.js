import React, { useState, useEffect, useRef } from "react";
import ListGroup from "react-bootstrap/ListGroup";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { BsCursor } from "react-icons/bs";
import JobApplicationItem from "./JobApplicationItem";
import { fetchUserApplications } from "../../helpers/Utils";

function JobApplicationList(props) {
  const [jobApplications, setJobApplications] = useState([]);

  useEffect(() => fetchUserApplications({ setJobApplications }), []);

  return (
    <>
      <table className="table table-striped">
        <thead>
          <tr>
            <th>Title</th>
            <th>Company</th>
            <th>Remote Option</th>
            <th>Date Applied</th>
            <th>Status</th>
            <th>Liked</th>
          </tr>
        </thead>
        <tbody>
          {jobApplications.map((application) => (
            <JobApplicationItem
              application={application}
              key={application.id}
            />
          ))}
        </tbody>
      </table>
    </>
  );
}

export default JobApplicationList;
