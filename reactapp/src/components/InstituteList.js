import React from 'react'
import InstituteCard from './InstituteCard'
import Container from 'react-bootstrap/Container'
import { Row } from 'react-bootstrap'

const InstituteList = (props) => {

    const renderInstituteCards =  props.institutes && props.institutes.map((institute)=>{
        return(
            <Row>
                <InstituteCard  college={institute}  image={`../images/${institute.name}.jpg`} alt = {institute.name} deleteInstitute = {props.deleteInstitute} key={institute.name} />
            </Row>
        )
    })
  return (
    <Container className="my-5">
        {renderInstituteCards}
    </Container>
  )
}

export default InstituteList