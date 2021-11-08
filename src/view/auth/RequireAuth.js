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

export function RequireAuth({ children }) {

  let location = useLocation();
  const token = useSelector(getToken);
  const user = useSelector(getUser);

  let result = token != null && token != "";

  if (!result) {
    return <Navigate to="/login" state={{ from: location }} />;
  }

  return children;
}