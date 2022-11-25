import {React, useState, useEffect} from 'react'
import { getCurrentUserDetails } from '../auth'
import { mycourses } from '../services/UserServices'
import Base from '../components/Base'
import { Container } from 'react-bootstrap'
import MyCourseList from '../components/MyCourseList'

const MyCourses = () => {
    const [myCourses, setMyCourses] = useState([])
    const user = getCurrentUserDetails();

    useEffect(()=>{
        mycourses(user)
        .then(response=>{
            setMyCourses(response)
        })
        .catch(error=>{
            console.log(error)
        })
    }, [])
    
  return (
        <Base>
            <Container>
                <h1>My Courses</h1>
                {
                    myCourses.length !== 0?
                    <MyCourseList courseApplications = {myCourses}/>                  
                    :                   
                    <h2>You have not enrolled in any course!!</h2>
                    
                }
            </Container>
        </Base>
  )
}

export default MyCourses