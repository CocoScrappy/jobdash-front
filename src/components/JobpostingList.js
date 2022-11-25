import axios from "axios";
import React, { useState } from "react";
import ListGroup from "react-bootstrap/ListGroup";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import FormControl from "react-bootstrap/FormControl";
import {
  MdCheckBox,
  MdCheckBoxOutlineBlank,
  MdEdit,
  MdDelete,
} from "react-icons/md";

export default function JobpostingList({ jobpostings = [], setJobpostings }) {
  const [show, setShow] = useState(false);
  const [record, setRecord] = useState(null);

  const handleClose = () => {
    setShow(false);
  };

  const handleDelete = (id) => {
    axios
      .delete(`api/Jobpostings/${id}/`)
      .then(() => {
        const newJobpostings = jobpostings.filter((t) => {
          return t.id !== id;
        });
        setJobpostings(newJobpostings);
      })
      .catch(() => {
        alert("Something wrong when deleting Job posting id " + id);
      });
  };

  const handleUpdate = async (id, value) => {
    return axios
      .patch(`api/Jobpostings/${id}/`, value)
      .then((res) => {
        const { data } = res;
        const newJobpostings = jobpostings.map((t) => {
          if (t.id === id) {
            return data;
          }
          return t;
        });
        setJobpostings(newJobpostings);
      })
      .catch(() => {
        alert("Something wrong with updating Job posting");
      });
  };

  const renderListGroupItem = (t) => {
    return (
      <ListGroup.Item
        key={t.id}
        className="d-flex justify-content-between align-items-center"
      >
        <div className="d-flex justify-content-center">
          <span>
            {t.title} || {t.description} || {t.remote_option}
          </span>
        </div>
        <div>
          <MdEdit
            style={{
              cursor: "pointer",
              marginRight: "12px",
            }}
            onClick={() => {
              setRecord(t);
              setShow(true);
            }}
          />
        </div>
        <div>
          <MdDelete
            style={{
              cursor: "pointer",
            }}
            onClick={() => {
              handleDelete(t.id);
            }}
          />
        </div>
      </ListGroup.Item>
    );
  };

  const handleSaveChanges = async () => {
    await handleUpdate(record.id, { name: record.name });
    handleClose();
  };

  return (
    <div>
      <ListGroup>{jobpostings.map(renderListGroupItem)}</ListGroup>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Edit Jobposting</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <FormControl value={record ? record.name : ""} />
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleSaveChanges}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}
