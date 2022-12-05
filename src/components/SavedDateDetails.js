import React, { useState, useEffect } from "react";
import {
  postNewDate,
  updateSavedDate,
  deleteSavedDate,
} from "../helpers/Utils";
import { Modal } from "react-bootstrap";
import parse from "html-react-parser";
import MyEditor from "./MyEditor";
import { Button, Form, FloatingLabel } from "react-bootstrap";
import axios from "axios";
import { format, parseISO } from "date-fns";

const SavedDateDetails = (props) => {
  const [dateInfo, setDateInfo] = useState(props.dateInfo);
  const [convertedContent, setConvertedContent] = useState("");
  const [updateResponseMsg, setUpdateResponseMsg] = useState("");

  const minDate = format(new Date(), "yyyy-MM-dd'T'HH:mm");

  useEffect(() => {
    setDateInfo({ ...dateInfo, notes: convertedContent });
  }, [convertedContent]);

  const saveUpdatedStatus = () => {
    setUpdateResponseMsg("");

    if (dateInfo.id === undefined) {
      postNewDate({
        dateInfo: dateInfo,
        dataSetter: setDateInfo,
        parentSetter: props.setApplicationInfo,
        parentObject: props.applicationInfo,
        msgSetter: setUpdateResponseMsg,
      });
    } else {
      updateSavedDate({
        dateId: dateInfo.id,
        dateInfo: dateInfo,
        msgSetter: setUpdateResponseMsg,
        applicationInfo: props.applicationInfo,
        setApplicationInfo: props.setApplicationInfo,
      });
    }
  };

  const handleDelete = (dateId) => {
    const confirmed = window.confirm("Are you sure you want to delete?");
    if (confirmed) {
      deleteDate(dateId);
    }
  };

  const deleteDate = (dateId) => {
    deleteSavedDate(dateId);
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
          value={dateInfo.name}
          placeholder="Title"
          onChange={(event) => {
            setDateInfo({
              ...dateInfo,
              name: event.target.value,
            });
          }}
        />
        <Form.Control
          type="datetime-local"
          className="ms-3"
          value={
            dateInfo.datetime
              ? format(parseISO(dateInfo.datetime), "yyyy-MM-dd'T'HH:mm")
              : ""
          }
          min={minDate}
          onChange={(event) => {
            setDateInfo({
              ...dateInfo,
              datetime: event.target.value,
            });
          }}
        />
      </Modal.Header>
      <Modal.Body>
        <MyEditor
          content={dateInfo.notes}
          setConvertedContent={setConvertedContent}
        />
        <Button
          onClick={() => {
            saveUpdatedStatus();
          }}
        >
          {dateInfo.id === undefined ? "Create" : "Save Changes"}
        </Button>
        {dateInfo.id === undefined ? (
          <></>
        ) : (
          <Button
            variant="danger"
            className="mx-3"
            onClick={() => {
              handleDelete(dateInfo.id);
            }}
          >
            Delete Date
          </Button>
        )}
      </Modal.Body>
    </Modal>
  );
};

export default SavedDateDetails;
