import React from 'react'
import {useState, useEffect} from 'react'
import {Container, Row, Col, Button, Form} from 'react-bootstrap'
import CoursesList from '../components/CoursesList'
import {getCourses} from '../services/UserServices'
import { deleteCourse } from '../services/AdminServices'
import Base from '../components/Base'
import { getCurrentUserDetails } from '../auth'
import AddCourse from '../components/AddCourse'

const CoursesPage = () => {
    let userRole = getCurrentUserDetails().role
    const [courseList, setCourseList] = useState([])
    const [keyword, setKeyword] = useState("")
    const [searchedCourseList, setSearchedCourseList] = useState([])

    useEffect(()=>{
        getCourses()
        .then((response)=>{
            setCourseList(response)
        })
        .catch(error=>{
            if(error.response.status === 404){
                console.log(error)
                setCourseList([])
            }
            if(error.response.status === 401){
                console.log(error)
            }
        })
    }, [])

    const handleDeleteCourse=(courseId)=>{
        deleteCourse(courseId)
        .then((response)=>{
            const updateCourseList = courseList.filter(course=>course.id !== courseId)
            setCourseList(updateCourseList)
        })
        .catch(error=>{
            console.log(error)
        })
    }
    const handleSearch=()=>{
        if(keyword.length > 0){
            setSearchedCourseList(courseList.filter(course=>course.name.toLowerCase().includes(keyword.toLowerCase())))
        }
        
    }
  return (
    <Base>
        <Container>
                <h1>Courses</h1>
                <Container className="mx-5">
                    <Row>
                        <Col><Form.Control type="text" onChange={(event)=>setKeyword(event.target.value)} placeholder="search Course by Name ex: Computer Science"/></Col>
                        <Col><Button variant="outline-info" onClick={handleSearch}>Search</Button>
                        {" "}
                        {
                            userRole === 'ROLE_ADMIN' ? 
                                <AddCourse/>
                                :null
                        } 
                        </Col>  
                    </Row>
                </Container>
                {
                    courseList.length > 0 && (
                        keyword.length >0 ? (
                            <CoursesList courses = {searchedCourseList} deleteCourse={handleDeleteCourse}  />
                        )
                        :
                        (
                            <CoursesList courses = {courseList} deleteCourse={handleDeleteCourse}  />
                        )
                    )
                }
        </Container>
    </Base>
  )
}

export default CoursesPage