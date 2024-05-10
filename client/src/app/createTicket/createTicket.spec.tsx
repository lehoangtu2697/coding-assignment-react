import { render, fireEvent, waitFor } from '@testing-library/react';
import CreateTicket from './createTicket';

const mockUsers = [
  { id: 1, name: 'User 1' },
  { id: 2, name: 'User 2' },
];

Object.defineProperty(window, 'matchMedia', {
  value: jest.fn().mockImplementation(() => ({
    addListener: jest.fn(),
    removeListener: jest.fn(),
  })),
});

const mockOnCreateTicket = jest.fn();
describe('CreateTicket component', () => {
  it('renders correctly', () => {
    const { getByText } = render(
      <CreateTicket users={mockUsers} onCreateTicket={mockOnCreateTicket} />
    );

    expect(getByText('Create Ticket')).toBeInTheDocument();
    fireEvent.click(getByText('Create Ticket'));

    expect(getByText('Description')).toBeInTheDocument();
    expect(getByText('Assignee User')).toBeInTheDocument();
    expect(getByText('Cancel')).toBeInTheDocument();
    expect(getByText('Create')).toBeInTheDocument();
  });

  it('calls onCreateTicket with correct values when form is submitted', async () => {
    const { getByLabelText, getByText } = render(
      <CreateTicket users={mockUsers} onCreateTicket={mockOnCreateTicket} />
    );
    fireEvent.click(getByText('Create Ticket'));

    fireEvent.change(getByLabelText('Description'), {
      target: { value: 'Test description' },
    });

    fireEvent.click(getByText('Create'));
    await waitFor(() => {
      expect(mockOnCreateTicket).toHaveBeenCalledTimes(1);
    });
  });
});
