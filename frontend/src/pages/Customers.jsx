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
  Select,
  Typography,
  message,
  Popconfirm,
  Alert,
  Spin
} from 'antd'
import { 
  PlusOutlined, 
  SearchOutlined, 
  EditOutlined,
  DeleteOutlined,
  UserOutlined,
  UsergroupAddOutlined,
  MailOutlined,
  PhoneOutlined,
  TeamOutlined
} from '@ant-design/icons'
import { useTranslation } from 'react-i18next'
import { useUsers, useCreateUser, useUpdateUser, useDeleteUser, useUsersByTenant } from '../hooks/useUsers'
import './Customers.scss'

const { Search } = Input
const { Option } = Select
const { Title, Text } = Typography

const Customers = () => {
  const { t } = useTranslation()
  const [searchText, setSearchText] = useState('')
  const [isModalVisible, setIsModalVisible] = useState(false)
  const [editingUser, setEditingUser] = useState(null)
  const [form] = Form.useForm()

  // Sử dụng hooks để quản lý users
  const { data: usersData, isLoading: usersLoading, error: usersError } = useUsersByTenant()
  const createUserMutation = useCreateUser()
  const updateUserMutation = useUpdateUser()
  const deleteUserMutation = useDeleteUser()

  const users = usersData?.data?.users || []

  const handleAdd = () => {
    setEditingUser(null)
    form.resetFields()
    setIsModalVisible(true)
  }

  const handleEdit = (record) => {
    setEditingUser(record)
    form.setFieldsValue({
      username: record.username,
      email: record.email,
      phone: record.phone,
      role: record.role,
      isActive: record.isActive
    })
    setIsModalVisible(true)
  }

  const handleDelete = async (id) => {
    try {
      await deleteUserMutation.mutateAsync(id)
      message.success('Xóa nhân viên thành công!')
    } catch (error) {
      message.error(error.response?.data?.message || 'Có lỗi xảy ra khi xóa nhân viên!')
    }
  }

  const handleSubmit = async (values) => {
    try {
      if (editingUser) {
        await updateUserMutation.mutateAsync({
          id: editingUser.id,
          data: values
        })
        message.success('Cập nhật nhân viên thành công!')
      } else {
        await createUserMutation.mutateAsync(values)
        message.success('Tạo nhân viên thành công!')
      }
      setIsModalVisible(false)
      form.resetFields()
    } catch (error) {
      message.error(error.response?.data?.message || 'Có lỗi xảy ra!')
    }
  }

  const columns = [
    {
      title: 'Nhân viên',
      key: 'user',
      render: (_, record) => (
        <Space>
          <Avatar icon={<UserOutlined />} />
          <div>
            <div style={{ fontWeight: 'bold' }}>{record.username || record.name}</div>
            <div style={{ fontSize: '12px', color: '#666' }}>{record.email}</div>
          </div>
        </Space>
      ),
    },
    {
      title: 'Số điện thoại',
      dataIndex: 'phone',
      key: 'phone',
      render: (phone) => phone || 'Chưa cập nhật',
    },
    {
      title: 'Vai trò',
      dataIndex: 'role',
      key: 'role',
      render: (role) => {
        const colors = {
          'admin': 'red',
          'agent': 'blue',
          'user': 'green'
        }
        return <Tag color={colors[role] || 'default'}>{role}</Tag>
      },
    },
    {
      title: 'Trạng thái',
      dataIndex: 'isActive',
      key: 'isActive',
      render: (isActive) => (
        <Tag color={isActive ? 'green' : 'red'}>
          {isActive ? 'Hoạt động' : 'Không hoạt động'}
        </Tag>
      ),
    },
    {
      title: 'Ngày tạo',
      dataIndex: 'createdAt',
      key: 'createdAt',
      render: (date) => new Date(date).toLocaleDateString('vi-VN'),
    },
    {
      title: 'Hành động',
      key: 'action',
      render: (_, record) => (
        <Space size="middle">
          <Button 
            type="link" 
            icon={<EditOutlined />} 
            onClick={() => handleEdit(record)}
          >
            Sửa
          </Button>
          <Popconfirm
            title="Bạn có chắc chắn muốn xóa nhân viên này?"
            onConfirm={() => handleDelete(record.id)}
            okText="Xóa"
            cancelText="Hủy"
          >
            <Button 
              type="link" 
              danger 
              icon={<DeleteOutlined />}
            >
              Xóa
            </Button>
          </Popconfirm>
        </Space>
      ),
    },
  ]

  // Hiển thị loading state
  if (usersLoading) {
    return (
      <div className="customers-page">
        <div style={{ textAlign: 'center', padding: '50px' }}>
          <Spin size="large" />
          <div style={{ marginTop: '16px' }}>
            <Text>Đang tải danh sách nhân viên...</Text>
          </div>
        </div>
      </div>
    )
  }

  // Hiển thị lỗi
  if (usersError) {
    return (
      <div className="customers-page">
        <Alert
          message="Lỗi tải dữ liệu"
          description={usersError.response?.data?.message || 'Không thể tải danh sách nhân viên. Vui lòng thử lại.'}
          type="error"
          showIcon
          style={{ marginBottom: '24px' }}
        />
      </div>
    )
  }

  return (
    <div className="customers-page">
      <div className="page-header">
        <Title level={2}>Quản lý nhân sự</Title>
        <Text type="secondary">Quản lý thông tin nhân viên trong tổ chức</Text>
      </div>

      <Card>
        <div style={{ marginBottom: 16, textAlign: 'right' }}>
          <Button type="primary" icon={<PlusOutlined />} onClick={handleAdd}>
            Thêm nhân viên
          </Button>
        </div>

        <Table
          columns={columns}
          dataSource={users}
          loading={usersLoading}
          rowKey="id"
          pagination={{
            pageSize: 10,
            showSizeChanger: true,
            showQuickJumper: true,
            showTotal: (total, range) =>
              `${range[0]}-${range[1]} của ${total} nhân viên`,
          }}
        />
      </Card>

      {/* Modal thêm/sửa nhân viên */}
      <Modal
        title={editingUser ? 'Sửa nhân viên' : 'Thêm nhân viên mới'}
        open={isModalVisible}
        onCancel={() => {
          setIsModalVisible(false)
          form.resetFields()
        }}
        footer={null}
        width={600}
      >
        <Form
          form={form}
          layout="vertical"
          onFinish={handleSubmit}
        >
          <Form.Item
            name="username"
            label="Tên đăng nhập"
            rules={[{ required: true, message: 'Vui lòng nhập tên đăng nhập!' }]}
          >
            <AntInput placeholder="Nhập tên đăng nhập" />
          </Form.Item>

          <Form.Item
            name="email"
            label="Email"
            rules={[
              { required: true, message: 'Vui lòng nhập email!' },
              { type: 'email', message: 'Email không hợp lệ!' }
            ]}
          >
            <AntInput placeholder="Nhập email" />
          </Form.Item>

          <Form.Item
            name="phone"
            label="Số điện thoại"
          >
            <AntInput placeholder="Nhập số điện thoại" />
          </Form.Item>

          <Form.Item
            name="role"
            label="Vai trò"
            rules={[{ required: true, message: 'Vui lòng chọn vai trò!' }]}
          >
            <Select placeholder="Chọn vai trò">
              <Option value="admin">Admin</Option>
              <Option value="agent">Agent</Option>
              <Option value="user">User</Option>
            </Select>
          </Form.Item>

          <Form.Item
            name="isActive"
            label="Trạng thái"
          >
            <Select placeholder="Chọn trạng thái">
              <Option value={true}>Hoạt động</Option>
              <Option value={false}>Không hoạt động</Option>
            </Select>
          </Form.Item>

          <Form.Item>
            <Space>
              <Button onClick={() => setIsModalVisible(false)}>
                Hủy
              </Button>
              <Button 
                type="primary" 
                htmlType="submit"
                loading={createUserMutation.isPending || updateUserMutation.isPending}
              >
                {editingUser ? 'Cập nhật' : 'Tạo mới'}
              </Button>
            </Space>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  )
}

export default Customers
