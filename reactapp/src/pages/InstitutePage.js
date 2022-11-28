import React from 'react'
import {useState, useEffect} from 'react'
import { getInstitutes } from '../services/UserServices'
import { deleteInstitute } from '../services/AdminServices'
import InstituteList from '../components/InstituteList'
import { Container, Button, Form, Col, Row} from 'react-bootstrap'
import { toast } from "react-toastify";
import Base from '../components/Base'
import { getCurrentUserDetails } from '../auth'
import AddInstitute from '../components/AddInstitute'

const InstitutePage = () => {
    const [instituteList, setInstituteList] = useState([])
    const [keyword, setKeyword] = useState("")
    const [searchedInstituteList, setSearchedInstituteList] = useState([])

    let userRole  = getCurrentUserDetails().role

    useEffect(()=>{
        getInstitutes()
        .then((response)=>{
            setInstituteList(response)
        })
        .catch(error=>{
            console.log(error)
        })
    }, [])


    const handleSearch=()=>{
        if(keyword.length > 0){
            setSearchedInstituteList(instituteList.filter(institute=>institute.name.toLowerCase().includes(keyword.toLowerCase())))
        }
    
    }

    const handleDeleteInstitute=(instituteId)=>{
        deleteInstitute(instituteId)
        .then((response)=>{
            const updateInstitutesList = instituteList.filter(institute=>institute.id !== instituteId)
            setInstituteList(updateInstitutesList)
            toast.success("Institute Deleted", {autoClose:5000, pauseOnHover:false, hideProgressBar:true})
        })
        .catch(error=>{
            console.log(error)
        })
    }
  
    return (
        <Base>
            <Container>
                <h1>Institutes</h1>
                <Container className="mx-5">
                    <Row>
                        <Col><Form.Control type="text" onChange={(event)=>setKeyword(event.target.value)} placeholder="search Institute by Name ex: NIT Kurukshetra"/></Col>
                        <Col><Button variant="outline-info" onClick={handleSearch}>Search</Button>
                        {" "}
                        {
                            userRole === 'ROLE_ADMIN' ? 
                                <AddInstitute/>
                                :null
                        } 
                        </Col>  
                    </Row>
                </Container>
                {
                    instituteList.length>0 && (
                        keyword.length>0 ? (
                            <InstituteList institutes = {searchedInstituteList}  deleteInstitute={handleDeleteInstitute}  />
                        )
                        :
                        (
                            <InstituteList institutes = {instituteList}  deleteInstitute={handleDeleteInstitute}  />
                        )
                    )
                }
                
            </Container>
       </Base>
    )
}

export default InstitutePage