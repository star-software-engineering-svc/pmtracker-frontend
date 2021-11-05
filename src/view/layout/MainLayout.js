import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { Routes, Route, Navigate, useLocation } from "react-router-dom";

import { Home } from '../home/Home';
import { Login } from '../home/Login';
import { Dashboard } from '../home/Dashboard';
import { RequireAuth } from '../auth/RequireAuth';

import { Navbar, Container, Nav, NavDropdown } from 'react-bootstrap';

export const MainLayout = ({ children }) => {
  return (
    <>
      <div className="tw-container-fluid tw-mx-auto mainbody">
        <header>
          <Navbar bg="light" expand="lg">
            <Container fluid>
              <Navbar.Brand href="#home">
                <div className="tw-flex tw-flex-row">
                  <div>
                    <img className="nav-logo" src="http://localhost:8894/images/logo.png" />
                  </div>
                  <div>
                    &nbsp;PROPERTY MANAGEMENT TRACKER
                  </div>
                </div>
              </Navbar.Brand>
              <Navbar.Toggle aria-controls="basic-navbar-nav" />
              <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="ms-auto">
                  <Nav.Link href="#home">Home</Nav.Link>
                  <Nav.Link href="#link">Link</Nav.Link>
                  <NavDropdown title="Dropdown" id="basic-nav-dropdown" align={'end'}>
                    <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
                    <NavDropdown.Item href="#action/3.2">Another action</NavDropdown.Item>
                    <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
                    <NavDropdown.Divider />
                    <NavDropdown.Item href="#action/3.4">Separated link</NavDropdown.Item>
                    <NavDropdown.Item href="#action/3.3">Sign Out</NavDropdown.Item>
                  </NavDropdown>
                </Nav>
              </Navbar.Collapse>
            </Container>
          </Navbar>
        </header>
        <section>
          {children}
        </section>
        <footer>
          <div className="footer tw-p-5">
            <div className="tw-flex tw-flex-row tw-justify-center">© COPYRIGHT 2021. Property Management Tracker. All Rights Reserved.</div>
            <div className="tw-flex tw-flex-row tw-justify-center">
              Site by&nbsp;<a href="">StarWebProgramming.com <img className="tw-inline" src="http://localhost:8894/images/star3.png" /></a>
            </div>
            <div className="tw-flex tw-flex-row tw-justify-center">
              <div className="tw-p-1">
                <a href="https://twitter.com/PM_Tracker"><i className="fab fa-twitter"></i></a>
              </div>
              <div className="tw-p-1">
                <a href="https://twitter.com/PM_Tracker"><i className="fab fa-facebook"></i></a>
              </div>
            </div>
          </div>
        </footer>
      </div>
    </>
  )
}



export const MainLayoutRoutes = ({ component: Component, ...rest }) => {
  console.log('MainLayoutRoute');
  let location = useLocation();
  return (
    <MainLayout>
      <Routes>
        <Route path="*" element={<Navigate to="/home" state={{ from: location }} />} />
        <Route path="/home" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/dashboard" element={<RequireAuth><Dashboard /></RequireAuth>} />
      </Routes>
    </MainLayout>
  )
}
