import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { Routes, Route, Navigate, useNavigate, useLocation } from "react-router-dom";

import { Home } from '../user/Home';
import { Login } from '../user/Login';
import { Dashboard } from '../user/Dashboard';
import { RequireAuth } from '../auth/RequireAuth';

import { Navbar, Container, Nav, NavDropdown } from 'react-bootstrap';

import { getUser, getToken, setUser, setToken } from '../../features/user/userSlice';
import { Buildings } from '../user/Buildings';
import { BuildingDetail } from '../user/BuildingDetail';
import { BuildingForm } from '../user/BuildingForm';
import { TicketForm } from '../user/TicketForm';
import { NoteForm } from '../user/NoteForm';
import { AboutUs } from '../user/AboutUs';
import { Terms } from '../user/Terms';
import { BoardLogin } from '../user/BoardLogin';
import { BoardView } from '../user/BoardView';

export const MainLayout = ({ children }) => {
  const token = useSelector(getToken);
  const user = useSelector(getUser);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const onSignOut = () => {
    console.log("sign out");
    dispatch(setUser(null));
    dispatch(setToken(null));

    navigate("/home");
  }

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
                  {token && (<><Nav.Link href="/dashboard">Dashboard</Nav.Link>
                    <Nav.Link href="/buildings">View Buildings</Nav.Link>
                    <Nav.Link href="/building/new">Request New Building</Nav.Link>
                    {user && (<NavDropdown title={user.name} id="basic-nav-dropdown" align={'end'}>
                      <NavDropdown.Item href="/my-profile">My ccount</NavDropdown.Item>
                      <NavDropdown.Divider />
                      <NavDropdown.Item onClick={onSignOut}>Sign Out</NavDropdown.Item>
                    </NavDropdown>)}</>)}
                  {!token && (<><Nav.Link href="/login">Login</Nav.Link></>)}
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
        <Route path="/buildings" element={<RequireAuth><Buildings /></RequireAuth>} />
        <Route path="/building/:building_id" element={<RequireAuth><BuildingDetail /></RequireAuth>} />
        <Route path="/building/new" element={<RequireAuth><BuildingForm /></RequireAuth>} />
        <Route path="/ticket/new" element={<RequireAuth><TicketForm /></RequireAuth>} />
        <Route path="/note/new" element={<RequireAuth><NoteForm /></RequireAuth>} />
        <Route path="/about" element={<AboutUs />} />
        <Route path="/terms" element={<Terms />} />

        <Route path="/board/login" element={<BoardLogin />} />
        <Route path="/board/view/:building_id/:board_token" element={<BoardView />} />
      </Routes>
    </MainLayout>
  )
}
