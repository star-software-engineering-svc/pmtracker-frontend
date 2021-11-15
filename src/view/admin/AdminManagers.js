import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import {
  getToken,
  getUser,
  setToken,
  setUser
} from '../../features/user/userSlice';
import DataTable from 'react-data-table-component';

import { getBuildings } from '../../service/ManagerService';
import { Button } from 'react-bootstrap';
import { deleteBuilding, deleteManager, getManagerList, updateBuildingActivated } from '../../service/AdminService';
import { info, warning, danger } from '../helper/snack';
import { confirmAlert } from 'react-confirm-alert';

export function AdminManagers() {

  const token = useSelector(getToken);
  const user = useSelector(getUser);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);
  const [totalRows, setTotalRows] = useState(0);

  const fetchManagers = () => {
    setLoading(true);

    getManagerList(token, user.permission).then((response) => {
      console.log(response.data);
      const { total, managers } = response.data;
      setData(managers);
      setTotalRows(total);
    }).catch((error) => {
      if (error.response.status == 401) {
        dispatch(setToken(null));
        dispatch(setUser(null));
      }
    }).finally(() => {
      setLoading(false);
    });
  }

  const onEditManager = (manager) => {
    navigate('/admin/manager/edit/' + manager.id);
  }

  const onDeleteManager = (manager) => {
    confirmAlert({
      title: 'Confirm',
      message: 'Are you sure to delete the building [' + manager.name + ']?',
      buttons: [
        {
          label: 'Yes',
          onClick: () => {
            deleteManager(token, user.permission, manager.id).then(response => {
              const { type } = response.data;
              if (type == 'S_OK') {
                info('Delete the building successfully.');
                fetchManagers();
              } else {
                warning("Failed to delete the building.");
              }
            }).catch((error) => {
              if (error.response.status == 401) {
                dispatch(setToken(null));
                dispatch(setUser(null));
              } else {
                danger("There was an unexpected error.");
              }
            });
          }
        },
        {
          label: 'No',
          onClick: () => { }
        }
      ]
    });
  }

  const onAddManager = () => {
    navigate('/admin/manager/new');
  }

  useEffect(() => {
    fetchManagers(); // fetch page 1 of users
  }, []);

  const columns = [
    {
      name: 'No',
      selector: (row, index) => index + 1,
      sortable: false
    },
    {
      name: 'Company Name',
      selector: row => row.company_name,
      sortable: true,
      sortField: "name"
    },
    {
      name: 'Manager Name',
      selector: row => row.name,
      sortable: true,
      sortField: "name"
    },
    {
      name: 'Address',
      selector: row => row.address,
      sortable: true,
      sortField: "address"
    },
    {
      name: 'City',
      selector: row => row.city,
      sortable: true,
      sortField: "city"
    },
    {
      name: 'Zip',
      selector: row => row.zip,
      sortable: true,
      sortField: "zip"
    },
    {
      name: 'Email',
      selector: row => row.email,
      sortable: true,
      sortField: "email"
    },
    {
      name: 'Actions',
      selector: row => {
        return (
          <>
            <Button size="sm" onClick={() => onEditManager(row)}><i className="fas fa-pen" /></Button>&nbsp;
            <Button variant="danger" size="sm" onClick={() => onDeleteManager(row)}><i className="fas fa-trash" /></Button>
          </>
        )
      },
      sortable: true,
      sortField: "zip"
    },
  ];

  return (
    <div className="tw-container tw-mx-auto">
      <div className="tw-m-3 tw-p-3 tw-rounded-lg tw-bg-green-100">
        <div className="tw-text-center tw-m-3 tw-p-3 tw-rounded-lg">
          <span className="tw-text-xl">View Managers</span><br />
        </div>
        <hr />
        <div className="mb-2">
          <Button onClick={onAddManager}><i className="fas fa-plus"></i>&nbsp;Add New Manager</Button>
        </div>
        <DataTable
          columns={columns}
          data={data}
          progressPending={loading}
          persistTableHead
          pagination
        />
      </div>
    </div >
  );
}
