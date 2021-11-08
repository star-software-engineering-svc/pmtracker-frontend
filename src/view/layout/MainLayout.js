import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { Routes, Route, Navigate, useLocation } from "react-router-dom";

import { Home } from '../home/Home';
import { Login } from '../home/Login';
import { Dashboard } from '../home/Dashboard';
import { RequireAuth } from '../auth/RequireAuth';

import { Navbar, Container, Nav, NavDropdown } from 'react-bootstrap';

import { getUser, getToken } from '../../features/user/userSlice';

export const MainLayout = ({ children }) => {
  const token = useSelector(getToken);
  const user = useSelector(getUser);

  return (
    <>
      <div className="tw-container-fluid tw-mx-auto mainbody">
        <header>
          <Navbar bg="light" expand="lg">
            <Container fluid>
              <Navbar.Brand href="/">
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
                  <Nav.Link href="/dashboard">Home</Nav.Link>
                  <Nav.Link href="/buildings">View Buildings</Nav.Link>
                  <Nav.Link href="/new-building">Request New Building</Nav.Link>
                  <NavDropdown title={user.name} id="basic-nav-dropdown" align={'end'}>
                    <NavDropdown.Item href="/my-profile">My ccount</NavDropdown.Item>
                    <NavDropdown.Divider />
                    <NavDropdown.Item href="/sign-out">Sign Out</NavDropdown.Item>
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
              Site by&nbsp;<a href="https://starwebprogramming.com">StarWebProgramming.com <img className="tw-inline" src="http://localhost:8894/images/star3.png" /></a>
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
