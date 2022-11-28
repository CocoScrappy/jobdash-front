import React, {useState, useRef, useEffect} from 'react'
import { useLocation } from 'react-router-dom'
import Layout from 'components/Layout'
import { Button, InputGroup, Form, Container } from 'react-bootstrap'
import MyCVsPage from 'containers/MyCVsPage'

import {useStore} from 'store'


function JobApplicationForm({posting}) {

  const location = useLocation();

  return (

    <Layout title="JobApplicationForm" content="JobApplicationForm">
        <div>Job Application Form</div>
        <Container>
            <Form>
                <Form.Label>Company</Form.Label>
                <Form.Control type="text" placeholder="Company" disabled value={location.state.company} />
                <Form.Label>Job Title</Form.Label>
                <Form.Control type="text" placeholder="Job Title" className="" disabled value={location.state.title}/>
                
                <Form.Label>Notes</Form.Label>
                <Form.Control as="textarea" rows={3} />
                {/* Add CV selector <MyCVsPage/> */}
                
                <Button variant="primary" type="submit">
                  Apply
                </Button>
            </Form>
        </Container>
    </Layout>
  )
}

export default JobApplicationForm