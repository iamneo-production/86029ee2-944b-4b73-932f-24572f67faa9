import React from 'react'
import {Field, ErrorMessage} from 'formik'
import {Form, Col, Row} from 'react-bootstrap'
import TextError from './TextError'

const Input = (props) => {
  const {label, name, type, ...rest} = props
  return (
    <Form.Group as={Row} className="mb-3">
      <Col sm={3}>
        <Form.Label htmlFor={name}>{label}</Form.Label>
      </Col>
      <Col>
        <Field as = {Form.Control} type={type} id={name} name={name} {...rest}/>
        <ErrorMessage name={name}
          component={TextError}
        />
      </Col>
    </Form.Group>
  )
}

export default Input