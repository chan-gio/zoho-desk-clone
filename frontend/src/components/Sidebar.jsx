import React from 'react'
import { Layout, Menu } from 'antd'
import { useNavigate, useLocation } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import {
  DashboardOutlined,
  FileTextOutlined,
  TeamOutlined,
  BarChartOutlined,
  SettingOutlined,
  CustomerServiceOutlined,
  TagsOutlined,
  SolutionOutlined,
  UserOutlined,
  BellOutlined,
  SecurityScanOutlined,
  MailOutlined,
  MessageOutlined,
  ApiOutlined,
  LogoutOutlined,
  ApartmentOutlined,
  UsergroupAddOutlined,
  OrderedListOutlined,
  BookOutlined,
} from '@ant-design/icons'
import './Sidebar.scss'

const { Sider } = Layout

const Sidebar = ({ collapsed }) => {
  const navigate = useNavigate()
  const location = useLocation()
  const { t } = useTranslation()

  const menuItems = [
    {
      key: '/dashboard',
      icon: <DashboardOutlined />,
      label: t('navigation.dashboard'),
    },
    {
      key: '/tickets',
      icon: <FileTextOutlined />,
      label: t('navigation.tickets'),
      children: [
        {
          key: '/tickets',
          label: t('tickets.allTickets'),
        },
        {
          key: '/tickets?status=open',
          label: t('tickets.openTickets'),
        },
        {
          key: '/tickets?status=pending',
          label: t('tickets.pendingTickets'),
        },
        {
          key: '/tickets?status=resolved',
          label: t('tickets.resolvedTickets'),
        },
      ],
    },
    {
      key: '/customers',
      icon: <UsergroupAddOutlined />,
      label: 'Quản lý nhân sự',
    },
    {
      key: '/knowledge-base',
      icon: <BookOutlined />,
      label: 'Knowledge Base',
    },
    {
      key: '/solutions',
      icon: <SolutionOutlined />,
      label: t('navigation.solutions'),
    },
    {
      key: '/tags',
      icon: <TagsOutlined />,
      label: t('navigation.tags'),
    },
    {
      key: '/reports',
      icon: <BarChartOutlined />,
      label: t('navigation.reports'),
    },
    {
      key: '/settings',
      icon: <SettingOutlined />,
      label: t('navigation.settings'),
      children: [
        {
          key: 'profile',
          icon: <UserOutlined />,
          label: 'Hồ sơ cá nhân',
        },
        {
          key: 'notifications',
          icon: <BellOutlined />,
          label: 'Thông báo',
        },
        {
          key: 'email',
          icon: <MailOutlined />,
          label: 'Tích hợp Email',
        },
        {
          key: 'chat',
          icon: <MessageOutlined />,
          label: 'Tích hợp Chat',
        },
        {
          key: 'integrations',
          icon: <ApiOutlined />,
          label: 'Tích hợp khác',
        },
        {
          key: 'security',
          icon: <SecurityScanOutlined />,
          label: 'Bảo mật',
        },
        {
          key: 'departments',
          icon: <ApartmentOutlined />,
          label: 'Quản lý phòng ban',
        },
        {
          key: 'work',
          icon: <OrderedListOutlined />,
          label: 'Công việc',
        },
      ],
    },
  ]

  const handleMenuClick = ({ key }) => {
    if (key.startsWith('/')) {
      // Handle navigation for routes
      navigate(key)
    } else {
      // Handle settings navigation
      navigate(`/settings/${key}`)
    }
  }

  return (
    <Sider 
      trigger={null} 
      collapsible 
      collapsed={collapsed}
      className="sidebar"
      width={250}
    >
      <div className="sidebar-logo">
        {!collapsed && (
          <div className="logo-content">
            <CustomerServiceOutlined className="logo-icon" />
            <span className="logo-text">{t('sidebar.logo')}</span>
          </div>
        )}
        {collapsed && (
          <CustomerServiceOutlined className="logo-icon-collapsed" />
        )}
      </div>
      
      <Menu
        theme="dark"
        mode="inline"
        selectedKeys={[location.pathname]}
        defaultOpenKeys={['/tickets']}
        items={menuItems}
        onClick={handleMenuClick}
        className="sidebar-menu"
      />
    </Sider>
  )
}

export default Sidebar
