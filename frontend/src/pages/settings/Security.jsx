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
  Switch,
  Alert
} from 'antd'
import { 
  SecurityScanOutlined,
  LockOutlined,
  EyeOutlined,
  EyeInvisibleOutlined
} from '@ant-design/icons'
import { useTranslation } from 'react-i18next'
import './Security.scss'

const { Title, Text } = Typography

const Security = () => {
  const { t } = useTranslation()
  const [form] = Form.useForm()
  const [loading, setLoading] = useState(false)

  const handleSave = async (values) => {
    setLoading(true)
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000))
      message.success('Cập nhật bảo mật thành công!')
    } catch (error) {
      message.error('Có lỗi xảy ra khi cập nhật bảo mật!')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="security-page">
      <div className="page-header">
        <Title level={2}>Bảo mật</Title>
        <Text type="secondary">Quản lý mật khẩu và cài đặt bảo mật</Text>
      </div>

      <Row gutter={[24, 24]}>
        <Col span={16}>
          <Card>
            <Form
              form={form}
              layout="vertical"
              onFinish={handleSave}
            >
              <Title level={4}>Đổi mật khẩu</Title>
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
              
              <Divider />
              
              <Title level={4}>Cài đặt bảo mật</Title>
              <Row gutter={[16, 16]}>
                <Col span={12}>
                  <Form.Item
                    name="twoFactorAuth"
                    label="Xác thực 2 yếu tố"
                    valuePropName="checked"
                  >
                    <Switch />
                  </Form.Item>
                </Col>
                <Col span={12}>
                  <Form.Item
                    name="sessionTimeout"
                    label="Tự động đăng xuất"
                    valuePropName="checked"
                  >
                    <Switch />
                  </Form.Item>
                </Col>
                <Col span={12}>
                  <Form.Item
                    name="loginNotifications"
                    label="Thông báo đăng nhập"
                    valuePropName="checked"
                  >
                    <Switch />
                  </Form.Item>
                </Col>
                <Col span={12}>
                  <Form.Item
                    name="passwordExpiry"
                    label="Hết hạn mật khẩu"
                    valuePropName="checked"
                  >
                    <Switch />
                  </Form.Item>
                </Col>
              </Row>
              
              <Form.Item>
                <Button type="primary" htmlType="submit" loading={loading}>
                  Cập nhật bảo mật
                </Button>
              </Form.Item>
            </Form>
          </Card>
        </Col>

        <Col span={8}>
          <Card title="Thông tin bảo mật">
            <div className="security-info">
              <div className="info-item">
                <Text strong>Trạng thái tài khoản:</Text>
                <Text type="success">Hoạt động</Text>
              </div>
              <div className="info-item">
                <Text strong>Lần đăng nhập cuối:</Text>
                <Text>Hôm nay, 14:30</Text>
              </div>
              <div className="info-item">
                <Text strong>Địa chỉ IP:</Text>
                <Text>192.168.1.100</Text>
              </div>
              <div className="info-item">
                <Text strong>Thiết bị:</Text>
                <Text>Chrome trên Windows</Text>
              </div>
            </div>
          </Card>

          <Card title="Hoạt động gần đây" style={{ marginTop: '16px' }}>
            <div className="activity-list">
              <div className="activity-item">
                <Text>Đăng nhập thành công</Text>
                <Text type="secondary">Hôm nay, 14:30</Text>
              </div>
              <div className="activity-item">
                <Text>Thay đổi mật khẩu</Text>
                <Text type="secondary">2 ngày trước</Text>
              </div>
              <div className="activity-item">
                <Text>Cập nhật hồ sơ</Text>
                <Text type="secondary">1 tuần trước</Text>
              </div>
            </div>
          </Card>
        </Col>
      </Row>
    </div>
  )
}

export default Security
