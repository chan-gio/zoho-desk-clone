import React from 'react'
import { Layout } from 'antd'
import Header from '../components/Header'
import Footer from '../components/Footer'
import './MainLayout.scss'

const { Content } = Layout

const MainLayout = ({ children }) => {
  return (
    <Layout className="main-layout">
      <Header />
      <Content className="site-layout-content">
        <div className="content-wrapper">
          {children}
        </div>
      </Content>
      <Footer />
    </Layout>
  )
}

export default MainLayout
