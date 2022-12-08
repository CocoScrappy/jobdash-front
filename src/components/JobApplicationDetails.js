import { useState, useEffect } from "react";
import axios from "axios";
import { format, parseISO } from "date-fns";
import MyEditor from "./MyEditor";
import { Button } from "react-bootstrap";
import PreviewModal from "./PreviewModal";
import SavedDateDetails from "./SavedDateDetails";
import parse from "html-react-parser";

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
import ClosePage from "./ClosePage";
import Tag from "./Tag";

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

  // console.log("Job Post is: ", applicationInfo.job_posting);

  return (
    <div className="cv-builder-card shadow-lg">
      {/* Close & Go Back to Previous Page */}
      <ClosePage />
      <div>
        <p>
          Applied:{" "}
          {format(
            parseISO(applicationInfo.application_date),
            "MMM dd yyyy h:mmaa"
          )}
        </p>
        <Tag tag={applicationInfo.job_posting.remote_option} />
      </div>
      {/* Company Info */}
      <div className="d-flex justify-content-between mb-5 ">
        <div>
          <h2>{applicationInfo.job_posting.title}</h2>
          <h3>{applicationInfo.job_posting.company}</h3>
          <p className="mt-4">{applicationInfo.job_posting.location}</p>
          {/* Heart from Job Application Form  */}
          {/* <div style={{ width: "32px" }}>
            <Heart isActive={isLiked} onClick={() => setIsLiked(!isLiked)} />
          </div> */}

          {/* Heart */}
          {/* <Heart
          style={{ cursor: "default" }}
          // ref={likeBtn}
          key={applicationInfo.id}
          isActive={applicationInfo.favorited}
          onClick={() =>
            updateFavoritedStatus({ applicationInfo, setApplicationInfo })
          }
        /> */}
        </div>
        {/* Image */}
        <div
          style={{
            fontSize: "6rem",
            backgroundColor: "var(--color-dark-gray)",
            color: "white",
            width: "9rem",
            height: "9rem",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            borderRadius: "50%",
          }}
        >
          <i className="bi bi-buildings" style={{ color: "inherit" }}></i>
        </div>
      </div>

      <div className="mb-5">
        <h3>Description</h3>
        <hr />
        <p>{parse(applicationInfo.job_posting.description)}</p>
      </div>

      {/* Links */}
      <div className="mb-5">
        {applicationInfo.job_posting.link && (
          <>
            <a href={applicationInfo.job_posting.link}>Website</a>
          </>
        )}
      </div>

      <hr></hr>
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
      <div className="mb-5">
        <h3>Important Dates</h3>
        <hr />
        <Button
          variant="dark"
          className="btn-jobdash"
          onClick={() => addNewDate()}
        >
          Add New
        </Button>
      </div>
      <div className="mb-5">
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

      <h3>Notes</h3>
      <span className="text-success">{notesMsg}</span>
      <MyEditor
        content={applicationInfo.notes}
        setConvertedContent={setConvertedContent}
      />
      <div className="ms-auto w-100">
        <Button
          className="my-3"
          variant="danger"
          onClick={() => handleDeleteApplication(applicationId)}
        >
          Delete
        </Button>
        <Button
          variant="dark"
          className="btn-jobdash mx-2"
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
        <PreviewModal
          show={showModal}
          setShow={setShowModal}
          title={""}
          content={modalContent}
        />
      </div>
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
