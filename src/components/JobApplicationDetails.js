import { useState, useEffect } from "react";
import axios from "axios";
import { format, parseISO } from "date-fns";
import MyEditor from "./MyEditor";
import { Button, Form } from "react-bootstrap";
import PreviewModal from "./PreviewModal";
import SavedDateDetails from "./SavedDateDetails";
import {
  updateFavoritedStatus,
  getApplicationInfo,
  getStatusOptions,
  updateApplicationStatus,
  updateApplicationNotes,
  deleteApplication,
} from "../helpers/Utils";
import Heart from "react-heart";
import Select from "react-select";
import { useNavigate } from "react-router-dom";

function JobApplicationDetails(props) {
  const navigate = useNavigate();

  const applicationId = props.applicationId;

  const [applicationInfo, setApplicationInfo] = useState();

  const [showModal, setShowModal] = useState(false);
  const [modalContent, setModalContent] = useState("");

  const [notesMsg, setNotesMsg] = useState("");
  // const [notesMsgStyle, setNotesMsgStyle] = useState("");

  const [statusOptions, setStatusOptions] = useState([]);
  const [statusMsg, setStatusMsg] = useState("");

  const [dateModalInfo, setDateModalInfo] = useState();
  const [showDateModal, setShowDateModal] = useState(false);

  const [convertedContent, setConvertedContent] = useState("");

  useEffect(() => {
    getApplicationInfo({ applicationId, setApplicationInfo });
    getStatusOptions({ setStatusOptions });
  }, []);

  const previewJobDescription = () => {
    setModalContent(applicationInfo.job_posting.description);
    setShowModal(true);
  };

  const previewNotes = () => {
    setModalContent(convertedContent);
    setShowModal(true);
  };

  const viewDateModal = ({ dateInfo }) => {
    // console.log(dateInfo);
    setDateModalInfo(dateInfo);
    setShowDateModal(true);
  };

  const addNewDate = () => {
    setDateModalInfo({
      application: applicationId,
      name: "",
      notes: "",
      datetime: null,
    });
    setShowDateModal(true);
  };

  const resetDateModalInfo = () => {
    setDateModalInfo();
    setShowDateModal(false);
  };

  const handleDeleteApplication = (applicationId) => {
    const confirmed = window.confirm("Are you sure you want to delete?");
    if (confirmed) {
      deleteApplication({ applicationId, navigate });
    }
  };

  // console.log(applicationInfo);
  if (applicationInfo === undefined) {
    return null;
  }
  return (
    <div>
      <h3>Job Application Details</h3>
      <hr />
      <div className="row">
        <div className="col col-10">
          <h2>{applicationInfo.job_posting.title}</h2>
          <h3 className="text-secondary">
            {applicationInfo.job_posting.company}
          </h3>
          <h6 className="mt-4">{applicationInfo.job_posting.location}</h6>
          <h6 className="mb-4">{applicationInfo.job_posting.remote_option}</h6>
        </div>
        <div className="col">
          <Button
            className="my-3"
            variant="danger"
            onClick={() => handleDeleteApplication(applicationId)}
          >
            Delete
          </Button>
          <Heart
            style={{ cursor: "default" }}
            // ref={likeBtn}
            key={applicationInfo.id}
            isActive={applicationInfo.favorited}
            onClick={() =>
              updateFavoritedStatus({ applicationInfo, setApplicationInfo })
            }
          />
          <Button
            className="my-3"
            variant="primary"
            onClick={() => previewJobDescription()}
          >
            Job Description
          </Button>
        </div>
      </div>
      <hr></hr>
      <p className="text-muted fst-italic">
        <strong>Applied on: </strong>
        {format(
          parseISO(applicationInfo.application_date),
          "MMM dd yyyy h:mmaa"
        )}
      </p>
      <div className="row my-3">
        <p className="col-2">Status</p>
        <div className="col-4" style={{ "z-index": "100" }}>
          <Select
            options={statusOptions}
            defaultValue={
              statusOptions[
                statusOptions.findIndex(function (option) {
                  return option.value == applicationInfo.status;
                })
              ]
            }
            onChange={(e) =>
              updateApplicationStatus({
                updatedStatus: e.value,
                applicationId,
                setApplicationInfo,
                setStatusMsg,
                applicationInfo,
              })
            }
          />
        </div>
        <p className="col-6 text-success">{statusMsg}</p>
      </div>
      <hr></hr>
      <div className="row">
        <p className="col-2">Important Dates: </p>
        <Button
          variant="link"
          // size="sm"
          className="col-2 pt-0 pb-3"
          onClick={() => addNewDate()}
        >
          Add New
        </Button>
      </div>
      <div>
        {applicationInfo.saved_dates.map((date, index) => (
          <div className="row">
            <p className="col-8">{date.name}</p>
            <p className="col-3">
              {format(parseISO(date.datetime), "MMM dd yyyy h:mmaa")}
            </p>
            <Button
              variant="link"
              // size="sm"
              className="col-1"
              onClick={() => viewDateModal({ dateInfo: date })}
            >
              View
            </Button>
          </div>
        ))}
      </div>
      <hr></hr>
      <br></br>
      <h5>
        Notes{" "}
        <Button
          variant="primary"
          size="sm"
          className="mx-2"
          onClick={() => previewNotes()}
        >
          Preview
        </Button>
        <Button
          variant="primary"
          size="sm"
          className="mx-2"
          onClick={() =>
            updateApplicationNotes({
              applicationId,
              convertedContent,
              applicationInfo,
              setApplicationInfo,
              setNotesMsg,
            })
          }
        >
          Save
        </Button>
      </h5>
      <span className="text-success">{notesMsg}</span>
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
      {dateModalInfo !== undefined ? (
        <SavedDateDetails
          show={showDateModal}
          setShow={setShowDateModal}
          dateInfo={dateModalInfo}
          onHide={resetDateModalInfo}
          setApplicationInfo={setApplicationInfo}
          applicationInfo={applicationInfo}
        />
      ) : (
        <></>
      )}
    </div>
  );
}

export default JobApplicationDetails;
