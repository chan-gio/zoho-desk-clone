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
  Select,
  Switch,
  Space,
  Slider
} from 'antd'
import { 
  MessageOutlined,
  RobotOutlined,
  SendOutlined
} from '@ant-design/icons'
import { useTranslation } from 'react-i18next'
import './ChatIntegration.scss'

const { Title, Text } = Typography
const { Option } = Select
const { TextArea } = Input

const ChatIntegration = () => {
  const { t } = useTranslation()
  const [form] = Form.useForm()
  const [loading, setLoading] = useState(false)
  const [testing, setTesting] = useState(false)

  const handleSave = async (values) => {
    setLoading(true)
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000))
      message.success('Cập nhật cấu hình chat thành công!')
    } catch (error) {
      message.error('Có lỗi xảy ra khi cập nhật cấu hình!')
    } finally {
      setLoading(false)
    }
  }

  const handleTestChat = async () => {
    setTesting(true)
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000))
      message.success('Kết nối chat thành công!')
    } catch (error) {
      message.error('Có lỗi xảy ra khi test kết nối chat!')
    } finally {
      setTesting(false)
    }
  }

  return (
    <div className="chat-integration-page">
      <div className="page-header">
        <Title level={2}>Tích hợp Chat</Title>
        <Text type="secondary">Cấu hình chat bot và webhook</Text>
      </div>

      <Card>
        <Form
          form={form}
          layout="vertical"
          onFinish={handleSave}
          initialValues={{
            chatProvider: 'custom',
            webhookUrl: 'https://hooks.slack.com/services/...',
            botToken: '',
            channelId: '',
            autoResponse: true,
            responseDelay: 5,
            autoResponseMessage: 'Xin chào! Chúng tôi đã nhận được tin nhắn của bạn và sẽ phản hồi sớm nhất có thể.'
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
          
          <Divider />
          
          <Title level={4}>Cài đặt nâng cao</Title>
          <Row gutter={[16, 16]}>
            <Col span={12}>
              <Form.Item
                name="enableBot"
                label="Bật Chat Bot"
                valuePropName="checked"
              >
                <Switch />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="enableNotifications"
                label="Thông báo tin nhắn mới"
                valuePropName="checked"
              >
                <Switch />
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
                onClick={handleTestChat}
                loading={testing}
              >
                Test Chat
              </Button>
            </Space>
          </Form.Item>
        </Form>
      </Card>
    </div>
  )
}

export default ChatIntegration
