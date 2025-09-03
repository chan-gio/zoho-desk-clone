import React from 'react'
import { Row, Col, Card, Statistic, Table, Tag, Button, Space } from 'antd'
import { 
  ArrowUpOutlined, 
  ArrowDownOutlined,
  PlusOutlined,
  EyeOutlined
} from '@ant-design/icons'
import { useQuery } from '@tanstack/react-query'
import { useTranslation } from 'react-i18next'
import { ticketService } from '../services/ticketService'
import './Dashboard.scss'

const Dashboard = () => {
  const { t } = useTranslation()
  
  const { data: stats, isLoading: statsLoading } = useQuery({
    queryKey: ['dashboard-stats'],
    queryFn: ticketService.getStats,
  })

  const { data: recentTickets, isLoading: ticketsLoading } = useQuery({
    queryKey: ['recent-tickets'],
    queryFn: ticketService.getRecentTickets,
  })

  const columns = [
    {
      title: t('tickets.ticketId'),
      dataIndex: 'id',
      key: 'id',
      width: 80,
    },
    {
      title: t('tickets.ticketSubject'),
      dataIndex: 'subject',
      key: 'subject',
      ellipsis: true,
    },
    {
      title: t('tickets.status'),
      dataIndex: 'status',
      key: 'status',
      render: (status) => {
        const colors = {
          'open': 'blue',
          'pending': 'orange',
          'resolved': 'green',
          'closed': 'gray'
        }
        return <Tag color={colors[status]}>{t(`tickets.status.${status}`)}</Tag>
      },
    },
    {
      title: t('tickets.priority'),
      dataIndex: 'priority',
      key: 'priority',
      render: (priority) => {
        const colors = {
          'low': 'green',
          'medium': 'orange',
          'high': 'red',
          'urgent': 'purple'
        }
        return <Tag color={colors[priority]}>{t(`tickets.priority.${priority}`)}</Tag>
      },
    },
    {
      title: t('common.actions'),
      key: 'action',
      render: (_, record) => (
        <Space size="middle">
          <Button type="link" icon={<EyeOutlined />} size="small">
            {t('common.view')}
          </Button>
        </Space>
      ),
    },
  ]

  return (
    <div className="dashboard">
      <div className="page-header">
        <h1>{t('dashboard.title')}</h1>
        <Button type="primary" icon={<PlusOutlined />}>
          {t('dashboard.createTicket')}
        </Button>
      </div>

      {/* Thống kê */}
      <Row gutter={[16, 16]} className="stats-row">
        <Col xs={24} sm={12} lg={6}>
          <Card>
            <Statistic
              title={t('tickets.totalTickets')}
              value={stats?.totalTickets || 0}
              loading={statsLoading}
              prefix={<ArrowUpOutlined />}
              valueStyle={{ color: '#3f8600' }}
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <Card>
            <Statistic
              title={t('tickets.openTickets')}
              value={stats?.openTickets || 0}
              loading={statsLoading}
              valueStyle={{ color: '#1890ff' }}
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <Card>
            <Statistic
              title={t('tickets.pendingTickets')}
              value={stats?.pendingTickets || 0}
              loading={statsLoading}
              valueStyle={{ color: '#faad14' }}
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <Card>
            <Statistic
              title={t('tickets.resolvedTickets')}
              value={stats?.resolvedTickets || 0}
              loading={statsLoading}
              prefix={<ArrowDownOutlined />}
              valueStyle={{ color: '#52c41a' }}
            />
          </Card>
        </Col>
      </Row>

      {/* Bảng tickets gần đây */}
      <Card title={t('dashboard.recentTickets')} className="recent-tickets-card">
        <Table
          columns={columns}
          dataSource={recentTickets}
          loading={ticketsLoading}
          rowKey="id"
          pagination={{ pageSize: 10 }}
          size="small"
        />
      </Card>
    </div>
  )
}

export default Dashboard
