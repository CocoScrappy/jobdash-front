import React, {useState} from 'react'
import Layout from 'components/Layout'
import { Button } from 'react-bootstrap'
import { InputGroup } from 'react-bootstrap'
import { FormControl } from 'react-bootstrap'
import { Form } from 'react-router-dom'

{/* FUNCTION: create job posting using the employer for external applications*/}



function JobApplicationForm() {
  return (
    <>
    <Layout title="JobApplicationForm" content="JobApplicationForm">
        <div>Job Application Form</div>
        <Container>
            <Form>
              <InputGroup className="mb-3">

                <Form.Label>Company</Form.Label>
                <Form.Control type="text" placeholder="Company" />
                <Form.Label>Job Title</Form.Label>
                <Form.Control type="text" placeholder="Job Title" />
                <Form.Label>Description</Form.Label>
                <Form.Control type="text" placeholder="Description" />
                <Form.Label>Location</Form.Label>
                <Form.Control type="text" placeholder="Location" />

                <Form.Label>Notes</Form.Label>
                <Form.Control type="text" placeholder="Notes" />

                {/* Add CV selector */}

                <Button variant="primary" type="submit">
                    Save External Application
                </Button>
              </InputGroup>
            </Form>
        </Container>
    </Layout>

    </>
  )
}

export default JobApplicationForm