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
import { deleteBuilding, updateBuildingActivated } from '../../service/AdminService';
import { info, warning, danger } from '../helper/snack';
import { confirmAlert } from 'react-confirm-alert';

export function AdminBuildings() {

  const token = useSelector(getToken);
  const user = useSelector(getUser);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);

  const [totalRows, setTotalRows] = useState(0);
  const [perPage, setPerPage] = useState(10);
  const [page, setPage] = useState(1);
  const [resetPaginationToggle, setResetPaginationToggle] = useState(false);

  const [sortCol, setSortCol] = useState(null);
  const [sortDir, setSortDir] = useState(null);


  const fetchBuildings = (start, limit, scol, sdir) => {
    setLoading(true);

    getBuildings(token, user.permission, start, limit, scol, sdir).then((response) => {
      console.log(response.data);
      const { total, result } = response.data;
      setData(result);
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

  const onRowClicked = (row) => {
    console.log(row);
    navigate('/admin/building/' + row.building_id);
  }

  const handleSort = (column, sortDirection) => {
    // simulate server sort
    console.log(column, sortDirection);
    setSortCol(column.sortField);
    setSortDir(sortDirection);

    fetchBuildings(page, perPage, column.sortField, sortDirection);
  };
  const handlePageChange = pg => {
    console.log(pg);
    setPage(pg);
    fetchBuildings(pg, perPage, sortCol, sortDir);
  };

  const handlePerRowsChange = async (newPerPage, page) => {
    setPerPage(newPerPage);
    fetchBuildings(page, newPerPage, sortCol, sortDir);
  };

  const onEditBuilding = (building) => {
    navigate('/admin/building/edit/' + building.building_id);
  }

  const onDeleteBuilding = (building) => {
    confirmAlert({
      title: 'Confirm',
      message: 'Are you sure to delete the building [' + building.name + ']?',
      buttons: [
        {
          label: 'Yes',
          onClick: () => {
            deleteBuilding(token, user.permission, building.building_id).then(response => {
              const { type } = response.data;
              if (type == 'S_OK') {
                info('Delete the building successfully.');
                fetchBuildings(page, perPage, sortCol, sortDir);
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

  const onAddBuilding = () => {
    navigate('/admin/building/new');
  }

  const onChangeActivated = (building_id, is_activated) => {
    updateBuildingActivated(token, user.permission, building_id, is_activated).then(response => {
      const { type } = response.data;
      if (type == 'S_OK') {
        info('Updated the activated flag successfully.');
      } else {
        warning("Failed to update the activated flag");
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

  useEffect(() => {
    fetchBuildings(1, perPage, sortCol, sortDir); // fetch page 1 of users
  }, []);

  const columns = [
    {
      name: 'No',
      selector: (row, index) => index + 1,
      sortable: false,
      style: { cursor: 'pointer' }
    },
    {
      name: 'Building Name',
      selector: row => row.name,
      sortable: true,
      sortField: "name",
      style: { cursor: 'pointer' }
    },
    {
      name: 'Building Code',
      selector: row => row.code,
      sortable: true,
      sortField: "code",
      style: { cursor: 'pointer' }
    },
    {
      name: 'Address',
      selector: row => row.address,
      sortable: true,
      sortField: "address",
      style: { cursor: 'pointer' }
    },
    {
      name: 'City',
      selector: row => row.city,
      sortable: true,
      sortField: "city",
      style: { cursor: 'pointer' }
    },
    {
      name: 'Zip',
      selector: row => row.zip,
      sortable: true,
      sortField: "zip",
      style: { cursor: 'pointer' }
    },
    {
      name: 'Active',
      selector: row => {
        return (
          <>
            <input type="checkbox" defaultChecked={row.is_activated} onChange={(evt) => onChangeActivated(row.building_id, evt.target.checked)} />
          </>
        )
      },
      sortable: true,
      sortField: "zip"
    },
    {
      name: 'Actions',
      selector: row => {
        return (
          <>
            <Button size="sm" onClick={() => onEditBuilding(row)}><i className="fas fa-pen" /></Button>&nbsp;
            <Button variant="danger" size="sm" onClick={() => onDeleteBuilding(row)}><i className="fas fa-trash" /></Button>
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
          <span className="tw-text-xl">View Buildings</span><br />
        </div>
        <hr />
        <div className="mb-2">
          <Button onClick={onAddBuilding}><i className="fas fa-plus"></i>&nbsp;Add New Building</Button>
        </div>
        <DataTable
          columns={columns}
          data={data}
          onRowClicked={onRowClicked}
          progressPending={loading}
          persistTableHead
          pagination
          paginationServer
          paginationTotalRows={totalRows}
          paginationResetDefaultPage={resetPaginationToggle}
          onChangeRowsPerPage={handlePerRowsChange}
          onChangePage={handlePageChange}
          sortServer
          onSort={handleSort}
        />
      </div>
    </div >
  );
}
