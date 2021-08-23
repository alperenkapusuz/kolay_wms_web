import React from "react";
import { Container, Navbar, Nav } from "react-bootstrap";

const Navi = () => {
  return (
    <>
      <Navbar bg="dark" variant="dark">
        <Container>
          <Navbar.Brand>KolayWMS</Navbar.Brand>
          <Nav className="me-auto">
            <Nav.Link>Add product</Nav.Link>
          </Nav>
        </Container>
      </Navbar>
    </>
  );
};

export default Navi;
