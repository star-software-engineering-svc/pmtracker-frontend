import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import {
  getToken,
  getUser,
  setToken,
  setUser
} from '../../features/user/userSlice';
import DataTable from 'react-data-table-component';

import { getBoardMembers } from '../../service/ManagerService';

export function BoardMemberList({ building_id }) {

  console.log('board', building_id);

  const dispatch = useDispatch();
  const token = useSelector(getToken);
  const user = useSelector(getUser);
  const navigate = useNavigate();
  const [members, setMembers] = useState([]);

  const [loading, setLoading] = useState(false);

  const onRowClicked = (row) => {
    console.log(row);
  }

  useEffect(() => {
    setLoading(true);
    getBoardMembers(token, user.permission, building_id).then((response) => {
      const { board_members } = response.data;
      setMembers(board_members);
    }).catch((error) => {
      if (error.response.status == 401) {
        dispatch(setToken(null));
        dispatch(setUser(null));
      }
    }).finally(() => {
      setLoading(false);
    });
  }, []);

  const columns = [
    {
      name: 'No',
      selector: (row, index) => index + 1,
      sortable: false
    },
    {
      name: 'Name',
      selector: row => row.name,
      sortable: true
    },
    {
      name: 'Phone',
      selector: row => row.phone,
      sortable: true
    },
    {
      name: 'Email',
      selector: row => row.email,
      sortable: true
    },
    {
      name: 'Responsible?',
      selector: row => row.is_responsible,
      sortable: true,
      format: row => {
        return row.is_responsible ? 'Yes' : 'No';
      }
    },
    {
      name: 'Email ALerts?',
      selector: row => row.email_alerts,
      sortable: true,
      format: row => {
        return row.email_alerts ? 'Yes' : 'No';
      }
    }
  ];

  return (
    <div>
      <DataTable
        columns={columns}
        data={members}
        progressPending={loading}
        persistTableHead
        pagination
        onRowClicked={onRowClicked}
      />
    </div>
  );
}
