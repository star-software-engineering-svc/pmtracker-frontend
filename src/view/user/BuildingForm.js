import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import {
  getToken,
  getUser,
  setToken,
  setUser
} from '../../features/user/userSlice';

import { Button, Form, Row, Col, Table, InputGroup } from 'react-bootstrap';
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';

import { getCarriers, createBuilding } from '../../service/ManagerService';
import { info, warning } from '../helper/snack';

import * as yup from 'yup';
import { Formik } from 'formik';


const phoneRegExp = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im
const schema = yup.object().shape({
  name: yup.string().required(),
  address: yup.string().required(),
  city: yup.string().required(),
  zip: yup.string().required(),
  terms: yup.bool().required().oneOf([true, 1, 'checked'], 'Terms must be accepted'),
  board_m_name: yup.string().required(),
  board_m_email: yup.string().email().required(),
  phone: yup.string().matches(phoneRegExp, 'Phone number is not valid'),
  supers_cell: yup.string().matches(phoneRegExp, 'Phone number is not valid'),
  board_m_phone: yup.string().matches(phoneRegExp, 'Phone number is not valid'),
  bpwd: yup.string().required("Password is required."),
  rebpwd: yup.string().oneOf([yup.ref('bpwd'), null], 'Passwords must match')
});


export function BuildingForm() {

  let { building_id } = useParams();

  const dispatch = useDispatch();
  const token = useSelector(getToken);
  const user = useSelector(getUser);
  const navigate = useNavigate();

  const [moreBoardMName, setMoreBoardMName] = useState('');
  const [moreBoardMEmail, setMoreBoardMEmail] = useState('');
  const [moreBoardMEmailAlert, setMoreBoardMEmailAlert] = useState(false);

  const [moreBoardMembers, setMoreBoardMembers] = useState([]);
  const [carriers, setCarriers] = useState([]);

  const [more_bname_valid, setMoreBnameValid] = useState(false);
  const [more_bemail_valid, setMoreBemailValid] = useState(false);

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
        board_m_name: moreBoardMName,
        board_m_email: moreBoardMEmail,
        board_m_em_alert: moreBoardMEmailAlert
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
    /*
    console.log(index);
    confirmAlert({
      title: 'Confirm',
      message: 'Are you sure to delete?',
      buttons: [
        {
          label: 'Yes',
          onClick: () => {
            let result = moreBoardMembers.filter((bm, idx) => {
              return index != idx;
            });

            setMoreBoardMembers(result);
          }
        },
        {
          label: 'No',
          onClick: () => { }
        }
      ]
    });
    */
    let result = moreBoardMembers.filter((bm, idx) => {
      return index != idx;
    });
    setMoreBoardMembers(result);
  }

  const onCreate = (values, resetForm) => {
    values['more_board_members'] = moreBoardMembers;
    createBuilding(token, values).then(response => {
      const { type, message } = response.data;
      if (type == "S_OK") {
        resetForm();
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
          <span className="tw-text-xl">New Building Request Form</span>
        </div>

        <Formik
          validationSchema={schema}
          onSubmit={(values, { setSubmitting, resetForm }) => {
            onCreate(values, resetForm);
          }}
          initialValues={{
            name: '',
            address: '',
            city: '',
            zip: '',
            terms: true,
            board_m_name: '',
            board_m_email: '',
            phone: '',
            supers_cell: '',
            board_m_phone: '',
            bpwd: '',
            rebpwd: ''
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
              <div className="tw-grid tw-grid-cols-1 md:tw-grid-cols-2 tw-divide-x tw-divide-green-500">
                <div className="tw-p-2">
                  <Row>
                    <Col md={12}>
                      <div className="tw-bg-green-200 tw-p-2 tw-rounded-md tw-font-medium">
                        Building Info
                      </div>
                    </Col>
                    <Col md={6}>
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
                        <Form.Select aria-label="" onChange={handleChange}>
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
                        <Form.Select aria-label="" onChange={handleChange}>
                          <option value=""></option>
                          <option value="Coop">Coop</option>
                          <option value="Condo">Condo</option>
                          <option value="Other">Other</option>
                        </Form.Select>
                      </Form.Group>
                    </Col>
                    <Col md={6}>
                      <Form.Group className="mb-3" controlId="num_of_units">
                        <Form.Label>Number of Units</Form.Label>
                        <Form.Control type="text" name="num_of_units" value={values.num_of_units} onChange={handleChange} />
                      </Form.Group>
                    </Col>
                    <Col md={12}>
                      <Form.Check
                        type="switch"
                        id="multiple_addresses"
                        label="Does building have multiple addresses?"
                        name="multiple_addresses"
                        onChange={handleChange}
                      />
                    </Col>
                    <Col md={12}>
                      <Form.Group className="mb-3" controlId="building_note">
                        <Form.Label>Additional / Building Notes</Form.Label>
                        <Form.Control as="textarea" name="building_notes" onChange={handleChange} />
                      </Form.Group>
                    </Col>
                  </Row>
                  <Row>
                    <Col md={12}>
                      <div className="tw-bg-green-200 tw-p-2 tw-rounded-md tw-font-medium">
                        Superintendent's Info
                      </div>
                    </Col>
                    <Col md={6}>
                      <Form.Group className="mb-3" controlId="supers_name">
                        <Form.Label>Name</Form.Label>
                        <Form.Control type="text" name="supers_name" onChange={handleChange} />
                      </Form.Group>
                    </Col>
                    <Col md={6}>
                      <Form.Group className="mb-3" controlId="supers_email">
                        <Form.Label>Email</Form.Label>
                        <Form.Control type="text" name="supers_email" onChange={handleChange} />
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
                        <Form.Select aria-label="" name="carrier_id" onChange={handleChange}>
                          <option value=""></option>
                          {carriers.map(c => {
                            return (<option key={c.carrier_id} value={c.carrier_id}>{c.name}</option>);
                          })}
                        </Form.Select>
                      </Form.Group>
                    </Col>
                  </Row>
                </div>
                <div className="tw-p-2">
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
                        <Form.Control type="password" name="bpwd" value={values.bpwd} isInvalid={!!errors.bpwd} onChange={handleChange} />
                        <Form.Control.Feedback type="invalid">{errors.bpwd}</Form.Control.Feedback>
                      </Form.Group>
                    </Col>
                    <Col md={6}>
                      <Form.Group className="mb-3" controlId="repassword">
                        <Form.Label>Retype Password<span className="tw-text-red-500">*</span></Form.Label>
                        <Form.Control type="password" name="rebpwd" value={values.rebpwd} isInvalid={!!errors.rebpwd} onChange={handleChange} />
                        <Form.Control.Feedback type="invalid">{errors.rebpwd}</Form.Control.Feedback>
                      </Form.Group>
                    </Col>
                    <Col md={12}>
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
                                  <td>{bm.board_m_name}</td>
                                  <td>{bm.board_m_email}</td>
                                  <td>{bm.board_m_em_alert ? 'Yes' : 'No'}</td>
                                  <td>
                                    <Button variant="danger" size="sm" onClick={() => { onDeleteMoreBM(index) }}>Delete</Button>
                                  </td>
                                </tr>);
                            })
                          }
                        </tbody>
                      </Table>
                    </div>
                  </Row>
                </div>
              </div>
              <div className="tw-flex tw-flex-column tw-justify-end">
                <Form.Group className="tw-mb-3 tw-mr-3" controlId="terms">
                  <Form.Check
                    required
                    name="terms"
                    label={(<>I've read and agree with the <a href="http://www.google.com">terms and conditions</a></>)}
                    onChange={handleChange}
                    defaultChecked={values.terms}
                    isInvalid={!!errors.terms}
                    feedback={errors.terms}
                    feedbackType="invalid"
                    id="validationFormik0"
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