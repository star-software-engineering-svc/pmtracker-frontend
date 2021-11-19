import React from 'react';

import { Modal, Button } from 'react-bootstrap';

export function TicketSubmitModal({ shown, handleClose, ticket }) {
  return (
    <>
      <Modal show={shown} onHide={handleClose} size="md">
        <Modal.Header closeButton>
          <Modal.Title>Ticket Submit Result</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div>
            <div>Your confirmation/ tracking number is: <span className="tw-font-medium">{ticket.code}</span></div>
            <div>You will also receive an email of this confirmation/ tracking number which you may follow up with online. </div>
            <div className="tw-font-medium">PLEASE BE SURE TO CHECK YOUR SPAM FOLDER FOR THE INITIAL EMAIL FROM US</div>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={handleClose}>Close</Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}
