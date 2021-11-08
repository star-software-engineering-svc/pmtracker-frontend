import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import {
  setToken,
  setUser,
  getToken
} from '../../features/user/userSlice';

import { login } from '../../service/AuthService';

import { Form, Button } from 'react-bootstrap';

export function Login() {

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const token = useSelector(getToken);

  const [validated, setValidated] = useState(false);

  const handleSubmit = (event) => {
    event.preventDefault();
    event.stopPropagation();

    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      return;
    }

    setValidated(true);
    login('tomracanelli@outlook.com', '123456').then((response) => {
      console.log(response.data);
      dispatch(setToken(response.data.access_token));
      dispatch(setUser(response.data.user));

      navigate('/dashboard');
    });
  }

  return (
    <div className="login-container tw-bg-gray-100">
      <h2>Sign In</h2>
      {token}
      <Form noValidate onSubmit={handleSubmit} validated={validated}>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control type="email" placeholder="Enter email" required />
          <Form.Control.Feedback type="invalid">
            Please enter your email.
          </Form.Control.Feedback>
          <Form.Text className="text-muted">
            We'll never share your email with anyone else.
          </Form.Text>
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control type="password" placeholder="Password" required />
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
