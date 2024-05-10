import { render, fireEvent, waitFor } from '@testing-library/react';
import ListTickets from './listTickets';

const mockTickets = [
  { id: 1, description: 'Ticket 1', assigneeId: 1, completed: false },
  { id: 2, description: 'Ticket 2', assigneeId: null, completed: true },
];

const mockUsers = [
  { id: 1, name: 'User 1' },
  { id: 2, name: 'User 2' },
];

const mockOnAssignUserToTicket = jest.fn();
const mockOnChangeTicketStatus = jest.fn();

Object.defineProperty(window, 'matchMedia', {
  value: jest.fn().mockImplementation(() => ({
    addListener: jest.fn(),
    removeListener: jest.fn(),
  })),
});

describe('ListTickets component', () => {
  it('renders correctly', async () => {
    const { getByText } = render(
      <ListTickets
        tickets={mockTickets}
        users={mockUsers}
        onAssignUserToTicket={mockOnAssignUserToTicket}
        onChangeTicketStatus={mockOnChangeTicketStatus}
      />
    );

    await waitFor(() => {
      expect(getByText('ticket 1')).toBeInTheDocument();
      expect(getByText('Ticket 2')).toBeInTheDocument();
      expect(getByText('User 1')).toBeInTheDocument();
    });
  });

  it('calls onChangeTicketStatus when ticket status is changed', async () => {
    const { getAllByLabelText, getByText } = render(
      <ListTickets
        tickets={mockTickets}
        users={mockUsers}
        onAssignUserToTicket={mockOnAssignUserToTicket}
        onChangeTicketStatus={mockOnChangeTicketStatus}
      />
    );

    await waitFor(() => {
      expect(getByText('ticket 1')).toBeInTheDocument();
    });

    const switchButtons = getAllByLabelText('status');
    fireEvent.click(switchButtons[0]);
    expect(mockOnChangeTicketStatus).toHaveBeenCalledWith(false, 2);
  });
});
