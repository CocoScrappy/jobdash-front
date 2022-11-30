import { useState, useEffect } from "react";
import axios from "axios";
import { format, parseISO } from "date-fns";

function JobApplicationDetails(props) {
  const applicationId = props.applicationId;

  const [applicationInfo, setApplicationInfo] = useState();
  const [showModal, setShowModal] = useState(false);
  const [modalContent, setModalContent] = useState("");

  const getApplicationInfo = (applicationId) => {
    axios
      .get(
        `${process.env.REACT_APP_API_URL}/api/applications/${applicationId}/details/`,
        {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("atoken"),
          },
        }
      )
      .then((response) => {
        console.log(response);
        setApplicationInfo(response.data);
      })
      .catch((error) => {
        if (error.response.data && error.response.status === 404) {
          setApplicationInfo(error.response.data.data);
        }
        console.log(error);
      });
  };

  useEffect(() => {
    getApplicationInfo(applicationId);
  }, []);

  if (applicationInfo === undefined) {
    return null;
  }
  return (
    <div>
      <h3>Job Application Details</h3>
      <hr />
      <h2>{applicationInfo.job_posting.title}</h2>
      <h3 className="text-secondary">{applicationInfo.job_posting.company}</h3>
      <p className="text-muted">
        {format(
          parseISO(applicationInfo.application_date),
          "MMM dd yyyy h:mmaa"
        )}
      </p>
      <div
        className="modal fade"
        id="detailModal"
        tabindex="-1"
        aria-labelledby="detailModal"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-xl">
          <div className="modal-content">
            <div className="modal-body">
              <p>{modalContent}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default JobApplicationDetails;
