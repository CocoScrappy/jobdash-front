import React, { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import InputGroup from "react-bootstrap/InputGroup";
import FormControl from "react-bootstrap/FormControl";
import Form from "react-bootstrap/Form";
import axios from "axios";
import { format } from "date-fns";
import useStore from "store";

export default function JobpostingForm({ jobpostings, setJobpostings }) {
  const uRole = useStore((state) => state.addRole);
  const uId = useStore((state) => state.addId);
  const [success, setSuccess] = useState(false);
  const [formData, setFormData] = useState({});

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

    if (uRole === "employer") {
      formData.employer = uId;
    }
    formData.employer = 3; //FIXME: gotta be default internal Employer

    axios
      .post(`${process.env.REACT_APP_API_URL}/api/postings/`, formData)
      .then((res) => {
        const { data } = res;
        setJobpostings([...jobpostings, data]).catch(() => {
          alert("Something went wrong while calling database.");
        });
        //?
      });
    setSuccess(true);
  };

  return (
    <Form onSubmit={handleSubmit}>
      <InputGroup className="mb-4">
        <InputGroup.Text>Title</InputGroup.Text>
        <FormControl
          placeholder="enter title"
          onChange={handleChange}
          name="title"
          value={title}
          required
        />
      </InputGroup>
      <InputGroup className="mb-4">
        <InputGroup.Text>Logo Url</InputGroup.Text>
        <FormControl
          placeholder="ex. yourHosting/yourImage.ext"
          onChange={handleChange}
          name="logo_url"
          value={logo_url}
          required
        />
      </InputGroup>
      <InputGroup className="mb-4">
        <InputGroup.Text>Location</InputGroup.Text>
        <FormControl
          placeholder="ex. Montreal"
          onChange={handleChange}
          name="location"
          value={location}
          required
        />
      </InputGroup>
      <InputGroup className="mb-4">
        <InputGroup.Text>Description</InputGroup.Text>
        <FormControl
          placeholder="enter description"
          onChange={handleChange}
          name="description"
          value={description}
          required
        />
      </InputGroup>
      <InputGroup className="mb-4">
        <InputGroup.Text>Company Name</InputGroup.Text>
        <FormControl
          placeholder="enter Company Name"
          onChange={handleChange}
          name="company"
          value={company}
          required
        />
      </InputGroup>
      <InputGroup className="mb-4">
        <InputGroup.Text>Remote options</InputGroup.Text>
        <Form.Select
          aria-label="Default select example"
          onChange={handleChange}
          name="remote_option"
          value={remote_option}
          defaultValue={"#"}
          required
        >
          {/* make the first one unpickable but display first? */}
          <option disabled value="#">
            Pick one
          </option>
          <option value="remote">Remote</option>
          <option value="hybrid">Hybrid</option>
          <option value="in-person">In-Person</option>
        </Form.Select>
      </InputGroup>

      <InputGroup className="mb-4">
        <Button type="sumbit"> Add job posting</Button>
      </InputGroup>

      {success && <p>Hurray! yay! Success!</p>}
    </Form>
  );
}
