import axios from "axios";
import React, { useState} from "react";
import { useNavigate } from "react-router-dom";
import ListGroup from "react-bootstrap/ListGroup";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import InputGroup from "react-bootstrap/InputGroup";
import FormControl from "react-bootstrap/FormControl";
import Form from "react-bootstrap/Form";
import {
  MdCheckBox,
  MdCheckBoxOutlineBlank,
  MdEdit,
  MdDelete,
  MdSend,
} from "react-icons/md";
import JobApplicationForm from "./JobApplicationForms/JobApplicationForm";
import { Link } from "react-router-dom";

export default function JobpostingList({ jobpostings = [], setJobpostings }) {
  const [show, setShow] = useState(false);
  const [record, setRecord] = useState(null);
  const navigate = useNavigate();

  // const {
  //   id,
  //   title,
  //   logo_url,
  //   location,
  //   description,
  //   remote_option,
  //   employer,
  // } = record;

  const handleChange = (e) => {
    setRecord({ ...record, [e.target.name]: e.target.value });
  };

  const handleClose = () => {
    setShow(false);
  };

  const handleDelete = (id) => {
    axios
      .delete(`${process.env.REACT_APP_API_URL}/api/postings/${id}/`)
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

  const handleUpdate = (id, value) => {
    console.log(value);
    axios
      .patch(
        `${process.env.REACT_APP_API_URL}/api/postings/default/${id}/`,
        value.record
      )
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

  const handleApply = async (id) => {
    return axios
      .get(`api/postings/${id}/`)
      .then((res) => {
        const { data } = res;
        return data;
        console.log(data);
      })
      .catch(() => {
        alert("Something wrong with aplying to Job posting");
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
            {t.title} || {t.description} || {t.remote_option} || {t.company}
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
        <div>
            <MdSend
              style={{
                cursor: "pointer",
              }}
              onClick={async () => {
                const posting = await handleApply(t.id);
                console.log(posting);
                navigate('/jobapplicationform',{state:{...posting}});
              }}
            />
        </div>
      </ListGroup.Item>
    );
  };

  const handleSaveChanges = async () => {
    await handleUpdate(record.id, { record });
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
          <InputGroup className="mb-4">
            <InputGroup.Text>Title</InputGroup.Text>
            <FormControl
              placeholder="enter title"
              onChange={handleChange}
              name="title"
              value={record ? record.title : ""}
            />
          </InputGroup>
          <InputGroup className="mb-4">
            <InputGroup.Text>Logo Url</InputGroup.Text>
            <FormControl
              placeholder="ex. yourHosting/yourImage.ext"
              onChange={handleChange}
              name="logo_url"
              value={record ? record.logo_url : ""}
            />
          </InputGroup>
          <InputGroup className="mb-4">
            <InputGroup.Text>Location</InputGroup.Text>
            <FormControl
              placeholder="ex. Montreal"
              onChange={handleChange}
              name="location"
              value={record ? record.location : ""}
            />
          </InputGroup>
          <InputGroup className="mb-4">
            <InputGroup.Text>Description</InputGroup.Text>
            <FormControl
              placeholder="enter description"
              onChange={handleChange}
              name="description"
              value={record ? record.description : ""}
            />
          </InputGroup>
          <InputGroup className="mb-4">
            <InputGroup.Text>Company Name</InputGroup.Text>
            <FormControl
              placeholder="enter Company Name"
              onChange={handleChange}
              name="company"
              value={record ? record.company : ""}
            />
          </InputGroup>
          <InputGroup className="mb-4">
            <InputGroup.Text>Remote options</InputGroup.Text>
            <Form.Select
              aria-label="Default select example"
              onChange={handleChange}
              name="remote_option"
              value={record ? record.remote_option : ""}
            >
              <option value="remote">Remote</option>
              <option value="hybrid">Hybrid</option>
              <option value="in-person">In-Person</option>
            </Form.Select>
          </InputGroup>
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
