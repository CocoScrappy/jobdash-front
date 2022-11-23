import { useState, useEffect } from 'react'
import Container from "react-bootstrap/Container";
import JobpostingList from "../components/JobpostingList";
import JobpostingForm from "../components/JobpostingForm";
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { MdEdit } from "react-icons/md";
import axios from "axios";


export const JobPosting = () => {
  const [jobpostings, setJobpostings] = useState([]);

  const [showAdd, setShowAdd ] = useState(false);


  const handleCloseAdd = () => {
    setShowAdd(false);
  }

  useEffect(() => {
    axios.get("/api/postings/default") //FIXME : trailing / ?
    .then((res) => {
      setJobpostings(res.data)
    }).catch(() => {
      alert("Something went wrong fetching the list of job postings.");
    })
  }, [])
  return (
    <Container>
      <div>JobPosting</div>
      {/* Modal to add job posting form */}
      <div>
            <MdEdit style={{
                cursor: "pointer",
                marginRight: "12px"
            }} onClick={() => {
                setShowAdd(true);
             }} />
      </div>
      <Modal show={showAdd} onHide={handleCloseAdd}>
        <Modal.Header closeButton>
          <Modal.Title>Add Jobposting</Modal.Title>
        </Modal.Header>
        <Modal.Body>
        <JobpostingForm jobpostings={jobpostings} setJobpostings={setJobpostings} />
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary"
            onClick={handleCloseAdd}>
              Close
          </Button>
        </Modal.Footer>
      </Modal>
      {/* Listing jobs */}
      <JobpostingList jobpostings={jobpostings} setJobpostings={setJobpostings} />
    </Container>
  )
}
export default JobPosting;