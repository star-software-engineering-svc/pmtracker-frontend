import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Form, Button, Alert } from 'react-bootstrap';
import { useSelector, useDispatch } from 'react-redux';
import {
  setToken,
  setUser,
  getToken
} from '../../features/user/userSlice';

import { login } from '../../service/ManagerService';

export function Login() {

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const token = useSelector(getToken);

  const [validated, setValidated] = useState(false);
  const [email, setEmail] = useState('');
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
    login(email, password).then((response) => {
      console.log(response.data);
      dispatch(setToken(response.data.access_token));
      dispatch(setUser(response.data.user));

      navigate('/dashboard');
    }).catch((error) => {
      console.log(error.response.status);
      if (error.response.status == 422 || error.response.status == 401) {
        setErrorMsg('Please enter the correct email and pasword.');
      }
    });
  }

  return (
    <div className="login-container tw-bg-gray-100">
      <h2>Sign In as <span className="tw-text-green-500">Manager</span></h2>
      <Form noValidate onSubmit={handleSubmit} validated={validated}>
        {errorMsg && (<Alert variant={'warning'}>{errorMsg}</Alert>)}
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control type="email" placeholder="Enter email" onChange={e => { setErrorMsg(null); setEmail(e.target.value) }} required />
          <Form.Control.Feedback type="invalid">
            Please enter your email.
          </Form.Control.Feedback>
          <Form.Text className="text-muted">
            We'll never share your email with anyone else.
          </Form.Text>
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
        <div className="tw-flex tw-flex-row tw-justify-end">
          <Link to="/admin/login">Sign in as an administrator</Link>
        </div>
        <div className="tw-flex tw-flex-row tw-justify-center tw-mt-5">
          If you don't have an account,&nbsp;<Link to="/register">click here.</Link>
        </div>
      </Form >
    </div >
  );
}
