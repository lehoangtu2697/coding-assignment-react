import { render, waitFor } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import TicketDetail from './TicketDetail';

const mockFetch = jest.fn();
global.fetch = mockFetch;

describe('TicketDetail component', () => {
  beforeEach(() => {
    Object.defineProperty(window, 'location', {
      value: {
        pathname: '/1',
      },
      writable: true,
    });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('renders ticket details', async () => {
    mockFetch.mockResolvedValueOnce({
      json: () =>
        Promise.resolve({
          id: '1',
          description: 'Test Ticket',
          completed: false,
          assigneeId: 1,
        }),
    });
    mockFetch.mockResolvedValueOnce({
      json: () => Promise.resolve({ id: '1', name: 'Test User' }),
    });

    const { getByText } = render(
      <MemoryRouter>
        <TicketDetail />
      </MemoryRouter>
    );

    await waitFor(() => {
      expect(mockFetch).toHaveBeenCalledTimes(2);
      expect(getByText('assignee user: Test User')).toBeInTheDocument();
      expect(getByText('Ticket Detail')).toBeInTheDocument();
      expect(getByText('ticket ID: 1')).toBeInTheDocument();
      expect(getByText('description: Test Ticket')).toBeInTheDocument();
      expect(getByText('status: incomplete')).toBeInTheDocument();
    });
  });
});
