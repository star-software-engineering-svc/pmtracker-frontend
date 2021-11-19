import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Form, Button, Alert } from 'react-bootstrap';
import { useSelector, useDispatch } from 'react-redux';
import {
  setToken,
  setUser,
  getToken
} from '../../features/user/userSlice';

import { ticketLogin } from '../../service/ManagerService';

export function TrackLogin() {

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const token = useSelector(getToken);

  const [validated, setValidated] = useState(false);
  const [ticketCode, setTicketCode] = useState('');
  const [email, setEmail] = useState('');
  const [errorMsg, setErrorMsg] = useState(null);

  const handleSubmit = (event) => {
    event.preventDefault();
    event.stopPropagation();

    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      return;
    }

    setValidated(true);
    ticketLogin(ticketCode, email).then((response) => {
      const { type, message, ticket, token } = response.data;

      if (type == "S_OK") {
        navigate('/track/view/' + ticket.ticket_id + '/' + token);
      } else {
        setErrorMsg(message);
      }
    }).catch((error) => {
      console.log(error);
      if (error.response.status == 422 || error.response.status == 401) {
        setErrorMsg('Please enter the correct code and pasword.');
      }
    });
  }

  return (
    <div className="login-container tw-bg-gray-100">
      <h4>Enter Ticket Details Below</h4>
      <Form noValidate onSubmit={handleSubmit} validated={validated}>
        {errorMsg && (<Alert variant={'warning'}>{errorMsg}</Alert>)}
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Ticket Code</Form.Label>
          <Form.Control type="text" placeholder="Enter the ticket code" onChange={e => { setErrorMsg(null); setTicketCode(e.target.value) }} required />
          <Form.Control.Feedback type="invalid">
            Please enter the building code.
          </Form.Control.Feedback>
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Your Email</Form.Label>
          <Form.Control type="text" placeholder="Your email address" onChange={e => { setErrorMsg(null); setEmail(e.target.value) }} required />
          <Form.Control.Feedback type="invalid">
            Please enter the email.
          </Form.Control.Feedback>
        </Form.Group>

        <div className="tw-flex tw-flex-row tw-justify-end">
          <Button variant="primary" type="submit">
            Submit
          </Button>
        </div>
      </Form>
    </div>
  );
}
