import React from 'react'
import { Form } from 'react-bootstrap'
const TextError = (props) => {
  return (
    <Form.Control.Feedback
        className="font-weight-bold"
        type="invalid"
        role="alert"
        aria-label="from feedback"
        >
        {props.children}
    </Form.Control.Feedback>
  )
}

export default TextError