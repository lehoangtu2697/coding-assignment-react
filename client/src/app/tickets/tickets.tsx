import { Ticket, User } from '@acme/shared-models';
import styles from './tickets.module.css';
import CreateTicket from '../createTicket/createTicket';
import ListTickets from '../listTickets/listTickets';
import {
  createNewTicket,
  assignUserToTicket,
  unassignUserFromTicket,
  markTicketAsComplete,
  markTicketAsIncomplete,
} from '../api/ticket';
import { successNotify, errorNotify } from '../utils/notify';

export interface TicketsProps {
  tickets: Ticket[];
  users: User[];
  fetchTickets: () => void;
}

export function Tickets({ tickets, users, fetchTickets }: TicketsProps) {
  const onCreateTicket = (description: string, assigneeId?: string) => {
    createNewTicket(description)
      .then(({ id }) => {
        if (assigneeId) {
          assignUserToTicket(id, assigneeId)
            .then(() => {
              successNotify('Ticket created successfully');
              fetchTickets();
            })
            .catch((error) => {
              console.error('Failed to assign user:', error);
              errorNotify('Failed to assign user');
            });
        } else {
          successNotify('Ticket created successfully');
          fetchTickets();
        }
      })
      .catch((error) => {
        console.error('Failed to create ticket:', error);
        errorNotify('Failed to create ticket');
      });
  };

  const onAssignUserToTicket = (
    ticketId: string,
    assigneeId: number | null
  ) => {
    if (assigneeId !== null) {
      assignUserToTicket(ticketId, `${assigneeId}`)
        .then(() => {
          successNotify('Successfully to assigned ticket');
        })
        .catch((error) => {
          console.error('Failed to assign ticket:', error);
          errorNotify('Failed to assign ticket');
        });
    } else {
      unassignUserFromTicket(ticketId)
        .then(() => {
          successNotify('Successfully to unassigned ticket');
        })
        .catch((error) => {
          console.error('Failed to unassign ticket:', error);
          errorNotify('Failed to unassign ticket');
        });
    }
  };

  const onChangeTicketStatus = (checked: boolean, ticketId: string) => {
    const apiChangeTicketStatus = checked
      ? markTicketAsComplete
      : markTicketAsIncomplete;

    apiChangeTicketStatus(ticketId)
      .then(() => {
        successNotify('Successfully to changed ticket status');
      })
      .catch((error) => {
        console.error('Failed to change ticket status:', error);
        errorNotify('Failed to change ticket status');
      });
  };

  return (
    <div className={styles['tickets']}>
      <h2>Tickets</h2>
      <CreateTicket users={users} onCreateTicket={onCreateTicket} />

      <ListTickets
        tickets={tickets}
        users={users}
        onAssignUserToTicket={onAssignUserToTicket}
        onChangeTicketStatus={onChangeTicketStatus}
      />
    </div>
  );
}

export default Tickets;
