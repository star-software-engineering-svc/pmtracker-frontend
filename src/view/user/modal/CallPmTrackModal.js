import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { Modal, Button } from 'react-bootstrap';

export function CallPmTrackModal({ show, handleClose }) {
  return (
    <>
      <Modal show={show} onHide={handleClose} size="sm">
        <Modal.Header closeButton>
          <Modal.Title>PM Tracker</Modal.Title>
        </Modal.Header>
        <Modal.Body className="tw-bg-blue-100">
          <div className="tw-text-center">
            <span className="tw-text-lg tw-font-medium">Call</span><br />
            <span className="tw-text-3xl tw-font-medium tw-text-blue-700">844-PMTRACK</span><br />
            <span className="tw-text-2xl tw-font-medium">(844-768-7225)</span>
          </div>
          <div className="tw-flex tw-flex-row tw-justify-center">
            <img src="http://http://pmtrackerv2.com/images/big-phone.png" />
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
}
