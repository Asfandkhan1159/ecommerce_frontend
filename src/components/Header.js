import React from 'react'
import { Navbar, Nav, Container, Row  } from 'react-bootstrap'
import {LinkContainer} from 'react-router-bootstrap'
function Header() {
  return (
    <header>
      <Navbar bg="dark" variant='dark' expand="lg" collapseOnSelect>
      <Container>
        <LinkContainer to='/home'>
        <Navbar.Brand >MyShop</Navbar.Brand>
        </LinkContainer>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="mr-auto flex justify-end">
            
          <LinkContainer to='/product/:id/cart/:id'>
            <Nav.Link><i className='fas fa-shopping-cart'></i> Cart</Nav.Link>
            </LinkContainer>
            
            <LinkContainer to='/login'>
            <Nav.Link ><i className='fas fa-user'></i>Login</Nav.Link>
            </LinkContainer>
         </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
    </header>
  )
}

export default Header
