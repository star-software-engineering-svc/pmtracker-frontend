import instance from "./BaseService";

export function login(email, password) {
  return instance.post('manager/login', {
    email: email,
    password: password
  });
}

export function getBuildings(token/*, page, perPage, sortCol, sortDir*/) {
  return instance.get('manager/buildings/get-buildings', {
    params: {
      /*
      page: page,
      perPage: perPage,
      sortCol: sortCol,
      sortDir: sortDir
      */
    },
    headers: {
      'Authorization': `Bearer ${token}`
    }
  });
}

export function getBuilding(token, building_id) {
  return instance.get('manager/buildings/building', {
    params: {
      building_id: building_id
    },
    headers: {
      'Authorization': `Bearer ${token}`
    }
  });
}

export function getBoardMembers(token, building_id) {
  return instance.get('manager/buildings/board-members', {
    params: {
      building_id: building_id
    },
    headers: {
      'Authorization': `Bearer ${token}`
    }
  });
}

export function getBuildingTickets(token, building_id) {
  return instance.get('manager/buildings/building-tickets', {
    params: {
      building_id: building_id
    },
    headers: {
      'Authorization': `Bearer ${token}`
    }
  });
}

export function updateTicketStatus(token, ticket_id, ticket_status) {
  return instance.post('manager/buildings/update-ticket-status', {
    ticket_id: ticket_id,
    ticket_status: ticket_status
  },
    {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });
}

export function notifySuper(token, ticket_id, message) {
  return instance.post('manager/buildings/notify-super', {
    ticket_id: ticket_id,
    message: message
  },
    {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });
}

export function updateTicketDesc(token, ticket_id, message) {
  return instance.post('manager/buildings/update-ticket-desc', {
    ticket_id: ticket_id,
    message: message
  },
    {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });
}

export function createBuilding(token, values) {
  return instance.post('manager/buildings/create-building', values,
    {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });
}

export function addInternalNote(token, ticket_id, cost, message) {
  return instance.post('manager/internal-note/add-note', {
    ticket_id: ticket_id,
    cost: cost,
    message: message
  },
    {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });
}

export function getInternalNotes(token, building_id) {
  return instance.get('manager/internal-note/get-note-list', {
    params: {
      building_id: building_id
    },
    headers: {
      'Authorization': `Bearer ${token}`
    }
  });
}

export function getCarriers(token) {
  return instance.get('manager/carrier/get-carrier-list', {
    params: {
    },
    headers: {
      'Authorization': `Bearer ${token}`
    }
  });
}

export function getTicketCategories(token) {
  return instance.get('manager/ticket/get-ticket-categories', {
    params: {
    },
    headers: {
      'Authorization': `Bearer ${token}`
    }
  });
}

export function filterBuildings(token, zip, keyword, limit) {
  return instance.get('manager/buildings/filter-buildings', {
    params: {
      zip: zip,
      keyword: keyword,
      limit: 30
    },
    headers: {
      'Authorization': `Bearer ${token}`
    }
  });
}

export function createTicket(token, values, attachment1, attachment2) {

  const formData = new FormData();
  for (const prop in values) {
    formData.append(prop, values[prop]);
  }

  if (attachment1)
    formData.append("attachment1", attachment1, attachment1.name);

  if (attachment2)
    formData.append("attachment2", attachment2, attachment2.name);

  return instance.post('manager/ticket/create-ticket', formData,
    {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });
}

export function createNote(token, values) {
  return instance.post('manager/buildings/create-note', values,
    {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });
}

export function boardLogin(code, password) {
  return instance.post('board/login',
    {
      code, password
    });
}

export function getBoardTickets(token, building_id) {
  return instance.get('board/get-board-tickets', {
    params: {
      token,
      building_id
    }
  });
}

export function updateProfile(token, values) {
  return instance.post('manager/update-profile', values,
    {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });
}
