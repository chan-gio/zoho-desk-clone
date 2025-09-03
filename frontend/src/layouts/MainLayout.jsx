import React, { useState } from 'react'
import { Layout } from 'antd'
import Header from '../components/Header'
import Sidebar from '../components/Sidebar'
import Footer from '../components/Footer'
import './MainLayout.scss'

const { Content } = Layout

const MainLayout = ({ children }) => {
  const [collapsed, setCollapsed] = useState(false)

  return (
    <Layout className="main-layout">
      <Sidebar collapsed={collapsed} />
      <Layout className="site-layout">
        <Header collapsed={collapsed} setCollapsed={setCollapsed} />
        <Content className="site-layout-content">
          <div className="content-wrapper">
            {children}
          </div>
        </Content>
        <Footer />
      </Layout>
    </Layout>
  )
}

export default MainLayout
