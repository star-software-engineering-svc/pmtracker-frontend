import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { Modal, Button, Form } from 'react-bootstrap';
import { getToken, setToken, getUser, setUser } from '../../../features/user/userSlice';

import { warning } from '../../helper/snack';
import { addInternalNote } from '../../../service/ManagerService';

export function InternalNoteModal({ shown, handleClose, ticket, onSuccess }) {

  const dispatch = useDispatch();
  const token = useSelector(getToken);
  const user = useSelector(getUser);

  const [message, setMessage] = useState("");
  const onChangeMessage = (event) => {
    setMessage(event.target.value);
  }

  const [cost, setCost] = useState("");
  const onChangeCost = (event) => {
    setCost(event.target.value);
  }

  const onSave = () => {
    addInternalNote(token, user.permission, ticket.ticket_id, cost, message).then(response => {
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
          <Modal.Title>Internal Note</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div>
            <div className="tw-font-medium">Ticket Information</div>
            <div>Building ID: {ticket.building_id}</div>
            <div>Ticket ID: {ticket.ticket_id}</div>
            <div>Resident Name: {ticket.resident_name}</div>
            <div>Resident Phone: {ticket.cell_phone}</div>
            <div>Unit #: {ticket.unit_number}</div>
            <div>Ticket Code #: {ticket.code}</div>
          </div>
          <Form.Group className="mb-3" controlId="txt_description">
            <Form.Label>Cost</Form.Label>
            <Form.Control as="input" onChange={onChangeCost} />
          </Form.Group>
          <Form.Group className="mb-3" controlId="txt_description">
            <Form.Label>Message</Form.Label>
            <Form.Control as="textarea" rows={3} onChange={onChangeMessage} />
          </Form.Group>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={onSave}>Save</Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}
