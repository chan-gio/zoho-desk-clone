import React, { useState } from 'react'
import { 
  Card, 
  Form, 
  Input, 
  Button, 
  Checkbox, 
  Typography, 
  Row, 
  Col, 
  Divider,
  Space,
  message,
  Alert
} from 'antd'
import { 
  UserOutlined, 
  LockOutlined, 
  MailOutlined,
  GoogleOutlined,
  FacebookOutlined,
  GithubOutlined
} from '@ant-design/icons'
import { useNavigate } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { useLogin, useForgotPassword } from '../hooks/useAuth'
import './Login.scss'

const { Title, Text, Link } = Typography

const Login = () => {
  const { t } = useTranslation()
  const navigate = useNavigate()
  const [form] = Form.useForm()
  const [showForgotPassword, setShowForgotPassword] = useState(false)
  const loginMutation = useLogin()
  const forgotPasswordMutation = useForgotPassword()

  const handleLogin = async (values) => {
    try {
      const result = await loginMutation.mutateAsync({
        email: values.email,
        password: values.password,
        rememberMe: values.rememberMe || false
      })
      
      // authService.login() đã tự động lưu tokens và user info
      
      message.success('Đăng nhập thành công!')
      
      navigate('/tenant-selection')
    } catch (error) {
      message.error(error.response?.data?.message || 'Đăng nhập thất bại!')
    }
  }

  const handleSocialLogin = (provider) => {
    message.info(`Đăng nhập với ${provider} đang được phát triển`)
  }

  const handleForgotPassword = async () => {
    const email = form.getFieldValue('email')
    if (!email) {
      message.error('Vui lòng nhập email trước khi yêu cầu đặt lại mật khẩu')
      return
    }

    try {
      await forgotPasswordMutation.mutateAsync({ email })
      message.success('Email đặt lại mật khẩu đã được gửi!')
    } catch (error) {
      message.error(error.response?.data?.message || 'Gửi email thất bại!')
    }
  }

  return (
    <div className="login-page">
      <div className="login-container">
        <Row justify="center" align="middle" style={{ minHeight: '100vh' }}>
          <Col xs={22} sm={18} md={12} lg={8} xl={6}>
            <Card className="login-card">
              <div className="login-header">
                <div className="logo">
                  <div className="logo-icon">🎫</div>
                  <Title level={2} className="logo-text">Zoho Desk Clone</Title>
                </div>
                <Text type="secondary" className="login-subtitle">
                  Đăng nhập vào tài khoản của bạn
                </Text>
              </div>

              {loginMutation.isError && (
                <Alert
                  message="Đăng nhập thất bại"
                  description={loginMutation.error?.response?.data?.message || 'Vui lòng kiểm tra lại thông tin đăng nhập'}
                  type="error"
                  showIcon
                  style={{ marginBottom: 16 }}
                />
              )}

              <Form
                form={form}
                name="login"
                onFinish={handleLogin}
                layout="vertical"
                size="large"
                className="login-form"
              >
                <Form.Item
                  name="email"
                  label="Email"
                  rules={[
                    { required: true, message: 'Vui lòng nhập email!' },
                    { type: 'email', message: 'Email không hợp lệ!' }
                  ]}
                >
                  <Input 
                    prefix={<MailOutlined />} 
                    placeholder="Nhập email của bạn"
                  />
                </Form.Item>

                <Form.Item
                  name="password"
                  label="Mật khẩu"
                  rules={[{ required: true, message: 'Vui lòng nhập mật khẩu!' }]}
                >
                  <Input.Password 
                    prefix={<LockOutlined />} 
                    placeholder="Nhập mật khẩu"
                  />
                </Form.Item>

                <Form.Item>
                  <div className="login-options">
                    <Form.Item name="rememberMe" valuePropName="checked" noStyle>
                      <Checkbox>Ghi nhớ đăng nhập</Checkbox>
                    </Form.Item>
                    <Link 
                      onClick={handleForgotPassword}
                      className="forgot-password"
                      disabled={forgotPasswordMutation.isPending}
                    >
                      {forgotPasswordMutation.isPending ? 'Đang gửi...' : 'Quên mật khẩu?'}
                    </Link>
                  </div>
                </Form.Item>

                <Form.Item>
                  <Button 
                    type="primary" 
                    htmlType="submit" 
                    className="login-button"
                    loading={loginMutation.isPending}
                    block
                  >
                    Đăng nhập
                  </Button>
                </Form.Item>
              </Form>

              <Divider>Hoặc</Divider>

              <div className="social-login">
                <Space direction="vertical" style={{ width: '100%' }}>
                  <Button 
                    icon={<GoogleOutlined />} 
                    onClick={() => handleSocialLogin('Google')}
                    className="social-button google"
                    block
                  >
                    Đăng nhập với Google
                  </Button>
                  <Button 
                    icon={<FacebookOutlined />} 
                    onClick={() => handleSocialLogin('Facebook')}
                    className="social-button facebook"
                    block
                  >
                    Đăng nhập với Facebook
                  </Button>
                  <Button 
                    icon={<GithubOutlined />} 
                    onClick={() => handleSocialLogin('GitHub')}
                    className="social-button github"
                    block
                  >
                    Đăng nhập với GitHub
                  </Button>
                </Space>
              </div>

              <div className="login-footer">
                <Text type="secondary">
                  Chưa có tài khoản? <Link href="#">Đăng ký ngay</Link>
                </Text>
              </div>
            </Card>
          </Col>
        </Row>
      </div>
    </div>
  )
}

export default Login
