import Navbar from "react-bootstrap/Navbar";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import {Link} from "react-router-dom";
import "./header.css";

const header = () => {
    return (
        <>
            <Navbar bg="primary" variant="dark">
                <Container>
                    <Navbar.Brand to="/">Employee Management System</Navbar.Brand>
                    <Nav className="ml-auto">
                        <Nav.Link as={Link} to="/" className={"nav-link"}>Employees</Nav.Link>
                        <Nav.Link as={Link} to="/employee" className={"nav-link"}>Post Employee</Nav.Link>
                    </Nav>
                </Container>
            </Navbar>
        </>
    )
}
export default header;