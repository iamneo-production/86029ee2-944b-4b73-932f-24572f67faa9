import React from 'react'
import {Container, Card, Col, Row, Button, Stack} from 'react-bootstrap'
import { EditStudent } from './EditStudent'

const StudentCard = (props) => {
    const {student} = props
    const {id, firstname, lastname,address, dob, email, mobile, course} = student
    const {institute} = course

    const handleDeleteStudent=(id)=>{
        return props.deleteStudent(id)
    }   
  return (
            <Container fluid className="my-5 border solid dark">
                <Card.Title>{firstname} {lastname}</Card.Title>
                <Row>
                    <Col sm={3}>
                        <Card.Text className = "studentInfo">
                            Date Of Birth: {dob.substring(0,10)}
                        </Card.Text>
                    </Col>
                    <Col sm={4}>
                        <Card.Text className = "studentInfo">
                            Email : {email} 
                        </Card.Text>
                    </Col>
                    <Col sm={3}>
                        <Card.Text className="studentInfo">
                            Contact: {mobile}
                        </Card.Text>
                    </Col>
                    <Col sm={2}>
                        <Stack  direction="vertical" gap={3}>
                                <Button variant="outline-danger" onClick={()=>handleDeleteStudent(id)}>Delete</Button>
                                <EditStudent studentInfo={props.student}/>    
                        </Stack>
                    </Col>
                </Row>
                <Row>
                <Col sm={5}>
                        <Card.Text className = "studentInfo">
                           <b>Address</b>: {address}
                        </Card.Text>
                    </Col>
                </Row>
                <Row>
                    <Col sm={4}>
                        <Card.Text className="courseInfo">
                            <b>Course</b>: {course.name}
                        </Card.Text>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <Card.Text className="courseInfo">
                            <b>Institute</b>: {institute.name}
                        </Card.Text>
                    </Col>
                </Row>
                           
            </Container>
  )
}

export default StudentCard