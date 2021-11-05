import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { Container, Modal, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';

import { ReportTrackModal } from './modal/ReportTrackModal';
import { CallPmTrackModal } from './modal/CallPmTrackModal';

export function Home() {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [showCall, setShowCall] = useState(false);
  const handleCloseCall = () => setShowCall(false);
  const handleShowCall = () => {
    setShow(false);
    setShowCall(true);
  }

  return (
    <Container>
      <div className="">
        <div className="tw-text-2xl tw-text-green-400 tw-p-2 tw-text-center">Welcome. Choose your category and connect now!</div>
      </div>
      <div className="bg-color2 tw-p-20 text-center">
        <div className="center-block home-click-block" onClick={handleShow}>
          <div>
            <i className="fa fa-female fa-5x"></i>
            <i className="fa fa-male fa-5x"></i>
          </div>
          <div className="tw-text-3xl">
            Residents or Shareholders
          </div>
          <div className="tw-text-4xl tw-font-medium">
            Report or track an issue
          </div>
        </div>
      </div>
      <div className="tw-text-center tw-grid tw-grid-cols-3 tw-gap-1 mt-1">
        <div className="tw-p-10 tw-bg-green-300 home-click-block">
          <i className="fa fa-dot-circle-o fa-5x" />
          <div className="tw-text-2xl">Property Managers</div>
        </div>
        <div className="tw-p-10 tw-bg-green-300 home-click-block">
          <i className="fa fa-suitcase fa-5x" />
          <div className="tw-text-2xl">Board Members/<br />Building Owners</div>
        </div>
        <div className="tw-p-10 tw-bg-green-300 home-click-block">
          <i className="fa fa-envelope-o fa-5x" />
          <div className="tw-text-2xl">About Us</div>
        </div>
      </div >

      <ReportTrackModal show={show} handleClose={handleClose} handleShowCall={handleShowCall}></ReportTrackModal>
      <CallPmTrackModal show={showCall} handleClose={handleCloseCall}></CallPmTrackModal>
    </Container>
  );
}
