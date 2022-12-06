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

//icons
import {
  MdCheckBox,
  MdCheckBoxOutlineBlank,
  MdEdit,
  MdDelete,
  MdSend,
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

  // const addJPId = useStore((state) => state.addJpId);
  // const addJPTitle = useStore((state) => state.addTitle);
  // const addJPLogoUrl = useStore((state) => state.addLogo_url);
  // const addJPLocation = useStore((state) => state.addLocation);
  // const addJPDescription = useStore((state) => state.addDescription);
  // const addJPDateCreated = useStore((state) => state.addDateCreated);
  // const addJPRemoteOption = useStore((state) => state.addRemoteOption);
  // const addJPEmployerId = useStore((state) => state.addEmployerId);
  // const addJPCompanyName = useStore((state) => state.addCompanyName);

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
      .get(`${process.env.REACT_APP_API_URL}/api/postings/${id}/`)
      .then((res) => {
        console.log(res);
        // addJPId(res.data.id);
        // addJPTitle(res.data.title);
        // //addJPLogoUrl(res.data.logo_url);
        // addJPLocation(res.data.location);
        // addJPDescription(res.data.description);
        // addJPDateCreated(res.data.date_created);
        // addJPRemoteOption(res.data.remote_option);
        // addJPEmployerId(res.data.employer_id);
        // addJPCompanyName(company);
        navigate("/jobapplicationform", { state: { ...res } });
        return;
      })
      .catch(() => {
        alert("Something wrong with aplying to Job posting");
      });
  };

  //on click event to open job description in a modal
  const previewJobDescription = (post) => {
    setModalContent(post.description);
    setModalTitle(post.title);
    setShowModal(true);
  };

  const renderListGroupItem = (t) => {
    return (
      <ListGroup.Item
        key={t.id}
        className="d-flex justify-content-between align-items-center"
      >
        <div className="d-flex justify-content-center">
          <span>
            {t.title} || {t.remote_option} || {t.company} ||
          </span>

          <p
            variant="primary"
            onClick={() => previewJobDescription(t)}
            style={{
              cursor: "pointer",
              marginRight: "12px",
            }}
          >
            <strong> Job Description</strong>
          </p>
        </div>
        {/* display crud only for owner of posts */}
        {uId === t.employer && (
          <>
            <div>
              <MdEdit
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
            <BsPersonLinesFill
              style={{
                cursor: "pointer",
              }}
              onClick={() => {
                navigate("/applicationForPosting", { state: { ...t } });
              }}
            />
          </>
        )}
        {uRole == "user" && (
          <div>
            <MdSend
              style={{
                cursor: "pointer",
              }}
              onClick={ () => {
                navigate("/jobapplicationform", { state: { ...t } });
                // await handleApply(t.id);
              }}
            />
          </div>
        )}
      </ListGroup.Item>
    );
  };

  const handleSaveChanges = async () => {
    record.description = convertedContent;
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
