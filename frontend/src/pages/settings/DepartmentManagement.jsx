import React, { useState } from 'react'
import { 
  Card, 
  Table, 
  Button, 
  Modal, 
  Form, 
  Input, 
  Select, 
  Row,
  Col,
  Typography,
  message,
  Space,
  Popconfirm,
  Tag,
  Avatar,
  Alert,
  Spin
} from 'antd'
import { 
  PlusOutlined,
  EditOutlined,
  DeleteOutlined,
  TeamOutlined,
  UserOutlined
} from '@ant-design/icons'
import { useTranslation } from 'react-i18next'
import { useDepartments, useCreateDepartment, useUpdateDepartment, useDeleteDepartment } from '../../hooks/useDepartments'
import './DepartmentManagement.scss'

const { Title, Text } = Typography
const { Option } = Select

const DepartmentManagement = () => {
  const { t } = useTranslation()
  const [form] = Form.useForm()
  const [isModalVisible, setIsModalVisible] = useState(false)
  const [editingDepartment, setEditingDepartment] = useState(null)

  // Sử dụng hooks để quản lý departments
  const { data: departmentsData, isLoading: departmentsLoading, error: departmentsError } = useDepartments()
  
  const createDepartmentMutation = useCreateDepartment()
  const updateDepartmentMutation = useUpdateDepartment()
  const deleteDepartmentMutation = useDeleteDepartment()

  const departments = departmentsData?.departments || []

  const handleAdd = () => {
    setEditingDepartment(null)
    form.resetFields()
    setIsModalVisible(true)
  }

  const handleEdit = (department) => {
    setEditingDepartment(department)
    form.setFieldsValue({
      name: department.name,
      description: department.description
    })
    setIsModalVisible(true)
  }

  const handleDelete = async (id) => {
    try {
      await deleteDepartmentMutation.mutateAsync(id)
      message.success('Xóa phòng ban thành công!')
    } catch (error) {
      message.error(error.response?.data?.message || 'Có lỗi xảy ra khi xóa phòng ban!')
    }
  }

  const handleSubmit = async (values) => {
    try {
      if (editingDepartment) {
        await updateDepartmentMutation.mutateAsync({
          id: editingDepartment.id,
          data: values
        })
        message.success('Cập nhật phòng ban thành công!')
      } else {
        await createDepartmentMutation.mutateAsync(values)
        message.success('Tạo phòng ban thành công!')
      }
      setIsModalVisible(false)
      form.resetFields()
    } catch (error) {
      message.error(error.response?.data?.message || 'Có lỗi xảy ra!')
    }
  }

  const columns = [
    {
      title: 'Tên phòng ban',
      dataIndex: 'name',
      key: 'name',
      render: (text, record) => (
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Text strong>{text}</Text>
        </div>
      ),
    },
    {
      title: 'Mô tả',
      dataIndex: 'description',
      key: 'description',
      render: (description) => (
        <Text type="secondary">{description || 'Không có mô tả'}</Text>
      ),
    },
    {
      title: 'Ngày tạo',
      dataIndex: 'createdAt',
      key: 'createdAt',
      render: (createdAt) => (
        <Text>{new Date(createdAt).toLocaleDateString('vi-VN')}</Text>
      ),
    },
    {
      title: 'Trạng thái',
      key: 'status',
      render: () => (
        <Tag color="green">Hoạt động</Tag>
      ),
    },
    {
      title: 'Hành động',
      key: 'actions',
      render: (_, record) => (
        <Space>
          <Button 
            type="link" 
            icon={<EditOutlined />} 
            onClick={() => handleEdit(record)}
          >
            Sửa
          </Button>
          <Popconfirm
            title="Bạn có chắc chắn muốn xóa phòng ban này?"
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
  if (departmentsLoading) {
    return (
      <div className="department-management-page">
        <div style={{ textAlign: 'center', padding: '50px' }}>
          <Spin size="large" />
          <div style={{ marginTop: '16px' }}>
            <Text>Đang tải danh sách phòng ban...</Text>
          </div>
        </div>
      </div>
    )
  }

  // Hiển thị lỗi
  if (departmentsError) {
    return (
      <div className="department-management-page">
        <Alert
          message="Lỗi tải dữ liệu"
          description={departmentsError.response?.data?.message || 'Không thể tải danh sách phòng ban. Vui lòng thử lại.'}
          type="error"
          showIcon
          style={{ marginBottom: '24px' }}
        />
      </div>
    )
  }

  return (
    <div className="department-management-page">
      <div className="page-header">
        <Title level={2}>Quản lý phòng ban</Title>
        <Text type="secondary">Quản lý các phòng ban trong tổ chức</Text>
      </div>

      <Card>
        <div className="table-header">
          <Button 
            type="primary" 
            icon={<PlusOutlined />} 
            onClick={handleAdd}
          >
            Thêm phòng ban
          </Button>
        </div>

        <Table
          columns={columns}
          dataSource={departments}
          loading={departmentsLoading}
          rowKey="id"
          pagination={{
            pageSize: 10,
            showSizeChanger: true,
            showQuickJumper: true,
            showTotal: (total, range) => 
              `${range[0]}-${range[1]} của ${total} phòng ban`,
          }}
        />
      </Card>

      <Modal
        title={editingDepartment ? 'Sửa phòng ban' : 'Thêm phòng ban mới'}
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
            name="name"
            label="Tên phòng ban"
            rules={[{ required: true, message: 'Vui lòng nhập tên phòng ban!' }]}
          >
            <Input placeholder="Nhập tên phòng ban" />
          </Form.Item>

          <Form.Item
            name="description"
            label="Mô tả"
          >
            <Input.TextArea rows={3} placeholder="Mô tả về phòng ban" />
          </Form.Item>


          <Form.Item>
            <Space>
              <Button onClick={() => setIsModalVisible(false)}>
                Hủy
              </Button>
              <Button 
                type="primary" 
                htmlType="submit"
                loading={createDepartmentMutation.isPending || updateDepartmentMutation.isPending}
              >
                {editingDepartment ? 'Cập nhật' : 'Tạo mới'}
              </Button>
            </Space>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  )
}

export default DepartmentManagement
