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
  Switch
} from 'antd'
import { 
  ApiOutlined,
  CloudOutlined,
  DatabaseOutlined,
  GlobalOutlined
} from '@ant-design/icons'
import { useTranslation } from 'react-i18next'
import './Integrations.scss'

const { Title, Text } = Typography
const { Option } = Select

const Integrations = () => {
  const { t } = useTranslation()
  const [form] = Form.useForm()
  const [loading, setLoading] = useState(false)

  const handleSave = async (values) => {
    setLoading(true)
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000))
      message.success('Cập nhật tích hợp thành công!')
    } catch (error) {
      message.error('Có lỗi xảy ra khi cập nhật tích hợp!')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="integrations-page">
      <div className="page-header">
        <Title level={2}>Tích hợp khác</Title>
        <Text type="secondary">Cấu hình các dịch vụ tích hợp bên thứ 3</Text>
      </div>

      <Card>
        <Form
          form={form}
          layout="vertical"
          onFinish={handleSave}
          initialValues={{
            crmProvider: 'salesforce',
            crmApiKey: '',
            googleAnalytics: '',
            facebookPixel: '',
            stripeKey: '',
            stripeSecret: '',
            enableCRM: true,
            enableAnalytics: false,
            enablePayment: false
          }}
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
            <Col span={12}>
              <Form.Item
                name="enableCRM"
                label="Bật tích hợp CRM"
                valuePropName="checked"
              >
                <Switch />
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
            <Col span={12}>
              <Form.Item
                name="enableAnalytics"
                label="Bật Analytics"
                valuePropName="checked"
              >
                <Switch />
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
            <Col span={12}>
              <Form.Item
                name="enablePayment"
                label="Bật Payment"
                valuePropName="checked"
              >
                <Switch />
              </Form.Item>
            </Col>
          </Row>
          
          <Divider />
          
          <Title level={4}>Tích hợp khác</Title>
          <Row gutter={[16, 16]}>
            <Col span={12}>
              <Form.Item
                name="webhookUrl"
                label="Webhook URL"
              >
                <Input placeholder="https://api.example.com/webhook" />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="apiVersion"
                label="API Version"
              >
                <Select>
                  <Option value="v1">v1</Option>
                  <Option value="v2">v2</Option>
                  <Option value="v3">v3</Option>
                </Select>
              </Form.Item>
            </Col>
          </Row>
          
          <Form.Item>
            <Button type="primary" htmlType="submit" loading={loading}>
              Lưu tích hợp
            </Button>
          </Form.Item>
        </Form>
      </Card>
    </div>
  )
}

export default Integrations
