import React from 'react'
import {Container, Card, Col, Row, Button} from 'react-bootstrap'
import AdmissionApply from './AdmissionApply'
import { getCurrentUserDetails } from '../auth'
import { EditCourse } from './EditCourse'

const CourseCard = ({course, deleteCourse }) => {
    const {id, name, description, duration, institute} =course
    const role = getCurrentUserDetails().role
    console.log(course)
    const handleDeleteCourse=(courseId)=>{
        return deleteCourse(courseId)
    }
  return (
    <Container fluid className="my-5 border solid dark">    
        <Card.Title>Diploma in {name}</Card.Title>
        <Card.Subtitle>By {institute.name}</Card.Subtitle>
        <Row>
            <Col sm={7}>
                <Card.Text className = "courseInfo">
                    {description}
                </Card.Text>
            </Col>
            <Col>
                <Card.Text className = "courseInfo">
                    Duration : {duration} Semester
                </Card.Text>
            </Col>
            <Col sm={2}>
                {
                        role === "ROLE_USER" ?
                        (
                            <AdmissionApply course={course}/>
                        )
                    
                        :

                        (
                            <Container className = "my-3">
                                <div className="d-grid gap-1">
                                    <Row>
                                        <Button variant="outline-danger" onClick={()=>handleDeleteCourse(id)}>Delete</Button>
                                    </Row>
                                    <Row>
                                        <EditCourse courseId={id} courseInfo={course}/>
                                    </Row>   
                                </div>
                            </Container>
                        )  
                }
            </Col>
        </Row>              
    </Container>
  )
}

export default CourseCard