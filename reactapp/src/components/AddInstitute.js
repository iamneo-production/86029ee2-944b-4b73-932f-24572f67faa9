import {React, useState} from 'react'
import {Formik} from 'formik'
import * as yup from 'yup'
import { Modal, Form, Button} from 'react-bootstrap'
import { addInstitute } from '../services/AdminServices'
import FormControl from './Form Components/FormControl'

import { toast } from "react-toastify"

const AddInstitute = () => {
    const [show, setShow] = useState(false)
    const handleClose=()=>setShow(false)
    const handleShow=()=>setShow(true)
    const reload=()=>window.location.reload();
  return (
    <>
    <Button variant="outline-primary" onClick={handleShow}>
        Add Institute
    </Button>
    <Modal 
            show={show} onHide={handleClose}  animation={true}  
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
            backdrop="static"
            keyboard={false}
            >
            <Modal.Body>
                    <Formik
                        initialValues={{
                            name:'',
                            description: '',
                            address:'',
                            mobile:'',
                            email:''  
                        }}
                        validationSchema={yup.object({
                            name: yup.string().required("Enter Institute Name"),
                            description: yup.string().required("Enter Institute Description"),
                            address: yup.string().required("Enter Institute Address"),
                            mobile: yup.string().required("Enter Institute Contact Number")
                                                .min(10, "Should be of 10 digits")
                                                .max(10, "Should be of 10 digits"),
                            email: yup.string().email("Invalid Email Format").required("Enter Institute Email Id")                                   
                        })}
                        onSubmit={(values, {resetForm}) => { 
                            console.log(values)                         
                            addInstitute(values).then((response)=>{
                                console.log(response)
                                toast.success("Institute Added!!", {autoClose:5000, pauseOnHover:false, hideProgressBar:true})
                                handleClose()
                                reload()
                            }).catch((error)=>{
                                if(error.response.status === 404){
                                    toast.error(error.response.message, {autoClose:5000, pauseOnHover:false, hideProgressBar:true})
                                }
                            })
                        }}
                    >
                        {({handleSubmit,  handleBlur, handleChange,handleReset,errors, touched, values, isValid}) => (
                        <Form noValidate onSubmit={handleSubmit} onReset={handleReset}>
                            <FormControl
                                control="input"
                                label="Name"
                                name="name"
                                placeholder="Institute Name"
                                isInvalid={!!touched.name && !!errors.name}
                                isValid={!!touched.name && !errors.name}
                                value={values.name}
                                onChange={handleChange("name")}
                                onBlur={handleBlur("name")}
                                >
                            </FormControl>
                            <FormControl 
                                control="textarea"
                                placeholder="Description"
                                label="Description"
                                name="description"
                                isValid={!!touched.description  && !errors.description}
                                isInvalid={(!!touched.description && !!errors.description) || (errors?.response?.data?.description ? true:false)}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                value={values.description}
                            /> 
                            <FormControl
                                control="textarea"
                                placeholder="Address"
                                label="Address"
                                name="address"
                                isValid={!!touched.address && !errors.address}
                                isInvalid={(!!touched.address && !!errors.address) || (errors?.response?.data?.address ? true:false)}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                value={values.address}
                                />
                            <FormControl
                                control="input"
                                label="Email"
                                type="email"
                                placeholder="example@gmail.com"
                                name="email"
                                isValid= {!!touched.email && !errors.email}
                                isInvalid={(!!touched.email && !!errors.email) || (errors?.response?.data?.email ? true:false)}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                value={values.email}
                                />
                            <FormControl
                                control="input"
                                type="text"
                                label="Contact"
                                placeholder="contact"
                                name="mobile"
                                value={values.mobile}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                isValid = {!!touched.mobile && !errors.mobile}
                                isInvalid={!!touched.mobile && !!errors.mobile}
                                />     
                            <Button variant = "outline-primary" type="submit" disabled={!isValid}>Add Institute</Button>
                            {" "}
                            <Button variant = "outline-warning" type="reset">Reset Form</Button>
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

export default AddInstitute