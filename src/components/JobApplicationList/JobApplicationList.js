import React, { useState, useEffect, useRef } from "react";
import ListGroup from "react-bootstrap/ListGroup";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { BsCursor } from "react-icons/bs";
import JobApplicationItem from "./JobApplicationItem";

function JobApplicationList(props) {
  const navigate = useNavigate();

  const [jobApplications, setJobApplications] = useState([]);

  const [isLiked, setIsLiked] = useState(false);
  const likeBtn = useRef(null);

  const fetchUserApplications = () => {
    axios
      .get(
        `${process.env.REACT_APP_API_URL}/api/applications/get_user_applications/`,
        {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("atoken"),
          },
        }
      )
      .then((response) => {
        console.log(response);
        setJobApplications(response.data.results);
      })
      .catch((error) => {
        if (error.response.data && error.response.status === 404) {
          setJobApplications(error.response.data.data);
        }
        console.log(error);
      });
  };

  useEffect(fetchUserApplications, []);

  // function heanle like button click
  function handleClick(appId) {
    setIsLiked(!isLiked);
  }

  // const renderListGroupItem = (application) => {
  //   // change date format
  //   var ISODate = new Date(application.application_date);
  //   var shortDate = ISODate.toLocaleDateString();

  //   function redirectToInfoPage() {
  //     navigate(`/jobapplications/application/${application.id}`, {
  //       application: application,
  //     });
  //   }

  //   // const [applicationInfo, setApplicationInfo] = useState(application);

  //   return (
  //     <tr key={application.id}>
  //       <td onClick={() => redirectToInfoPage()}>
  //         {application.job_posting.title}
  //       </td>
  //       <td onClick={() => redirectToInfoPage()}>
  //         {application.job_posting.company}
  //       </td>
  //       <td onClick={() => redirectToInfoPage()}>
  //         {application.job_posting.remote_option}
  //       </td>
  //       <td onClick={() => redirectToInfoPage()}>{shortDate}</td>
  //       <td onClick={() => redirectToInfoPage()}>{application.status}</td>
  //       <td style={{ width: "1.5rem" }}>
  //         <Heart
  //           style={{ cursor: "default" }}
  //           ref={likeBtn}
  //           key={application.id}
  //           isActive={application.favorited}
  //           onClick={() => setIsLiked(application.id)}
  //         />
  //       </td>
  //     </tr>
  //   );
  // };

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
