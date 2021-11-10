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

export function BuildingTicketsList({ building_id }) {

  const dispatch = useDispatch();
  const token = useSelector(getToken);
  const user = useSelector(getUser);
  const navigate = useNavigate();
  const [tickets, setTickets] = useState([]);

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

  const loadTickets = () => {
    setTicketModalShow(false);
    setNotifyModalShow(false);
    setTicketDescModalShow(false);
    setInternalNoteModalShow(false);

    getBuildingTickets(token, building_id).then((response) => {
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

  useEffect(() => {
    loadTickets();
  }, []);

  return (
    <>
      <div>
        {
          tickets.map(ticket => {
            return (
              <div key={ticket.ticket_id} className="tw-bg-white tw-rounded-md tw-p-2 tw-mb-2">
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
                        <Button onClick={() => { onClickTicketStatus(ticket) }}>{ticket.ticket_status_name}</Button>
                      </div>
                    </div>
                    <div className="info-inline">
                      <div>Attachment 1</div><div>{ticket.attachment1}</div>
                    </div>
                    <div className="info-inline">
                      <div>Attachment 2</div><div>{ticket.attachment2}</div>
                    </div>
                    <div className="tw-pl-2">
                      <Button onClick={() => { onClickNotifySuper(ticket) }} className="tw-m-1"><i className="fas fa-envelope"></i>&nbsp;Notify Super</Button>&nbsp;
                      <Button onClick={() => { onClickTicketDesc(ticket) }} className="tw-m-1"><i className="fas fa-pen"></i>&nbsp;Edit</Button>&nbsp;
                      <Button onClick={() => { onClickInternalNote(ticket) }} className="tw-m-1"><i className="fas fa-plus"></i>&nbsp;Add Note</Button>
                    </div>
                  </div>
                  <div className="tw-p-2">
                    <div className="info-inline">
                      <div>Description</div><div className="scroll-desc-wrap" dangerouslySetInnerHTML={{ __html: ticket.description }}></div>
                    </div>
                  </div>
                </div>
              </div>
            )
          })
        }
      </div >
      <TicketStatusModal shown={ticketModalShow} handleClose={hideTicketModal} ticket={currentTicket} onSuccess={loadTickets} />
      <NotifySuperModal shown={notifyModalShow} handleClose={hideNotifyModal} ticket={currentTicket} onSuccess={loadTickets} />
      <TicketDescModal shown={ticketDescModalShow} handleClose={hideTicketDescModal} ticket={currentTicket} onSuccess={loadTickets} />
      <InternalNoteModal shown={internalNoteModalShow} handleClose={hideInternalNoteModal} ticket={currentTicket} onSuccess={loadTickets} />
    </>
  );
}
