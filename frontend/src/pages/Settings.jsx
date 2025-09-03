import React, { useState } from 'react'
import { 
  Card, 
  Tabs, 
  Form, 
  Input, 
  Button, 
  Switch, 
  Select, 
  Space, 
  message,
  Divider,
  Row,
  Col,
  Typography,
  Upload,
  InputNumber,
  Checkbox,
  Radio,
  Slider,
  ColorPicker
} from 'antd'
import { 
  UserOutlined, 
  BellOutlined, 
  SecurityScanOutlined,
  SettingOutlined,
  MailOutlined,
  MessageOutlined,
  ApiOutlined,
  CloudOutlined,
  DatabaseOutlined,
  GlobalOutlined,
  TeamOutlined,
  FileTextOutlined,
  SoundOutlined,
  EyeOutlined
} from '@ant-design/icons'
import { useTranslation } from 'react-i18next'
import './Settings.scss'

const { Option } = Select
const { TextArea } = Input
const { Title, Text } = Typography

const Settings = () => {
  const { t } = useTranslation()
  const [form] = Form.useForm()
  const [emailForm] = Form.useForm()
  const [chatForm] = Form.useForm()
  const [integrationForm] = Form.useForm()

  const handleSave = (values) => {
    console.log('Saved:', values)
    message.success(t('messages.success.saved'))
  }

  const handleEmailTest = () => {
    message.loading('Đang gửi email test...', 2)
      .then(() => message.success('Email test đã được gửi thành công!'))
  }

  const handleChatTest = () => {
    message.loading('Đang test kết nối chat...', 2)
      .then(() => message.success('Kết nối chat thành công!'))
  }

  const tabItems = [
    {
      key: 'profile',
      label: (
        <span>
          <UserOutlined />
          Hồ sơ cá nhân
        </span>
      ),
      children: (
        <Card>
          <Form
            form={form}
            layout="vertical"
            onFinish={handleSave}
            initialValues={{
              name: 'Nguyễn Văn A',
              email: 'admin@example.com',
              phone: '0123456789',
              department: 'IT Support',
              timezone: 'Asia/Ho_Chi_Minh',
              language: 'vi'
            }}
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
              <Button type="primary" htmlType="submit">
                Lưu thay đổi
              </Button>
            </Form.Item>
          </Form>
        </Card>
      ),
    },
    {
      key: 'notifications',
      label: (
        <span>
          <BellOutlined />
          Thông báo
        </span>
      ),
      children: (
        <Card>
          <Form layout="vertical" onFinish={handleSave}>
            <Row gutter={[16, 16]}>
              <Col span={12}>
                <Form.Item
                  name="emailNotifications"
                  label="Thông báo qua email"
                  valuePropName="checked"
                >
                  <Switch />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item
                  name="smsNotifications"
                  label="Thông báo qua SMS"
                  valuePropName="checked"
                >
                  <Switch />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item
                  name="pushNotifications"
                  label="Thông báo đẩy"
                  valuePropName="checked"
                >
                  <Switch />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item
                  name="ticketUpdates"
                  label="Thông báo cập nhật ticket"
                  valuePropName="checked"
                >
                  <Switch />
                </Form.Item>
              </Col>
            </Row>
            <Form.Item>
              <Button type="primary" htmlType="submit">
                Lưu cài đặt
              </Button>
            </Form.Item>
          </Form>
        </Card>
      ),
    },
    {
      key: 'email',
      label: (
        <span>
          <MailOutlined />
          Tích hợp Email
        </span>
      ),
      children: (
        <Card>
          <Form
            form={emailForm}
            layout="vertical"
            onFinish={handleSave}
            initialValues={{
              smtpHost: 'smtp.gmail.com',
              smtpPort: 587,
              smtpSecure: false,
              email: 'support@company.com',
              replyTo: 'noreply@company.com'
            }}
          >
            <Title level={4}>Cấu hình SMTP</Title>
            <Row gutter={[16, 16]}>
              <Col span={12}>
                <Form.Item
                  name="smtpHost"
                  label="SMTP Host"
                  rules={[{ required: true, message: 'Vui lòng nhập SMTP host!' }]}
                >
                  <Input placeholder="smtp.gmail.com" />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item
                  name="smtpPort"
                  label="SMTP Port"
                  rules={[{ required: true, message: 'Vui lòng nhập SMTP port!' }]}
                >
                  <InputNumber min={1} max={65535} style={{ width: '100%' }} />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item
                  name="email"
                  label="Email gửi"
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
                  name="password"
                  label="Mật khẩu email"
                  rules={[{ required: true, message: 'Vui lòng nhập mật khẩu!' }]}
                >
                  <Input.Password />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item
                  name="smtpSecure"
                  label="Sử dụng SSL/TLS"
                  valuePropName="checked"
                >
                  <Switch />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item
                  name="replyTo"
                  label="Email trả lời"
                >
                  <Input />
                </Form.Item>
              </Col>
            </Row>
            
            <Divider />
            
            <Title level={4}>Template Email</Title>
            <Row gutter={[16, 16]}>
              <Col span={24}>
                <Form.Item
                  name="welcomeTemplate"
                  label="Template chào mừng"
                >
                  <TextArea rows={4} placeholder="Nội dung email chào mừng..." />
                </Form.Item>
              </Col>
              <Col span={24}>
                <Form.Item
                  name="ticketCreatedTemplate"
                  label="Template tạo ticket"
                >
                  <TextArea rows={4} placeholder="Nội dung email khi tạo ticket..." />
                </Form.Item>
              </Col>
            </Row>
            
            <Form.Item>
              <Space>
                <Button type="primary" htmlType="submit">
                  Lưu cấu hình
                </Button>
                <Button onClick={handleEmailTest}>
                  Test Email
                </Button>
              </Space>
            </Form.Item>
          </Form>
        </Card>
      ),
    },
    {
      key: 'chat',
      label: (
        <span>
          <MessageOutlined />
          Tích hợp Chat
        </span>
      ),
      children: (
        <Card>
          <Form
            form={chatForm}
            layout="vertical"
            onFinish={handleSave}
            initialValues={{
              chatProvider: 'custom',
              webhookUrl: 'https://hooks.slack.com/services/...',
              botToken: '',
              channelId: '',
              autoResponse: true,
              responseDelay: 5
            }}
          >
            <Title level={4}>Cấu hình Chat Bot</Title>
            <Row gutter={[16, 16]}>
              <Col span={12}>
                <Form.Item
                  name="chatProvider"
                  label="Nhà cung cấp Chat"
                  rules={[{ required: true, message: 'Vui lòng chọn nhà cung cấp!' }]}
                >
                  <Select>
                    <Option value="slack">Slack</Option>
                    <Option value="teams">Microsoft Teams</Option>
                    <Option value="discord">Discord</Option>
                    <Option value="custom">Custom Webhook</Option>
                  </Select>
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item
                  name="webhookUrl"
                  label="Webhook URL"
                  rules={[{ required: true, message: 'Vui lòng nhập webhook URL!' }]}
                >
                  <Input placeholder="https://hooks.slack.com/services/..." />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item
                  name="botToken"
                  label="Bot Token"
                >
                  <Input.Password placeholder="xoxb-..." />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item
                  name="channelId"
                  label="Channel ID"
                >
                  <Input placeholder="#general" />
                </Form.Item>
              </Col>
            </Row>
            
            <Divider />
            
            <Title level={4}>Cài đặt Auto Response</Title>
            <Row gutter={[16, 16]}>
              <Col span={12}>
                <Form.Item
                  name="autoResponse"
                  label="Tự động phản hồi"
                  valuePropName="checked"
                >
                  <Switch />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item
                  name="responseDelay"
                  label="Độ trễ phản hồi (giây)"
                >
                  <Slider min={1} max={60} />
                </Form.Item>
              </Col>
              <Col span={24}>
                <Form.Item
                  name="autoResponseMessage"
                  label="Tin nhắn tự động"
                >
                  <TextArea rows={3} placeholder="Xin chào! Chúng tôi đã nhận được tin nhắn của bạn..." />
                </Form.Item>
              </Col>
            </Row>
            
            <Form.Item>
              <Space>
                <Button type="primary" htmlType="submit">
                  Lưu cấu hình
                </Button>
                <Button onClick={handleChatTest}>
                  Test Chat
                </Button>
              </Space>
            </Form.Item>
          </Form>
        </Card>
      ),
    },
    {
      key: 'integrations',
      label: (
        <span>
          <ApiOutlined />
          Tích hợp khác
        </span>
      ),
      children: (
        <Card>
          <Form
            form={integrationForm}
            layout="vertical"
            onFinish={handleSave}
          >
            <Title level={4}>Tích hợp CRM</Title>
            <Row gutter={[16, 16]}>
              <Col span={12}>
                <Form.Item
                  name="crmProvider"
                  label="CRM Provider"
                >
                  <Select placeholder="Chọn CRM">
                    <Option value="salesforce">Salesforce</Option>
                    <Option value="hubspot">HubSpot</Option>
                    <Option value="pipedrive">Pipedrive</Option>
                    <Option value="zoho">Zoho CRM</Option>
                  </Select>
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item
                  name="crmApiKey"
                  label="API Key"
                >
                  <Input.Password />
                </Form.Item>
              </Col>
            </Row>
            
            <Divider />
            
            <Title level={4}>Tích hợp Analytics</Title>
            <Row gutter={[16, 16]}>
              <Col span={12}>
                <Form.Item
                  name="googleAnalytics"
                  label="Google Analytics ID"
                >
                  <Input placeholder="GA-XXXXXXXXX" />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item
                  name="facebookPixel"
                  label="Facebook Pixel ID"
                >
                  <Input placeholder="123456789" />
                </Form.Item>
              </Col>
            </Row>
            
            <Divider />
            
            <Title level={4}>Tích hợp Payment</Title>
            <Row gutter={[16, 16]}>
              <Col span={12}>
                <Form.Item
                  name="stripeKey"
                  label="Stripe Public Key"
                >
                  <Input placeholder="pk_test_..." />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item
                  name="stripeSecret"
                  label="Stripe Secret Key"
                >
                  <Input.Password placeholder="sk_test_..." />
                </Form.Item>
              </Col>
            </Row>
            
            <Form.Item>
              <Button type="primary" htmlType="submit">
                Lưu tích hợp
              </Button>
            </Form.Item>
          </Form>
        </Card>
      ),
    },
    {
      key: 'security',
      label: (
        <span>
          <SecurityScanOutlined />
          Bảo mật
        </span>
      ),
      children: (
        <Card>
          <Form layout="vertical" onFinish={handleSave}>
            <Form.Item
              name="currentPassword"
              label="Mật khẩu hiện tại"
              rules={[{ required: true, message: 'Vui lòng nhập mật khẩu hiện tại!' }]}
            >
              <Input.Password />
            </Form.Item>
            <Form.Item
              name="newPassword"
              label="Mật khẩu mới"
              rules={[{ required: true, message: 'Vui lòng nhập mật khẩu mới!' }]}
            >
              <Input.Password />
            </Form.Item>
            <Form.Item
              name="confirmPassword"
              label="Xác nhận mật khẩu"
              dependencies={['newPassword']}
              rules={[
                { required: true, message: 'Vui lòng xác nhận mật khẩu!' },
                ({ getFieldValue }) => ({
                  validator(_, value) {
                    if (!value || getFieldValue('newPassword') === value) {
                      return Promise.resolve()
                    }
                    return Promise.reject(new Error('Mật khẩu xác nhận không khớp!'))
                  },
                }),
              ]}
            >
              <Input.Password />
            </Form.Item>
            <Form.Item>
              <Button type="primary" htmlType="submit">
                Đổi mật khẩu
              </Button>
            </Form.Item>
          </Form>
        </Card>
      ),
    },
  ]

  return (
    <div className="settings-page">
      <div className="page-header">
        <h1>Cài đặt</h1>
      </div>

      <Card>
        <Tabs defaultActiveKey="profile" items={tabItems} />
      </Card>
    </div>
  )
}

export default Settings
