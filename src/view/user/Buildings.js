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

export function Buildings() {

  const token = useSelector(getToken);
  const user = useSelector(getUser);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);

  /*
  const [totalRows, setTotalRows] = useState(0);
  const [perPage, setPerPage] = useState(10);
  const [page, setPage] = useState(1);
  const [resetPaginationToggle, setResetPaginationToggle] = useState(false);
  
  const [sortCol, setSortCol] = useState(null);
  const [sortDir, setSortDir] = useState(null);
  */

  const fetchBuildings = () => {
    setLoading(true);

    getBuildings(token, user.permission/*, page, perPage, sortCol, sortDir*/).then((response) => {
      console.log(response.data);
      const { result } = response.data;
      setData(result);
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
    navigate('/building/' + row.building_id);
  }

  /*
  const handleSort = (column, sortDirection) => {
    // simulate server sort
    console.log(column, sortDirection);
    setSortCol(column);
    setSortDir(sortDirection);

    fetchBuildings();
  };
    const handlePageChange = page => {
      setPage(page);
      fetchBuildings();
    };
  
    const handlePerRowsChange = async (newPerPage, page) => {
      setPerPage(newPerPage);
      fetchBuildings();
    };
    */

  useEffect(() => {
    fetchBuildings(1); // fetch page 1 of users
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
      style: { cursor: 'pointer' }
    },
    {
      name: 'Building Code',
      selector: row => row.code,
      sortable: true,
      style: { cursor: 'pointer' }
    },
    {
      name: 'Address',
      selector: row => row.address,
      sortable: true,
      style: { cursor: 'pointer' }
    },
    {
      name: 'City',
      selector: row => row.city,
      sortable: true,
      style: { cursor: 'pointer' }
    },
    {
      name: 'Zip',
      selector: row => row.zip,
      sortable: true,
      style: { cursor: 'pointer' }
    },
  ];

  return (
    <div className="tw-container tw-mx-auto">
      <div className="tw-m-3 tw-p-3 tw-rounded-lg tw-bg-green-100">
        <div className="tw-text-center tw-m-3 tw-p-3 tw-rounded-lg">
          <span className="tw-text-xl">View Buildings</span><br />
          (click on row for building details and to see building tickets)
        </div>
        <hr />
        <DataTable
          columns={columns}
          data={data}
          progressPending={loading}
          persistTableHead
          pagination
          onRowClicked={onRowClicked}
        //paginationServer
        //paginationResetDefaultPage={resetPaginationToggle}
        //onChangeRowsPerPage={handlePerRowsChange}
        //onChangePage={handlePageChange}
        //sortServer
        //onSort={handleSort}
        />
      </div>
    </div >
  );
}
