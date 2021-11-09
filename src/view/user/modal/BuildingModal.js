import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { Modal, Button } from 'react-bootstrap';

export function BuildingModal({ show, handleClose, building }) {

  return (
    <>
      <Modal show={show} onHide={handleClose} size="lg">
        <Modal.Header closeButton>
          <Modal.Title>Building Detail: {building.name}</Modal.Title>
        </Modal.Header>
        <Modal.Body>

        </Modal.Body>
      </Modal>
    </>
  );
}
