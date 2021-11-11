import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate, useParams, Link } from 'react-router-dom';
import {
  getToken,
  getUser,
  setToken,
  setUser
} from '../../features/user/userSlice';

import { Button, Form, Row, Col, Table, InputGroup } from 'react-bootstrap';
import 'react-confirm-alert/src/react-confirm-alert.css';

import { getCarriers, updateProfile } from '../../service/ManagerService';

import { info, warning } from '../helper/snack';

import * as yup from 'yup';
import { Formik } from 'formik';

const phoneRegExp = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im
const schema = yup.object().shape({
  name: yup.string().required(),
  company_name: yup.string(),
  email: yup.string().email().required(),
  password: yup.string(),
  repassword: yup.string().oneOf([yup.ref('password'), null], 'Passwords must match.'),
  address: yup.string(),
  city: yup.string(),
  state: yup.string(),
  zip: yup.string(),
  cell_phone: yup.string().matches(phoneRegExp, 'Cell number is not valid'),
  work_phone: yup.string(),
  carrier_id: yup.number().required()
});


export function ManagerProfile() {

  const dispatch = useDispatch();
  const token = useSelector(getToken);
  const user = useSelector(getUser);
  const navigate = useNavigate();

  const [myinfo, setMyInfo] = useState(user);
  const [carriers, setCarriers] = useState([]);

  const onCreate = (values, resetForm) => {

    updateProfile(token, values).then(response => {
      const { type, new_user_info, message } = response.data;
      if (type == "S_OK") {
        dispatch(setUser(new_user_info));
        info(message);
      } else {
        warning(message);
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

  useEffect(() => {
    getCarriers(token).then(response => {
      const { type, carriers } = response.data;
      setCarriers(carriers);
    }).catch((error) => {
      const { status, data } = error.response;
      if (status == 401) {
        dispatch(setToken(null));
        dispatch(setUser(null));
      } else {
        warning(data.message);
      }
    });
  }, []);

  return (
    <div className="tw-container tw-mx-auto">
      <div className="tw-m-3 tw-p-3 tw-rounded-lg tw-bg-green-100">
        <div className="tw-text-center tw-p-5">
          <span className="tw-text-xl">Your Account Information</span>
        </div>

        <Formik
          validationSchema={schema}
          onSubmit={(values, { setSubmitting, resetForm }) => {
            onCreate(values, resetForm);
          }}
          initialValues={{
            name: myinfo.name,
            company_name: myinfo.company_name,
            email: myinfo.email,
            password: '',
            repassword: '',
            address: myinfo.address,
            city: myinfo.city,
            state: myinfo.state,
            zip: myinfo.zip,
            cell_phone: myinfo.cell_phone,
            work_phone: myinfo.work_phone,
            carrier_id: myinfo.carrier_id
          }}
        >
          {({
            handleSubmit,
            handleChange,
            handleBlur,
            values,
            touched,
            isValid,
            errors,
          }) => (
            <Form noValidate onSubmit={handleSubmit} autoComplete="off">
              <div className="tw-grid tw-grid-cols-1 lg:tw-grid-cols-5">
                <div className="tw-p-2">
                </div>
                <div className="tw-p-2 lg:tw-col-span-3">
                  <Row>
                    <Col md={6}>
                      <Form.Group className="mb-3" controlId="name">
                        <Form.Label>Your Name<span className="tw-text-red-500">*</span></Form.Label>
                        <Form.Control type="text" name="name" isInvalid={!!errors.name} value={values.name} onChange={handleChange} />
                        <Form.Control.Feedback type="invalid">{errors.name}</Form.Control.Feedback>
                      </Form.Group>
                    </Col>
                    <Col md={6}>
                      <Form.Group className="mb-3" controlId="company_name">
                        <Form.Label>Company Name</Form.Label>
                        <Form.Control type="text" name="company_name" isInvalid={!!errors.company_name} value={values.company_name} onChange={handleChange} />
                        <Form.Control.Feedback type="invalid">{errors.company_name}</Form.Control.Feedback>
                      </Form.Group>
                    </Col>

                    <Col md={6}>
                      <Form.Group className="mb-3" controlId="email">
                        <Form.Label>Your Email<span className="tw-text-red-500">*</span></Form.Label>
                        <Form.Control type="text" name="email" isInvalid={!!errors.email} value={values.email} onChange={handleChange} />
                        <Form.Control.Feedback type="invalid">{errors.email}</Form.Control.Feedback>
                      </Form.Group>
                    </Col>
                    <Col md={6}>
                    </Col>
                    <Col md={6}>
                      <Form.Group className="mb-3" controlId="email">
                        <Form.Label>Your Password</Form.Label>
                        <Form.Control type="password" name="password" isInvalid={!!errors.password} value={values.password} onChange={handleChange} />
                        <Form.Control.Feedback type="invalid">{errors.password}</Form.Control.Feedback>
                      </Form.Group>
                    </Col>
                    <Col md={6}>
                      <Form.Group className="mb-3" controlId="email">
                        <Form.Label>Retype Password</Form.Label>
                        <Form.Control type="password" name="repassword" isInvalid={!!errors.repassword} value={values.repassword} onChange={handleChange} />
                        <Form.Control.Feedback type="invalid">{errors.repassword}</Form.Control.Feedback>
                      </Form.Group>
                    </Col>
                    <Col md={12}>
                      <Form.Group className="mb-3" controlId="address">
                        <Form.Label>Address</Form.Label>
                        <Form.Control type="text" name="address" isInvalid={!!errors.address} value={values.address} onChange={handleChange} />
                        <Form.Control.Feedback type="invalid">{errors.address}</Form.Control.Feedback>
                      </Form.Group>
                    </Col>
                    <Col md={4}>
                      <Form.Group className="mb-3" controlId="city">
                        <Form.Label>City</Form.Label>
                        <Form.Control type="text" name="city" isInvalid={!!errors.city} value={values.city} onChange={handleChange} />
                      </Form.Group>
                    </Col>
                    <Col md={4}>
                      <Form.Group className="mb-3" controlId="zip">
                        <Form.Label>Zip Code</Form.Label>
                        <Form.Control type="text" name="zip" isInvalid={!!errors.zip} value={values.zip} onChange={handleChange} />
                      </Form.Group>
                    </Col>
                    <Col md={4}>
                      <Form.Group className="mb-3" controlId="state">
                        <Form.Label>State</Form.Label>
                        <Form.Select aria-label="" name="state" isInvalid={!!errors.state} value={values.state} onChange={handleChange}>
                          <option value=""></option>
                          <option value="AL">Alabama</option>
                          <option value="AK">Alaska</option>
                          <option value="AZ">Arizona</option>
                          <option value="AR">Arkansas</option>
                          <option value="CA">California</option>
                          <option value="CO">Colorado</option>
                          <option value="CT">Connecticut</option>
                          <option value="DC">District of Columbia</option>
                          <option value="DE">Delaware</option>
                          <option value="FL">Florida</option>
                          <option value="GA">Georgia</option>
                          <option value="HI">Hawaii</option>
                          <option value="ID">Idaho</option>
                          <option value="IL">Illinois</option>
                          <option value="IN">Indiana</option>
                          <option value="IA">Iowa</option>
                          <option value="KS">Kansas</option>
                          <option value="KY">Kentucky</option>
                          <option value="LA">Louisiana</option>
                          <option value="ME">Maine</option>
                          <option value="MD">Maryland</option>
                          <option value="MA">Massachusetts</option>
                          <option value="MI">Michigan</option>
                          <option value="MN">Minnesota</option>
                          <option value="MS">Mississippi</option>
                          <option value="MO">Missouri</option>
                          <option value="MT">Montana</option>
                          <option value="NE">Nebraska</option>
                          <option value="NV">Nevada</option>
                          <option value="NH">New Hampshire</option>
                          <option value="NJ">New Jersey</option>
                          <option value="NM">New Mexico</option>
                          <option value="NY">New York</option>
                          <option value="NC">North Carolina</option>
                          <option value="ND">North Dakota</option>
                          <option value="OH">Ohio</option>
                          <option value="OK">Oklahoma</option>
                          <option value="OR">Oregon</option>
                          <option value="PA">Pennsylvania</option>
                          <option value="RI">Rhode Island</option>
                          <option value="SC">South Carolina</option>
                          <option value="SD">South Dakota</option>
                          <option value="TN">Tennessee</option>
                          <option value="TX">Texas</option>
                          <option value="UT">Utah</option>
                          <option value="VT">Vermont</option>
                          <option value="VA">Virginia</option>
                          <option value="WA">Washington</option>
                          <option value="WV">West Virginia</option>
                          <option value="WI">Wisconsin</option>
                          <option value="WY">Wyoming</option>
                        </Form.Select>
                      </Form.Group>
                    </Col>
                    <Col md={6}>
                      <Form.Group className="mb-3" controlId="cell_phone">
                        <Form.Label>Cell Phone<span className="tw-text-red-500">*</span></Form.Label>
                        <Form.Control type="text" name="cell_phone" isInvalid={!!errors.cell_phone} value={values.cell_phone} onChange={handleChange} />
                        <Form.Control.Feedback type="invalid">{errors.cell_phone}</Form.Control.Feedback>
                      </Form.Group>
                    </Col>
                    <Col md={6}>
                      <Form.Group className="mb-3" controlId="cell_phone">
                        <Form.Label>Work Phone</Form.Label>
                        <Form.Control type="text" name="cell_phone" isInvalid={!!errors.work_phone} value={values.work_phone} onChange={handleChange} />
                        <Form.Control.Feedback type="invalid">{errors.work_phone}</Form.Control.Feedback>
                      </Form.Group>
                    </Col>
                    <Col md={6}>
                      <Form.Group className="mb-3" controlId="carrier_id">
                        <Form.Label>Carrier<span className="tw-text-red-500">*</span></Form.Label>
                        <Form.Select aria-label="" name="carrier_id" isInvalid={!!errors.carrier_id} value={values.carrier_id} onChange={handleChange}>
                          <option value=""></option>
                          {carriers.map(c => {
                            return (<option key={c.carrier_id} value={c.carrier_id}>{c.name}</option>);
                          })}
                        </Form.Select>
                      </Form.Group>
                    </Col>
                    <Col md={12}>
                      <div className="tw-flex tw-flex-column tw-justify-end">
                        <Button type="submit"><i className="fas fa-save"></i>&nbsp; Submit</Button>
                      </div>
                    </Col>
                  </Row>
                </div>
                <div className="tw-p-2">
                </div>
              </div>
            </Form>
          )}
        </Formik>
      </div >
    </div >
  );
}
