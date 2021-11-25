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

import { createNote, getBuildings } from '../../service/ManagerService';

import { info, warning } from '../helper/snack';

import * as yup from 'yup';
import { Formik } from 'formik';
import { BuildingSelectorModal } from './modal/BuildingSelectorModal';

const schema = yup.object().shape({
  description: yup.string().required()
});

export function NoteForm() {

  let { building_id } = useParams();

  const dispatch = useDispatch();
  const token = useSelector(getToken);
  const user = useSelector(getUser);
  const navigate = useNavigate();

  const manager_id = user.permission == 'manager' ? user.id : 0;

  const [showBuildingModal, setShowBuildingModal] = useState(false);
  const [curBuilding, setCurBuilding] = useState({});
  const [buildings, setBuildings] = useState([]);

  const onCreate = (values, resetForm) => {
    if (!curBuilding.building_id) {
      confirmAlert({
        title: 'Alert',
        message: 'Please select the building first.',
        buttons: [
          {
            label: 'Ok',
            onClick: () => { }
          }
        ]
      });
      return;
    }

    values['building_id'] = curBuilding.building_id;

    createNote(token, user.permission, values).then(response => {
      const { type, message } = response.data;
      setCurBuilding({});
      resetForm();
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

  const selectBuilding = (building) => {
    setShowBuildingModal(false);
    setCurBuilding(building);
  }

  const onShowBuildingModal = () => {
    setShowBuildingModal(true);
  }

  const onCloesModal = () => {
    setShowBuildingModal(false);
  }

  useEffect(() => {
    getBuildings(token, user.permission).then((response) => {
      const { type, result } = response.data;
      setBuildings(result);
    })
  }, []);

  return (
    <div className="tw-container tw-mx-auto">
      <div className="tw-m-3 tw-p-3 tw-rounded-lg tw-bg-green-100">
        <div className="tw-text-center tw-p-5">
          <span className="tw-text-xl">New Note Form</span>
        </div>

        <Formik
          validationSchema={schema}
          onSubmit={(values, { setSubmitting, resetForm }) => {
            onCreate(values, resetForm);
          }}
          initialValues={{
            description: ''
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
                    <Col md={12}>
                      <div className="tw-bg-green-200 tw-p-2 tw-rounded-md tw-mb-2">
                        {
                          !curBuilding.building_id && (
                            <>
                              <div className="tw-flex tw-flex-row tw-justify-center">
                                <Button onClick={onShowBuildingModal}>Select A Building</Button>
                              </div>
                            </>
                          )}
                        {
                          curBuilding.building_id && (
                            <>
                              <div className="tw-font-medium">
                                Building Info
                              </div>
                              <div className="info-inline">
                                <div>Building ID</div>
                                <div>{curBuilding.building_id}</div>
                              </div>
                              <div className="info-inline">
                                <div>Building Name</div>
                                <div>{curBuilding.name}</div>
                              </div>
                              <div className="info-inline">
                                <div>Manager's Name</div>
                                <div>{curBuilding.managers_name}</div>
                              </div>
                              <div className="info-inline">
                                <div>Manager's Email</div>
                                <div>{curBuilding.managers_email}</div>
                              </div>
                              <div className="info-inline">
                                <div>Code</div>
                                <div>{curBuilding.code}</div>
                              </div>
                              <div className="info-inline">
                                <div>Address</div>
                                <div>{curBuilding.address}</div>
                              </div>
                              <div className="info-inline">
                                <div>City</div>
                                <div>{curBuilding.city}</div>
                              </div>
                              <div className="info-inline">
                                <div>State</div>
                                <div>{curBuilding.state}</div>
                              </div>
                            </>
                          )
                        }
                      </div>
                    </Col>
                    {
                      curBuilding.building_id && (
                        <>
                          <Col md={12}>
                            <Form.Group className="mb-3" controlId="description">
                              <Form.Label>Description</Form.Label>
                              <Form.Control as="textarea" name="description" isInvalid={!!errors.description} value={values.description} onChange={handleChange} />
                            </Form.Group>
                          </Col>
                          <div className="tw-flex tw-flex-column tw-justify-end">
                            <Button type="submit"><i className="fas fa-save"></i>&nbsp; Submit</Button>
                          </div>
                        </>
                      )}
                  </Row>
                </div>
                <div className="tw-p-2">
                </div>
              </div>
            </Form>
          )}
        </Formik>
      </div >
      <BuildingSelectorModal show={showBuildingModal} handleClose={onCloesModal} selectBuilding={selectBuilding} manager_id={manager_id} />
    </div >
  );
}
