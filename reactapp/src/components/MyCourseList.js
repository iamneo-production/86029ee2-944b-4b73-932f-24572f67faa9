import React from 'react'
import {Container, Row} from 'react-bootstrap'
import MyCourseCard from './MyCourseCard'

const MyCourseList = (props) => {
    const renderCourseCards = props.courseApplications && props.courseApplications.map((courseApplication)=>{
        return(
            <Row>
                <MyCourseCard appDetails={courseApplication} handleDelete={props.handleDelete}  key={courseApplication.id}/>
            </Row>
        )
    })
  return (
    <Container className="mb-3">
        {renderCourseCards}
    </Container>
  )
}

export default MyCourseList