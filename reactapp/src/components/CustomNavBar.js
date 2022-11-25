import { NavLink as ReactLink } from 'react-router-dom';
import {Container, Navbar, Nav} from 'react-bootstrap';
import {useState, useEffect} from 'react';
import { isLoggedIn, getCurrentUserDetails, doLogout } from '../auth';
import { useNavigate } from 'react-router-dom';

const CustomNavBar=()=>{
    const [login , setLogin] = useState(false)
    const [user, setUser] = useState(undefined)
    let navigate = useNavigate();
    

    useEffect(()=>{
      setLogin(isLoggedIn())
      setUser(getCurrentUserDetails())
    }, [])

    const logout=()=>{
      doLogout(()=>{
        setLogin(false)
        navigate("/")
      })
    }
    return(
        <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark" fixed="">
        <Container>
          <Navbar.Brand>Diploma Admission</Navbar.Brand>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse  id="responsive-navbar-nav">
              {
                login ?  
                (
                  <Nav className = "container-fluid">
                    <Nav.Item>          
                      <Nav.Link as={ReactLink} to="/dashboard">Home</Nav.Link>
                    </Nav.Item>
                    <Nav.Item>            
                      <Nav.Link as={ReactLink} to="/viewinstitutes">Institutes</Nav.Link>
                    </Nav.Item> 
                    <Nav.Item>
                      <Nav.Link as={ReactLink} to="/viewcourses">Courses</Nav.Link>  
                    </Nav.Item>
                    {
                      user.role === "ROLE_ADMIN" ?   
                        (    
                          <> 
                            <Nav.Item>
                              <Nav.Link as={ReactLink} to="/viewstudents">Students</Nav.Link>
                            </Nav.Item> 
                            <Nav.Item>
                              <Nav.Link as={ReactLink} to="/viewapplications">Applications</Nav.Link>
                            </Nav.Item> 
                          </>
                        )                   
                        :      
                        (      
                          <Nav.Item>
                            <Nav.Link as={ReactLink} to="/mycourses">My Courses</Nav.Link>  
                          </Nav.Item>
                        )
                    } 
                    <Nav.Item className="ms-auto"> 
                      <Nav.Link as={ReactLink} to="/feedback">FeedBack</Nav.Link>
                    </Nav.Item>
                    <Nav.Item className="ms-auto"> 
                      <Nav.Link onClick={logout}>Logout</Nav.Link>
                    </Nav.Item>
                  </Nav>
                )
                :
                (
                  <Nav className="ms-auto">
                    <Nav.Item> 
                      <Nav.Link as={ReactLink} to={"/login"}>Login</Nav.Link>
                    </Nav.Item> 
                    <Nav.Item> 
                      <Nav.Link as={ReactLink} to={"/signup"}>Signup</Nav.Link>
                    </Nav.Item>  
                  </Nav>
                ) 
              }        
          </Navbar.Collapse>
        </Container>
      </Navbar>
    )
}

export default CustomNavBar;