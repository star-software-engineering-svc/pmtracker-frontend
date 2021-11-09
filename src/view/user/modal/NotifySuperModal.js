import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { Modal, Button, Form } from 'react-bootstrap';
import { getToken, setToken, setUser } from '../../../features/user/userSlice';

import { warning } from '../../helper/snack';
import { notifySuper } from '../../../service/ManagerService';

import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

export function NotifySuperModal({ shown, handleClose, ticket, onSuccess }) {

  const dispatch = useDispatch();
  const token = useSelector(getToken);

  const onSave = () => {
    notifySuper(token, ticket.ticket_id, message).then(response => {
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

  const [message, setMessage] = useState('');

  return (
    <>
      <Modal show={shown} onHide={handleClose} size="lg">
        <Modal.Header closeButton>
          <Modal.Title>Update Ticket Status</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {((ticket.cell_phone == "" || ticket.domain == "") && ticket.supers_email == "") && (<div className="tw-text-red-300">
            There is inadequate Contact Information on file to send the Superintendant a message.<br /><br />
            Please be sure that either the Super's <strong>cell phone and cell phone carrier</strong> or their <strong>email address</strong> have been added before using this function.
          </div>)}
          <div>
            <div>Super's Name: {ticket.supers_name}</div>
            <div>Super's Cell #: {ticket.supers_cell}</div>
            <div className="tw-font-medium">Ticket Information</div>
            <div>Resident Name: {ticket.resident_name}</div>
            <div>Resident Phone: {ticket.cell_phone}</div>
            <div>Unit #: {ticket.unit_number}</div>
            <div>Ticket Code #: {ticket.code}</div>
          </div>
          <ReactQuill theme="snow" value={message} onChange={setMessage} />
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={onSave}>Save</Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}
