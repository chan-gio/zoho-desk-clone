import React, { useState } from 'react'
import { 
  Card, 
  Row, 
  Col, 
  Tag, 
  Avatar, 
  Button, 
  Space, 
  Divider, 
  Timeline, 
  Input, 
  Form, 
  Select, 
  Upload, 
  List, 
  Typography, 
  Badge, 
  Tooltip, 
  Modal, 
  message,
  Progress,
  Statistic,
  Descriptions,
  Tabs
} from 'antd'
import { 
  UserOutlined, 
  ClockCircleOutlined, 
  TagOutlined, 
  PaperClipOutlined, 
  MessageOutlined, 
  CheckCircleOutlined, 
  CloseCircleOutlined, 
  ExclamationCircleOutlined, 
  InfoCircleOutlined, 
  EditOutlined, 
  PlusOutlined, 
  SendOutlined, 
  DownloadOutlined, 
  EyeOutlined,
  HistoryOutlined,
  TeamOutlined,
  CalendarOutlined,
  PhoneOutlined,
  MailOutlined,
  GlobalOutlined,
  FileTextOutlined,
  LinkOutlined
} from '@ant-design/icons'
import { useParams, useNavigate } from 'react-router-dom'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { useTranslation } from 'react-i18next'
import { ticketService } from '../services/ticketService'
import './TicketDetail.scss'

const { TextArea } = Input
const { Option } = Select
const { Text, Title, Paragraph } = Typography
const { TabPane } = Tabs

const TicketDetail = () => {
  const { t } = useTranslation()
  const { id } = useParams()
  const navigate = useNavigate()
  const [form] = Form.useForm()
  const [commentForm] = Form.useForm()
  const [isCommentModalVisible, setIsCommentModalVisible] = useState(false)
  const [isAssignModalVisible, setIsAssignModalVisible] = useState(false)
  const [isTagModalVisible, setIsTagModalVisible] = useState(false)
  const queryClient = useQueryClient()

  const { data: ticket, isLoading } = useQuery({
    queryKey: ['ticket', id],
    queryFn: () => ticketService.getTicketById(id),
  })

  const { data: comments } = useQuery({
    queryKey: ['ticket-comments', id],
    queryFn: () => ticketService.getTicketComments(id),
  })

  const { data: history } = useQuery({
    queryKey: ['ticket-history', id],
    queryFn: () => ticketService.getTicketHistory(id),
  })

  const { data: attachments } = useQuery({
    queryKey: ['ticket-attachments', id],
    queryFn: () => ticketService.getTicketAttachments(id),
  })

  const updateTicketMutation = useMutation({
    mutationFn: ticketService.updateTicket,
    onSuccess: () => {
      queryClient.invalidateQueries(['ticket', id])
      queryClient.invalidateQueries(['ticket-history', id])
      message.success(t('messages.success.updated'))
    },
  })

  const addCommentMutation = useMutation({
    mutationFn: ticketService.addComment,
    onSuccess: () => {
      queryClient.invalidateQueries(['ticket-comments', id])
      setIsCommentModalVisible(false)
      commentForm.resetFields()
      message.success(t('messages.success.created'))
    },
  })

  const assignTicketMutation = useMutation({
    mutationFn: ticketService.assignTicket,
    onSuccess: () => {
      queryClient.invalidateQueries(['ticket', id])
      queryClient.invalidateQueries(['ticket-history', id])
      setIsAssignModalVisible(false)
      message.success(t('messages.success.updated'))
    },
  })

  const getStatusIcon = (status) => {
    const icons = {
      'open': <ExclamationCircleOutlined style={{ color: '#1890ff' }} />,
      'pending': <ClockCircleOutlined style={{ color: '#faad14' }} />,
      'resolved': <CheckCircleOutlined style={{ color: '#52c41a' }} />,
      'closed': <CloseCircleOutlined style={{ color: '#8c8c8c' }} />
    }
    return icons[status] || <InfoCircleOutlined />
  }

  const getPriorityColor = (priority) => {
    const colors = {
      'low': 'green',
      'medium': 'orange',
      'high': 'red',
      'urgent': 'purple'
    }
    return colors[priority] || 'default'
  }

  const getStatusColor = (status) => {
    const colors = {
      'open': 'blue',
      'pending': 'orange',
      'resolved': 'green',
      'closed': 'gray'
    }
    return colors[status] || 'default'
  }

  const handleStatusChange = (newStatus) => {
    updateTicketMutation.mutate({
      id: ticket.id,
      status: newStatus
    })
  }

  const handlePriorityChange = (newPriority) => {
    updateTicketMutation.mutate({
      id: ticket.id,
      priority: newPriority
    })
  }

  const handleAddComment = (values) => {
    addCommentMutation.mutate({
      ticketId: id,
      ...values
    })
  }

  const handleAssignTicket = (values) => {
    assignTicketMutation.mutate({
      ticketId: id,
      ...values
    })
  }

  const getTimeAgo = (date) => {
    const now = new Date()
    const ticketDate = new Date(date)
    const diffInHours = Math.floor((now - ticketDate) / (1000 * 60 * 60))
    
    if (diffInHours < 1) return 'Vừa xong'
    if (diffInHours < 24) return `${diffInHours} giờ trước`
    const diffInDays = Math.floor(diffInHours / 24)
    return `${diffInDays} ngày trước`
  }

  if (isLoading) {
    return <div className="loading-container">Loading...</div>
  }

  if (!ticket) {
    return <div className="error-container">Ticket not found</div>
  }

  const tabItems = [
    {
      key: 'details',
      label: (
        <span>
          <FileTextOutlined />
          Chi tiết
        </span>
      ),
      children: (
        <div className="ticket-details">
          <Row gutter={[24, 24]}>
            <Col span={16}>
              <Card title="Mô tả" className="description-card">
                <Paragraph>{ticket.description}</Paragraph>
              </Card>
              
              <Card title="Bình luận" className="comments-card">
                <div className="comments-section">
                  <Form
                    form={commentForm}
                    layout="inline"
                    onFinish={handleAddComment}
                    className="comment-form"
                  >
                    <Form.Item name="content" style={{ flex: 1 }}>
                      <TextArea 
                        placeholder="Thêm bình luận..." 
                        rows={3}
                        maxLength={500}
                      />
                    </Form.Item>
                    <Form.Item>
                      <Button 
                        type="primary" 
                        htmlType="submit"
                        icon={<SendOutlined />}
                        loading={addCommentMutation.isPending}
                      >
                        Gửi
                      </Button>
                    </Form.Item>
                  </Form>
                  
                  <Divider />
                  
                  <List
                    dataSource={comments}
                    renderItem={(comment) => (
                      <List.Item className="comment-item">
                        <List.Item.Meta
                          avatar={<Avatar icon={<UserOutlined />} />}
                          title={
                            <Space>
                              <Text strong>{comment.author}</Text>
                              <Text type="secondary">{getTimeAgo(comment.createdAt)}</Text>
                            </Space>
                          }
                          description={comment.content}
                        />
                      </List.Item>
                    )}
                  />
                </div>
              </Card>
            </Col>
            
            <Col span={8}>
              <Card title="Thông tin Ticket" className="info-card">
                <Space direction="vertical" style={{ width: '100%' }} size="middle">
                  <div className="status-section">
                    <Text strong>Trạng thái:</Text>
                    <Select
                      value={ticket.status}
                      onChange={handleStatusChange}
                      style={{ width: '100%', marginTop: 8 }}
                      loading={updateTicketMutation.isPending}
                    >
                      <Option value="open">Mở</Option>
                      <Option value="pending">Đang chờ</Option>
                      <Option value="resolved">Đã giải quyết</Option>
                      <Option value="closed">Đã đóng</Option>
                    </Select>
                  </div>
                  
                  <div className="priority-section">
                    <Text strong>Độ ưu tiên:</Text>
                    <Select
                      value={ticket.priority}
                      onChange={handlePriorityChange}
                      style={{ width: '100%', marginTop: 8 }}
                      loading={updateTicketMutation.isPending}
                    >
                      <Option value="low">Thấp</Option>
                      <Option value="medium">Trung bình</Option>
                      <Option value="high">Cao</Option>
                      <Option value="urgent">Khẩn cấp</Option>
                    </Select>
                  </div>
                  
                  <div className="assigned-section">
                    <Text strong>Giao cho:</Text>
                    <div className="assigned-info">
                      <Space>
                        <Avatar size="small" icon={<UserOutlined />} />
                        <Text>{ticket.assignedTo || 'Chưa giao'}</Text>
                        <Button 
                          type="link" 
                          size="small"
                          onClick={() => setIsAssignModalVisible(true)}
                        >
                          Thay đổi
                        </Button>
                      </Space>
                    </div>
                  </div>
                  
                  <div className="customer-section">
                    <Text strong>Khách hàng:</Text>
                    <div className="customer-info">
                      <Space direction="vertical" size="small">
                        <Space>
                          <Avatar icon={<UserOutlined />} />
                          <div>
                            <div><Text strong>{ticket.customer?.name}</Text></div>
                            <div><Text type="secondary">{ticket.customer?.email}</Text></div>
                          </div>
                        </Space>
                        <Space>
                          <Button type="link" size="small" icon={<PhoneOutlined />}>
                            Gọi
                          </Button>
                          <Button type="link" size="small" icon={<MailOutlined />}>
                            Email
                          </Button>
                        </Space>
                      </Space>
                    </div>
                  </div>
                  
                  <div className="tags-section">
                    <Text strong>Tags:</Text>
                    <div className="tags-container">
                      <Space wrap>
                        {ticket.tags?.map(tag => (
                          <Tag key={tag} closable>
                            {tag}
                          </Tag>
                        ))}
                        <Button 
                          type="dashed" 
                          size="small"
                          icon={<PlusOutlined />}
                          onClick={() => setIsTagModalVisible(true)}
                        >
                          Thêm tag
                        </Button>
                      </Space>
                    </div>
                  </div>
                  
                  <div className="dates-section">
                    <Descriptions size="small" column={1}>
                      <Descriptions.Item label="Ngày tạo">
                        {new Date(ticket.createdAt).toLocaleString('vi-VN')}
                      </Descriptions.Item>
                      <Descriptions.Item label="Cập nhật cuối">
                        {new Date(ticket.updatedAt).toLocaleString('vi-VN')}
                      </Descriptions.Item>
                      <Descriptions.Item label="Hạn xử lý">
                        {ticket.dueDate ? new Date(ticket.dueDate).toLocaleString('vi-VN') : 'Không có'}
                      </Descriptions.Item>
                    </Descriptions>
                  </div>
                </Space>
              </Card>
              
              <Card title="Tệp đính kèm" className="attachments-card">
                <List
                  dataSource={attachments}
                  renderItem={(attachment) => (
                    <List.Item
                      actions={[
                        <Button type="link" icon={<EyeOutlined />} size="small">
                          Xem
                        </Button>,
                        <Button type="link" icon={<DownloadOutlined />} size="small">
                          Tải
                        </Button>
                      ]}
                    >
                      <List.Item.Meta
                        avatar={<PaperClipOutlined />}
                        title={attachment.name}
                        description={`${attachment.size} - ${getTimeAgo(attachment.uploadedAt)}`}
                      />
                    </List.Item>
                  )}
                />
                <Upload.Dragger>
                  <p className="ant-upload-drag-icon">
                    <PaperClipOutlined />
                  </p>
                  <p className="ant-upload-text">Kéo thả file vào đây hoặc click để chọn</p>
                </Upload.Dragger>
              </Card>
            </Col>
          </Row>
        </div>
      ),
    },
    {
      key: 'history',
      label: (
        <span>
          <HistoryOutlined />
          Lịch sử
        </span>
      ),
      children: (
        <Card>
          <Timeline>
            {history?.map((item, index) => (
              <Timeline.Item
                key={index}
                dot={getStatusIcon(item.type)}
                color={getStatusColor(item.type)}
              >
                <div className="history-item">
                  <div className="history-header">
                    <Space>
                      <Text strong>{item.action}</Text>
                      <Text type="secondary">{getTimeAgo(item.createdAt)}</Text>
                    </Space>
                  </div>
                  <div className="history-content">
                    <Text type="secondary">{item.description}</Text>
                  </div>
                  <div className="history-user">
                    <Space>
                      <Avatar size="small" icon={<UserOutlined />} />
                      <Text type="secondary">{item.user}</Text>
                    </Space>
                  </div>
                </div>
              </Timeline.Item>
            ))}
          </Timeline>
        </Card>
      ),
    },
  ]

  return (
    <div className="ticket-detail-page">
      <div className="page-header">
        <Button onClick={() => navigate('/tickets')}>
          ← Quay lại
        </Button>
        <Title level={2} style={{ margin: 0 }}>
          #{ticket.id} - {ticket.subject}
        </Title>
        <Space>
          <Tag 
            icon={getStatusIcon(ticket.status)} 
            color={getStatusColor(ticket.status)}
            className="status-tag"
          >
            {t(`tickets.status.${ticket.status}`)}
          </Tag>
          <Tag color={getPriorityColor(ticket.priority)} className="priority-tag">
            {t(`tickets.priority.${ticket.priority}`)}
          </Tag>
        </Space>
      </div>

      <Tabs defaultActiveKey="details" items={tabItems} />

      {/* Assign Modal */}
      <Modal
        title="Giao ticket"
        open={isAssignModalVisible}
        onCancel={() => setIsAssignModalVisible(false)}
        footer={null}
      >
        <Form onFinish={handleAssignTicket}>
          <Form.Item
            name="assignedTo"
            label="Giao cho"
            rules={[{ required: true, message: 'Vui lòng chọn agent!' }]}
          >
            <Select placeholder="Chọn agent">
              <Option value="agent1">Agent 1</Option>
              <Option value="agent2">Agent 2</Option>
              <Option value="agent3">Agent 3</Option>
            </Select>
          </Form.Item>
          <Form.Item>
            <Space>
              <Button onClick={() => setIsAssignModalVisible(false)}>
                Hủy
              </Button>
              <Button type="primary" htmlType="submit" loading={assignTicketMutation.isPending}>
                Giao
              </Button>
            </Space>
          </Form.Item>
        </Form>
      </Modal>

      {/* Tag Modal */}
      <Modal
        title="Thêm tag"
        open={isTagModalVisible}
        onCancel={() => setIsTagModalVisible(false)}
        footer={null}
      >
        <Form>
          <Form.Item
            name="tag"
            label="Tag mới"
            rules={[{ required: true, message: 'Vui lòng nhập tag!' }]}
          >
            <Input placeholder="Nhập tag" />
          </Form.Item>
          <Form.Item>
            <Space>
              <Button onClick={() => setIsTagModalVisible(false)}>
                Hủy
              </Button>
              <Button type="primary">
                Thêm
              </Button>
            </Space>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  )
}

export default TicketDetail
