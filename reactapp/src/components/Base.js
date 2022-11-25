import Container from 'react-bootstrap/Container';
import CustomNavBar from './CustomNavBar';
const Base=({children})=>{
    return (
        <Container fluid>
            <CustomNavBar/>
            {children}
        </Container>
    )
}

export default Base;