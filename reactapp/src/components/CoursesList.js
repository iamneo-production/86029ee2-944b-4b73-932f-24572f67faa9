import React from 'react'
import {Container, Row} from 'react-bootstrap'
import CourseCard from './CourseCard'

const CoursesList = (props) => {
    const renderCourseCards = props.courses && props.courses.map((course)=>{
        return(
            <Row>
                <CourseCard course={course}   deleteCourse = {props.deleteCourse} key= {course.id}/>
            </Row>
        )
    })
  return (
    <Container className="mb-3">
        {renderCourseCards}
    </Container>
  )
}

export default CoursesList