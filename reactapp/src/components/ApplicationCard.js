import React from 'react'
import {Container, Card, Col, Row, Button} from 'react-bootstrap'

const ApplicationCard = ({applicant, handleAccept, handleReject}) => {
    const {id, firstname, lastname, dob, email, sslc, hsc, course} = applicant
    const {institute} = course

    const Accept=()=>{
        const student = {...applicant, "eligibility" :"Accepted"}
        handleAccept(id, student)
    }
    const Reject=()=>{
        const student = {...applicant, "eligibility" :"Rejected"}
        handleReject(id, student)
    }
  return (
    <Container fluid className="my-5 border solid dark">
                <Card.Title>{firstname} {lastname}</Card.Title>
                <Row>
                    <Col>
                        <Card.Text className = "applicantInfo">
                            <b>Date Of Birth</b>: {dob.substring(0,10)}
                        </Card.Text>
                    </Col>
                    <Col>
                        <Card.Text className = "applicantInfo">
                        <b>Email</b> : {email} 
                        </Card.Text>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <Card.Text className = "applicantInfo">
                        <b>SSLC</b>: {sslc}
                        </Card.Text>
                    </Col>
                    <Col>
                        <Card.Text className = "applicantInfo">
                        <b>HSC</b> : {hsc} 
                        </Card.Text>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <Card.Text>
                            <b>Course Applied: </b> {course.name}
                        </Card.Text>
                    </Col>
                    <Col>
                        <Card.Text>
                            <b>Institute:</b> {institute.name}
                        </Card.Text>
                    </Col>
                </Row>

                <Container className="my-3">
                    <div className="d-grid gap-1">
                    <Row>
                        <Col sm={1}>
                            <Button variant="outline-primary" onClick={Accept}>Accept</Button>
                        </Col>
                        <Col>
                        <Button variant="outline-danger" onClick={Reject}>Reject</Button>
                        </Col>
                    </Row>  
                    </div>
                            
                </Container>           
            </Container>
  )
}

export default ApplicationCard