import React from "react";
import { Link } from "react-router-dom";
//import { Route } from "react-router-dam";
import "./home.css";
import User from "../assets/imguser.png";
import Vege from "../assets/vege.png";
import Frui from "../assets/frui.jpg";
import Grain from "../assets/grain.jpg";
import milk from "../assets/milk.jpg";
import Baked from "../assets/baked.jpg";

import { Nav, Navbar, Container, NavDropdown, Form, FormControl, Button} from "react-bootstrap";

const Home = () => {
  return (
    <div>
        <Navbar bg="light" expand="lg">
  <Container fluid>
    <Navbar.Brand href="#">Jacobs Shopping</Navbar.Brand>
    <Navbar.Toggle aria-controls="navbarScroll" />
    <Navbar.Collapse id="navbarScroll">
      <Nav
        className="me-auto my-2 my-lg-0"
        style={{ maxHeight: '100px' }}
        navbarScroll
      >
        <Nav.Link href="#action1">Home</Nav.Link>
        <Nav.Link href="#action2">Category</Nav.Link>
        <NavDropdown title="Link" id="navbarScrollingDropdown">
          <NavDropdown.Item href="#action3">Action</NavDropdown.Item>
          <NavDropdown.Item href="#action4">Another action</NavDropdown.Item>
          <NavDropdown.Divider />
          <NavDropdown.Item href="#action5">
            Something else here
          </NavDropdown.Item>
        </NavDropdown>
        <Nav.Link href="#" disabled>
          Item
        </Nav.Link>
      </Nav>
      <Form className="d-flex">
        <FormControl
          type="search"
          placeholder="Search"
          className="me-2"
          aria-label="Search"
        />
        <Button variant="outline-success">Search</Button>
      </Form>
    </Navbar.Collapse>
  </Container>
</Navbar>
      <div>
        <h1>
          Jacobs Market
        </h1>
      </div>
      <div className="icon-list3">
        <div className="my-icon2">
          <img src={Vege} alt="hello" />
          <Link to="/" style={{ textDecoration: "none" }}>
            <p>vegetables</p>
          </Link>
        </div>
        <div className="my-icon2">
          <img src={Frui} alt="hello" />
          <Link to="/" style={{ textDecoration: "none" }}>
            <p>Fruits</p>
          </Link>
        </div>
        <div className="my-icon2">
          <img src={Grain} alt="hello" />
          <Link to="/" style={{ textDecoration: "none" }}>
            <p>Grains</p>
          </Link>
        </div>
        <div className="my-icon2">
          <img src={milk} alt="hello" />
          <Link to="/" style={{ textDecoration: "none" }}>
            <p>Milk</p>
          </Link>
        </div>
        <div className="my-icon2">
          <img src={Baked} alt="hello" />
          <Link to="/" style={{ textDecoration: "none" }}>
            <p>Baked Goods</p>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Home;
