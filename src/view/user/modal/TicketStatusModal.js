import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { Modal, Button, Form } from 'react-bootstrap';
import { updateTicketStatus } from '../../../service/ManagerService';
import { getToken, setToken, setUser } from '../../../features/user/userSlice';

import { warning } from '../../helper/snack';

export function TicketStatusModal({ shown, handleClose, ticket, onSuccess }) {

  const dispatch = useDispatch();
  const token = useSelector(getToken);

  const [status, setStatus] = useState(ticket.ticket_status_id);
  const onChangeStatus = (event) => {
    setStatus(event.target.value);
  }
  const onUpdateStatus = () => {
    updateTicketStatus(token, ticket.ticket_id, status).then(response => {
      console.log(response);
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
          <Modal.Title>Update Ticket Status</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div>
            <div className="tw-font-medium">Ticket Information</div>
            <div>Resident Name: {ticket.resident_name}</div>
            <div>Ticket Code: {ticket.code}</div>
            <div>Unit #: {ticket.unit_number}</div>
            <div>Cell #: {ticket.cell_phone}</div>
          </div>
          <Form.Group controlId="cmb_status">
            <Form.Label>Status</Form.Label>
            <Form.Select defaultValue={ticket.ticket_status_id} onChange={onChangeStatus}>
              <option value={1}>Open</option>
              <option value={2}>Pending</option>
              <option value={3}>Closed</option>
            </Form.Select>
          </Form.Group>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={onUpdateStatus}>Update</Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}
