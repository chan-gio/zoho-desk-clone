import React, { useState, useEffect } from 'react'
import { 
  Card, 
  Form, 
  Input, 
  Button, 
  Select, 
  Row,
  Col,
  Typography,
  message,
  Avatar,
  Upload,
  Spin
} from 'antd'
import { 
  UserOutlined,
  CameraOutlined
} from '@ant-design/icons'
import { useTranslation } from 'react-i18next'
import { useUpdateProfile } from '../../hooks/useUsers'
import { authService } from '../../services/authService'
import './Profile.scss'

const { Title, Text } = Typography
const { Option } = Select

const Profile = () => {
  const { t } = useTranslation()
  const [form] = Form.useForm()
  
  // Lấy thông tin user từ localStorage
  const user = authService.getCurrentUser()
  const updateProfileMutation = useUpdateProfile()

  // Set initial values khi component mount
  useEffect(() => {
    if (user) {
      form.setFieldsValue({
        name: user.username || user.name,
        email: user.email,
        phone: user.phone,
        department: user.department,
        timezone: user.timezone || 'Asia/Ho_Chi_Minh',
        language: user.language || 'vi'
      })
    }
  }, [user, form])

  const handleSave = async (values) => {
    try {
      await updateProfileMutation.mutateAsync(values)
      message.success('Cập nhật hồ sơ thành công!')
    } catch (error) {
      message.error(error.response?.data?.message || 'Có lỗi xảy ra khi cập nhật hồ sơ!')
    }
  }

  // Hiển thị loading state nếu không có user
  if (!user) {
    return (
      <div className="profile-page">
        <div style={{ textAlign: 'center', padding: '50px' }}>
          <Spin size="large" />
          <div style={{ marginTop: '16px' }}>
            <Text>Đang tải thông tin hồ sơ...</Text>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="profile-page">
      <div className="page-header">
        <Title level={2}>Hồ sơ cá nhân</Title>
        <Text type="secondary">Quản lý thông tin cá nhân của bạn</Text>
      </div>

      <Row gutter={[24, 24]}>
        <Col span={8}>
          <Card>
            <div className="profile-avatar">
              <Avatar size={120} icon={<UserOutlined />} />
              <Upload>
                <Button icon={<CameraOutlined />} size="small" style={{ marginTop: '16px' }}>
                  Thay đổi ảnh
                </Button>
              </Upload>
            </div>
            <div className="profile-info">
              <Title level={4}>{user?.username || user?.name || 'N/A'}</Title>
              <Text type="secondary">{user?.email || 'N/A'}</Text>
              <div className="profile-stats">
                <div className="stat-item">
                  <Text strong>{user?.role || 'N/A'}</Text>
                  <Text type="secondary">Vai trò</Text>
                </div>
                <div className="stat-item">
                  <Text strong>{user?.department || 'N/A'}</Text>
                  <Text type="secondary">Phòng ban</Text>
                </div>
              </div>
            </div>
          </Card>
        </Col>

        <Col span={16}>
          <Card>
            <Form
              form={form}
              layout="vertical"
              onFinish={handleSave}
            >
              <Row gutter={[16, 16]}>
                <Col span={12}>
                  <Form.Item
                    name="name"
                    label="Họ và tên"
                    rules={[{ required: true, message: 'Vui lòng nhập họ tên!' }]}
                  >
                    <Input />
                  </Form.Item>
                </Col>
                <Col span={12}>
                  <Form.Item
                    name="email"
                    label="Email"
                    rules={[
                      { required: true, message: 'Vui lòng nhập email!' },
                      { type: 'email', message: 'Email không hợp lệ!' }
                    ]}
                  >
                    <Input />
                  </Form.Item>
                </Col>
                <Col span={12}>
                  <Form.Item
                    name="phone"
                    label="Số điện thoại"
                  >
                    <Input />
                  </Form.Item>
                </Col>
                <Col span={12}>
                  <Form.Item
                    name="department"
                    label="Phòng ban"
                  >
                    <Select>
                      <Option value="IT Support">IT Support</Option>
                      <Option value="Customer Service">Customer Service</Option>
                      <Option value="Sales">Sales</Option>
                      <Option value="Marketing">Marketing</Option>
                    </Select>
                  </Form.Item>
                </Col>
                <Col span={12}>
                  <Form.Item
                    name="timezone"
                    label="Múi giờ"
                  >
                    <Select>
                      <Option value="Asia/Ho_Chi_Minh">Asia/Ho_Chi_Minh</Option>
                      <Option value="UTC">UTC</Option>
                      <Option value="America/New_York">America/New_York</Option>
                    </Select>
                  </Form.Item>
                </Col>
                <Col span={12}>
                  <Form.Item
                    name="language"
                    label="Ngôn ngữ"
                  >
                    <Select>
                      <Option value="vi">Tiếng Việt</Option>
                      <Option value="en">English</Option>
                    </Select>
                  </Form.Item>
                </Col>
              </Row>
              <Form.Item>
                <Button type="primary" htmlType="submit" loading={updateProfileMutation.isPending}>
                  Lưu thay đổi
                </Button>
              </Form.Item>
            </Form>
          </Card>
        </Col>
      </Row>
    </div>
  )
}

export default Profile
