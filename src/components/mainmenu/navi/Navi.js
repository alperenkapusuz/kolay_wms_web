import React from "react";
import { Link } from "react-router-dom";
import {
  Collapse,
  Navbar,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
} from "reactstrap";
import "./Navi.css"

const Navi = () => {
  return (
    <div>
      <Navbar className="navbar" light expand="md">
        <NavbarBrand>
          <Link className="kolaywms" to="/mainmenu">Kolay WMS</Link>
        </NavbarBrand>
        <Collapse navbar>
          <Nav className="ml-auto" navbar>
            <NavItem>
              <NavLink>
                <Link className="addproduct" to="/addproduct">Ürün ekle</Link>
              </NavLink>
            </NavItem>
          </Nav>
        </Collapse>
      </Navbar>
    </div>
  );
};

export default Navi;
