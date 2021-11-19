import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import {
  getToken,
  getUser,
  setToken,
  setUser
} from '../../features/user/userSlice';

import { getTicket4Track } from '../../service/ManagerService';
import { warning } from '../helper/snack';
import { Button } from 'react-bootstrap';

export function TicketTrackView() {

  let { ticket_id, ticket_token } = useParams();
  console.log(ticket_id, ticket_token);

  const dispatch = useDispatch();
  const user = useSelector(getUser);
  const navigate = useNavigate();

  const [ticket, setTicket] = useState({
    ticket_category: {},
    ticket_status: {}
  });

  const onAddTicket = () => {
    navigate("/ticket/new");
  }

  useEffect(() => {
    getTicket4Track(ticket_token, ticket_id).then((response) => {
      // TODO: set data to binfo
      console.log(response);
      const { type, ticket } = response.data;
      setTicket(ticket);
    }).catch((error) => {
      if (error.response.status == 401) {
        navigate("/ticket/login");
      } else {
        warning("There was an unexpected error.");
      }
    });
  }, []);

  return (
    <div className="tw-container tw-mx-auto">
      <div className="tw-m-3 tw-p-3 tw-rounded-lg tw-bg-green-100">
        <div className="tw-text-center tw-p-5">
          <span className="tw-text-xl">Track a Ticket</span>
        </div>
        <div className="tw-grid tw-grid-cols-1 lg:tw-grid-cols-5">
          <div className="tw-p-2">
          </div>
          <div className="tw-p-2 lg:tw-col-span-3">
            <div className="info-inline">
              <div>ID:</div>
              <div>{ticket.ticket_id}</div>
            </div>
            <div className="info-inline">
              <div>Code:</div>
              <div>{ticket.code}</div>
            </div>
            <div className="info-inline">
              <div>Resident Name:</div>
              <div>{ticket.resident_name}</div>
            </div>
            <div className="info-inline">
              <div>Resident Email:</div>
              <div>{ticket.resident_email}</div>
            </div>
            <div className="info-inline">
              <div>Unit #:</div>
              <div>{ticket.unit_number}</div>
            </div>
            <div className="info-inline">
              <div>Cell Phone:</div>
              <div>{ticket.cell_phone}</div>
            </div>
            <div className="info-inline">
              <div>Create Date:</div>
              <div>{ticket.create_date}</div>
            </div>
            <div className="info-inline">
              <div>Ticket Category:</div>
              <div>{ticket.ticket_category.name}</div>
            </div>
            <div className="info-inline">
              <div>Ticket Status:</div>
              <div>{ticket.ticket_status.name}</div>
            </div>
            <div className="info-inline">
              <div>Attachment 1:</div>
              <div>{ticket.attachment1 && ticket.attachment1 != "" && (<a href={"/download-attachment?filename=" + ticket.attachment1}>{ticket.attachment1}</a>)}</div>
            </div>
            <div className="info-inline">
              <div>Attachment 2:</div>
              <div>{ticket.attachment2 && ticket.attachment2 != "" && (<a href={"/download-attachment?filename=" + ticket.attachment2}>{ticket.attachment2}</a>)}</div>
            </div>
            <div className="info-inline">
              <div>Description:
                <div className="scroll-desc-wrap" dangerouslySetInnerHTML={{ __html: ticket.description }}></div>
              </div>
            </div>
            <div className="tw-flex tw-flex-column tw-justify-center mt-2">
              <Button onClick={onAddTicket}>Add a Ticket</Button>
            </div>
          </div>
          <div className="tw-p-2">
          </div>
        </div>
      </div>
    </div >
  );
}
