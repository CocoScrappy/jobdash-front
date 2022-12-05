import React, { useState, useEffect } from "react";
import { getSavedDateInfo } from "../helpers/Utils";
import { Modal } from "react-bootstrap";
import parse from "html-react-parser";
import MyEditor from "./MyEditor";
import { Button, Form, FloatingLabel } from "react-bootstrap";
import axios from "axios";
import { format, parseISO } from "date-fns";

const SavedDateDetails = (props) => {
  const [savedDateInfo, setSavedDateInfo] = useState(props.savedDateInfo);
  const [convertedContent, setConvertedContent] = useState("");
  const [updateResponseMsg, setUpdateResponseMsg] = useState("");

  const minDate = format(new Date(), "yyyy-MM-dd'T'HH:mm");

  useEffect(() => {
    setSavedDateInfo({ ...savedDateInfo, notes: convertedContent });
  }, [convertedContent]);

  const saveUpdatedStatus = () => {
    setUpdateResponseMsg("");
    // setSavedDateInfo({ ...savedDateInfo, notes: convertedContent });
    console.log(savedDateInfo);
    axios
      .put(
        `${process.env.REACT_APP_API_URL}/api/dates/${savedDateInfo.id}/`,
        savedDateInfo,
        {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("atoken"),
          },
        }
      )
      .then((response) => {
        setUpdateResponseMsg(
          "Successfully updated on: " +
            format(new Date(), "MMM dd, yyyy, h:mm:ss aa")
        );
        let newApplicationDates = props.applicationInfo.saved_dates.map(
          (date) => {
            console.log(date.id === savedDateInfo.id);
            if (date.id === savedDateInfo.id) {
              return savedDateInfo;
            }
            return date;
          }
        );
        console.log(newApplicationDates);
        props.setApplicationInfo({
          ...props.applicationInfo,
          saved_dates: newApplicationDates,
        });
        console.log(props.applicationInfo);
      })
      .catch((error) => {
        console.log(error);
        if (error.response) {
          console.log(error);
        }
      });
  };

  const handleDelete = () => {
    const confirmed = window.confirm("Are you sure you want to delete?");
    if (confirmed) {
      deleteDate();
    }
  };

  const deleteDate = () => {
    window.alert("deleted");
    props.onHide();
    // axios
    //   .delete(
    //     `${process.env.REACT_APP_API_URL}/api/dates/${savedDateInfo.id}/`,
    //     {
    //       headers: {
    //         Authorization: "Bearer " + localStorage.getItem("atoken"),
    //       },
    //     }
    //   )
    //   .then((response) => {
    //     window.location.reload(false);
    //   })
    //   .catch((error) => {
    //     console.log(error);
    //     if (error.response) {
    //       console.log(error);
    //     }
    //   });
  };

  return (
    <Modal
      size="lg"
      show={props.show}
      onHide={() => props.onHide()}
      aria-labelledby="cv-preview"
    >
      <p className="text-success mx-3 mt-3">{updateResponseMsg}</p>
      <Modal.Header closeButton>
        <Form.Control
          // type="text"
          value={savedDateInfo.name}
          placeholder="Title"
          onChange={(event) => {
            setSavedDateInfo({
              ...savedDateInfo,
              name: event.target.value,
            });
          }}
        />
        <Form.Control
          type="datetime-local"
          className="ms-3"
          value={format(parseISO(savedDateInfo.datetime), "yyyy-MM-dd'T'HH:mm")}
          min={minDate}
          onChange={(event) => {
            setSavedDateInfo({
              ...savedDateInfo,
              datetime: event.target.value,
            });
          }}
        />
      </Modal.Header>
      <Modal.Body>
        <MyEditor
          content={savedDateInfo.notes}
          setConvertedContent={setConvertedContent}
        />
        <Button
          onClick={() => {
            saveUpdatedStatus();
          }}
        >
          Save Changes
        </Button>
        <Button
          variant="danger"
          className="mx-3"
          onClick={() => {
            handleDelete();
          }}
        >
          Delete Date
        </Button>
      </Modal.Body>
    </Modal>
  );
};

export default SavedDateDetails;
