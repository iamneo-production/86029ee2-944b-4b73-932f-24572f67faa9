import Base from "../components/Base";
import { Card, Container, Col, Row , Button, Form, Image} from 'react-bootstrap';
import * as yup from 'yup';
import {Formik} from 'formik';
import { login } from "../services/UserServices";
import { toast } from "react-toastify";
import { doLogin } from "../auth";
import FormControl from "../components/Form Components/FormControl";
import { useNavigate} from "react-router-dom";
import styles from '../myStyle.module.css';

import { useState } from "react";
import Login from '../images/Login2.png'

const LoginPage=()=>{
    let navigate = useNavigate();
    const [isSubmitting, setSubmitting] = useState(false)
    return(
        <Base>
            <Container className={styles.loginwallpaper}>
                <Row>
                    <Col sm={7}>
                        <Container className="my-1 mx-1" >
                            <Card className={styles.formstyles}>
                                <Card.Body>
                                    <Formik
                                            initialValues={{
                                                username:'',
                                                password:''
                                            }}
                                            validationSchema={yup.object({
                                                username: yup.string().email("Invalid Email").required("Enter your Email Id"),
                                                password: yup.string().required("Enter your password")
                                            })}
                                            onSubmit={(values,{resetForm}) => {
                                            
                                                setSubmitting(true)
                                                login(values).then((response)=>{
                                                    doLogin(response, ()=>{
                                                        navigate("/dashboard")
                                                    })
                                                    toast.success("Logged In", {autoClose: 100, hideProgressBar:true, pauseOnHover:false})
                                                }).catch((error)=>{
                                                    console.log(error)
                                                    if(error.response.status === 401){
                                                        toast.error("Invalid Password/Username", {autoClose:2000, pauseOnHover:false, hideProgressBar:true})
                                                    }
                                                    else if (error.response.status === 404){
                                                        toast.error(error.response.data.message, {autoClose:5000, pauseOnHover:false, hideProgressBar:true})
                                                    }
                                                })
                                                setTimeout(()=>{
                                                    resetForm();
                                                    setSubmitting(false);
                                                }, 500)
                                                
                                            }}
                                    >
                                    { ({handleSubmit, errors, handleBlur, handleChange, touched, values}) => (
                                        <Form noValidate onSubmit={handleSubmit}>
                                                <FormControl 
                                                    control="input" 
                                                    type="email" 
                                                    label="Email" 
                                                    name="username"
                                                    placeholder="Enter your email id"
                                                    isValid={!!touched.username && !errors.username}    
                                                    isInvalid={!!touched.username && !!errors.username}
                                                    onChange={handleChange}
                                                    onBlur={handleBlur}
                                                    value={values.username}
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
                                                <Button variant="outline-primary" type="submit" disabled={isSubmitting}>Login</Button> 
                                                    {' '}
                                                <Button variant="outline-danger" type="reset" className="mx-2">Reset</Button>
                                            </Form>
                                    )}
                                    </Formik>
                                </Card.Body>
                            </Card>
                        </Container> 
                    </Col>
                    <Col>
                        <Image src={Login} alt="SecurityImage"/>
                    </Col>
                </Row> 
            </Container> 
         </Base>
    )
}

export default LoginPage;
