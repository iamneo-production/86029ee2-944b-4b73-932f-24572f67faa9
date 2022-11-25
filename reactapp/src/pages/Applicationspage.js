import React, { useState, useEffect } from 'react'
import { Container, Row, Col, Form, Button } from 'react-bootstrap';
import Base from '../components/Base';
import { editStudent, getApplications } from '../services/AdminServices';
import { toast } from 'react-toastify'
import ApplicationsList from '../components/ApplicationsList';

const Applicationspage = () => {
    const [appList, setAppList] = useState([])
    const [keyword, setKeyword] = useState("")
    const [searchedApplicant, setSearchedApplicant] = useState([])
    

    useEffect(()=>{
        if(appList.length === 0){
            getApplications()
            .then((response)=>{
                const applications = response;
                console.log("response from the backend: ", response)
                
                setAppList(applications)
                console.log("After setState: ", appList)
            
            })
            .catch(error=>{
                console.log(error)
            })
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    const handleAccept=(id, student)=>{
        console.log(student)
        editStudent(id, student).then((response)=>{
            toast.success("Student Application Accepted")
            const applicants = appList.filter(applicant=> applicant.id !== id)
            setAppList(applicants)
        })
        .catch(error=>{
            console.log(error)
        })
    }

    const handleReject=(id, student)=>{ 
        console.log(student)
        editStudent(id, student)
        .then(response=>{
            toast.success("Student Application Rejected")
            const applicants = appList.filter(applicant=> applicant.id !== id)
            setAppList(applicants)
        })
        .catch(error=>{
            console.log(error)
        })
    }
    const handleSearch=()=>{
        if(keyword.length > 0){
            setSearchedApplicant(appList.filter(applicant=>applicant.firstname.toLowerCase().includes(keyword.toLowerCase()) || applicant.lastname.toLowerCase().includes(keyword.toLowerCase())))
        }
    }
  return (
    <Base>
        <Container>
            <h1>Applications</h1>
            <Container className= "mx-3">
                <Row>
                <Col><Form.Control type="text" onChange={(event)=>setKeyword(event.target.value)} placeholder="search Applicant by Name ex: Sachin"/></Col>
                <Col><Button variant="outline-info" onClick={handleSearch}>Search</Button> </Col>
                </Row>
            </Container>
            {
                 appList.length > 0 && (
                        keyword.length > 0 ? (
                            <ApplicationsList applicants = {searchedApplicant} handleAccept = {handleAccept} handleReject={handleReject} />
                        )
                        :
                        (
                            <ApplicationsList applicants = {appList} handleAccept = {handleAccept} handleReject={handleReject} />
                        )
                    
                )
            }
        </Container>
    </Base>
  )

}

export default Applicationspage