import React from 'react'
import {Formik} from 'formik'
import * as yup from 'yup'
import {  Form, Button, Modal, Row, Col} from 'react-bootstrap'
import { addStudent } from '../services/AdminServices'
import FormControl from './Form Components/FormControl'

import { toast } from "react-toastify"
import { useEffect, useState } from 'react'
import { getCourses } from '../services/UserServices'
import { useNavigate } from 'react-router-dom'
import styles from '../myStyle.module.css'

const AddStudent = () => {
    const navigate = useNavigate()
    const [courses, setCourseList] = useState([])
    const maxDate = "01-01-2004"
    const minDate = "01-01-2000"

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
    const eligibilityOptions=[
            {key: "Select Eligibility", value:""},
            {key: "Accepted", value:'Accepted'},
            {key: "Rejected", value:'Rejected'}
        ]
    
    useEffect(()=>{
        getCourses()
        .then((response)=>{
            setCourseList(response)
            setCourseList(oldCourseList=>[{key:"Select Course", value:" "},...oldCourseList])
        })
        .catch(error=>{
            if(error.response.status === 404){
                alert("There are no Courses for student to apply. Add Course and then add students respectively")
                navigate('/viewcourses')
            }
        })
    }, [])

  return (
        <>
        <Button variant="outline-warning" onClick={handleShow}>
            Add Student
        </Button>
        <Modal 
            show={show} onHide={handleClose}  animation={true}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
            backdrop="static"
            keyboard={false}
            className={styles.modalStyle}
            >
            <Modal.Body>
                    <Formik
                        initialValues={{
                            firstname:"",
                            lastname:"",
                            dob: null,
                            mothername:"",
                            fathername:"",
                            gender:"",
                            address:"",
                            mobile:"",
                            email:"",
                            sslc:"",
                            hsc:"",
                            eligibility:'',
                            course:''
                        }}
                        validationSchema={yup.object({
                            firstname: yup.string().required("Enter your first name"),
                            lastname: yup.string().required("Enter your last name"),
                            mothername: yup.string().required("Enter your mother's name"),
                            fathername: yup.string().required("Enter your father's name"),
                            gender: yup.string().required("Select your gender"),
                            dob: yup.date().required("Enter your Date of Birth").max(maxDate, "D.O.B should be before 01-01-2004").min(minDate, "D.O.B should be after 01-01-2000").nullable(),
                            address: yup.string().required("Enter Your Address"),
                            mobile: yup.string().required("Enter Institute Contact Number")
                                                .min(10, "Should be of 10 digits")
                                                .max(10, "Should be of 10 digits"),
                            email:yup.string().email("invalid email format").required("Enter your email id"),
                            sslc: yup.number().required("Enter your SSLC Marks").min(0, "Marks cannot below 0").max(100, "Marks cannot be above 100"),
                            hsc: yup.number().required("Enter your HSC Marks").min(0, "Marks can not be below 0").max(100, "Marks can not be above 100"), 
                            eligibility:yup.string().required("Select eligibility"), 
                            course:yup.object().required("Please select course")                              
                        })}
                        onSubmit={(values) => {    
                            values.course = JSON.parse(values.course)                     
                            addStudent(values).then((response)=>{
                                toast.success("Student Added", {autoClose:5000, pauseOnHover:false, hideProgressBar:true})
                                handleClose()
                                reload()
                            }).catch((error)=>{
                                toast.error("Error Submitting", {autoClose:5000, pauseOnHover:true, hideProgressBar:true})
                                console.log(error)
                                
                            })
                        }}
                    >
                        {({handleSubmit,  handleBlur, handleChange, handleReset, errors, touched, values, isValid}) => (
                            <Form noValidate onSubmit={handleSubmit} onReset={handleReset}>
                        <Row>
                            <Col>
                                <FormControl
                                    control="input"
                                    name="firstname"
                                    label="First Name"
                                    placeholder = "First Name"
                                    type="text"
                                    required
                                    autoFocus
                                    isInvalid={!!touched.firstname && !!errors.firstname}
                                    isValid={!!touched.firstname && !errors.firstname}
                                    value={values.firstname}
                                    onChange={handleChange("firstname")}
                                    onBlur={handleBlur("firstname")}
                                    />
                            </Col>
                            <Col>
                                <FormControl
                                    control="input"
                                    type="text"
                                    label="Last Name"
                                    name="lastname"
                                    placeholder="Last Name"
                                    required
                                    isInvalid={!!touched.lastname && !!errors.lastname}
                                    isValid={!!touched.lastname && !errors.lastname}
                                    value={values.lastname}
                                    onChange={handleChange("lastname")}
                                    onBlur={handleBlur("lastname")}
                                    />
                            </Col>
                        <Row>
                            <Col>
                                <FormControl
                                    control = "input"
                                    label="Mother Name"
                                    type="text"
                                    name="mothername"
                                    required
                                    isInvalid={!!touched.mothername && !!errors.mothername}
                                    isValid={!!touched.mothername && !errors.mothername}
                                    value={values.mothername}
                                    onChange={handleChange("mothername")}
                                    onBlur={handleBlur("mothername")}
                                    />
                            </Col>
                            <Col>
                                <FormControl
                                    control="input"
                                    label="Father Name"
                                    type="text"
                                    name="fathername"
                                    required
                                    isInvalid={!!touched.fathername && !!errors.fathername}
                                    isValid={!!touched.fathername && !errors.fathername}
                                    value={values.fathername}
                                    onChange={handleChange("fathername")}
                                    onBlur={handleBlur("fathername")}
                                    />
                            </Col>
                        </Row>
                        </Row> 
                            <FormControl
                                control="input"
                                label="Date Of Birth"
                                type="date"
                                placeholder="Date of Birth (dd/mm/yyyy)"
                                name="dob"
                                isValid={!!touched.dob  && !errors.dob}
                                isInvalid={(!!touched.dob && !!errors.dob) || (errors?.response?.data?.dob ? true:false)}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                value={values.dob}
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
                            <Col>
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
                            </Col>
                            <Col>
                                <FormControl
                                        control="input"
                                        label="Contact"
                                        type="text"
                                        placeholder="Contact"
                                        name="mobile"
                                        value={values.mobile}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        isValid = {!!touched.mobile && !errors.mobile}
                                        isInvalid={!!touched.mobile && !!errors.mobile}
                                        />
                            </Col>
                        </Row>
                        <Row>
                            <Col>
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
                            </Col>
                            <Col>
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
                            </Col>   
                        </Row>
                        <Row>
                        <FormControl
                                control="select"
                                label="Eligible"
                                name="eligibility"
                                options={eligibilityOptions}
                                required
                                isInvalid={!!touched.eligibility && !!errors.eligibility}
                                isValid={!!touched.eligibility && !errors.eligibility}
                                value={values.eligibility}
                                onChange={handleChange("eligibility")}
                                onBlur={handleBlur("eligibility")}
                                />
                        </Row>
                        <Row>
                            <FormControl
                                control="selectobject"
                                name="course"
                                label="Course"
                                required
                                options={courses}
                                isInvalid={!!touched.course && !!errors.course}
                                isValid={!!touched.course && !errors.course}
                                value={values.course}
                                onChange={handleChange("course")}
                                onBlur={handleBlur("course")}
                            />  
                        </Row>

                        <Button variant = "outline-primary" type="Add Student" disabled={!isValid}>Apply</Button>
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

export default AddStudent