import Layout from 'components/Layout'
import JobApplicationDetails from 'components/JobApplicationDetails'
import { Container } from 'react-bootstrap'



function JobApplicationInfoPage() {

  return (

    <Layout title="Job Application Details" content="JobApplication">
        <div>Job Application</div>
        <div>Submenu</div>
        <div>Search Bar</div>
        <Container>
            <JobApplicationDetails 
            />
        </Container>
    </Layout>

  )
}

export default JobApplicationInfoPage