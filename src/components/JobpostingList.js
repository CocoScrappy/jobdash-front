import axios from "axios";
import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import userEvent from "@testing-library/user-event";

//react components
import ListGroup from "react-bootstrap/ListGroup";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import InputGroup from "react-bootstrap/InputGroup";
import FormControl from "react-bootstrap/FormControl";
import Form from "react-bootstrap/Form";
//zustand
import useStore from "store";
// custom components
import MyEditor from "components/MyEditor";
import PreviewModal from "./PreviewModal";
import Tag from "./Tag";
import SkeletonCards from "./SkeletonCards";

//css
// css
import "../css/layouts/CardGrid.css";
import "../css/components/Card.css";
import "../css/components/Button.css";

//icons
import {
  MdCheckBox,
  MdCheckBoxOutlineBlank,
  MdEdit,
  MdDelete,
} from "react-icons/md";
import { BsPersonLinesFill } from "react-icons/bs";

export default function JobpostingList({ jobpostings = [], setJobpostings }) {
  var uId = useStore((state) => state.id);
  var uRole = useStore((state) => state.role);

  const [show, setShow] = useState(false);
  const [record, setRecord] = useState(null);
  const [convertedContent, setConvertedContent] = useState("");

  const [showModal, setShowModal] = useState(false);
  const [modalContent, setModalContent] = useState("");
  const [modalTitle, setModalTitle] = useState("");

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
      .delete(`${process.env.REACT_APP_API_URL}/api/postings/${id}/`, {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("atoken"),
        },
      })
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
        value.record,
        {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("atoken"),
          },
        }
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

  //on click event to open job description in a modal
  const previewJobDescription = (post) => {
    setModalContent(post.description);
    setModalTitle(post.title);
    setShowModal(true);
  };

  const renderJobPostingCards = (t) => {
    // console.log("t is", t);
    return (
      <div
        key={t.id}
        className="p-4 card-job d-flex flex-column justify-content-between"
        style={{
          cursor: "pointer",
          background: "white",
          borderRadius: "8px",
        }}
        // onClick={() => previewJobDescription(t)}
        onClick={() => navigate("/jobapplicationform", { state: { ...t } })}
      >
        <div className="d-flex flex-column">
          {/* <img src={t.logo_url} /> */}
          <div className="d-flex justify-content-between align-items-center mb-3">
            <div
              style={{
                fontSize: "2rem",
                backgroundColor: "var(--color-dark-gray)",
                color: "white",
                width: "50px",
                height: "50px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                borderRadius: "50%",
              }}
            >
              <i className="bi bi-buildings" style={{ color: "inherit" }}></i>
            </div>
            <p className="m-0 small card-date">
              {new Date(t.date_created).toLocaleDateString()}
            </p>
          </div>
          <h3>{t.title}</h3>
          <p>{t.company}</p>
          <Tag tag={t.remote_option} />

          <p>{t.location}</p>
        </div>
        {/* display crud only for owner of posts */}
        {uId === t.employer && (
          <div
            style={{
              display: "flex",
              placeItems: "center",
              gap: 15,
            }}
          >
            <div
              style={{
                cursor: "pointer",
              }}
              onClick={() => {
                setRecord(t);
                setShow(true);
              }}
            >
              <h5>
                <MdEdit />
                Edit
              </h5>
            </div>
            <div
              style={{
                cursor: "pointer",
              }}
              onClick={() => {
                handleDelete(t.id);
              }}
            >
              <h5>
                <MdDelete />
                Delete
              </h5>
            </div>
            <div
              style={{
                cursor: "pointer",
              }}
              onClick={() => {
                navigate("/applicationForPosting", { state: { ...t } });
              }}
            >
              <h5>
                <BsPersonLinesFill />
                Applicants
              </h5>
            </div>
          </div>
        )}
        {uRole === "user" && (
          <Button
            variant="dark"
            className="btn-jobdash btn-change-text"
            // onClick={() => navigate("/jobapplicationform", { state: { ...t } })}
          >
            <i className="button-text-extra bi bi-send-fill"></i>
            <span className="button-text">Apply now </span>
          </Button>
        )}
      </div>
    );
  };

  const handleSaveChanges = async () => {
    record.description = convertedContent;
    await handleUpdate(record.id, { record });
    handleClose();
  };

  return (
    <div>
      <div className="card-grid">{jobpostings.map(renderJobPostingCards)}</div>
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
          <div className="mb-4">
            <p>Description</p>
            <MyEditor
              content={record ? record.description : ""}
              setConvertedContent={setConvertedContent}
            />
          </div>
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
      <PreviewModal
        show={showModal}
        setShow={setShowModal}
        title={modalTitle}
        content={modalContent}
      />
    </div>
  );
}
