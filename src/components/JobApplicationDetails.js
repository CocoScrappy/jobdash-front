import { useState, useEffect } from "react";
import axios from "axios";
import { format, parseISO } from "date-fns";
import MyEditor from "./MyEditor";
import { Button, Form } from "react-bootstrap";
import PreviewModal from "./PreviewModal";

function JobApplicationDetails(props) {
  const applicationId = props.applicationId;

  const [applicationInfo, setApplicationInfo] = useState();
  const [showModal, setShowModal] = useState(false);
  const [modalContent, setModalContent] = useState("");

  const [convertedContent, setConvertedContent] = useState("");

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

  const previewJobDescription = () => {
    setModalContent(applicationInfo.job_posting.description);
    setShowModal(true);
  };

  const previewNotes = () => {
    setModalContent(convertedContent);
    setShowModal(true);
  };

  if (applicationInfo === undefined) {
    return null;
  }
  return (
    <div>
      <h3>Job Application Details</h3>
      <hr />
      <div className="row">
        <div className="col col-9">
          <h2>{applicationInfo.job_posting.title}</h2>
          <h3 className="text-secondary">
            {applicationInfo.job_posting.company}
          </h3>
          <h6 className="mt-4">{applicationInfo.job_posting.location}</h6>
          <h6 className="mb-4">{applicationInfo.job_posting.remote_option}</h6>
        </div>
        <div className="col">
          <Form.Check
            type="switch"
            label="favorited"
            checked={applicationInfo.favorited}
            className="mb-4"
          />
          <Button variant="primary" onClick={() => previewJobDescription()}>
            Job Description
          </Button>
        </div>
      </div>
      <p className="text-muted fst-italic">
        <strong>Applied on: </strong>
        {format(
          parseISO(applicationInfo.application_date),
          "MMM dd yyyy h:mmaa"
        )}
      </p>
      <br></br>
      <h5>
        Notes{" "}
        <Button variant="primary" size="sm" onClick={() => previewNotes()}>
          Preview
        </Button>
      </h5>
      <MyEditor
        content={applicationInfo.notes}
        setConvertedContent={setConvertedContent}
      />
      <PreviewModal
        show={showModal}
        setShow={setShowModal}
        title={""}
        content={modalContent}
      />
    </div>
  );
}

export default JobApplicationDetails;
