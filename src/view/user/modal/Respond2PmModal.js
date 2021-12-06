import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { Modal, Button, Form } from 'react-bootstrap';
import { getToken, setToken, getUser, setUser } from '../../../features/user/userSlice';

import { warning } from '../../helper/snack';
import { sendMsg2Pm } from '../../../service/ManagerService';

export function Respond2PmModal({ shown, handleClose, ticket, token, onSuccess }) {

  const dispatch = useDispatch();
  const [message, setMessage] = useState("");
  const onChangeMessage = (event) => {
    setMessage(event.target.value);
  }

  const onSave = () => {
    sendMsg2Pm(token, ticket.ticket_id, message).then(response => {
      const { type } = response.data;
      if (type == "S_OK") {
        onSuccess();
      }
    }).catch((error) => {
      const { status, data } = error.response;
      if (status == 401) {
        dispatch(setToken(null));
        dispatch(setUser(null));
      } else {
        warning(data.message);
      }
    });
  }

  return (
    <>
      <Modal show={shown} onHide={handleClose} size="md">
        <Modal.Header closeButton>
          <Modal.Title>Respond to Property Manager</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div>
            <div className="tw-font-medium">Ticket Information</div>
            <div>Ticket ID: {ticket.ticket_id}</div>
            <div>Resident Name: {ticket.resident_name}</div>
            <div>Resident Phone: {ticket.cell_phone}</div>
            <div>Unit #: {ticket.unit_number}</div>
            <div>Ticket Code #: {ticket.code}</div>
          </div>
          <Form.Group className="mb-3" controlId="txt_description">
            <Form.Label>Message</Form.Label>
            <Form.Control as="textarea" rows={3} onChange={onChangeMessage} />
          </Form.Group>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={onSave}>Send</Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}
