import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { Modal, Button } from 'react-bootstrap';
import { filterBuildings } from '../../../service/ManagerService';
import {
  getToken,
  getUser,
  setToken,
  setUser
} from '../../../features/user/userSlice';
import { warning } from '../../helper/snack';

export function BuildingSelectorModal({ show, handleClose, selectBuilding, manager_id }) {

  const dispatch = useDispatch();
  const token = useSelector(getToken);
  const user = useSelector(getUser);

  const [buildings, setBuildings] = useState([]);
  const [zip, setZip] = useState('');
  const [keyword, setKeyword] = useState('');

  const onClickBuilding = (b) => {
    selectBuilding(b);
  }

  const loadBulidings = () => {
    filterBuildings(token, user ? user.permission : '', zip, keyword, 30, manager_id).then(response => {
      const { type, buildings } = response.data;
      setBuildings(buildings);
    }).catch((error) => {
      const { status, data } = error.response;
      if (status == 401) {
        dispatch(setToken(null));
        dispatch(setUser(null));
      } else {
        warning(data.message);
      }
    });
  };

  useEffect(() => {
    //loadBulidings();
  }, []);

  return (
    <>
      <Modal show={show} onHide={handleClose} size="xl">
        <Modal.Header closeButton>
          <Modal.Title>Building Select</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div>
            <div className="tw-flex tw-flex-row tw-justify-end tw-items-center">
              <div>
                Zip:&nbsp;&nbsp;
              </div>
              <div className="tw-w-1/6">
                <input type="text" className="form-control" onKeyPress={(e) => { if (e.nativeEvent.keyCode == 13) loadBulidings(); }} onChange={(evt) => { setZip(evt.target.value); }} />
              </div>
              <div>
                &nbsp;&nbsp;Keyword:&nbsp;&nbsp;
              </div>
              <div className="tw-w-1/5">
                <input type="text" className="form-control" onKeyPress={(e) => { if (e.nativeEvent.keyCode == 13) loadBulidings(); }} onChange={(evt) => { setKeyword(evt.target.value); }} />
              </div>
              <div className="tw-pl-2">
                <Button onClick={() => { loadBulidings(); }}>Search</Button>
              </div>
            </div>
            <div className="tw-overflow-scroll">
              <table className="table table-hover table-striped">
                <thead>
                  <tr>
                    <th>Name</th>
                    <th>Code</th>
                    <th>Address</th>
                    <th>City</th>
                    <th>State</th>
                    <th>Zip</th>
                    <th>Building ID</th>
                    <th>Manager Name</th>
                    <th>Manager Email</th>
                  </tr>
                </thead>
                <tbody>
                  {
                    buildings.map((b, idx) => {
                      return (
                        <tr key={idx} className="tw-cursor-pointer" onClick={() => onClickBuilding(b)}>
                          <td>{b.name}</td>
                          <td>{b.code}</td>
                          <td>{b.address}</td>
                          <td>{b.city}</td>
                          <td>{b.state}</td>
                          <td>{b.zip}</td>
                          <td>{b.building_id}</td>
                          <td>{b.managers_name}</td>
                          <td>{b.managers_email}</td>
                        </tr>
                      )
                    })
                  }
                </tbody>
              </table>
            </div>
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
}
