import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
  NavbarText,
  Button,
} from 'reactstrap';

const NavigationBar = (props) => {
  const [isOpen, setIsOpen] = useState(false);
  const toggle = () => setIsOpen(!isOpen);
  const logout = () => {
    localStorage.removeItem('token');
    window.location = '/';
  };

  return (
    <div>
      <Navbar light expand="md">
        <NavbarBrand href="/">msw keeposted</NavbarBrand>
        <NavbarToggler onClick={toggle} />
        <Collapse isOpen={isOpen} navbar>
          <Nav className="mr-auto" navbar>
            <NavItem>
              <NavLink href="/posts">All Resources</NavLink>
            </NavItem>
            <NavItem>
              <NavLink href="/createpost">Contribute Resource</NavLink>
            </NavItem>
            <NavItem>
              <NavLink href="/about">About</NavLink>
            </NavItem>
          </Nav>
          {!props.user && (
            <NavbarText>
              <Button
                href="/login"
                style={{
                  marginRight: '10px',
                  color: 'white',
                  borderRadius: '25px',
                }}
              >
                Log In
              </Button>
              <Button color="warning" href="/signup">
                Sign Up
              </Button>
            </NavbarText>
          )}
          {props.user && (
            <NavbarText>
              <span style={{ marginRight: '10px' }}>{props.user.username}</span>
              <Button onClick={logout} color="warning">
                Log Out
              </Button>
            </NavbarText>
          )}
        </Collapse>
      </Navbar>
    </div>
  );
};

export default NavigationBar;
