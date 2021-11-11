import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import {
  getToken,
  getUser
} from '../../features/user/userSlice';

export function AdminHome() {

  const token = useSelector(getToken);
  const user = useSelector(getUser);
  const navigate = useNavigate();

  const onAddNewTicket = () => {
    navigate('/admin/ticket/new');
  }

  const onBuildings = () => {
    navigate('/admin/buildings');
  }

  const onManagers = () => {
    navigate('/admin/managers');
  }

  return (
    <div className="tw-container tw-mx-auto">
      <div className="tw-m-3 tw-p-3 tw-rounded-lg tw-bg-green-100">
        <div className="tw-text-lg tw-text-center tw-m-3 tw-p-3 tw-rounded-lg">
          PM-Tracker Administration Section
        </div>
        <hr />
        <div className="tw-text-center tw-font-medium tw-text-xl">
          Please begin by selecting a function from below or from one of the navigation links above.
        </div>
        <div className="tw-text-lg tw-text-center tw-m-3 tw-p-3 tw-rounded-lg tw-bg-green-100">
          <div className="tw-m-2 tw-p-3 tw-rounded-lg tw-bg-green-400 tw-text-white tw-cursor-pointer" onClick={onAddNewTicket}>
            Add a ticket to a building
          </div>
          <div className="tw-m-2 tw-p-3 tw-rounded-lg tw-bg-green-400 tw-text-white tw-cursor-pointer" onClick={onBuildings}>
            See all buildings (sort by name, zip code, etc.)
          </div>
          <div className="tw-m-2 tw-p-3 tw-rounded-lg tw-bg-green-400 tw-text-white tw-cursor-pointer" onClick={onBuildings}>
            See building's, size, address, phone #, etc. (once there, click on building row)
          </div>
          <div className="tw-m-2 tw-p-3 tw-rounded-lg tw-bg-green-400 tw-text-white tw-cursor-pointer" onClick={onBuildings}>
            See all tickets for a building (once there, click on building row, ticket info will be near bottom)
          </div>
          <div className="tw-m-2 tw-p-3 tw-rounded-lg tw-bg-green-400 tw-text-white tw-cursor-pointer" onClick={onManagers}>
            See all management users
          </div>
        </div>
      </div>
    </div>
  );
}
