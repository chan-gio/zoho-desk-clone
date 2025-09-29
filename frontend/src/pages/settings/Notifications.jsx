import React, { useState } from 'react'
import { 
  Card, 
  Form, 
  Switch, 
  Button, 
  Row,
  Col,
  Typography,
  message,
  Divider,
  Select,
  InputNumber
} from 'antd'
import { 
  BellOutlined,
  MailOutlined,
  MessageOutlined,
  MobileOutlined
} from '@ant-design/icons'
import { useTranslation } from 'react-i18next'
import './Notifications.scss'

const { Title, Text } = Typography
const { Option } = Select

const Notifications = () => {
  const { t } = useTranslation()
  const [form] = Form.useForm()
  const [loading, setLoading] = useState(false)

  const handleSave = async (values) => {
    setLoading(true)
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000))
      message.success('Cập nhật cài đặt thông báo thành công!')
    } catch (error) {
      message.error('Có lỗi xảy ra khi cập nhật cài đặt!')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="notifications-page">
      <div className="page-header">
        <Title level={2}>Thông báo</Title>
        <Text type="secondary">Quản lý các thông báo và cảnh báo</Text>
      </div>

      <Card>
        <Form
          layout="vertical"
          onFinish={handleSave}
          initialValues={{
            emailNotifications: true,
            smsNotifications: false,
            pushNotifications: true,
            ticketUpdates: true,
            ticketAssignments: true,
            ticketResolutions: false,
            systemAlerts: true,
            maintenanceAlerts: true,
            notificationFrequency: 'immediate',
            quietHours: false,
            quietStart: '22:00',
            quietEnd: '08:00'
          }}
        >
          <Title level={4}>Thông báo qua Email</Title>
          <Row gutter={[16, 16]}>
            <Col span={12}>
              <Form.Item
                name="emailNotifications"
                label="Bật thông báo email"
                valuePropName="checked"
              >
                <Switch />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="ticketUpdates"
                label="Cập nhật ticket"
                valuePropName="checked"
              >
                <Switch />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="ticketAssignments"
                label="Phân công ticket"
                valuePropName="checked"
              >
                <Switch />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="ticketResolutions"
                label="Giải quyết ticket"
                valuePropName="checked"
              >
                <Switch />
              </Form.Item>
            </Col>
          </Row>

          <Divider />

          <Title level={4}>Thông báo qua SMS</Title>
          <Row gutter={[16, 16]}>
            <Col span={12}>
              <Form.Item
                name="smsNotifications"
                label="Bật thông báo SMS"
                valuePropName="checked"
              >
                <Switch />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="systemAlerts"
                label="Cảnh báo hệ thống"
                valuePropName="checked"
              >
                <Switch />
              </Form.Item>
            </Col>
          </Row>

          <Divider />

          <Title level={4}>Thông báo đẩy</Title>
          <Row gutter={[16, 16]}>
            <Col span={12}>
              <Form.Item
                name="pushNotifications"
                label="Bật thông báo đẩy"
                valuePropName="checked"
              >
                <Switch />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="maintenanceAlerts"
                label="Cảnh báo bảo trì"
                valuePropName="checked"
              >
                <Switch />
              </Form.Item>
            </Col>
          </Row>

          <Divider />

          <Title level={4}>Cài đặt nâng cao</Title>
          <Row gutter={[16, 16]}>
            <Col span={12}>
              <Form.Item
                name="notificationFrequency"
                label="Tần suất thông báo"
              >
                <Select>
                  <Option value="immediate">Ngay lập tức</Option>
                  <Option value="hourly">Hàng giờ</Option>
                  <Option value="daily">Hàng ngày</Option>
                  <Option value="weekly">Hàng tuần</Option>
                </Select>
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="quietHours"
                label="Giờ yên tĩnh"
                valuePropName="checked"
              >
                <Switch />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="quietStart"
                label="Bắt đầu giờ yên tĩnh"
              >
                <Select>
                  <Option value="22:00">22:00</Option>
                  <Option value="23:00">23:00</Option>
                  <Option value="00:00">00:00</Option>
                </Select>
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="quietEnd"
                label="Kết thúc giờ yên tĩnh"
              >
                <Select>
                  <Option value="06:00">06:00</Option>
                  <Option value="07:00">07:00</Option>
                  <Option value="08:00">08:00</Option>
                </Select>
              </Form.Item>
            </Col>
          </Row>

          <Form.Item>
            <Button type="primary" htmlType="submit" loading={loading}>
              Lưu cài đặt
            </Button>
          </Form.Item>
        </Form>
      </Card>
    </div>
  )
}

export default Notifications
