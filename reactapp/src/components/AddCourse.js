import React from 'react'
import {Formik} from 'formik'
import * as yup from 'yup'
import { Modal, Form, Button} from 'react-bootstrap'
import { addCourse } from '../services/AdminServices'
import FormControl from './Form Components/FormControl'

import { toast } from "react-toastify";
import { useNavigate } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { getInstitutes } from '../services/UserServices'

import styles from '../myStyle.module.css'

const AddCourse = () => {
    const navigate = useNavigate();
    const [institutes, setInstituteList] = useState([{"id":"Select Institute", value:"", name:""}])
    const [show, setShow] = useState(false)
    const handleClose=()=>setShow(false)
    const handleShow=()=>setShow(true)
    const reload=()=>window.location.reload();

    useEffect(()=>{
        getInstitutes()
        .then((response)=>{
            setInstituteList([...institutes, ...response])
        })
        .catch(error=>{
            if(error.response.status === 404){
                alert("There are no Institutes to add Courses to. Add Institute and then add courses respectively")
                navigate('/viewinstitutes')
            }
        })
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

  return (
    <>
    <Button variant="outline-primary" onClick={handleShow}>
        Add Course
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
                            name:'',
                            description: '',
                            duration:'', 
                            institute:''
                        }}

                        validationSchema={yup.object({
                            name: yup.string().required("Enter Course Name"),
                            description: yup.string().required("Enter Course Description"),
                            duration: yup.string().required("Enter Course Duration"),
                            institute:yup.object().required("Please select an institute for the Course").nullable()
                                                              
                        })}
                        onSubmit={(values) => {  
                            let instituteOption = JSON.parse(values.institute)   
                            values.institute =   instituteOption       
                            addCourse(values).then((response)=>{
                                toast.success("Course Added!!")
                                handleClose()
                                reload()
                            }).catch((error)=>{
                                if(error.response.status === 500){
                                    toast.error("Description too Long")
                                }
                                else{
                                    toast.error(error.response.data.message)
                                }
                                
                            })
                        }}
                    >
                        {({handleSubmit,  handleBlur, handleChange,handleReset,errors, touched, values}) => (
                        <Form noValidate onSubmit={handleSubmit} onReset={handleReset}>
                            <FormControl
                                control="input"
                                label="Name"
                                name="name"
                                placeholder="Course Name"
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
                            <FormControl
                                    control="selectobject"
                                    name="institute"
                                    label="Institute"
                                    options={institutes}
                                    isInvalid={!!touched.institute && !!errors.institute}
                                    isValid={!!touched.institute && !errors.institute}
                                    value={values.institute}
                                    onChange={handleChange("institute")}
                                    onBlur={handleBlur("institute")}
                                />    
                            <Button variant = "outline-primary" type="submit">Add Course</Button>
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

export default AddCourse