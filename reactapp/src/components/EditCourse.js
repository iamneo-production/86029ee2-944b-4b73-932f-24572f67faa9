import {React, useState} from 'react'
import { Modal, Form, Button } from 'react-bootstrap'
import { Formik } from 'formik'
import * as yup from 'yup'
import FormControl from './Form Components/FormControl'
import { editCourse } from '../services/AdminServices'
import { toast } from 'react-toastify'

export const EditCourse = (props) => {
    const {name, description, duration} = props.courseInfo
    const [show, setShow] = useState(false)
    const handleClose=()=>setShow(false)
    const handleShow=()=>setShow(true)
    const reload=()=>window.location.reload();
    return (
        <>
        <Button variant="outline-warning" onClick={handleShow}>
            Edit
        </Button>
        <Modal 
            show={show} onHide={handleClose} animation={true}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
            backdrop="static"
            keyboard={false}
            >
            <Modal.Body>
                    <Formik
                        initialValues={{
                            name:`${name}`,
                            description: `${description}`,
                            duration:`${duration}`,  
                        }}
                        validationSchema={yup.object({
                            name: yup.string().required("Enter Course Name"),
                            description: yup.string().required("Enter Course Description"),
                            duration: yup.string().required("Enter Course Duration"),                                  
                        })}
                        onSubmit={(values, {resetForm}) => {                            
                            editCourse(props.courseId, values).then((response)=>{
                                console.log(response)
                                toast.success("Information Editted!!", {autoClose:5000, pauseOnHover:false, hideProgressBar:true})
                                handleClose()
                                reload()
                            }).catch((error)=>{
                                if(error.response.status === 404){
                                    toast.error(error.response.message, {autoClose:5000, pauseOnHover:false, hideProgressBar:true})
                                }
                            })
                        }}
                    >
                        {({handleSubmit,  handleBlur, handleChange, handleReset, errors, touched, values}) => (
                        <Form noValidate onSubmit={handleSubmit} onReset={handleReset}>
                            <FormControl
                                control="input"
                                label="Name"
                                name="name"
                                required
                                isInvalid={!!touched.name && !!errors.name}
                                isValid={!!touched.name && !errors.name}
                                value={values.name}
                                onChange={handleChange("name")}
                                onBlur={handleBlur("name")}
                                >
                            </FormControl>
                            <FormControl 
                                control="textarea"
                                type="text"
                                placeholder="Description"
                                required
                                label="Description"
                                name="description"
                                isValid={!!touched.description  && !errors.description}
                                isInvalid={(!!touched.description && !!errors.description) || (errors?.response?.data?.description ? true:false)}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                value={values.description}
                            /> 
                            <FormControl
                                control="input"
                                type="text"
                                label="Duration"
                                placeholder="ex:4"
                                name="duration"
                                value={values.duration}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                isValid = {!!touched.duration && !errors.duration}
                                isInvalid={!!touched.duration && !!errors.duration}
                                />     
                            <Button variant = "outline-primary" type="submit">Save Changes</Button>
                            {" "}
                            <Button variant = "outline-warning" type="reset">Reset</Button>
                        </Form>
                    )}
                    </Formik>  
            </Modal.Body>
            <Modal.Footer>
                <Button variant ="outline-secondary" onClick={handleClose}>Close</Button>
            </Modal.Footer>
        </Modal>
    </>
  )
}
