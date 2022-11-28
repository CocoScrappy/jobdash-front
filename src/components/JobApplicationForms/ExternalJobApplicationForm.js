import React, {useState} from 'react'
import Layout from 'components/Layout'
import { Button, InputGroup, Form, Container } from 'react-bootstrap'


{/* FUNCTION: create job posting using the employer for external applications*/}



function ExternalJobApplicationForm() {
  return (
    <Layout title="ExternalJobApplicationForm" content="ExternalJobApplicationForm">
        <div>External Job Application Form</div>
        <Container>
            <Form>
                <Form.Label>Company</Form.Label>
                <Form.Control type="text" placeholder="Company" />
                <Form.Label>Job Title</Form.Label>
                <Form.Control type="text" placeholder="Job Title" />
                <Form.Label>Description</Form.Label>
                <Form.Control type="text" placeholder="Description" />
                <Form.Label>Location</Form.Label>
                <Form.Control type="text" placeholder="Location" />

                <Form.Label>Notes</Form.Label>
                <Form.Control as="textarea" rows={3} />

                {/* Add CV selector */}

                <Button variant="primary" type="submit">
                    Save External Application
                </Button>
            </Form>
        </Container>
    </Layout>
  )
}

export default ExternalJobApplicationForm