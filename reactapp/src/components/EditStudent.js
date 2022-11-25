import {React, useState} from 'react'
import { Modal, Form, Button, Row, Col } from 'react-bootstrap'
import { Formik } from 'formik'
import * as yup from 'yup'
import FormControl from './Form Components/FormControl'
import { editStudent } from '../services/AdminServices'
import { toast } from 'react-toastify'

export const EditStudent = ({studentInfo}) => {
    const {id, firstname ,lastname, address,
        dob, sslc, hsc, eligibility, fathername, mothername,
        email, mobile, gender, course} = studentInfo
    const {institute} = course
    const [show, setShow] = useState(false)
    const handleClose=()=>setShow(false)
    const handleShow=()=>setShow(true)
    const reload=()=>window.location.reload();
    const dropdownOptions=[
        {key: "Choose your gender", value:""},
        {key: "Male", value: "male"},
        {key: "Female",  value:"female"},
        {key: "Other", value: "other"}
    ]
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
            scrollable={true}
            >
            <Modal.Body>
                    <Formik
                        initialValues={{
                            firstname:`${firstname}`,
                            lastname: `${lastname}`,
                            address:`${address}`,
                            mobile:`${mobile}`,
                            email:`${email}`,
                            dob:`${dob}`,
                            sslc: `${sslc}`,
                            hsc: `${hsc}`,
                            eligibility: `${eligibility}`,
                            fathername: `${fathername}`,
                            mothername: `${mothername}`,
                            gender: `${gender}`,
                            course:{
                                "id": `${course?.id}`,
                                "name": `${course?.name}`,
                                "description": `${course?.description}`,
                                "duration":`${course?.duration}`,
                                "institute":{
                                    "address": `${institute.address}`,
                                    "description":`${institute.description}`,
                                    "email":`${institute.email}`,
                                    "id":`${institute.id}`,
                                    "mobile":`${institute.mobile}`,
                                    "name":`${institute.name}`
                                }
                            }

                        }}
                        validationSchema={yup.object({
                            firstname: yup.string().required("Enter student first name"),
                            lastname: yup.string().required("Enter student last name"),
                            mothername: yup.string().required("Enter student mother's name"),
                            fathername: yup.string().required("Enter student father's name"),
                            gender: yup.string().required("Select student gender"),
                            dob: yup.date().required("Enter student Date of Birth"),
                            address: yup.string().required("Enter Institute Address"),
                            mobile: yup.string().required("Enter Institute Contact Number")
                                                .min(10, "Should be of 10 digits")
                                                .max(10, "Should be of 10 digits"),
                            email:yup.string().email("invalid email format").required("Enter student email id").matches(email, "Please enter the registered Email"),
                            sslc: yup.number().required("Enter student SSLC Marks").min(0, "Marks cannot below 0").max(100, "Marks cannot be above 100"),
                            hsc: yup.number().required("Enter student HSC Marks").min(0, "Marks can not be below 0").max(100, "Marks can not be above 100"),

                        })}
                        onSubmit={(values) => {                            
                            editStudent(id, values).then((response)=>{
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
                            <Row>
                                <Col xs={8} md={7}>
                                    <FormControl
                                        control="input"
                                        name="firstname"
                                        label="First Name"
                                        placeholder = "first name"
                                        type="text"
                                        required
                                        isInvalid={!!touched.firstname && !!errors.firstname}
                                        isValid={!!touched.firstname && !errors.firstname}
                                        value={values.firstname}
                                        onChange={handleChange("firstname")}
                                        onBlur={handleBlur("firstname")}
                                        />
                                </Col>
                                <Col sm={5}>
                                    <FormControl
                                        control="input"
                                        type="text"
                                        label="Last Name"
                                        name="lastname"
                                        placeholder="last name"
                                        required
                                        isInvalid={!!touched.lastname && !!errors.lastname}
                                        isValid={!!touched.lastname && !errors.lastname}
                                        value={values.lastname}
                                        onChange={handleChange("lastname")}
                                        onBlur={handleBlur("lastname")}
                                        />
                                </Col>
                            </Row> 
                                <FormControl
                                    control="input"
                                    label="Date Of Birth"
                                    type="date"
                                    placeholder="Date of Birth (dd/mm/yyyy)"
                                    name="DateOfBirth"
                                    isValid={!!touched.DateOfBirth  && !errors.DateOfBirth}
                                    isInvalid={(!!touched.DateOfBirth && !!errors.DateOfBirth) || (errors?.response?.data?.DateOfBirth ? true:false)}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    value={values.DateOfBirth}
                                    />
                                <FormControl
                                    control="select"
                                    label="Gender"
                                    name="gender"
                                    options={dropdownOptions}
                                    required
                                    isInvalid={!!touched.gender && !!errors.gender}
                                    isValid={!!touched.gender && !errors.gender}
                                    value={values.gender}
                                    onChange={handleChange("gender")}
                                    onBlur={handleBlur("gender")}
                                    />
                            <Row>
                                <Form.Group as ={Col}>
                                    <FormControl
                                        control = "input"
                                        label="Mother's Name"
                                        type="text"
                                        name="mothername"
                                        required
                                        isInvalid={!!touched.mothername && !!errors.mothername}
                                        isValid={!!touched.mothername && !errors.mothername}
                                        value={values.mothername}
                                        onChange={handleChange("mothername")}
                                        onBlur={handleBlur("mothername")}
                                        />
                                </Form.Group>
                                <Form.Group as={Col}>
                                    <FormControl
                                        control="input"
                                        label="Father's Name"
                                        type="text"
                                        name="fathername"
                                        required
                                        isInvalid={!!touched.fathername && !!errors.fathername}
                                        isValid={!!touched.fathername && !errors.fathername}
                                        value={values.fathername}
                                        onChange={handleChange("fathername")}
                                        onBlur={handleBlur("fathername")}
                                        />
                                </Form.Group>
                            </Row>              
                                <FormControl
                                    control="textarea"
                                    label="Address"
                                    type="text"
                                    placeholder="Address"
                                    name="address"
                                    isValid={!!touched.address && !errors.address}
                                    isInvalid={(!!touched.address && !!errors.address) || (errors?.response?.data?.address ? true:false)}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    value={values.address}
                                    />
                            <Row>
                                <Form.Group as={Col}>
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
                                </Form.Group>
                                <Form.Group as={Col}>
                                    <FormControl
                                            control="input"
                                            label="Contact"
                                            type="text"
                                            placeholder="contact"
                                            name="mobile"
                                            value={values.mobile}
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                            isValid = {!!touched.mobile && !errors.mobile}
                                            isInvalid={!!touched.mobile && !!errors.mobile}
                                            />
                                </Form.Group>
                            </Row>
                            <Row>
                                <Form.Group as={Col}>
                                    <FormControl
                                        control="input"
                                        label="SSLC"
                                        type="number"
                                        placeholder="SSLC Marks"
                                        name="sslc"
                                        value={values.sslc}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        isValid = {!!touched.sslc && !errors.sslc}
                                        isInvalid={!!touched.sslc && !!errors.sslc}
                                        />
                                </Form.Group>
                                <Form.Group as={Col}>
                                    <FormControl
                                        control="input"
                                        label="HSC"
                                        type="number"
                                        placeholder="HSC Marks"
                                        name="hsc"
                                        value={values.hsc}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        isValid = {!!touched.hsc && !errors.hsc}
                                        isInvalid={!!touched.hsc && !!errors.hsc}
                                        />
                                </Form.Group>    
                            </Row>
                            <Button variant = "outline-primary" type="submit">Save Changes</Button>
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
