import React from 'react'
import { 
  Card, 
  Row, 
  Col, 
  Typography
} from 'antd'
import { 
  UserOutlined,
  BellOutlined,
  MailOutlined,
  MessageOutlined,
  ApiOutlined,
  SecurityScanOutlined,
  ApartmentOutlined,
  OrderedListOutlined
} from '@ant-design/icons'
import { useNavigate } from 'react-router-dom'
import './Settings.scss'

const { Title, Text } = Typography

const Settings = () => {
  const navigate = useNavigate()

  const handleNavigation = (path) => {
    navigate(path)
  }

  const settingsSections = [
    {
      title: 'HỒ SƠ & BẢO MẬT',
      icon: <UserOutlined />,
      items: [
        { label: 'Hồ sơ cá nhân', path: '/settings/profile' },
        { label: 'Bảo mật', path: '/settings/security' }
      ]
    },
    {
      title: 'THÔNG BÁO',
      icon: <BellOutlined />,
      items: [
        { label: 'Cài đặt thông báo', path: '/settings/notifications' }
      ]
    },
    {
      title: 'TÍCH HỢP',
      icon: <ApiOutlined />,
      items: [
        { label: 'Tích hợp Email', path: '/settings/email' },
        { label: 'Tích hợp Chat', path: '/settings/chat' },
        { label: 'Tích hợp khác', path: '/settings/integrations' }
      ]
    },
    {
      title: 'QUẢN LÝ',
      icon: <ApartmentOutlined />,
      items: [
        { label: 'Quản lý phòng ban', path: '/settings/departments' },
        { label: 'Công việc', path: '/settings/work' }
      ]
    }
  ]

  return (
    <div className="settings-page">
      <div className="settings-header">
        <Title level={2}>Cài đặt</Title>
        <Text type="secondary">Quản lý và cấu hình hệ thống của bạn</Text>
      </div>

      <div className="settings-grid">
        <Row gutter={[24, 24]}>
          {settingsSections.map((section, index) => (
            <Col xs={24} sm={12} lg={8} xl={6} key={index}>
              <Card 
                className="settings-section-card"
                hoverable
              >
                <div className="section-header">
                  <div className="section-icon">
                    {section.icon}
                  </div>
                  <Title level={4} className="section-title">
                    {section.title}
                  </Title>
                </div>
                
                <div className="section-items">
                  {section.items.map((item, itemIndex) => (
                    <div 
                      key={itemIndex}
                      className="setting-item"
                      onClick={() => handleNavigation(item.path)}
                    >
                      <Text className="item-label">
                        {item.label}
                      </Text>
                    </div>
                  ))}
                </div>
              </Card>
            </Col>
          ))}
        </Row>
      </div>
    </div>
  )
}

export default Settings
