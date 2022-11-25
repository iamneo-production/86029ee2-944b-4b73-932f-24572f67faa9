import React from 'react'
import {Button, Card} from 'react-bootstrap';
import { useNavigate } from 'react-router-dom'
import errr_401 from '../images/errr_401.png'

const Unauthorized = () => {
    const navigate = useNavigate();
    const goBack=()=>{
        navigate(-1)
    }

  return (
        <Card style={{width:'50%'}} className="mx-5 my-5 ">
            <Card.Header>
                <Button onClick={goBack} variant = "danger">Go Back</Button>
            </Card.Header>
            <Card.Img  src= {errr_401}/>
           
        </Card>
  )

}

export default Unauthorized
