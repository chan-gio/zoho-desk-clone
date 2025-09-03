import React, { useState } from 'react'
import { 
  Card, 
  Table, 
  Button, 
  Space, 
  Tag, 
  Input, 
  Avatar,
  Row,
  Col,
  Modal,
  Form,
  Input as AntInput,
  Select
} from 'antd'
import { 
  PlusOutlined, 
  SearchOutlined, 
  EditOutlined,
  DeleteOutlined,
  UserOutlined
} from '@ant-design/icons'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { useTranslation } from 'react-i18next'
import { customerService } from '../services/customerService'
import './Customers.scss'

const { Search } = Input
const { Option } = Select

const Customers = () => {
  const { t } = useTranslation()
  const [searchText, setSearchText] = useState('')
  const [isModalVisible, setIsModalVisible] = useState(false)
  const [editingCustomer, setEditingCustomer] = useState(null)
  const [form] = Form.useForm()
  const queryClient = useQueryClient()

  const { data: customers, isLoading } = useQuery({
    queryKey: ['customers', { search: searchText }],
    queryFn: () => customerService.getCustomers({ search: searchText }),
  })

  const updateCustomerMutation = useMutation({
    mutationFn: customerService.updateCustomer,
    onSuccess: () => {
      queryClient.invalidateQueries(['customers'])
      setIsModalVisible(false)
      setEditingCustomer(null)
      form.resetFields()
    },
  })

  const deleteCustomerMutation = useMutation({
    mutationFn: customerService.deleteCustomer,
    onSuccess: () => {
      queryClient.invalidateQueries(['customers'])
    },
  })

  const handleEdit = (record) => {
    setEditingCustomer(record)
    form.setFieldsValue(record)
    setIsModalVisible(true)
  }

  const handleDelete = (id) => {
    Modal.confirm({
      title: t('messages.confirm.delete'),
      content: t('customers.confirmDelete'),
      onOk: () => deleteCustomerMutation.mutate(id),
    })
  }

  const handleModalOk = () => {
    form.validateFields().then((values) => {
      updateCustomerMutation.mutate({
        id: editingCustomer.id,
        ...values
      })
    })
  }

  const columns = [
    {
      title: t('customers.title'),
      key: 'customer',
      render: (_, record) => (
        <Space>
          <Avatar icon={<UserOutlined />} />
          <div>
            <div className="customer-name">{record.name}</div>
            <div className="customer-email">{record.email}</div>
          </div>
        </Space>
      ),
    },
    {
      title: t('common.phone'),
      dataIndex: 'phone',
      key: 'phone',
    },
    {
      title: t('common.company'),
      dataIndex: 'company',
      key: 'company',
    },
    {
      title: t('common.status'),
      dataIndex: 'status',
      key: 'status',
      render: (status) => {
        const colors = {
          'active': 'green',
          'inactive': 'red',
          'pending': 'orange'
        }
        return <Tag color={colors[status]}>{status}</Tag>
      },
    },
    {
      title: t('customers.ticketCount'),
      dataIndex: 'ticketCount',
      key: 'ticketCount',
      render: (count) => <Tag>{count} tickets</Tag>,
    },
    {
      title: t('customers.lastActivity'),
      dataIndex: 'createdAt',
      key: 'createdAt',
      render: (date) => new Date(date).toLocaleDateString('vi-VN'),
    },
    {
      title: t('common.actions'),
      key: 'action',
      render: (_, record) => (
        <Space size="middle">
          <Button 
            type="link" 
            icon={<EditOutlined />} 
            onClick={() => handleEdit(record)}
          >
            {t('common.edit')}
          </Button>
          <Button 
            type="link" 
            danger 
            icon={<DeleteOutlined />}
            onClick={() => handleDelete(record.id)}
          >
            {t('common.delete')}
          </Button>
        </Space>
      ),
    },
  ]

  return (
    <div className="customers-page">
      <div className="page-header">
        <h1>{t('customers.title')}</h1>
        <Button type="primary" icon={<PlusOutlined />}>
          {t('customers.addNew')}
        </Button>
      </div>

      {/* Bộ lọc */}
      <Card className="filter-card">
        <Row gutter={[16, 16]}>
          <Col xs={24} sm={12} md={8}>
            <Search
              placeholder={t('customers.searchPlaceholder')}
              allowClear
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
              onSearch={setSearchText}
            />
          </Col>
        </Row>
      </Card>

      {/* Bảng khách hàng */}
      <Card>
        <Table
          columns={columns}
          dataSource={customers}
          loading={isLoading}
          rowKey="id"
          pagination={{
            pageSize: 20,
            showSizeChanger: true,
            showQuickJumper: true,
            showTotal: (total, range) =>
              `${range[0]}-${range[1]} của ${total} khách hàng`,
          }}
        />
      </Card>

      {/* Modal chỉnh sửa */}
      <Modal
        title={t('customers.editCustomer')}
        open={isModalVisible}
        onOk={handleModalOk}
        onCancel={() => {
          setIsModalVisible(false)
          setEditingCustomer(null)
          form.resetFields()
        }}
        confirmLoading={updateCustomerMutation.isPending}
      >
        <Form form={form} layout="vertical">
          <Form.Item
            name="name"
            label={t('customers.customerName')}
            rules={[{ required: true, message: t('settings.fullNameRequired') }]}
          >
            <AntInput />
          </Form.Item>
          <Form.Item
            name="email"
            label={t('common.email')}
            rules={[
              { required: true, message: t('settings.emailRequired') },
              { type: 'email', message: t('settings.emailInvalid') }
            ]}
          >
            <AntInput />
          </Form.Item>
          <Form.Item
            name="phone"
            label={t('common.phone')}
          >
            <AntInput />
          </Form.Item>
          <Form.Item
            name="company"
            label={t('common.company')}
          >
            <AntInput />
          </Form.Item>
          <Form.Item
            name="status"
            label={t('common.status')}
            rules={[{ required: true, message: 'Vui lòng chọn trạng thái!' }]}
          >
            <Select>
              <Option value="active">Hoạt động</Option>
              <Option value="inactive">Không hoạt động</Option>
              <Option value="pending">Chờ xử lý</Option>
            </Select>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  )
}

export default Customers
