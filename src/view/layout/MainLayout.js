import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { Routes, Route, Navigate, useNavigate, useLocation } from "react-router-dom";

import { Home } from '../user/Home';
import { Login } from '../user/Login';
import { Dashboard } from '../user/Dashboard';
import { RequireManager } from '../auth/RequireManager';

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
import { AdminLogin } from '../admin/AdminLogin';
import { AdminHome } from '../admin/AdminHome';
import { RequireAdmin } from '../auth/RequireAdmin';
import { ManagerProfile } from '../user/ManagerProfile';
import { AdminBuildings } from '../admin/AdminBuildings';
import { AdminManagers } from '../admin/AdminManagers';
import { ManagerForm } from '../user/ManagerForm';
import { Register } from '../user/Register';
import { ForceRedirectLoggedIn } from '../auth/ForceRedirectLoggedIn';
import { TrackLogin } from '../user/TrackLogin';
import { TicketTrackView } from '../user/TicketTrackView';

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
                    <img className="nav-logo" src="https://pmtrackerv2.com/images/logo.png" />
                  </div>
                  <div>
                    &nbsp;PROPERTY MANAGEMENT TRACKER
                  </div>
                </div>
              </Navbar.Brand>
              <Navbar.Toggle aria-controls="basic-navbar-nav" />
              <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="ms-auto">
                  {token && user && user.permission == 'manager' && (
                    <>
                      <Nav.Link href="/dashboard">Dashboard</Nav.Link>
                      <Nav.Link href="/buildings">View Buildings</Nav.Link>
                      <Nav.Link href="/building/new">Request New Building</Nav.Link>
                      {user && (<NavDropdown title={user.name} id="basic-nav-dropdown" align={'end'}>
                        <NavDropdown.Item href="/my-profile">My Profile</NavDropdown.Item>
                        <NavDropdown.Divider />
                        <NavDropdown.Item onClick={onSignOut}>Sign Out</NavDropdown.Item>
                      </NavDropdown>)}
                    </>)}
                  {token && user && user.permission == 'admin' && (
                    <>
                      <Nav.Link href="/admin/home">Dashboard</Nav.Link>
                      <Nav.Link href="/admin/buildings">Buildings</Nav.Link>
                      <Nav.Link href="/admin/ticket/new">Add Ticket</Nav.Link>
                      <Nav.Link href="/admin/managers">Managers</Nav.Link>
                      {user && (<NavDropdown title={user.name} id="basic-nav-dropdown" align={'end'}>
                        <NavDropdown.Item onClick={onSignOut}>Sign Out</NavDropdown.Item>
                      </NavDropdown>)}
                    </>)}
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
              Site by&nbsp;<a href="https://starwebprogramming.com" target="_blank">StarWebProgramming.com <img className="tw-inline" src="https://pmtrackerv2.com/images/star3.png" /></a>
            </div>
            <div className="tw-flex tw-flex-row tw-justify-center">
              <div className="tw-p-1">
                <a href="https://twitter.com/PM_Tracker" target="_blank"><i className="fab fa-twitter"></i></a>
              </div>
              <div className="tw-p-1">
                <a href="https://twitter.com/PM_Tracker" target="_blank"><i className="fab fa-facebook"></i></a>
              </div>
            </div>
          </div>
        </footer>
      </div>
    </>
  )
}

export const MainLayoutRoutes = ({ component: Component, ...rest }) => {
  let location = useLocation();
  return (
    <MainLayout>
      <Routes>
        <Route path="*" element={<Navigate to="/home" state={{ from: location }} />} />
        <Route path="/home" element={<Home />} />
        <Route path="/login" element={<ForceRedirectLoggedIn><Login /></ForceRedirectLoggedIn>} />
        <Route path="/register" element={<ForceRedirectLoggedIn><Register /></ForceRedirectLoggedIn>} />
        <Route path="/dashboard" element={<RequireManager><Dashboard /></RequireManager>} />
        <Route path="/buildings" element={<RequireManager><Buildings /></RequireManager>} />
        <Route path="/building/:building_id" element={<RequireManager><BuildingDetail /></RequireManager>} />
        <Route path="/building/new" element={<RequireManager><BuildingForm /></RequireManager>} />
        <Route path="/ticket/new" element={<TicketForm />} />
        <Route path="/note/new" element={<RequireManager><NoteForm /></RequireManager>} />
        <Route path="/my-profile" element={<RequireManager><ManagerProfile /></RequireManager>} />
        <Route path="/about" element={<AboutUs />} />
        <Route path="/terms" element={<Terms />} />

        <Route path="/board/login" element={<BoardLogin />} />
        <Route path="/board/view/:building_id/:board_token" element={<BoardView />} />

        <Route path="/track/login" element={<TrackLogin />} />
        <Route path="/track/view/:ticket_id/:ticket_token" element={<TicketTrackView />} />

        <Route path="/admin/login" element={<AdminLogin />} />
        <Route path="/admin/home" element={<RequireAdmin><AdminHome /></RequireAdmin>} />
        <Route path="/admin/ticket/new" element={<RequireAdmin><TicketForm /></RequireAdmin>} />
        <Route path="/admin/buildings" element={<RequireAdmin><AdminBuildings /></RequireAdmin>} />
        <Route path="/admin/building/:building_id" element={<RequireAdmin><BuildingDetail /></RequireAdmin>} />
        <Route path="/admin/building/new" element={<RequireAdmin><BuildingForm /></RequireAdmin>} />
        <Route path="/admin/building/edit/:building_id" element={<RequireAdmin><BuildingForm /></RequireAdmin>} />
        <Route path="/admin/managers" element={<RequireAdmin><AdminManagers /></RequireAdmin>} />
        <Route path="/admin/manager/new" element={<RequireAdmin><ManagerForm /></RequireAdmin>} />
        <Route path="/admin/manager/edit/:manager_id" element={<RequireAdmin><ManagerForm /></RequireAdmin>} />
      </Routes>
    </MainLayout>
  )
}
