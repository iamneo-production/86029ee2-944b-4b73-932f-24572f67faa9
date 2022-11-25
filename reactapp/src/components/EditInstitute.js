import {React, useState} from 'react'
import { Modal, Form, Button } from 'react-bootstrap'
import { Formik } from 'formik'
import * as yup from 'yup'
import FormControl from './Form Components/FormControl'
import { editInstitute } from '../services/AdminServices'
import { toast } from 'react-toastify'
export const EditInstitute = (props) => {
    const {id, name, description, address, email, mobile} = props.collegeInfo
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
                            name:`${name}`,
                            description: `${description}`,
                            address:`${address}`,
                            mobile:`${mobile}`,
                            email:`${email}`  
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
                            editInstitute(id, values).then((response)=>{
                                console.log(response)
                                toast.success("Information Editted!!", {autoClose:5000, pauseOnHover:false, hideProgressBar:true})
                                handleClose()
                                reload()
                            }).catch((error)=>{
                                console.log(error)
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
                                control="textarea"
                                type="text"
                                placeholder="Address"
                                required
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
