import React, { useState } from 'react'
import { 
  Card, 
  Form, 
  Input, 
  Button, 
  Row,
  Col,
  Typography,
  message,
  Divider,
  InputNumber,
  Switch,
  Space
} from 'antd'
import { 
  MailOutlined,
  SendOutlined,
} from '@ant-design/icons'
import { useTranslation } from 'react-i18next'
import './EmailIntegration.scss'

const { Title, Text } = Typography
const { TextArea } = Input

const EmailIntegration = () => {
  const { t } = useTranslation()
  const [form] = Form.useForm()
  const [loading, setLoading] = useState(false)
  const [testing, setTesting] = useState(false)

  const handleSave = async (values) => {
    setLoading(true)
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000))
      message.success('Cập nhật cấu hình email thành công!')
    } catch (error) {
      message.error('Có lỗi xảy ra khi cập nhật cấu hình!')
    } finally {
      setLoading(false)
    }
  }

  const handleTestEmail = async () => {
    setTesting(true)
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000))
      message.success('Email test đã được gửi thành công!')
    } catch (error) {
      message.error('Có lỗi xảy ra khi gửi email test!')
    } finally {
      setTesting(false)
    }
  }

  return (
    <div className="email-integration-page">
      <div className="page-header">
        <Title level={2}>Tích hợp Email</Title>
        <Text type="secondary">Cấu hình SMTP và template email</Text>
      </div>

      <Card>
        <Form
          form={form}
          layout="vertical"
          onFinish={handleSave}
          initialValues={{
            smtpHost: 'smtp.gmail.com',
            smtpPort: 587,
            smtpSecure: false,
            email: 'support@company.com',
            password: '',
            replyTo: 'noreply@company.com',
            autoReply: true,
            welcomeTemplate: 'Chào mừng bạn đến với hệ thống hỗ trợ của chúng tôi!',
            ticketCreatedTemplate: 'Ticket của bạn đã được tạo thành công với ID: {ticket_id}'
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
          
          <Title level={4}>Cài đặt tự động</Title>
          <Row gutter={[16, 16]}>
            <Col span={12}>
              <Form.Item
                name="autoReply"
                label="Tự động trả lời"
                valuePropName="checked"
              >
                <Switch />
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
              <Button type="primary" htmlType="submit" loading={loading}>
                Lưu cấu hình
              </Button>
              <Button 
                icon={<SendOutlined />} 
                onClick={handleTestEmail}
                loading={testing}
              >
                Test Email
              </Button>
            </Space>
          </Form.Item>
        </Form>
      </Card>
    </div>
  )
}

export default EmailIntegration
