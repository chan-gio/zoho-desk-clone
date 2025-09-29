import React from 'react'
import { Layout, Button, Input, Avatar, Dropdown, Badge, Space, Select, Menu } from 'antd'
import { 
  SearchOutlined, 
  BellOutlined, 
  UserOutlined,
  SettingOutlined,
  LogoutOutlined,
  GlobalOutlined,
  DashboardOutlined,
  FileTextOutlined,
  BookOutlined,
  UsergroupAddOutlined,
  BarChartOutlined
} from '@ant-design/icons'
import { useTranslation } from 'react-i18next'
import { useNavigate, useLocation } from 'react-router-dom'
import './Header.scss'

const { Header: AntHeader } = Layout
const { Search } = Input
const { Option } = Select

const Header = () => {
  const { t, i18n } = useTranslation()
  const navigate = useNavigate()
  const location = useLocation()

  const handleLanguageChange = (value) => {
    i18n.changeLanguage(value)
    // Dispatch custom event to notify other components
    window.dispatchEvent(new CustomEvent('languageChanged', { detail: value }))
  }

  const handleMenuClick = ({ key }) => {
    navigate(key)
  }

  const userMenuItems = [
    {
      key: 'profile',
      icon: <UserOutlined />,
      label: 'Hồ sơ cá nhân',
    },
    {
      key: 'settings',
      icon: <SettingOutlined />,
      label: 'Cài đặt',
    },
    {
      type: 'divider',
    },
    {
      key: 'logout',
      icon: <LogoutOutlined />,
      label: 'Đăng xuất',
    },
  ]

  const mainMenuItems = [
    {
      key: '/dashboard',
      icon: <DashboardOutlined />,
      label: 'Dashboard',
    },
    {
      key: '/tickets',
      icon: <FileTextOutlined />,
      label: 'Tickets',
    },
    {
      key: '/knowledge-base',
      icon: <BookOutlined />,
      label: 'Knowledge Base',
    },
    {
      key: '/customers',
      icon: <UsergroupAddOutlined />,
      label: 'Khách hàng',
    },
    {
      key: '/reports',
      icon: <BarChartOutlined />,
      label: 'Báo cáo',
    },
    {
      key: '/settings',
      icon: <SettingOutlined />,
      label: 'Cài đặt',
    },
  ]

  return (
    <AntHeader className="header">
      <div className="header-left">
        <div className="logo">
          <h2>Zoho Desk Clone</h2>
        </div>
        
        <Menu
          mode="horizontal"
          selectedKeys={[location.pathname]}
          items={mainMenuItems}
          onClick={handleMenuClick}
          className="main-navigation"
        />
      </div>
      
      <div className="header-center">
        <Search
          placeholder="Tìm kiếm tickets, articles..."
          allowClear
          enterButton={<SearchOutlined />}
          size="large"
          className="search-input"
        />
      </div>
      
      <div className="header-right">
        <Space size="middle">
          <Select
            value={i18n.language}
            onChange={handleLanguageChange}
            size="small"
            className="language-selector"
            suffixIcon={<GlobalOutlined />}
          >
            <Option value="vi">🇻🇳 VI</Option>
            <Option value="en">🇺🇸 EN</Option>
          </Select>
          
          <Badge count={5} size="small">
            <Button 
              type="text" 
              icon={<BellOutlined />} 
              className="notification-btn"
            />
          </Badge>
          
          <Dropdown
            menu={{ items: userMenuItems }}
            placement="bottomRight"
            arrow
          >
            <Avatar 
              size="large" 
              icon={<UserOutlined />} 
              className="user-avatar"
            />
          </Dropdown>
        </Space>
      </div>
    </AntHeader>
  )
}

export default Header
