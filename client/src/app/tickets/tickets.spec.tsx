import { render } from '@testing-library/react';
import Tickets, { TicketsProps } from './tickets';

const mockFetchTickets = jest.fn();

const mockProps: TicketsProps = {
  tickets: [],
  users: [],
  fetchTickets: mockFetchTickets,
};

describe('Tickets Component', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should render successfully', () => {
    const { getByText } = render(<Tickets {...mockProps} />);
    expect(getByText('Tickets')).toBeInTheDocument();
  });
});
