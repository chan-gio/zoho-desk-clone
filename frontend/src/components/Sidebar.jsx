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
  SolutionOutlined
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
      icon: <TeamOutlined />,
      label: t('navigation.customers'),
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
    },
  ]

  const handleMenuClick = ({ key }) => {
    navigate(key)
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
