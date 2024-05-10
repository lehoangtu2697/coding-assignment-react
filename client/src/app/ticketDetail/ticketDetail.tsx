import { useEffect, useState, useCallback } from 'react';
import { Ticket, User } from '@acme/shared-models';
import styles from './ticketDetail.module.css';
import { Button } from 'antd';
import { Link } from 'react-router-dom';
import { LeftOutlined } from '@ant-design/icons';

export function TicketDetail() {
  const [ticket, setTicket] = useState<Ticket | null>(null);
  const [user, setUser] = useState<User | null>(null);

  const fetchTicket = useCallback(async (ticketId?: string) => {
    if (ticketId) {
      const response = await fetch(`/api/tickets/${ticketId}`);
      const data = await response.json();
      setTicket(data);
      console.log('ticket', data);
      return data;
    }
    return null;
  }, []);

  const fetchUser = useCallback(async (userId: string) => {
    if (userId) {
      const response = await fetch(`/api/users/${userId}`);
      const data = await response.json();
      console.log('user', data);
      setUser(data);
    }
  }, []);

  useEffect(() => {
    const path = window.location.pathname;
    const id = path.split('/').pop();

    if (id) {
      fetchTicket(id).then((ticket) => {
        if (ticket && ticket.assigneeId) {
          fetchUser(`${ticket.assigneeId}`);
        }
      });
    }
  }, [fetchTicket, fetchUser]);

  return (
    <div className={styles['ticket-detail']}>
      <h2>Ticket Detail</h2>
      <Button type="primary" icon={<LeftOutlined />}>
        <Link to="/">Back</Link>
      </Button>

      <div className={styles['ticket-info']}>
        <div className={styles['column']}>
          <p>ticket ID: {ticket?.id || ''}</p>
          <p>description: {ticket?.description || ''}</p>
        </div>
        <div className={styles['column']}>
          <p>assignee user: {user?.name || ''}</p>
          <p>status: {ticket?.completed ? 'completed' : 'incomplete'}</p>
        </div>
      </div>
    </div>
  );
}

export default TicketDetail;
