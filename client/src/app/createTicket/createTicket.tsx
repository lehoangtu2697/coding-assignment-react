import { User } from '@acme/shared-models';
import { useState } from 'react';
import styles from './createTicket.module.css';
import { PlusOutlined } from '@ant-design/icons';
import type { FormProps } from 'antd';
import { Form, Button, Modal, Input, Select } from 'antd';

const { Option } = Select;

export interface CreateTicketProps {
  users: User[];
  onCreateTicket: (description: string, assigneeId?: string) => void;
}

type FieldType = {
  description: string;
  assigneeId?: string;
};

export function CreateTicket({
  users = [],
  onCreateTicket,
}: CreateTicketProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [form] = Form.useForm();

  const showModal = () => {
    form.resetFields();
    setIsModalOpen(true);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const onFinish: FormProps<FieldType>['onFinish'] = ({
    description,
    assigneeId,
  }) => {
    onCreateTicket(description, assigneeId);
    setIsModalOpen(false);
  };

  return (
    <div className={styles['create-ticket']}>
      <Button type="primary" onClick={showModal}>
        <PlusOutlined /> Create Ticket
      </Button>
      <Modal
        title="Create Ticket"
        centered
        footer={null}
        open={isModalOpen}
        onCancel={handleCancel}
      >
        <Form form={form} onFinish={onFinish}>
          <Form.Item<FieldType>
            label="Description"
            name="description"
            rules={[{ required: true, message: 'Please input description!' }]}
          >
            <Input />
          </Form.Item>

          <Form.Item<FieldType> label="Assignee User" name="assigneeId">
            <Select allowClear>
              {users.map((user: User) => (
                <Option key={user.id} value={user.id}>
                  {user.name}
                </Option>
              ))}
            </Select>
          </Form.Item>

          <Form.Item className={styles['footer-modal']}>
            <Button className={styles['btn-cancel']} onClick={handleCancel}>
              Cancel
            </Button>

            <Button type="primary" htmlType="submit">
              Create
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
}

export default CreateTicket;
