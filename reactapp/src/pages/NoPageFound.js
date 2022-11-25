import React from 'react'
import { Container, Image } from 'react-bootstrap'
import err_404 from '../images/err_404.png'

const NoPageFound = () => {
  return (
    <Container>
        <Image src = {err_404} alt = "No Page Found"/>
    </Container>
  )
}

export default NoPageFound