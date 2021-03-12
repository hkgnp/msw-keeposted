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
    <React.Fragment>
      <Navbar light expand="lg">
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
              <Button
                href="/dashboard"
                style={{
                  marginRight: '5px',
                  borderTopLeftRadius: '20px',
                  color: 'white',
                }}
              >
                {props.user.name}
              </Button>
              <Button onClick={logout} color="warning">
                Log Out
              </Button>
            </NavbarText>
          )}
        </Collapse>
      </Navbar>
    </React.Fragment>
  );
};

export default NavigationBar;
