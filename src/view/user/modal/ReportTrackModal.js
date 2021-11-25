import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router';

import { Modal, Button } from 'react-bootstrap';

export function ReportTrackModal({ show, handleClose, handleShowCall }) {

  const navigate = useNavigate();
  const [view, setView] = useState(0);

  const [showCallModal, setShowCallModal] = useState(0);
  const onShowCallModal = () => {
    setShowCallModal(1);
  }

  const handleReport = () => {
    navigate("/ticket/new");
  }

  const handleTrack = () => {
    navigate("/track/login");
  }

  return (
    <>
      <Modal show={show} onShow={() => setView(0)} onHide={handleClose} size="md">
        <Modal.Header closeButton>
          <Modal.Title>PM Tracker</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {view == 0 && (
            <>
              <div className="tw-text-yellow-600 tw-text-2xl tw-pt-4 tw-pb-4 tw-font-medium text-center">
                Reporting/Tracking an Issue&nbsp;<i className="fas fa-exclamation-triangle"></i>
              </div>
              <div className="tw-text-xl p-2 tw-flex tw-flex-row">
                <div className="tw-pr-3"><i className="far fa-hand-point-right"></i></div>
                <div>If this is an <span className="tw-text-red-500">Emergency</span>, please call <span className="tw-text-red-500 tw-text-2xl tw-font-medium">911</span>.</div>
              </div>
              <hr />
              <div className="tw-text-xl p-2 tw-flex tw-flex-row">
                <div className="tw-pr-3"><i className="far fa-hand-point-right"></i></div>
                <div>If there is a <span className="tw-font-medium">Flood</span>, call your <span className="tw-font-medium">Property Manager</span> or <span className="tw-font-medium">Super</span>.</div>
              </div>
              <hr />
              <div className="tw-text-xl p-2 tw-flex tw-flex-row">
                <div className="tw-pr-3"><i className="far fa-hand-point-right"></i></div>
                <div>If none of these apply, then continue to report or track an issue:</div>
              </div>
              <div className="tw-text-right">
                <Button onClick={() => setView(1)}>Continue</Button>
              </div>
            </>)
          }
          {view == 1 && (
            <>
              <div className="tw-pl-5">
                <div className="tw-flex tw-flex-row tw-justify-between pt-2">
                  <div><i className="fas fa-angle-right"></i>&nbsp;Report a <span style={{ color: '#005ca6' }}>New Issue</span> Online</div>
                  <div><Button className="tw-w-32" onClick={handleReport}>Report&nbsp;&nbsp;<i className="fas fa-clipboard-list"></i></Button></div>
                </div>
                <div className="tw-flex tw-flex-row tw-justify-between pt-2">
                  <div><i className="fas fa-angle-right"></i>&nbsp;Track an <span style={{ color: '#005ca6' }}>Existing Issue</span> Online</div>
                  <div><Button className="tw-w-32" onClick={handleTrack}>Track&nbsp;&nbsp;<i className="fas fa-route"></i></Button></div>
                </div>
                <div className="tw-flex tw-flex-row tw-justify-between pt-2">
                  <div><i className="fas fa-angle-right"></i>&nbsp;I prefer to <span className="tw-text-yellow-500">use the phone</span></div>
                  <div><Button className="tw-w-32" onClick={handleShowCall}>Call us&nbsp;&nbsp;<i className="fas fa-phone"></i></Button></div>
                </div>
              </div>
            </>
          )}
        </Modal.Body>
      </Modal>
    </>
  );
}
