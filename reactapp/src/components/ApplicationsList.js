import React from 'react'
import {Container, Row} from 'react-bootstrap'
import ApplicationCard from './ApplicationCard'

const ApplicationsList = (props) => {
    const renderApplicantCards = props.applicants && props.applicants.map((applicant)=>{
        return(
            <Row>
                <ApplicationCard applicant={applicant} key={applicant.id} handleAccept = {props.handleAccept} handleReject={props.handleReject} />
            </Row>
        )
    })
  return (
    <Container className="mb-2">
        {renderApplicantCards}
    </Container>
  )
}

export default ApplicationsList