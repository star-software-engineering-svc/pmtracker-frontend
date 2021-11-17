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
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';

import { getCarriers, createBuilding, getBuilding } from '../../service/ManagerService';
import { info, warning } from '../helper/snack';

import * as yup from 'yup';
import { Formik } from 'formik';
import { getManagerList } from '../../service/AdminService';


const phoneRegExp = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im

export function BuildingForm() {

  let { building_id } = useParams();

  console.log(building_id);

  const dispatch = useDispatch();
  const token = useSelector(getToken);
  const user = useSelector(getUser);
  const navigate = useNavigate();

  /*
  const [moreBoardMName, setMoreBoardMName] = useState('');
  const [moreBoardMEmail, setMoreBoardMEmail] = useState('');
  const [moreBoardMEmailAlert, setMoreBoardMEmailAlert] = useState(false);

  const [moreBoardMembers, setMoreBoardMembers] = useState([]);
  */
  const [carriers, setCarriers] = useState([]);

  const [more_bname_valid, setMoreBnameValid] = useState(false);
  const [more_bemail_valid, setMoreBemailValid] = useState(false);

  const [managers, setManagers] = useState([]);
  const [building, setBuilding] = useState({});

  let schema = yup.object().shape({
    name: yup.string().required(),
    address: yup.string().required(),
    city: yup.string().required(),
    zip: yup.string().required(),
    terms: yup.bool().required().oneOf([true, 1, 'checked', 'on'], 'Terms must be accepted'),
    board_m_name: yup.string().required(),
    board_m_email: yup.string().email().required(),
    phone: yup.string().matches(phoneRegExp, 'Phone number is not valid'),
    supers_cell: yup.string().matches(phoneRegExp, 'Phone number is not valid'),
    board_m_phone: yup.string().matches(phoneRegExp, 'Phone number is not valid'),
    password: yup.string(),
    repassword: yup.string().oneOf([yup.ref('password'), null], 'Passwords must match'),
  });

  if (user.permission == "admin")
    schema = yup.object().shape({
      name: yup.string().required(),
      address: yup.string().required(),
      city: yup.string().required(),
      zip: yup.string().required(),
      terms: yup.bool().required().oneOf([true, 1, 'checked', 'on'], 'Terms must be accepted'),
      board_m_name: yup.string().required(),
      board_m_email: yup.string().email().required(),
      phone: yup.string().matches(phoneRegExp, 'Phone number is not valid'),
      supers_cell: yup.string().matches(phoneRegExp, 'Phone number is not valid'),
      board_m_phone: yup.string().matches(phoneRegExp, 'Phone number is not valid'),
      password: yup.string(),
      repassword: yup.string().oneOf([yup.ref('password'), null], 'Passwords must match'),
      manager_id: yup.string().required(),
    });

  /*
const onAddBoardMember = () => {

  const sch = yup.object().shape({
    name: yup.string().required(),
    email: yup.string().email().required()
  });
  setMoreBnameValid(false);
  setMoreBemailValid(false);

  let result = sch.validate({ name: moreBoardMName, email: moreBoardMEmail }, { abortEarly: false }).then(valid => {
    console.log(valid);
    let result = {
      name: moreBoardMName,
      email: moreBoardMEmail,
      email_alerts: moreBoardMEmailAlert
    };

    const found = moreBoardMembers.find(element => element.board_m_email == moreBoardMEmail);
    if (found) {
      info("The email is already added.");
      return;
    }

    setMoreBoardMembers([...moreBoardMembers, result]);

    setMoreBoardMName('');
    setMoreBoardMEmail('');
    setMoreBoardMEmailAlert(false);
  }).catch((err, d) => {
    console.log(err.errors, err.path, err.value);
    if (err.errors[0].indexOf("name") >= 0) {
      setMoreBnameValid(true);
    }
    if (err.errors[0].indexOf("email") >= 0 || err.errors[1].indexOf("email") >= 0) {
      setMoreBemailValid(true);
    }
  });
};
  const onDeleteMoreBM = (index) => {
    let result = moreBoardMembers.filter((bm, idx) => {
      return index != idx;
    });
    setMoreBoardMembers(result);
  }
*/

  const onCreate = (values, resetForm) => {
    //values['more_board_members'] = moreBoardMembers;
    createBuilding(token, user.permission, values).then(response => {
      const { type, message } = response.data;
      if (type == "S_OK") {
        if (building_id) {
          info("The building info is updated successfully.");
        } else {
          //setBuilding({});
          //resetForm({});
          //setMoreBoardMembers([]);
          if (user.permission == 'admin') {
            navigate('/admin/buildings');
          } else {
            navigate('/buildings');
          }
          info("A new building is created successfully.");
        }
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
    getCarriers(/*token, user.permission*/).then(response => {
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

    if (user.permission == 'admin') {
      getManagerList(token, user.permission).then(response => {
        const { type, managers } = response.data;
        setManagers(managers);
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
    building['terms'] = true;

    if (building_id != null) {
      getBuilding(token, user.permission, building_id).then(response => {
        const { type, building, board_members } = response.data;
        building['terms'] = true;
        setBuilding(building);
        //setMoreBoardMembers(board_members);
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
  }, []);

  return (
    <div className="tw-container tw-mx-auto">
      <div className="tw-m-3 tw-p-3 tw-rounded-lg tw-bg-green-100">
        <div className="tw-text-center tw-p-5">
          <span className="tw-text-xl">{building_id ? 'Building Form' : 'New Building Request Form'}</span>
        </div>

        <Formik
          enableReinitialize={true}
          validationSchema={schema}
          onSubmit={(values, { setSubmitting, resetForm }) => {
            onCreate(values, resetForm);
          }}
          initialValues={building}
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
              <div className="tw-grid tw-grid-cols-1 md:tw-grid-cols-2 tw-divide-x tw-divide-green-500">
                <div className="tw-p-2">
                  <Row>
                    <Col md={12}>
                      <div className="tw-bg-green-200 tw-p-2 tw-rounded-md tw-font-medium">
                        Building Info
                      </div>
                    </Col>
                    <Col md={6}>
                      <Form.Control type="hidden" name="building_id" value={values.building_id} />
                      <Form.Group className="mb-3" controlId="name">
                        <Form.Label>Name<span className="tw-text-red-500">*</span></Form.Label>
                        <Form.Control type="text" name="name" isInvalid={!!errors.name} value={values.name} onChange={handleChange} />
                        <Form.Control.Feedback type="invalid">{errors.name}</Form.Control.Feedback>
                      </Form.Group>
                    </Col>
                    <Col md={6}>
                      <Form.Group className="mb-3" controlId="address">
                        <Form.Label>Address<span className="tw-text-red-500">*</span></Form.Label>
                        <Form.Control type="text" name="address" isInvalid={!!errors.address} value={values.address} onChange={handleChange} />
                        <Form.Control.Feedback type="invalid">{errors.address}</Form.Control.Feedback>
                      </Form.Group>
                    </Col>
                    <Col md={4}>
                      <Form.Group className="mb-3" controlId="city">
                        <Form.Label>City<span className="tw-text-red-500">*</span></Form.Label>
                        <Form.Control type="text" name="city" isInvalid={!!errors.city} value={values.city} onChange={handleChange} />
                      </Form.Group>
                    </Col>
                    <Col md={4}>
                      <Form.Group className="mb-3" controlId="zip">
                        <Form.Label>Zip Code<span className="tw-text-red-500">*</span></Form.Label>
                        <Form.Control type="text" name="zip" isInvalid={!!errors.zip} value={values.zip} onChange={handleChange} />
                      </Form.Group>
                    </Col>
                    <Col md={4}>
                      <Form.Group className="mb-3" controlId="state">
                        <Form.Label>State</Form.Label>
                        <Form.Select aria-label="" name="state" value={values.state} onChange={handleChange}>
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
                      <Form.Group className="mb-3" controlId="phone">
                        <Form.Label>Phone</Form.Label>
                        <Form.Control type="text" name="phone" isInvalid={!!errors.phone} value={values.phone} onChange={handleChange} />
                        <Form.Control.Feedback type="invalid">{errors.phone}</Form.Control.Feedback>
                      </Form.Group>
                    </Col>
                    <Col md={6}>
                      <Form.Group className="mb-3" controlId="building_type">
                        <Form.Label>Building Type</Form.Label>
                        <Form.Select aria-label="" name="type" value={values.type} onChange={handleChange}>
                          <option value=""></option>
                          <option value="Coop">Coop</option>
                          <option value="Condo">Condo</option>
                          <option value="Other">Other</option>
                        </Form.Select>
                      </Form.Group>
                    </Col>
                    {
                      user.permission == 'admin' && (<Col md={6}>
                        <Form.Group className="mb-3" controlId="manager_id">
                          <Form.Label>Manager</Form.Label>
                          <Form.Select aria-label="" name="manager_id" isInvalid={!!errors.manager_id} value={values.manager_id} onChange={handleChange}>
                            <option value=""></option>
                            {managers.map(m => (<option key={m.id} value={m.id}>{m.name}</option>))
                            }
                          </Form.Select>
                        </Form.Group>
                      </Col>
                      )}
                    <Col md={6}>
                      <Form.Group className="mb-3" controlId="number_of_units">
                        <Form.Label>Number of Units</Form.Label>
                        <Form.Control type="text" name="number_of_units" value={values.number_of_units} onChange={handleChange} />
                      </Form.Group>
                    </Col>
                    <Col md={12}>
                      <Form.Check
                        type="switch"
                        id="multiple_addresses"
                        label="Does building have multiple addresses?"
                        name="multiple_addresses"
                        checked={values.multiple_addresses}
                        onChange={handleChange}
                      />
                    </Col>
                    <Col md={12}>
                      <Form.Group className="mb-3" controlId="building_note">
                        <Form.Label>Additional / Building Notes</Form.Label>
                        <Form.Control as="textarea" name="building_notes" value={values.building_notes} onChange={handleChange} />
                      </Form.Group>
                    </Col>
                  </Row>
                </div>
                <div className="tw-p-2">
                  <Row>
                    <Col md={12}>
                      <div className="tw-bg-green-200 tw-p-2 tw-rounded-md tw-font-medium">
                        Superintendent's Info
                      </div>
                    </Col>
                    <Col md={6}>
                      <Form.Group className="mb-3" controlId="supers_name">
                        <Form.Label>Name</Form.Label>
                        <Form.Control type="text" name="supers_name" value={values.supers_name} onChange={handleChange} />
                      </Form.Group>
                    </Col>
                    <Col md={6}>
                      <Form.Group className="mb-3" controlId="supers_email">
                        <Form.Label>Email</Form.Label>
                        <Form.Control type="text" name="supers_email" value={values.supers_email} onChange={handleChange} />
                      </Form.Group>
                    </Col>
                    <Col md={6}>
                      <Form.Group className="mb-3" controlId="supers_cell">
                        <Form.Label>Cell</Form.Label>
                        <Form.Control type="text" name="supers_cell" value={values.supers_cell} isInvalid={!!errors.supers_cell} onChange={handleChange} />
                        <Form.Text className="text-muted">
                          (will be used to send Super text messages)
                        </Form.Text>
                      </Form.Group>
                    </Col>
                    <Col md={6}>
                      <Form.Group className="mb-3" controlId="carrier_id">
                        <Form.Label>Carrier</Form.Label>
                        <Form.Select aria-label="" name="carrier_id" value={values.carrier_id} onChange={handleChange}>
                          <option value=""></option>
                          {carriers.map(c => {
                            return (<option key={c.carrier_id} value={c.carrier_id}>{c.name}</option>);
                          })}
                        </Form.Select>
                      </Form.Group>
                    </Col>
                  </Row>
                  <Row>
                    <Col md={12}>
                      <div className="tw-bg-green-200 tw-p-2 tw-rounded-md tw-font-medium">
                        Authorized Board Member's Info(person authorized to make decision)
                      </div>
                    </Col>
                    <Col md={6}>
                      <Form.Group className="mb-3" controlId="board_m_name">
                        <Form.Label>Name<span className="tw-text-red-500">*</span></Form.Label>
                        <Form.Control type="text" name="board_m_name" isInvalid={!!errors.board_m_name} value={values.board_m_name} onChange={handleChange} />
                      </Form.Group>
                    </Col>
                    <Col md={6}>
                      <Form.Group className="mb-3" controlId="board_m_email">
                        <Form.Label>Email<span className="tw-text-red-500">*</span></Form.Label>
                        <Form.Control type="text" name="board_m_email" isInvalid={!!errors.board_m_email} value={values.board_m_email} onChange={handleChange} />
                      </Form.Group>
                    </Col>
                    <Col md={6}>
                      <Form.Group className="mb-3" controlId="board_m_phone">
                        <Form.Label>Phone</Form.Label>
                        <Form.Control type="text" name="board_m_phone" value={values.board_m_phone} isInvalid={!!errors.board_m_phone} onChange={handleChange} autoComplete="off" />
                      </Form.Group>
                    </Col>
                    <Col md={6}>
                    </Col>
                    <Col md={6}>
                      <Form.Group className="mb-3" controlId="password">
                        <Form.Label>Password<span className="tw-text-red-500">*</span></Form.Label>
                        <Form.Control type="text" name="password" value={values.password} isInvalid={!!errors.password} onChange={handleChange} />
                        <Form.Control.Feedback type="invalid">{errors.password}</Form.Control.Feedback>
                      </Form.Group>
                    </Col>
                    <Col md={6}>
                      <Form.Group className="mb-3" controlId="repassword">
                        <Form.Label>Retype Password<span className="tw-text-red-500">*</span></Form.Label>
                        <Form.Control type="text" name="repassword" value={values.repassword} isInvalid={!!errors.repassword} onChange={handleChange} />
                        <Form.Control.Feedback type="invalid">{errors.repassword}</Form.Control.Feedback>
                      </Form.Group>
                    </Col>
                    {/*
                    <Col md={12} className="tw-hidden">
                      <div className="tw-bg-green-200 tw-p-2 tw-rounded-md tw-font-medium">
                        Add More Board Members?
                      </div>
                    </Col>
                    <Col md={6}>
                      <Form.Group className="mb-3" controlId="more_board_m_name">
                        <Form.Label>Name<span className="tw-text-red-500">*</span></Form.Label>
                        <Form.Control type="text" name="more_board_mname" value={moreBoardMName} onChange={(evt) => setMoreBoardMName(evt.target.value)} isInvalid={more_bname_valid} />
                        <Form.Control.Feedback type="invalid">Name is a required field.</Form.Control.Feedback>
                      </Form.Group>
                    </Col>
                    <Col md={6}>
                      <Form.Group className="mb-3" controlId="more_board_m_email">
                        <Form.Label>Email<span className="tw-text-red-500">*</span></Form.Label>
                        <Form.Control type="text" name="more_board_memail" value={moreBoardMEmail} onChange={(evt) => setMoreBoardMEmail(evt.target.value)} isInvalid={more_bemail_valid} />
                        <Form.Control.Feedback type="invalid">Email is a required field.</Form.Control.Feedback>
                      </Form.Group>
                    </Col>
                    <Col md={12}>
                      <Form.Group className="mb-3" controlId="email_alert">
                        <Form.Check type="checkbox" label="Send New Ticket Email Alerts" checked={moreBoardMEmailAlert} onChange={(evt) => setMoreBoardMEmailAlert(evt.target.checked)} />
                      </Form.Group>
                    </Col>
                    <div className="tw-flex tw-flex-row tw-justify-end">
                      <Button onClick={onAddBoardMember}><i className="fas fa-plus"></i>&nbsp; Add</Button>
                    </div>
                    <div className="tw-p-2">
                      <div className="tw-overflow-auto">
                        <Table striped bordered hover>
                          <thead>
                            <tr>
                              <th>#	</th>
                              <th>Name	</th>
                              <th>Email</th>
                              <th>Alerts</th>
                              <th>Action</th>
                            </tr>
                          </thead>
                          <tbody>
                            {
                              moreBoardMembers.map((bm, index) => {
                                return (
                                  <tr key={index}>
                                    <td>{index + 1}</td>
                                    <td>{bm.name}</td>
                                    <td>{bm.email}</td>
                                    <td>{bm.email_alerts ? 'Yes' : 'No'}</td>
                                    <td>
                                      <Button variant="danger" size="sm" onClick={() => { onDeleteMoreBM(index) }}>Delete</Button>
                                    </td>
                                  </tr>);
                              })
                            }
                          </tbody>
                        </Table>
                      </div>
                    </div>
                          */}
                  </Row>
                </div>
              </div>
              <div className="tw-flex tw-flex-column tw-justify-end">
                <Form.Group className="tw-mb-3 tw-mr-3">
                  <Form.Check
                    required
                    name="terms"
                    label={(<>I've read and agree with the <Link to="/terms">terms and conditions</Link></>)}
                    onChange={handleChange}
                    defaultChecked={values.terms}
                    isInvalid={!!errors.terms}
                    feedback={errors.terms}
                    feedbackType="invalid"
                    id="validationFormik1"
                  />
                </Form.Group>
              </div>
              <div className="tw-flex tw-flex-column tw-justify-end">
                <Button type="submit"><i className="fas fa-save"></i>&nbsp; Submit</Button>
              </div>
            </Form>
          )}
        </Formik>
      </div >
    </div >
  );
}
