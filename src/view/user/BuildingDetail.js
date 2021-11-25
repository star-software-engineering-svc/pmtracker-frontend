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

import { getBuilding } from '../../service/ManagerService';
import { Tabs, Tab } from 'react-bootstrap';
import { BoardMemberList } from './BoardMemberList';
import { BuildingTicketsList } from './BuildingTicketsList';

export function BuildingDetail() {

  let { building_id } = useParams();
  console.log(building_id);

  const dispatch = useDispatch();
  const token = useSelector(getToken);
  const user = useSelector(getUser);
  const navigate = useNavigate();
  const [binfo, setBinfo] = useState({
    building: {},
    carrier: {},
    tickets: [],
    board_members: [],
    internal_notes: []
  });

  const refreshBuilding = () => {
    getBuilding(token, user.permission, building_id).then((response) => {
      const { data } = response;
      setBinfo(data);
    }).catch((error) => {
      if (error.response.status == 401) {
        dispatch(setToken(null));
        dispatch(setUser(null));
      }
    });
  }

  useEffect(() => {
    refreshBuilding();
  }, []);

  return (
    <div className="tw-container tw-mx-auto">
      <div className="tw-m-3 tw-p-3 tw-rounded-lg tw-bg-green-100">
        <div className="tw-text-center tw-p-5">
          <span className="tw-text-xl">Building Detail Info</span>
        </div>
        <div className="tw-grid tw-grid-cols-2">
          <div>
            <div className="info-inline">
              <div>ID:</div>
              <div>{binfo.building.building_id}</div>
            </div>
            <div className="info-inline">
              <div>Name:</div>
              <div>{binfo.building.name}</div>
            </div>
            <div className="info-inline">
              <div>Code:</div>
              <div>{binfo.building.code}</div>
            </div>
            <div className="info-inline">
              <div>Type:</div>
              <div>{binfo.building.type}</div>
            </div>
            <div className="info-inline">
              <div>Address:</div>
              <div>{binfo.building.address}</div>
            </div>
            <div className="info-inline">
              <div>City:</div>
              <div>{binfo.building.city}</div>
            </div>
            <div className="info-inline">
              <div>State:</div>
              <div>{binfo.building.state}</div>
            </div>
            <div className="info-inline">
              <div>Zip Code:</div>
              <div>{binfo.building.zip}</div>
            </div>
          </div>
          <div>
            <div className="info-inline">
              <div>Number of Units:</div>
              <div>{binfo.building.number_of_units}</div>
            </div>
            <div className="info-inline">
              <div>Supers Name:</div>
              <div>{binfo.building.supers_name}</div>
            </div>
            <div className="info-inline">
              <div>Supers Email:</div>
              <div>{binfo.building.supers_email}</div>
            </div>
            <div className="info-inline">
              <div>Supers Cell:</div>
              <div>{binfo.building.supers_cell}</div>
            </div>
            <div className="info-inline">
              <div>Multiple Addresses:</div>
              <div>{binfo.building.multiple_addresses_text}</div>
            </div>
            <div className="info-inline">
              <div>Created At:</div>
              <div>{binfo.building.create_date}</div>
            </div>
            <div className="info-inline">
              <div>Building Notes:</div>
              <div>{binfo.building.building_notes}</div>
            </div>
          </div>
        </div>
        <hr />
        <Tabs defaultActiveKey="board_members" id="uncontrolled-tab-example" className="mb-3">
          <Tab eventKey="board_members" title="Board Members">
            <BoardMemberList building_id={building_id} />
          </Tab>
          <Tab eventKey="tickets" title="Tickets">
            <BuildingTicketsList building_id={building_id} refreshBuilding={refreshBuilding} />
          </Tab>
          <Tab eventKey="internal_notes" title="Internal Notes">
            <div>
              {binfo.internal_notes.length > 0 && (
                binfo.internal_notes.map(note => {
                  return (
                    <div className="tw-bg-white tw-rounded-md tw-p-2 tw-mb-2">
                      <div className="tw-grid tw-grid-cols-4">
                        <div>
                          <div>Ticket Code: <span className="tw-font-bold">{note.ticket_code}</span></div>
                          <div>Cost: <span className="tw-font-bold">{note.cost}</span></div>
                          <div>Created Date: <span className="tw-font-bold">{note.create_date}</span></div>
                        </div>
                        <div className="tw-col-span-3">
                          <div className="tw-flex tw-flex-col tw-justify-center">
                            <div>Description</div>
                            <div className="tw-bg-gray-200 tw-p-1" dangerouslySetInnerHTML={{ __html: note.description }}></div>
                          </div>
                        </div>
                      </div>
                    </div>
                  )
                })
              )}
            </div>
          </Tab>
        </Tabs>
      </div>
    </div >
  );
}
