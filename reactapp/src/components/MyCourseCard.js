import React from 'react'
import {Container, Card, Col, Row, Stack, Button, Badge} from 'react-bootstrap'
import EditApplication from './EditApplication'

const MyCourseCard = ({appDetails, ...props}) => {
    console.log(appDetails)
    const {id, eligibility, course} = appDetails  
    const {name, description, duration, institute} = course

    const handleDeleteApplication=()=>{
        return props.handleDelete(id)
    }

  return (
    <Container fluid>
        <Card className="my-5 border solid dark">
            <Card.Title> {name} </Card.Title>
            <Card.Subtitle> By {institute.name} </Card.Subtitle>
            <Card.Body>
            <Row>
                <Col sm={5}>
                    <Card.Text>
                        {description}
                    </Card.Text>
                </Col>
                <Col sm={2}>
                    <Card.Text>
                        Duration :{duration} 
                    </Card.Text>
                </Col>
                <Col sm={2}>
                    <Card.Text>
                        Status: {
                                    eligibility ==="Pending"? <Badge bg="info">{eligibility}</Badge>:
                                        (
                                            eligibility === 'Accepted'?<Badge bg="success">{eligibility}</Badge>:
                                                <Badge bg="danger">{eligibility}</Badge>
                                        )
                                }
                    </Card.Text>
                </Col>
                <Col sm={3}>
                    {
                        eligibility === 'Accepted' || eligibility === 'Rejected'? null
                        :(
                            <Stack direction="vertical" gap={3}>
                                <EditApplication studentInfo={appDetails}/>
                                <Button variant="outline-danger" onClick={handleDeleteApplication}>Delete Application</Button>
                            </Stack>
                        )
                    }
                </Col>  
            </Row>
            </Card.Body>
        </Card>           
    </Container>
  )
}

export default MyCourseCard