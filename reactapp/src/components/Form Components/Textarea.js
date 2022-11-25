import React from 'react'
import { Form, Col, Row } from 'react-bootstrap'
import {ErrorMessage} from 'formik'
import TextError from './TextError'
const Textarea = (props) => {
    const {label, name , type, ...rest} = props
  return (
    <Form.Group as={Row} className="mb-3">
        <Col sm={3}>
            <Form.Label htmlFor={name}>{label}</Form.Label>
        </Col>
        <Col>
            <Form.Control as="textarea" id={name} name={name} {...rest} rows="3"/>
            <ErrorMessage name={name} component={TextError}
            />
        </Col>
    </Form.Group>
  )
}

export default Textarea