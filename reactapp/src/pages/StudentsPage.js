import React ,{useState, useEffect}from 'react'
import {Container, Row, Col, Button, Form} from 'react-bootstrap'
import StudentList from '../components/StudentList'
import { getStudents, deleteStudent } from '../services/AdminServices'
import Base from '../components/Base'
import { toast } from 'react-toastify'
import AddStudent from '../components/AddStudent'

const StudentsPage = () => {
    const [studentsList, setStudentsList] = useState([])
    const [keyword, setKeyword] = useState("")
    const [searchedStudentList, setSearchedStudentList] = useState([])

    useEffect(()=>{
        getStudents()
        .then((response)=>{
            const list=response
            setStudentsList(list)
        })
        .catch(error=>{
            console.log(error)
        })

        // clean up function: if user moves away from the page before the list if loaded from the api
        // return ()=>{
        //     controller.abort()
        // }
    }, [])

    const handleDeleteStudent=(studentId)=>{
        deleteStudent(studentId)
        .then((response)=>{
            const updateStudentList = studentsList.filter(student=>student.id !== studentId)
            setStudentsList(updateStudentList)
            toast.success("Student Deleted", {pauseOnHover:false, hideProgressBar:true, autoClose:100})
        })
        .catch(error=>{
            toast.error(error.response.message);
        })
    }
    const handleSearch=()=>{
        if(keyword.length > 0){
           setSearchedStudentList(studentsList.filter(student=>student.firstname.toLowerCase().includes(keyword.toLowerCase()) || student.lastname.toLowerCase().includes(keyword.toLowerCase())))
        }
    }
  return (
    <Base>
        <Container>
                <h1>Students</h1>
                <Container className="mx-5">
                    <Row>
                        <Col><Form.Control type="text" onChange={(event)=>setKeyword(event.target.value)} placeholder="search Student by Name ex: Sachin"/></Col>
                        <Col><Button variant="outline-info" onClick={handleSearch}>Search</Button> 
                        {" "}
                        <AddStudent/>
                        </Col> 
                    </Row>
                </Container>
                {
                    studentsList.length > 0 && (
                        keyword.length >0 ? (
                            <StudentList students = {searchedStudentList} deleteStudent={handleDeleteStudent}  />
                        )
                        :
                        (
                            <StudentList students = {studentsList}  deleteStudent={handleDeleteStudent}  />
                        )
                    )
                }
        </Container>
    </Base>
  )
}

export default StudentsPage