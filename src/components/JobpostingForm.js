import React, { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";

import FormControl from "react-bootstrap/FormControl";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import MyEditor from "components/MyEditor";
import axios from "axios";
import { format } from "date-fns";
import useStore from "store";
import parse from "html-react-parser";

export default function JobpostingForm({ jobpostings, setJobpostings }) {
  var uId = useStore((state) => state.id);
  var uRole = useStore((state) => state.role);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(false);
  const [formData, setFormData] = useState({});
  const [errors, setErrors] = useState({});
  const [convertedContent, setConvertedContent] = useState("");

  const {
    id,
    title,
    logo_url,
    location,
    description,
    company,
    remote_option,
    employer,
  } = formData;

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    console.log(formData);
    if (!formData) {
      alert("Please provide a valid value for jobposting");
      return;
    }
    formData.description = convertedContent;
    if (uRole === "employer") {
      formData.employer = uId;
    } else {
      formData.employer = 14; //14 will be default internal Employer
    }

    axios
      .post(`${process.env.REACT_APP_API_URL}/api/postings/`, formData)
      .then((res) => {
        const { data } = res;
        setErrors({});
        setJobpostings([...jobpostings, data]);
        setSuccess(true);
        setError(false);
      })
      .catch(function (e) {
        if (e.response !== null) {
          setErrors({ ...errors, ...e.response.data });
          setError(true);
          setSuccess(false);
        } else {
          alert("Something went wrong while calling database.");
        }
      });
    //make sure this works since changing parentesis near catch?
  };

  return (
    <Form onSubmit={handleSubmit}>
      <InputGroup className="mb-4">
        <InputGroup.Text>Title</InputGroup.Text>
        <Form.Control
          placeholder="enter title"
          onChange={handleChange}
          isInvalid={!!errors.title}
          name="title"
          value={title}
        />
        <Form.Control.Feedback type="invalid">
          {errors.title}
        </Form.Control.Feedback>
      </InputGroup>
      <InputGroup className="mb-4">
        <InputGroup.Text>Logo Url</InputGroup.Text>
        <Form.Control
          placeholder="ex. yourHosting/yourImage.ext"
          onChange={handleChange}
          isInvalid={!!errors.logo_url}
          name="logo_url"
          value={logo_url}
        />
        <Form.Control.Feedback type="invalid">
          {errors.logo_url}
        </Form.Control.Feedback>
      </InputGroup>
      <InputGroup className="mb-4">
        <InputGroup.Text>Location</InputGroup.Text>
        <Form.Control
          placeholder="ex. Montreal"
          onChange={handleChange}
          isInvalid={!!errors.location}
          name="location"
          value={location}
        />
        <Form.Control.Feedback type="invalid">
          {errors.location}
        </Form.Control.Feedback>
      </InputGroup>
      {/* <InputGroup className="mb-4">
        <InputGroup.Text>Description</InputGroup.Text>
        <FormControl
          placeholder="enter description"
          onChange={handleChange}
          name="description"
          value={description}
          required
        />
      </InputGroup> */}
      <InputGroup className="mb-4">
        <InputGroup.Text>Company Name</InputGroup.Text>
        <Form.Control
          placeholder="enter Company Name"
          onChange={handleChange}
          isInvalid={!!errors.company}
          name="company"
          value={company}
        />
        <Form.Control.Feedback type="invalid">
          {errors.company}
        </Form.Control.Feedback>
      </InputGroup>
      <InputGroup className="mb-4">
        <InputGroup.Text>Remote options</InputGroup.Text>
        <Form.Select
          aria-label="Default select example"
          onChange={handleChange}
          isInvalid={!!errors.remote_option}
          name="remote_option"
          value={remote_option}
          defaultValue={"#"}
        >
          {/* make the first one unpickable but display first? */}
          <option disabled value="#">
            Pick one
          </option>
          <option value="remote">Remote</option>
          <option value="hybrid">Hybrid</option>
          <option value="in-person">In-Person</option>
        </Form.Select>
        <Form.Control.Feedback type="invalid">
          {errors.remote_option}
        </Form.Control.Feedback>
      </InputGroup>
      <InputGroup className="mb-4">
        <InputGroup.Text isInvalid={!!errors.description}>
          Description
        </InputGroup.Text>
        <MyEditor content={""} setConvertedContent={setConvertedContent} />
      </InputGroup>
      <Form.Control.Feedback type="invalid">
        {errors.description}
      </Form.Control.Feedback>

      <InputGroup className="mb-4">
        <Button type="sumbit"> Add job posting</Button>
      </InputGroup>
      {error && <p>Oh noes! Something's wrong!</p>}
      {success && <p>Hurray! yay! Success!</p>}
    </Form>
  );
}
