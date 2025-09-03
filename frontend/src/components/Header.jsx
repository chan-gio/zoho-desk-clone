import React from 'react'
import { Layout, Button, Input, Avatar, Dropdown, Badge, Space, Select } from 'antd'
import { 
  MenuFoldOutlined, 
  MenuUnfoldOutlined, 
  SearchOutlined, 
  BellOutlined, 
  UserOutlined,
  SettingOutlined,
  LogoutOutlined,
  GlobalOutlined
} from '@ant-design/icons'
import { useTranslation } from 'react-i18next'
import './Header.scss'

const { Header: AntHeader } = Layout
const { Search } = Input
const { Option } = Select

const Header = ({ collapsed, setCollapsed }) => {
  const { t, i18n } = useTranslation()

  const handleLanguageChange = (value) => {
    i18n.changeLanguage(value)
    // Dispatch custom event to notify other components
    window.dispatchEvent(new CustomEvent('languageChanged', { detail: value }))
  }

  const userMenuItems = [
    {
      key: 'profile',
      icon: <UserOutlined />,
      label: t('navigation.profile'),
    },
    {
      key: 'settings',
      icon: <SettingOutlined />,
      label: t('navigation.settings'),
    },
    {
      type: 'divider',
    },
    {
      key: 'logout',
      icon: <LogoutOutlined />,
      label: t('navigation.logout'),
    },
  ]

  return (
    <AntHeader className="header">
      <div className="header-left">
        <Button
          type="text"
          icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
          onClick={() => setCollapsed(!collapsed)}
          className="trigger"
        />
        <div className="logo">
          <h2>Zoho Desk Clone</h2>
        </div>
      </div>
      
      <div className="header-center">
        <Search
          placeholder={t('header.searchPlaceholder')}
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
