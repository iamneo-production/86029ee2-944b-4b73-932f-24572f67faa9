import React from 'react'
import { Card, Container, Badge, ListGroup, ListGroupItem, Col, Image, Row } from 'react-bootstrap'
import Base from './Base' 
import gatewayToCollege from '../images/gatewayToCollege.jpg'

const UserDashBoard = () => {
  return (
    <Base>
    <Container fluid className="container" style={{height: '100%', overflow: 'hidden'}}>
        <Row>
          <Col sm={8}>
            <Container className="my-3 mx-3" style={{height: "100%"}}>
                <Card border="light">
                    <Card.Body>
                      <Card.Title>Welcome to Easy Apply</Card.Title>
                      <Card.Subtitle>A platform to apply to the best institutes</Card.Subtitle>
                      <Card.Text>
                        We connect you to the best insitutes that the country gives.
                      </Card.Text>
                      <Card.Text>
                        No Paper Work, No physical appearance, everything online.
                      </Card.Text>
                      <Card.Text>
                      Just apply and Begin your journey for education with <Badge bg="success">Easy Apply</Badge> .
                      </Card.Text>
                      <Card>
                        <ListGroup>
                          <ListGroupItem>To browse through the courses , just click on <b>Courses</b> on the Navigation Bar above</ListGroupItem>

                          <ListGroupItem>To browse through Institutes, just click on <b>Institutes</b> on the Navigation Bar above</ListGroupItem>
                          
                          <ListGroupItem>To enroll in courses, just click on <b>Courses</b> on the Navigation Bar above</ListGroupItem> 
                        </ListGroup>    
                      </Card>
                    </Card.Body>
                </Card>
            </Container>
          </Col>
          <Col sm={2}>
            <Image src={gatewayToCollege} alt="CollegeImage" style={{height:"70%"}}/>
          </Col>
        </Row>
      </Container>
    </Base>
  )
}

export default UserDashBoard