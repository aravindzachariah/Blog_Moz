import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import { Collapse, Navbar, NavbarToggler, Nav, NavItem, NavLink } from 'reactstrap';
class NavBar extends Component {
    state = {  }
    render() { 
        return (   <div>
            <Navbar color="faded" light>
              <img src='title.png' alt='Title'/>
              <NavbarToggler  className="mr-2" />
              <Collapse  navbar>
                <Nav navbar>
                  <NavItem>
                    <NavLink href="/components/">Components</NavLink>
                  </NavItem>
                  <NavItem>
                    <NavLink href="https://github.com/reactstrap/reactstrap">GitHub</NavLink>
                  </NavItem>
                  <NavItem>
                    <a href='#9'>Read More</a>
                  </NavItem>
                </Nav>
              </Collapse>
            </Navbar>
          </div>);
    }
}
 
export default NavBar;