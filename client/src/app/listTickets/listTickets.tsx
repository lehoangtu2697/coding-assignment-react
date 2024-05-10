import { Ticket, User } from '@acme/shared-models';
import styles from './listTickets.module.css';
import {
  DataGrid,
  HeaderFilter,
  Column,
  Lookup,
  GroupPanel,
  Editing,
} from 'devextreme-react/data-grid';
import { Switch } from 'antd';

export interface TicketsProps {
  tickets: Ticket[];
  users: User[];
  onAssignUserToTicket: (ticketId: string, assigneeId: number | null) => void;
  onChangeTicketStatus: (checked: boolean, ticketId: string) => void;
}

export function ListTickets({
  tickets,
  users,
  onAssignUserToTicket,
  onChangeTicketStatus,
}: TicketsProps) {
  return (
    <div className={styles['list-tickets']}>
      <DataGrid
        dataSource={tickets}
        columnAutoWidth={true}
        showRowLines={true}
        showBorders={true}
        keyExpr="id"
        onRowUpdated={({ data }) => {
          onAssignUserToTicket(`${data.id}`, data.assigneeId);
        }}
      >
        <GroupPanel visible={true} />
        <HeaderFilter visible={true} />
        <Editing mode="cell" allowUpdating={true} />

        <Column
          dataField="id"
          width={150}
          sortOrder="desc"
          caption="ticket id"
          allowEditing={false}
          cellRender={({ data }) => (
            <a href={`/${data.id}`}>ticket {data.id}</a>
          )}
        />

        <Column
          dataField="description"
          allowEditing={false}
          headerFilter={{ allowSearch: true }}
        />

        <Column
          dataField="assigneeId"
          caption="assignee user"
          headerFilter={{
            allowSearch: true,
            dataSource: [
              { text: '[Unassigned]', value: null },
              ...users.map((user) => ({ text: user.name, value: user.id })),
            ],
          }}
        >
          <Lookup
            dataSource={users}
            allowClearing
            valueExpr="id"
            displayExpr="name"
          />
        </Column>

        <Column
          dataField={'completed'}
          caption="status"
          width={150}
          allowEditing={false}
          headerFilter={{
            dataSource: [
              { text: 'completed', value: true },
              { text: 'incomplete', value: false },
            ],
          }}
          cellRender={({ data }) => (
            <Switch
              aria-label="status"
              defaultValue={!!data.completed}
              onChange={(checked) => {
                onChangeTicketStatus(checked, data.id);
              }}
            />
          )}
        />
      </DataGrid>
    </div>
  );
}

export default ListTickets;
