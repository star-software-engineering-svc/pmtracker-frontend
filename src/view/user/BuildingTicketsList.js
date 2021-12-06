import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import {
  getToken,
  getUser,
  setToken,
  setUser
} from '../../features/user/userSlice';

import { getBuildingTickets } from '../../service/ManagerService';
import { Button, Form } from 'react-bootstrap';

import 'js-snackbar/snackbar.css';
import { show, ACTION_TYPE } from 'js-snackbar';

import { TicketStatusModal } from './modal/TicketStatusModal';
import { NotifySuperModal } from './modal/NotifySuperModal';
import { TicketDescModal } from './modal/TicketDescModal';
import { InternalNoteModal } from './modal/InternalNoteModal';

export function BuildingTicketsList({ building_id, refreshBuilding }) {

  const dispatch = useDispatch();
  const token = useSelector(getToken);
  const user = useSelector(getUser);
  const navigate = useNavigate();
  const [tickets, setTickets] = useState([]);
  const [detailIdx, setDetailIdx] = useState(null);
  const [sortStatusDir, setSortStatusDir] = useState('asc');

  const [currentTicket, setCurrentTicket] = useState({});
  const [ticketModalShow, setTicketModalShow] = useState(false);
  const hideTicketModal = () => setTicketModalShow(false);
  const onClickTicketStatus = (ticket) => {
    setCurrentTicket(ticket);
    setTicketModalShow(true);
  };

  const [notifyModalShow, setNotifyModalShow] = useState(false);
  const hideNotifyModal = () => setNotifyModalShow(false);
  const onClickNotifySuper = (ticket) => {
    setCurrentTicket(ticket);
    setNotifyModalShow(true);
  };

  const [ticketDescModalShow, setTicketDescModalShow] = useState(false);
  const hideTicketDescModal = () => setTicketDescModalShow(false);
  const onClickTicketDesc = (ticket) => {
    setCurrentTicket(ticket);
    setTicketDescModalShow(true);
  };

  const [internalNoteModalShow, setInternalNoteModalShow] = useState(false);
  const hideInternalNoteModal = () => setInternalNoteModalShow(false);
  const onClickInternalNote = (ticket) => {
    setCurrentTicket(ticket);
    setInternalNoteModalShow(true);
  };

  const onSuccessAddNote = () => {
    setInternalNoteModalShow(false);
    refreshBuilding();
  }

  const onSortStatus = () => {
    if (sortStatusDir == 'asc')
      setSortStatusDir('desc');
    else
      setSortStatusDir('asc');
  }

  const loadTickets = () => {
    setTicketModalShow(false);
    setNotifyModalShow(false);
    setTicketDescModalShow(false);
    setInternalNoteModalShow(false);

    getBuildingTickets(token, user.permission, building_id, sortStatusDir).then((response) => {
      const { tickets } = response.data;
      setTickets(tickets);
    }).catch((error) => {
      if (error.response.status == 401) {
        dispatch(setToken(null));
        dispatch(setUser(null));
      } else {
        console.log(error.response);
        show({ text: error.response.message });
      }
    }).finally(() => {
    });
  }

  const showDetail = (index) => {
    console.log(index)
    setDetailIdx(index);
  }

  useEffect(() => {
    loadTickets();
  }, [sortStatusDir]);

  return (
    <>
      <div className="tw-bg-white tw-rounded-md tw-p-2 tw-mb-2">
        <table className="table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Resident Name</th>
              <th>Unit #</th>
              <th>Ticket Category</th>
              <th onClick={onSortStatus} className="tw-cursor-pointer">
                Status&nbsp;
                {sortStatusDir == 'asc' && (<i className="fas fa-sort-up"></i>)}
                {sortStatusDir == 'desc' && (<i className="fas fa-sort-down"></i>)}
              </th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {
              tickets.map((ticket, index) => {
                return (
                  <>
                    {detailIdx != ticket.ticket_id && (<tr>
                      <td>{ticket.ticket_id}</td>
                      <td>{ticket.resident_name}</td>
                      <td>{ticket.unit_number}</td>
                      <td>{ticket.ticket_category_name}</td>
                      <td>
                        <div className={'tw-text-white tw-p-1 tw-text-center ' + (ticket.ticket_status_id == 1 ? 'tw-bg-green-400' : (ticket.ticket_status_id == 2 ? 'tw-bg-yellow-400' : 'tw-bg-red-400'))}>
                          {ticket.ticket_status_name}
                        </div>
                      </td>
                      <td>
                        <Button size="sm" variant="secondary" onClick={() => showDetail(ticket.ticket_id)}>More</Button>
                      </td>
                    </tr>)}
                    {detailIdx == ticket.ticket_id && (
                      <tr>
                        <td colSpan="6">
                          <div key={ticket.ticket_id} className="detail-building">
                            <div className="less-button-pos">
                              <Button size="sm" variant="secondary" onClick={() => setDetailIdx(-1)}>Less</Button>
                            </div>
                            <div className="tw-grid tw-grid-cols-1 tw-divide-x md:tw-grid-cols-3">
                              <div>
                                <div className="info-inline">
                                  <div>ID</div><div>{ticket.ticket_id}</div>
                                </div>
                                <div className="info-inline">
                                  <div>Resident Name</div><div>{ticket.resident_name}</div>
                                </div>
                                <div className="info-inline">
                                  <div>Unit No</div><div>{ticket.unit_number}</div>
                                </div>
                                <div className="info-inline">
                                  <div>Residential Status</div><div>
                                    {ticket.residential_status}
                                  </div>
                                </div>
                                <div className="info-inline">
                                  <div>Resident Email</div><div>{ticket.resident_email}</div>
                                </div>
                                <div className="info-inline">
                                  <div>Cell Phone</div><div>{ticket.cell_phone}</div>
                                </div>
                              </div>
                              <div>
                                <div className="info-inline">
                                  <div>Code</div><div>{ticket.code}</div>
                                </div>
                                <div className="info-inline">
                                  <div>Ticket Category</div><div>{ticket.ticket_category_name}</div>
                                </div>
                                <div className="info-inline">
                                  <div>Ticket Status</div>
                                  <div>
                                    <div onClick={() => { onClickTicketStatus(ticket) }} className={'tw-cursor-pointer tw-text-white tw-p-1 tw-text-center ' + (ticket.ticket_status_id == 1 ? 'tw-bg-green-400' : (ticket.ticket_status_id == 2 ? 'tw-bg-yellow-400' : 'tw-bg-red-400'))}>
                                      {ticket.ticket_status_name}
                                    </div>
                                    <div className="tw-text-right tw-italic tw-text-xs tw-text-gray-300">Click to change the status</div>
                                  </div>
                                </div>
                                <div className="info-inline">
                                  <div>Attachment 1</div><div>{ticket.attachment1}</div>
                                </div>
                                <div className="info-inline">
                                  <div>Attachment 2</div><div>{ticket.attachment2}</div>
                                </div>
                              </div>
                              <div>
                                <div style={{ padding: '5px' }}>
                                  <div>Description</div>
                                  <div className="scroll-desc-wrap" dangerouslySetInnerHTML={{ __html: ticket.description }}></div>
                                </div>
                              </div>
                            </div>
                          </div>
                          <div className="tw-pl-2 tw-text-right">
                            <Button size="sm" onClick={() => { onClickNotifySuper(ticket) }} className="tw-m-1"><i className="fas fa-envelope"></i>&nbsp;Notify Super</Button>&nbsp;
                            <Button size="sm" onClick={() => { onClickTicketDesc(ticket) }} className="tw-m-1"><i className="fas fa-pen"></i>&nbsp;Reply to Resident</Button>&nbsp;
                            <Button size="sm" onClick={() => { onClickInternalNote(ticket) }} className="tw-m-1"><i className="fas fa-plus"></i>&nbsp;Add Internal Note</Button>
                          </div>
                        </td>
                      </tr>)}
                  </>
                )
              })
            }
          </tbody>
        </table >
      </div>
      <TicketStatusModal shown={ticketModalShow} handleClose={hideTicketModal} ticket={currentTicket} onSuccess={loadTickets} />
      <NotifySuperModal shown={notifyModalShow} handleClose={hideNotifyModal} ticket={currentTicket} onSuccess={loadTickets} />
      <TicketDescModal shown={ticketDescModalShow} handleClose={hideTicketDescModal} ticket={currentTicket} onSuccess={loadTickets} />
      <InternalNoteModal shown={internalNoteModalShow} handleClose={hideInternalNoteModal} ticket={currentTicket} onSuccess={onSuccessAddNote} />
    </>
  );
}
