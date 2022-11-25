import React from 'react'
import {Container, Row} from 'react-bootstrap'
import StudentCard from './StudentCard'

const StudentList = (props) => {
    const renderStudentCards = props.students && props.students?.map((student)=>{
        return(
            <Row>
                <StudentCard student={student}  key={student.id} deleteStudent = {props.deleteStudent}/>
            </Row>
        )
    })
  return (
    <Container className="mb-3">
        {renderStudentCards}
    </Container>
  )
}

export default StudentList