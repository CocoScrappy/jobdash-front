import React, {useState} from 'react'
import Layout from 'components/Layout'
import JobApplicationList from 'components/JobApplicationList/JobApplicationList'
import { Container } from 'react-bootstrap'



function JobApplications() {

  const [jobApplications, setJobApplications] = useState([]);


  return (

    <Layout title="JobApplications" content="JobApplications">
        <div>Job Applications</div>
        <div>Submenu</div>
        <div>Search Bar</div>
        <Container>
            <JobApplicationList 
              jobApplications={jobApplications}
              setJobApplications={setJobApplications}
            />
        </Container>
    </Layout>

  )
}

export default JobApplications