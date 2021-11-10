import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import {
  getToken,
  getUser
} from '../../features/user/userSlice';

export function Dashboard() {

  const token = useSelector(getToken);
  const user = useSelector(getUser);
  const navigate = useNavigate();

  const onViewBuilding = () => {
    navigate('/buildings');
  }

  const onNewBuilding = () => {
    navigate('/building/new');
  }

  const onAddBuildingNote = () => {
    navigate('/new-building-note');
  }

  const onAddNewTicket = () => {
    navigate('/ticket/new');
  }

  return (
    <div className="tw-container tw-mx-auto">
      <div className="tw-m-3 tw-p-3 tw-rounded-lg tw-bg-green-100">
        <div className="tw-text-lg tw-text-center tw-m-3 tw-p-3 tw-rounded-lg">
          Welcome <span className="tw-font-medium">{user.name}</span> to the Management Tracker.<br />
          Please select from one of the Navigational links above or from one of the Sectional boxes below.
        </div>
        <hr />
        <div className="tw-text-center tw-font-medium tw-text-xl">
          What would you like to do?
        </div>
        <div className="tw-text-lg tw-text-center tw-m-3 tw-p-3 tw-rounded-lg tw-bg-green-100">
          <div className="tw-m-2 tw-p-3 tw-rounded-lg tw-bg-green-400 tw-text-white tw-cursor-pointer" onClick={onViewBuilding}>
            View My Buildings and Tickets
          </div>
          <div className="tw-m-2 tw-p-3 tw-rounded-lg tw-bg-green-400 tw-text-white tw-cursor-pointer" onClick={onNewBuilding}>
            Request a New Building to be Added to My Account
          </div>
          <div className="tw-m-2 tw-p-3 tw-rounded-lg tw-bg-green-400 tw-text-white tw-cursor-pointer" onClick={onAddBuildingNote}>
            Add a Building-Wide Note
          </div>
          <div className="tw-m-2 tw-p-3 tw-rounded-lg tw-bg-green-400 tw-text-white tw-cursor-pointer" onClick={onAddNewTicket}>
            Add New Ticket
          </div>
        </div>
      </div>
    </div>
  );
}
