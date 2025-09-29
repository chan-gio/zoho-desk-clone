import React from 'react';
import { Modal, Form, Input, Select, Space } from 'antd';

const { TextArea } = Input;

const TicketDetailModal = ({ ticket, visible, onClose, onSave }) => {
  const [form] = Form.useForm();

  React.useEffect(() => {
    if (ticket && visible) {
      form.setFieldsValue({
        title: ticket.title,
        description: ticket.description,
        priority: ticket.priority,
        assignee: ticket.assignee?.username || ticket.assignee || '',
        status: ticket.status,
        tags: ticket.tags ? ticket.tags.join(', ') : ''
      });
    }
  }, [ticket, visible, form]);

  const handleSave = async () => {
    try {
      const values = await form.validateFields();
      onSave({
        ...ticket,
        ...values,
        tags: values.tags ? values.tags.split(',').map(tag => tag.trim()).filter(tag => tag) : []
      });
      onClose();
    } catch (error) {
      console.error('Validation failed:', error);
    }
  };

  if (!ticket) return null;

  return (
    <Modal
      title="Ticket Details"
      open={visible}
      onCancel={onClose}
      onOk={handleSave}
      width={600}
      okText="Save"
      cancelText="Cancel"
    >
      <Form
        form={form}
        layout="vertical"
        style={{ marginTop: '16px' }}
      >
        <Form.Item
          label="Title"
          name="title"
          rules={[{ required: true, message: 'Please enter ticket title' }]}
        >
          <Input placeholder="Enter ticket title" />
        </Form.Item>

        <Form.Item
          label="Description"
          name="description"
        >
          <TextArea 
            rows={4} 
            placeholder="Enter ticket description"
          />
        </Form.Item>

        <Space style={{ width: '100%' }} size="large">
          <Form.Item
            label="Priority"
            name="priority"
            style={{ width: '200px' }}
          >
            <Select>
              <Select.Option value="low">Low</Select.Option>
              <Select.Option value="medium">Medium</Select.Option>
              <Select.Option value="high">High</Select.Option>
            </Select>
          </Form.Item>

          <Form.Item
            label="Status"
            name="status"
            style={{ width: '200px' }}
          >
            <Select>
              <Select.Option value="To Do">To Do</Select.Option>
              <Select.Option value="In Progress">In Progress</Select.Option>
              <Select.Option value="Review">Review</Select.Option>
              <Select.Option value="Done">Done</Select.Option>
            </Select>
          </Form.Item>
        </Space>

        <Form.Item
          label="Assignee"
          name="assignee"
        >
          <Input placeholder="Enter assignee name" />
        </Form.Item>

        <Form.Item
          label="Tags"
          name="tags"
        >
          <Input placeholder="Enter tags separated by commas" />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default TicketDetailModal;
