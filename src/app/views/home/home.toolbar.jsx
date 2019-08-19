import React from 'react'
import Dropdown from 'react-bootstrap/Dropdown'
import NavDropdown from 'react-bootstrap/NavDropdown';
import Nav from 'react-bootstrap/Nav'
import NavItem from 'react-bootstrap/NavItem'
import NavLink from 'react-bootstrap/NavLink'

const Toolbar = (props) =>
    <div className="row toolbar">
        <div className="col-12">
            <nav className="navbar navbar-expand-lg navbar-light">
                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarNav">
                    <ul className="navbar-nav ml-auto">
                        <li className="nav-item">
                            <a className="nav-link" href="#">Filter</a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href="#">Refresh</a>
                        </li>
                        <Dropdown as={NavItem}>
                            <Dropdown.Toggle as={NavLink}>
                                Hide/Show
                            </Dropdown.Toggle>
                            <Dropdown.Menu>
                                {props.toggle}
                            </Dropdown.Menu>
                        </Dropdown>
                        <li className="nav-item">
                            <a className="nav-link" href="#">Export</a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href="#">Print</a>
                        </li>
                    </ul>
                </div>
            </nav>
        </div>
    </div>
export default Toolbar;