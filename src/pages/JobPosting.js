import { useState, useEffect } from "react";
import Container from "react-bootstrap/Container";
import JobpostingList from "../components/JobpostingList";
import JobpostingForm from "../components/JobpostingForm";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { MdEdit } from "react-icons/md";
import axios from "axios";

export const JobPosting = () => {
  const [jobpostings, setJobpostings] = useState([]);
  const [token, setToken] = useState("");
  const [me, setMe] = useState({});

  const { first_name, email } = me;

  const [showAdd, setShowAdd] = useState(false);

  const handleCloseAdd = () => {
    setShowAdd(false);
  };

  useEffect(() => {
    axios
      .get("/api/postings/default") //FIXME : trailing / ?
      .then((res) => {
        setJobpostings(res.data);
      })
      .catch(() => {
        alert("Something went wrong fetching the list of job postings.");
      });
    const access = getToken();
  }, []);

  const getToken = async () => {
    const body = JSON.stringify({
      email: "easyeasy@gmail.com",
      password: "Qwert1234!",
    });

    const tokenResp = await fetch("/api/token/", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body,
    });
    const token = await tokenResp.json();
    getUser(token.access);
  };

  const getUser = async (access) => {
    const userResp = await fetch("/api/me", {
      method: "GET",

      headers: {
        Accept: "application/json",
        Authorization: `Bearer ${access}`,
      },
    });
    const user = await userResp.json();
    setMe(await user);
  };

  return (
    <Container>
      <div>JobPosting</div>
      {/* Modal to add job posting form */}
      <div>
        <MdEdit
          style={{
            cursor: "pointer",
            marginRight: "12px",
          }}
          onClick={() => {
            setShowAdd(true);
          }}
        />
      </div>
      <Modal show={showAdd} onHide={handleCloseAdd}>
        <Modal.Header closeButton>
          <Modal.Title>Add Jobposting</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <JobpostingForm
            jobpostings={jobpostings}
            setJobpostings={setJobpostings}
            name={first_name}
            email={email}
          />
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseAdd}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
      {/* Listing jobs */}
      <JobpostingList
        jobpostings={jobpostings}
        setJobpostings={setJobpostings}
      />
    </Container>
  );
};
export default JobPosting;
