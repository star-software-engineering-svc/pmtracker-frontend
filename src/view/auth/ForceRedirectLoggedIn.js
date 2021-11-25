import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  Navigate,
  useLocation
} from "react-router-dom";

import {
  getToken,
  getUser
} from '../../features/user/userSlice';

export function ForceRedirectLoggedIn({ children }) {

  let location = useLocation();
  const token = useSelector(getToken);
  const user = useSelector(getUser);

  let result = token != null && token != "" && user;

  if (result) {
    if (user.permission == 'manager')
      return <Navigate to="/dashboard" state={{ from: location }} />;
    else
      return <Navigate to="/admin/home" state={{ from: location }} />;
  }

  return children;
}