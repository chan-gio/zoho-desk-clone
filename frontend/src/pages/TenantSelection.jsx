import React, { useState } from 'react'
import { 
  Card, 
  Row, 
  Col, 
  Button, 
  Typography, 
  Avatar, 
  Space, 
  Divider,
  Input,
  message,
  Modal,
  Form,
  Select
} from 'antd'
import { 
  PlusOutlined, 
  SettingOutlined, 
  TeamOutlined,
  SearchOutlined,
  CrownOutlined,
  UserOutlined,
  GlobalOutlined
} from '@ant-design/icons'
import { useNavigate } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import './TenantSelection.scss'

const { Title, Text } = Typography
const { Search } = Input
const { Option } = Select

const TenantSelection = () => {
  const { t } = useTranslation()
  const navigate = useNavigate()
  const [form] = Form.useForm()
  const [searchText, setSearchText] = useState('')
  const [isCreateModalVisible, setIsCreateModalVisible] = useState(false)
  const [loading, setLoading] = useState(false)

  // Mock data for tenants
  const tenants = [
    {
      id: 1,
      name: 'Acme Corporation',
      domain: 'acme.zohodesk.com',
      description: 'Công ty công nghệ hàng đầu',
      logo: '🏢',
      role: 'Admin',
      users: 150,
      tickets: 1250,
      isActive: true,
      plan: 'Enterprise'
    },
    {
      id: 2,
      name: 'TechStart Solutions',
      domain: 'techstart.zohodesk.com',
      description: 'Startup công nghệ đang phát triển',
      logo: '🚀',
      role: 'Manager',
      users: 25,
      tickets: 180,
      isActive: true,
      plan: 'Professional'
    },
    {
      id: 3,
      name: 'Global Services',
      domain: 'global.zohodesk.com',
      description: 'Dịch vụ toàn cầu',
      logo: '🌍',
      role: 'Agent',
      users: 500,
      tickets: 3200,
      isActive: true,
      plan: 'Enterprise'
    },
    {
      id: 4,
      name: 'Local Business',
      domain: 'local.zohodesk.com',
      description: 'Doanh nghiệp địa phương',
      logo: '🏪',
      role: 'Viewer',
      users: 8,
      tickets: 45,
      isActive: false,
      plan: 'Standard'
    }
  ]

  const filteredTenants = tenants.filter(tenant =>
    tenant.name.toLowerCase().includes(searchText.toLowerCase()) ||
    tenant.domain.toLowerCase().includes(searchText.toLowerCase())
  )

  const handleSelectTenant = (tenant) => {
    setLoading(true)
    // Simulate loading
    setTimeout(() => {
      localStorage.setItem('selectedTenant', JSON.stringify(tenant))
      message.success(`Đã chọn tenant: ${tenant.name}`)
      navigate('/dashboard')
      setLoading(false)
    }, 1000)
  }

  const handleCreateTenant = (values) => {
    setLoading(true)
    // Simulate API call
    setTimeout(() => {
      message.success('Tạo tenant thành công!')
      setIsCreateModalVisible(false)
      form.resetFields()
      setLoading(false)
    }, 1000)
  }

  const getPlanColor = (plan) => {
    const colors = {
      'Standard': 'blue',
      'Professional': 'green',
      'Enterprise': 'purple'
    }
    return colors[plan] || 'default'
  }

  const getRoleIcon = (role) => {
    const icons = {
      'Admin': <CrownOutlined style={{ color: '#faad14' }} />,
      'Manager': <SettingOutlined style={{ color: '#1890ff' }} />,
      'Agent': <UserOutlined style={{ color: '#52c41a' }} />,
      'Viewer': <UserOutlined style={{ color: '#8c8c8c' }} />
    }
    return icons[role] || <UserOutlined />
  }

  return (
    <div className="tenant-selection-page">
      <div className="tenant-container">
        <div className="tenant-header">
          <Title level={2}>Chọn Tenant</Title>
          <Text type="secondary">
            Chọn tenant bạn muốn truy cập hoặc tạo tenant mới
          </Text>
        </div>

        <div className="tenant-actions">
          <Search
            placeholder="Tìm kiếm tenant..."
            allowClear
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
            style={{ maxWidth: 400 }}
          />
          <Button 
            type="primary" 
            icon={<PlusOutlined />}
            onClick={() => setIsCreateModalVisible(true)}
          >
            Tạo Tenant Mới
          </Button>
        </div>

        <Row gutter={[24, 24]} className="tenant-grid">
          {filteredTenants.map(tenant => (
            <Col xs={24} sm={12} lg={8} xl={6} key={tenant.id}>
              <Card 
                className={`tenant-card ${tenant.isActive ? 'active' : 'inactive'}`}
                hoverable
                onClick={() => tenant.isActive && handleSelectTenant(tenant)}
                loading={loading}
              >
                <div className="tenant-card-header">
                  <Avatar size={48} className="tenant-logo">
                    {tenant.logo}
                  </Avatar>
                  <div className="tenant-info">
                    <Title level={4} className="tenant-name">
                      {tenant.name}
                    </Title>
                    <Text type="secondary" className="tenant-domain">
                      {tenant.domain}
                    </Text>
                  </div>
                </div>

                <div className="tenant-description">
                  <Text>{tenant.description}</Text>
                </div>

                <Divider />

                <div className="tenant-stats">
                  <Row gutter={[16, 8]}>
                    <Col span={12}>
                      <div className="stat-item">
                        <TeamOutlined />
                        <Text strong>{tenant.users}</Text>
                        <Text type="secondary">Users</Text>
                      </div>
                    </Col>
                    <Col span={12}>
                      <div className="stat-item">
                        <GlobalOutlined />
                        <Text strong>{tenant.tickets}</Text>
                        <Text type="secondary">Tickets</Text>
                      </div>
                    </Col>
                  </Row>
                </div>

                <div className="tenant-footer">
                  <Space>
                    <span className="role-badge">
                      {getRoleIcon(tenant.role)}
                      <Text>{tenant.role}</Text>
                    </span>
                    <span className={`plan-badge ${getPlanColor(tenant.plan).toLowerCase()}`}>
                      {tenant.plan}
                    </span>
                  </Space>
                </div>

                {!tenant.isActive && (
                  <div className="inactive-overlay">
                    <Text type="secondary">Không hoạt động</Text>
                  </div>
                )}
              </Card>
            </Col>
          ))}
        </Row>

        {filteredTenants.length === 0 && (
          <div className="empty-state">
            <Text type="secondary">Không tìm thấy tenant nào</Text>
          </div>
        )}
      </div>

      {/* Create Tenant Modal */}
      <Modal
        title="Tạo Tenant Mới"
        open={isCreateModalVisible}
        onCancel={() => setIsCreateModalVisible(false)}
        footer={null}
        width={600}
      >
        <Form
          form={form}
          layout="vertical"
          onFinish={handleCreateTenant}
        >
          <Form.Item
            name="name"
            label="Tên Tenant"
            rules={[{ required: true, message: 'Vui lòng nhập tên tenant!' }]}
          >
            <Input placeholder="Nhập tên tenant" />
          </Form.Item>

          <Form.Item
            name="domain"
            label="Domain"
            rules={[{ required: true, message: 'Vui lòng nhập domain!' }]}
          >
            <Input placeholder="tenant-name" addonAfter=".zohodesk.com" />
          </Form.Item>

          <Form.Item
            name="description"
            label="Mô tả"
          >
            <Input.TextArea rows={3} placeholder="Mô tả về tenant" />
          </Form.Item>

          <Form.Item
            name="plan"
            label="Gói dịch vụ"
            rules={[{ required: true, message: 'Vui lòng chọn gói dịch vụ!' }]}
          >
            <Select placeholder="Chọn gói dịch vụ">
              <Option value="Standard">Standard - $29/tháng</Option>
              <Option value="Professional">Professional - $79/tháng</Option>
              <Option value="Enterprise">Enterprise - $199/tháng</Option>
            </Select>
          </Form.Item>

          <Form.Item>
            <Space>
              <Button onClick={() => setIsCreateModalVisible(false)}>
                Hủy
              </Button>
              <Button type="primary" htmlType="submit" loading={loading}>
                Tạo Tenant
              </Button>
            </Space>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  )
}

export default TenantSelection
