import {React} from 'react'
import {Button, Card, Col, Row,Container, Stack, Image} from 'react-bootstrap'
import { EditInstitute } from './EditInstitute'
import { getCurrentUserDetails } from '../auth'

const InstituteCard = (props) => {
    let role = getCurrentUserDetails().role
    const {id, name, description, address, email, mobile} =props.college

    const image = props.image
    const alt = props.alt

    const handleDeleteInstitute=(instituteId)=>{
        return props.deleteInstitute(instituteId)
    }


  return (
        <Container fluid className="my-5 border solid dark ">
            <Card.Title>{name}</Card.Title>
            <Row>
                <Col>
                    <Image src={image} alt={alt} fluid></Image>
                </Col>
                <Col sm={5}>   
                    <Card.Text className = "instituteInfo">
                        {description}
                    </Card.Text>
                </Col>
                <Col>
                    <Card.Text className = "instituteInfo">
                        Contact : {mobile} 
                    </Card.Text>
                    <Card.Text className = "instituteInfo">
                        Email : {email} 
                    </Card.Text>
                    <Card.Text>
                        Address : {address} 
                    </Card.Text>
                </Col>
                <Col sm={2}>
                {   role === "ROLE_ADMIN" ?
                    (
                        <Stack  direction="vertical" gap={3}>
                                <Button 
                                    variant="outline-danger" 
                                    onClick={()=>handleDeleteInstitute(id)}
                                    >
                                        Delete
                                </Button>
                                <EditInstitute collegeInfo={props.college}/>
                        </Stack>
                    )
                    :null
                }
                </Col>
            </Row>
        </Container>
    )
}

export default InstituteCard