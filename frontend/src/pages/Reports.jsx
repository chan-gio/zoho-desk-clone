import React from 'react'
import { Card, Row, Col, Statistic, Table, Tag } from 'antd'
import { 
  ArrowUpOutlined, 
  ArrowDownOutlined,
  UserOutlined,
  FileTextOutlined,
  ClockCircleOutlined
} from '@ant-design/icons'
import { useQuery } from '@tanstack/react-query'
import { useTranslation } from 'react-i18next'
import { reportService } from '../services/reportService'
import './Reports.scss'

const Reports = () => {
  const { t } = useTranslation()
  
  const { data: reportData, isLoading } = useQuery({
    queryKey: ['reports'],
    queryFn: reportService.getReports,
  })

  const columns = [
    {
      title: 'Agent',
      dataIndex: 'agentName',
      key: 'agentName',
    },
    {
      title: 'Tickets đã xử lý',
      dataIndex: 'ticketsResolved',
      key: 'ticketsResolved',
      sorter: (a, b) => a.ticketsResolved - b.ticketsResolved,
    },
    {
      title: 'Thời gian trung bình',
      dataIndex: 'avgResolutionTime',
      key: 'avgResolutionTime',
      render: (time) => `${time} giờ`,
    },
    {
      title: 'Đánh giá',
      dataIndex: 'rating',
      key: 'rating',
      render: (rating) => (
        <Tag color={rating >= 4 ? 'green' : rating >= 3 ? 'orange' : 'red'}>
          {rating}/5
        </Tag>
      ),
    },
  ]

  return (
    <div className="reports-page">
      <div className="page-header">
        <h1>{t('reports.title')}</h1>
      </div>

      {/* Thống kê tổng quan */}
      <Row gutter={[16, 16]} className="stats-row">
        <Col xs={24} sm={12} lg={6}>
          <Card>
            <Statistic
              title={t('tickets.totalTickets')}
              value={reportData?.totalTickets || 0}
              loading={isLoading}
              prefix={<FileTextOutlined />}
              valueStyle={{ color: '#1890ff' }}
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <Card>
            <Statistic
              title={t('tickets.resolvedTickets')}
              value={reportData?.resolvedTickets || 0}
              loading={isLoading}
              prefix={<ArrowUpOutlined />}
              valueStyle={{ color: '#3f8600' }}
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <Card>
            <Statistic
              title="Thời gian trung bình"
              value={reportData?.avgResolutionTime || 0}
              loading={isLoading}
              prefix={<ClockCircleOutlined />}
              suffix="giờ"
              valueStyle={{ color: '#faad14' }}
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <Card>
            <Statistic
              title="Đánh giá trung bình"
              value={reportData?.avgRating || 0}
              loading={isLoading}
              prefix={<UserOutlined />}
              suffix="/5"
              valueStyle={{ color: '#722ed1' }}
            />
          </Card>
        </Col>
      </Row>

      {/* Báo cáo theo agent */}
      <Card title={t('reports.agentPerformance')} className="agent-performance-card">
        <Table
          columns={columns}
          dataSource={reportData?.agentPerformance || []}
          loading={isLoading}
          rowKey="agentId"
          pagination={false}
        />
      </Card>

      {/* Báo cáo theo thời gian */}
      <Row gutter={[16, 16]}>
        <Col xs={24} lg={12}>
          <Card title="Tickets theo tháng">
            <div className="chart-placeholder">
              <p>Biểu đồ tickets theo tháng sẽ được hiển thị ở đây</p>
            </div>
          </Card>
        </Col>
        <Col xs={24} lg={12}>
          <Card title="Tỷ lệ giải quyết">
            <div className="chart-placeholder">
              <p>Biểu đồ tỷ lệ giải quyết sẽ được hiển thị ở đây</p>
            </div>
          </Card>
        </Col>
      </Row>
    </div>
  )
}

export default Reports
