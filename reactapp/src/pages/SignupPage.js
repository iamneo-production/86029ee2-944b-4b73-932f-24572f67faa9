
import Base from "../components/Base";
import {Card, Container, Image, Nav, Col, Row } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import * as yup from 'yup';
import {Formik} from 'formik';
import { signup } from "../services/UserServices";
import {toast} from 'react-toastify';
import { useNavigate, NavLink as ReactLink } from "react-router-dom";
import FormControl from '../components/Form Components/FormControl';

import RegisterToApply from '../images/RegisterToApply.jpg'

import styles from '../myStyle.module.css'

const SignupPage=()=>{
    const navigate = useNavigate()
    const dropdownOptions=[
        {key: "Select a Role", value:""},
        {key: "Admin", value: "ROLE_ADMIN"},
        {key: "User",  value:"ROLE_USER"}
    ]
    return(
        <Base>
            <Container className={styles.signupwallpaper}>
            <Row>
                <Col sm={7}>
                        <Container className="my-2 mx-1">
                            <Card className={styles.formstyles}>
                                <Card.Body>
                                    {/*Create a form to sign up*/}
                                    <Formik
                                            initialValues={{
                                                role:'',
                                                name: '',
                                                password:'',
                                                email:'',
                                                contact:''
                                                
                                            }}
                                            validationSchema={yup.object({
                                                role: yup.string().required("Please select a role"),
                                                name: yup.string().required("Enter your Username"),
                                                email: yup.string().email("Invalid Email Format").required("Enter your Email Id"),
                                                contact: yup.string().required("Enter your Contact Number")
                                                                    .min(10, "Should be of 10 digits")
                                                                    .max(10, "Should be of 10 digits"),
                                                password: yup.string().required("Create a Password")
                                                                    .matches(/\d/,"Atleast contain a Digit(0-9)")
                                                                    .matches(/[a-z]/,"Atleast contain a letter [a-z]")
                                                                    .matches(/[A-Z]/,"Atleast contain a Capital Letter [A-Z]")
                                                                    .matches(/\W/, "Atleast contain a special character like (!@#...)")
                                                                    .min(6, "Password should be atleast a length of 6 characters long")
                                            })}
                                            onSubmit={(values, {setSubmitting, resetForm}) => {                          
                                                signup(values).then((response)=>{
                                                    toast.success("You have been registered!!",{autoClose:5000, pauseOnHover:false, hideProgressBar:true} )
                                                    navigate("/")
                                                }).catch((error)=>{
                                                    if(error.response.status === 404){
                                                        toast.error("User with Email Id Already Exists", {autoClose:5000, pauseOnHover:false, hideProgressBar:true})
                                                    }
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
                                                control="select"
                                                name="role[0]"
                                                label="Role"
                                                required
                                                options={dropdownOptions}
                                                isInvalid={!!touched.role && !!errors.role}
                                                isValid={!!touched.role && !errors.role}
                                                value={values.role}
                                                onChange={handleChange("role")}
                                                onBlur={handleBlur("role")}
                                            />

                                            <FormControl
                                                control="input"
                                                type="text"
                                                label="Username"
                                                placeholder="Username"
                                                aria-describedby="inputGroupPrepend"
                                                name="name"
                                                isValid={!!touched.name && !errors.name}
                                                isInvalid={(!!touched.name && !!errors.name) || (errors?.response?.data?.name ? true:false)}
                                                onChange={handleChange}
                                                onBlur={handleBlur}
                                                value={values.name}
                                                />

                                            <FormControl
                                                control="input"
                                                type="email"
                                                label="Email"
                                                placeholder="example@gmail.com"
                                                name="email"
                                                isValid={!!touched.email && !errors.email}
                                                isInvalid={(!!touched.email && !!errors.email) || (errors?.response?.data?.email ? true:false)}
                                                onChange={handleChange}
                                                onBlur={handleBlur}
                                                value={values.email}
                                            />

                                            <FormControl
                                                control="input"
                                                type="password"
                                                label="Password"
                                                name="password"
                                                placeholder="Enter your password"
                                                isValid={!!touched.password && !errors.password}
                                                isInvalid={!!touched.password && !!errors.password}
                                                onChange={handleChange}
                                                onBlur={handleBlur}
                                                value={values.password}
                                                />    
                                        
                                            <FormControl
                                                control="input"
                                                type="text"
                                                label="Contact"
                                                placeholder="ex: 90192678210"
                                                name="contact"
                                                value={values.contact}
                                                onChange={handleChange}
                                                onBlur={handleBlur}
                                                isValid = {!!touched.contact && !errors.contact}
                                                isInvalid={!!touched.contact && !!errors.contact}
                                            />
                                        <Button variant = "outline-primary" type="submit">SignUp</Button>
                                            {' '}
                                        <Button variant = "outline-danger" type="reset" className="mx-2">Reset Form</Button>
                                        </Form>
                                    )}
                                    </Formik>
                                    <p style={{textAlign:"center"}}>Already a have an Account?</p>
                                    <Nav className="justify-content-center" variant="tabs">
                                        <Nav.Item>
                                            <Nav.Link as={ReactLink} to="/login">Login</Nav.Link>
                                        </Nav.Item>
                                        
                                    </Nav>
                                </Card.Body>
                            </Card>
                        </Container>
                    </Col>
                    <Col sm={3}>
                        <Image src={RegisterToApply} alt="registertoapplyImage"/>
                    </Col>
                </Row>
            </Container>
        </Base>
    )
}

export default SignupPage;