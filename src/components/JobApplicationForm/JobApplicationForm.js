import React, {useState} from 'react'
import Layout from 'components/Layout'
import { Button } from 'react-bootstrap'
import { InputGroup } from 'react-bootstrap'
import { FormControl } from 'react-bootstrap'
import { Form } from 'react-router-dom'

function JobApplicationForm() {
  return (
    <>
    <Layout title="JobApplicationForm" content="JobApplicationForm">
        <div>Job Application Form</div>
        <Container>
            <Form>
              <InputGroup className="mb-3">
                <Form.Label>Company</Form.Label>
                <Form.Control type="text" placeholder="Company" disabled />
                <Form.Label>Job Title</Form.Label>
                <Form.Control type="text" placeholder="Job Title" disabled/>
                
                <Form.Label>Notes</Form.Label>
                <Form.Control type="text" placeholder="Notes" />

                {/* Add CV selector */}
                
                <Button variant="primary" type="submit">
                  Apply
                </Button>
              </InputGroup>
            </Form>
        </Container>
    </Layout>

    </>
  )
}

export default JobApplicationForm