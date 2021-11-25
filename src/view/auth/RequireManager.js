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

export function RequireManager({ children }) {

  let location = useLocation();
  const token = useSelector(getToken);
  const user = useSelector(getUser);

  let result = token != null && token != "" && user && user.permission == 'manager';

  console.log('is manager = ', result);

  if (!result) {
    return <Navigate to="/login" state={{ from: location }} />;
  }

  return children;
}