import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  Navigate,
  useLocation
} from "react-router-dom";

export function RequireAuth({ children }) {

  let location = useLocation();
  let result = false;

  if (!result) {
    return <Navigate to="/login" state={{ from: location }} />;
  }

  return children;
}