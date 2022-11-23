import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import InputGroup from "react-bootstrap/InputGroup";
import FormControl from "react-bootstrap/FormControl";
import Form from "react-bootstrap/Form";
import axios from "axios";


export default function JobpostingForm({ jobpostings, setJobpostings }) {
  const [formData, setFormData ] = useState({
 // what info needs to be sent?
    title: '',
    logo_url: '',
    location: '',
    description: '',
    remote_option: ''
  });

  const { title, logo_url, location, description, remote_option } = formData;

  const handleChange = e => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  }

  const handleSubmit = e => {
    e.preventDefault();
    if (!formData) {
        alert("Please provide a valid value for jobposting");
        return;
    }

    axios.post("/api/jobpostings/", formData)
      .then((res) => {
        const { data } = res;
        setJobpostings([
            ...jobpostings,
            data
        ]).catch(() => {
            alert("Something went wrong while calling database.");
        })
        //handleClose() //?
    })

    
}

  return <Form onSubmit={handleSubmit}>
      <InputGroup className="mb-4">
      <InputGroup.Text>Title</InputGroup.Text>
        <FormControl placeholder="enter title"
          onChange={handleChange}
          name="title"
          value={title} />
      </InputGroup>
      <InputGroup className="mb-4">
      <InputGroup.Text>Logo Url</InputGroup.Text>
          <FormControl placeholder="ex. yourHosting/yourImage.ext"
          onChange={handleChange}
          name="logo_url"
          value={logo_url} />
      </InputGroup>
      <InputGroup className="mb-4">
      <InputGroup.Text>Location</InputGroup.Text>
          <FormControl placeholder="ex. Montreal"
          onChange={handleChange}
          name="location"
          value={location} />
      </InputGroup>
      <InputGroup className="mb-4">
      <InputGroup.Text>Description</InputGroup.Text>
          <FormControl placeholder="enter description"
          onChange={handleChange}
          name="description"
          value={description} />
      </InputGroup>
      <InputGroup className="mb-4">
      <InputGroup.Text>Remote options</InputGroup.Text>
        <Form.Select aria-label="Default select example">
          <option value="Remote">Remote</option>
          <option value="Hybrid">Hybrid</option>
          <option value="In-Person">In-Person</option>
        </Form.Select>
      </InputGroup>
      <InputGroup className="mb-4">
        <Button type="sumbit"> Add job posting</Button>
      </InputGroup>
  </Form>
}