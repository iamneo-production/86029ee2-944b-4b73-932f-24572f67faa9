import React from 'react'
import {Container, Card, Form, Button} from 'react-bootstrap'
import * as yup from 'yup'
import { Formik } from 'formik'
import { recordFeedback } from '../services/UserServices'
import {toast} from 'react-toastify'
import { useNavigate } from 'react-router-dom'
import FormControl from "../components/Form Components/FormControl";
import { getCurrentUserDetails } from '../auth'
import Base from './Base'

const FeedBack = () => {
    const navigate = useNavigate()
    const {id, name, email ,role} = getCurrentUserDetails()
  return (
    <Base>
    <Container className="my-3">
        <Card>
            <Card.Header>FeedBack</Card.Header>
            <Card.Body>
                {/*Create a form to sign up*/}
                <Formik
                        initialValues={{
                            comments:'',
                            user:{
                                "id":`${id}`,
                                "role":`${role}`,
                                "email":`${email}`,
                                "name":`${name}`
                            }
                            
                        }}
                        validationSchema={yup.object({
                            comments:yup.string().required("Please enter your feedback")
                            
                        })}
                        onSubmit={(values, {setSubmitting, resetForm}) => {                          
                                recordFeedback(values).then((response)=>{
                                toast.success("Yor feedback has been submitted",{autoClose:5000, pauseOnHover:false, hideProgressBar:true} )
                                navigate("/dashboard")
                            }).catch((error)=>{
                                toast.error(error.response.data.message)
                            })
                            setTimeout(()=>{
                                resetForm();
                                setSubmitting(false);
                            }, 1000)
                        }}
                >
                { ({handleSubmit,  handleBlur, handleChange,handleReset,errors, touched, values, isSubmitting}) => (
                    <Form noValidate onSubmit={handleSubmit} onReset={handleReset}>   
                    <FormControl 
                                control="textarea"
                                type="text"
                                required
                                label=""
                                name="comments"
                                isValid={!!touched.comments  && !errors.comments}
                                isInvalid={(!!touched.comments && !!errors.comments) || (errors?.response?.data?.comments ? true:false)}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                value={values.comments}
                            /> 
                    <Container className="text-center">
                        <Button variant = "outline-primary" type="submit">Submit Feedback</Button>
                            {' '}
                        <Button variant = "outline-danger" type="reset" className="mx-2">Reset</Button>
                    </Container>
                    </Form>
                )}
                </Formik>
            </Card.Body>
        </Card>
    </Container>
</Base>
  )
}

export default FeedBack