import instance from "./BaseService";

export function adminLogin(email, password) {
  return instance.post('admin/login', {
    email: email,
    password: password
  });
}

export function getManagerList(token, permission) {
  return instance.get('admin/manager/get-manager-list', {
    params: {
      permission: permission
    },
    headers: {
      'Authorization': `Bearer ${token}`
    }
  });
}

export function updateBuildingActivated(token, permission, building_id, is_activated) {
  return instance.post('admin/buildings/update-building-activated', {
    permission: permission,
    building_id: building_id,
    is_activated: is_activated
  },
    {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });
}

export function deleteBuilding(token, permission, building_id) {
  return instance.post('admin/buildings/delete-building', {
    permission: permission,
    building_id: building_id
  },
    {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });
}