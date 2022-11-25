import React from 'react'
import {Form, Col, Row} from 'react-bootstrap'
import {Field , ErrorMessage} from 'formik'
import TextError from './TextError'

const SelectObject = (props) => {
    const {label,name, options, ...rest} = props;
  return (
    <Form.Group as={Row} className="mb-3">
        <Col sm={3}>
            <Form.Label htmlFor={name}>{label}</Form.Label>
        </Col>
        <Col>
            <Field as = {Form.Select} id={name} name={name} {...rest}>
                {
                    options?.map(option=>{
                        return (
                                <option key={option.id} value={JSON.stringify(option)}>
                                    {option.name} {option.institute?.name}
                                </option>
                            )
                        }
                    )
                }
            </Field>
        
        <ErrorMessage
            name={name}
            component={TextError}
        />
        </Col>
    </Form.Group>
  )
}

export default SelectObject