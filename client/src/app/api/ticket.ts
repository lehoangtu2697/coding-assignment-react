export async function createNewTicket(description: string) {
    const url = '/api/tickets';
  
    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            description
          })
      });
  
      if (!response.ok) {
        throw new Error('Failed to create ticket');
      }
  
      return await response.json();
    } catch (error) {
      console.error('Error creating ticket:', error);
      throw error;
    }
}

export async function assignUserToTicket(ticketId: string, userId: string) {
    const url = `/api/tickets/${ticketId}/assign/${userId}`;
  
    try {
      const response = await fetch(url, {
        method: 'PUT'
      });
  
      if (response.status !== 204) {
        throw new Error('Failed to assign user to ticket');
      }
  
      console.log('User assigned to ticket successfully');
    } catch (error) {
      console.error('Error assigning user to ticket:', error);
      throw error;
    }
}

export async function unassignUserFromTicket(ticketId: string) {
    const url = `/api/tickets/${ticketId}/unassign`;
  
    try {
      const response = await fetch(url, {
        method: 'PUT'
      });
  
      if (response.status !== 204) {
        throw new Error('Failed to unassign user from ticket');
      }
  
      console.log('User unassigned from ticket successfully');
    } catch (error) {
      console.error('Error unassign user from ticket:', error);
      throw error;
    }
}

export async function markTicketAsComplete(ticketId: string) {
  const url = `/api/tickets/${ticketId}/complete`;

  try {
    const response = await fetch(url, {
      method: 'PUT'
    });

    if (response.status !== 204) {
      throw new Error('Failed to mark ticket as complete');
    }

    console.log('Ticket marked as complete successfully');
  } catch (error) {
    console.error('Error marking ticket as complete:', error);
    throw error;
  }
}

export async function markTicketAsIncomplete(ticketId: string) {
  const url = `/api/tickets/${ticketId}/complete`;

  try {
    const response = await fetch(url, {
      method: 'DELETE'
    });

    if (response.status !== 204) {
      throw new Error('Failed to mark ticket as incomplete');
    }

    console.log('Ticket marked as incomplete successfully');
  } catch (error) {
    console.error('Error marking ticket as incomplete:', error);
    throw error;
  }
}


  
  