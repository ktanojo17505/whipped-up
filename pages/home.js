import "bootstrap/dist/css/bootstrap.min.css";
import Button from "react-bootstrap/Button";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/NavBar";
// this is a comment 

export default function Landing() {
    return ( 
        <div>
            <Navbar bg="light" expand="lg">
            <Navbar.Brand href="#home">React-Bootstrap</Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="mr-auto">
                <Nav.Link href="#home">Home</Nav.Link>
                <Nav.Link href="#link">Link</Nav.Link>
                </Nav>
            </Navbar.Collapse>
            </Navbar>
            <h1> hello world</h1>
            <Button variant="success">this is not a button</Button>
            </div>
    )
}