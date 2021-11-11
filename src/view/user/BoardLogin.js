import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Form, Button, Alert } from 'react-bootstrap';
import { useSelector, useDispatch } from 'react-redux';
import {
  setToken,
  setUser,
  getToken
} from '../../features/user/userSlice';

import { boardLogin } from '../../service/ManagerService';

export function BoardLogin() {

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const token = useSelector(getToken);

  const [validated, setValidated] = useState(false);
  const [buildingCode, setBuildingCode] = useState('');
  const [password, setPassword] = useState('');
  const [errorMsg, setErrorMsg] = useState(null);

  const handleSubmit = (event) => {
    event.preventDefault();
    event.stopPropagation();

    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      return;
    }

    setValidated(true);
    boardLogin(buildingCode, password).then((response) => {
      const { type, message, building, token } = response.data;

      if (type == "S_OK") {
        navigate('/board/view/' + building.building_id + '/' + token);
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
      <h4>Enter Building Code & Password</h4>
      <Form noValidate onSubmit={handleSubmit} validated={validated}>
        {errorMsg && (<Alert variant={'warning'}>{errorMsg}</Alert>)}
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Building Code</Form.Label>
          <Form.Control type="text" placeholder="Enter the building code" onChange={e => { setErrorMsg(null); setBuildingCode(e.target.value) }} required />
          <Form.Control.Feedback type="invalid">
            Please enter the building code.
          </Form.Control.Feedback>
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control type="password" placeholder="Password" onChange={e => { setErrorMsg(null); setPassword(e.target.value) }} required />
          <Form.Control.Feedback type="invalid">
            Please enter the password.
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
