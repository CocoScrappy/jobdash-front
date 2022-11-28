import React, {useState, useRef, useEffect} from 'react'
import Layout from 'components/Layout'
import { Button, InputGroup, Form, Container } from 'react-bootstrap'

import {useStore} from 'store'


function JobApplicationForm() {

  return (

    <Layout title="JobApplicationForm" content="JobApplicationForm">
        <div>Job Application Form</div>
        <Container>
            <Form>
                <Form.Label>Company</Form.Label>
                <Form.Control type="text" placeholder="Company" disabled />
                <Form.Label>Job Title</Form.Label>
                <Form.Control type="text" placeholder="Job Title" className="" disabled/>
                
                <Form.Label>Notes</Form.Label>
                <Form.Control as="textarea" rows={3} />
                {/* Add CV selector */}
                
                <Button variant="primary" type="submit">
                  Apply
                </Button>
            </Form>
        </Container>
    </Layout>
  )
}

export default JobApplicationForm