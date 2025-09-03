import React, { useState, useMemo, useEffect } from 'react'
import { 
  Card, 
  Button, 
  Space, 
  Tag, 
  Input, 
  Select, 
  DatePicker, 
  Row, 
  Col,
  Tooltip,
  Badge,
  Tabs,
  Statistic,
  Progress,
  Avatar,
  Divider,
  message,
  Drawer,
  List,
  Typography,
  Empty,
  Spin
} from 'antd'
import { 
  PlusOutlined, 
  SearchOutlined, 
  FilterOutlined,
  EyeOutlined,
  EditOutlined,
  DeleteOutlined,
  ReloadOutlined,
  ExportOutlined,
  ImportOutlined,
  UserOutlined,
  ClockCircleOutlined,
  CheckCircleOutlined,
  ExclamationCircleOutlined,
  BarChartOutlined,
  AppstoreOutlined,
  TableOutlined,
  MailOutlined,
  MessageFilled,
  PhoneOutlined,
  FileTextOutlined,
  HolderOutlined
} from '@ant-design/icons'
import { 
  DndContext, 
  closestCenter, 
  KeyboardSensor, 
  PointerSensor, 
  useSensor, 
  useSensors,
  DragOverlay,
  useDroppable
} from '@dnd-kit/core'
import { 
  arrayMove, 
  SortableContext, 
  sortableKeyboardCoordinates, 
  verticalListSortingStrategy,
  useSortable,
  horizontalListSortingStrategy
} from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router-dom'
import { ticketService } from '../services/ticketService'
import './Tickets.scss'

const { Search } = Input
const { Option } = Select
const { RangePicker } = DatePicker
const { Text, Title } = Typography

// Simple Ticket Card Component
const TicketCard = ({ ticket, onView, onEdit, onDelete, isOverlay = false }) => {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ 
    id: String(ticket.id),
    data: { type: 'ticket', ticket }
  })

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
  }

  const getPriorityColor = (priority) => {
    const colors = {
      'low': '#52c41a',
      'medium': '#faad14',
      'high': '#ff4d4f',
      'urgent': '#722ed1'
    }
    return colors[priority] || '#d9d9d9'
  }

  const getStatusColor = (status) => {
    const colors = {
      'open': '#1890ff',
      'pending': '#faad14',
      'resolved': '#52c41a',
      'closed': '#8c8c8c'
    }
    return colors[status] || '#d9d9d9'
  }

  const getChannelIcon = (channel) => {
    const icons = {
      'email': <MailOutlined />,
      'chat': <MessageFilled />,
      'phone': <PhoneOutlined />,
      'portal': <FileTextOutlined />
    }
    return icons[channel] || <FileTextOutlined />
  }

  const handleCardClick = (e) => {
    if (!isDragging && !isOverlay) {
      onView(ticket)
    }
  }

  const handleEditClick = (e) => {
    e.stopPropagation()
    onEdit(ticket)
  }

  const handleDeleteClick = (e) => {
    e.stopPropagation()
    onDelete(ticket.id)
  }

  return (
    <div
      ref={setNodeRef}
      style={style}
      className={`ticket-card ${isOverlay ? 'drag-overlay' : ''}`}
      {...attributes}
      {...listeners}
    >
      <Card
        size="small"
        className="modern-ticket-card"
        hoverable={!isOverlay}
        onClick={handleCardClick}
        actions={!isOverlay ? [
          <Tooltip title="Xem chi tiết" key="view">
            <EyeOutlined onClick={handleCardClick} />
          </Tooltip>,
          <Tooltip title="Chỉnh sửa" key="edit">
            <EditOutlined onClick={handleEditClick} />
          </Tooltip>,
          <Tooltip title="Xóa" key="delete">
            <DeleteOutlined onClick={handleDeleteClick} />
          </Tooltip>
        ] : undefined}
      >
        <div className="ticket-header">
          <div className="ticket-id">
            <Badge count={`#${ticket.id}`} style={{ backgroundColor: getStatusColor(ticket.status) }} />
          </div>
          <div className="ticket-channel">
            <Tooltip title={ticket.channel}>
              {getChannelIcon(ticket.channel)}
            </Tooltip>
          </div>
        </div>

        <div className="ticket-content">
          <Title level={5} className="ticket-subject" ellipsis={{ rows: 2 }}>
            {ticket.subject}
          </Title>
          <Text type="secondary" className="ticket-description" ellipsis={{ rows: 2 }}>
            {ticket.description}
          </Text>
        </div>

        <div className="ticket-meta">
          <div className="ticket-customer">
            <Avatar size="small" icon={<UserOutlined />} />
            <Text className="customer-name">{ticket.customer?.name || 'Unknown'}</Text>
          </div>
          <div className="ticket-assigned">
            {ticket.assignedTo ? (
              <Space size="small">
                <Avatar size="small" icon={<UserOutlined />} />
                <Text className="assigned-name">{ticket.assignedTo}</Text>
              </Space>
            ) : (
              <Tag color="default" size="small">Chưa giao</Tag>
            )}
          </div>
        </div>

        <div className="ticket-tags">
          <Space size="small" wrap>
            <Tag color="blue" size="small">{ticket.category || 'General'}</Tag>
            {ticket.tags && ticket.tags.length > 0 ? (
              ticket.tags.slice(0, 2).map(tag => (
                <Tag key={tag} size="small">{tag}</Tag>
              ))
            ) : null}
            {ticket.tags && ticket.tags.length > 2 && (
              <Tag size="small">+{ticket.tags.length - 2}</Tag>
            )}
          </Space>
        </div>

        <div className="ticket-footer">
          <div className="ticket-priority">
            <div 
              className="priority-indicator" 
              style={{ backgroundColor: getPriorityColor(ticket.priority) }}
            />
            <Text className="priority-text">{ticket.priority || 'low'}</Text>
          </div>
          <div className="ticket-time">
            <ClockCircleOutlined />
            <Text type="secondary">
              {ticket.createdAt ? new Date(ticket.createdAt).toLocaleDateString('vi-VN') : 'N/A'}
            </Text>
          </div>
        </div>
      </Card>
    </div>
  )
}

// Simple Column Component
const KanbanColumn = ({ column, tickets, onView, onEdit, onDelete }) => {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ 
    id: column.id,
    data: { type: 'column', column }
  })

  const { setNodeRef: setDroppableRef, isOver } = useDroppable({
    id: column.id,
  })

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  }

  return (
    <div
      ref={setNodeRef}
      style={style}
      className={`kanban-column ${isOver ? 'drag-over' : ''} ${isDragging ? 'column-dragging' : ''}`}
    >
      <div className="column-header">
        <div className="column-title">
          <Badge count={tickets.length} style={{ backgroundColor: '#1890ff' }} />
          <Title level={5}>{column.title}</Title>
        </div>
        <div className="column-actions">
          <Button type="text" size="small" icon={<PlusOutlined />} />
          <div 
            className="column-drag-handle"
            {...attributes}
            {...listeners}
          >
            <HolderOutlined />
          </div>
        </div>
      </div>
      
      <div ref={setDroppableRef} className="column-content">
        {tickets.length === 0 ? (
          <div className="empty-placeholder">
            <Empty 
              image={Empty.PRESENTED_IMAGE_SIMPLE} 
              description="Không có ticket"
              style={{ padding: '20px 0' }}
            />
          </div>
        ) : (
          tickets.map(ticket => (
            <TicketCard
              key={String(ticket.id)}
              ticket={ticket}
              onView={onView}
              onEdit={onEdit}
              onDelete={onDelete}
            />
          ))
        )}
        {isOver && (
          <div className="drop-placeholder">
            <div className="placeholder-content">
              <div className="placeholder-line"></div>
              <div className="placeholder-text">Thả ticket vào đây</div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

const Tickets = () => {
  const { t } = useTranslation()
  const navigate = useNavigate()
  const [searchText, setSearchText] = useState('')
  const [statusFilter, setStatusFilter] = useState('')
  const [priorityFilter, setPriorityFilter] = useState('')
  const [assignedFilter, setAssignedFilter] = useState('')
  const [dateRange, setDateRange] = useState([])
  const [viewMode, setViewMode] = useState('kanban')
  const [isFilterDrawerVisible, setIsFilterDrawerVisible] = useState(false)
  const [activeTab, setActiveTab] = useState('all')
  const [localTickets, setLocalTickets] = useState([])
  const [activeId, setActiveId] = useState(null)
  const [activeColumnId, setActiveColumnId] = useState(null)
  const [columnOrder, setColumnOrder] = useState(['open', 'pending', 'resolved', 'closed'])
  const queryClient = useQueryClient()

  const { data: tickets, isLoading, refetch } = useQuery({
    queryKey: ['tickets'],
    queryFn: () => ticketService.getTickets(),
  })

  const { data: stats } = useQuery({
    queryKey: ['ticket-stats'],
    queryFn: () => ticketService.getStats(),
  })

  const updateTicketMutation = useMutation({
    mutationFn: ticketService.updateTicket,
    onSuccess: () => {
      queryClient.invalidateQueries(['tickets'])
      queryClient.invalidateQueries(['ticket-stats'])
      message.success('Cập nhật ticket thành công!')
    },
    onError: () => {
      message.error('Cập nhật ticket thất bại!')
    }
  })

  const deleteTicketMutation = useMutation({
    mutationFn: ticketService.deleteTicket,
    onSuccess: () => {
      queryClient.invalidateQueries(['tickets'])
      queryClient.invalidateQueries(['ticket-stats'])
      message.success('Xóa ticket thành công!')
    },
    onError: () => {
      message.error('Xóa ticket thất bại!')
    }
  })

  // Ensure currentTickets is always an array
  const currentTickets = Array.isArray(localTickets) && localTickets.length > 0 ? localTickets : (Array.isArray(tickets) ? tickets : [])

  // Column configuration with order
  const columns = [
    { id: 'open', title: 'Đang mở', status: 'open' },
    { id: 'pending', title: 'Đang chờ', status: 'pending' },
    { id: 'resolved', title: 'Đã giải quyết', status: 'resolved' },
    { id: 'closed', title: 'Đã đóng', status: 'closed' }
  ]

  const orderedColumns = columnOrder.map(id => columns.find(col => col.id === id)).filter(Boolean)

  const handleEdit = (record) => {
    navigate(`/tickets/${record.id}/edit`)
  }

  const handleView = (record) => {
    navigate(`/tickets/${record.id}`)
  }

  const handleCreateNew = () => {
    navigate('/tickets/new')
  }

  const handleDelete = (id) => {
    deleteTicketMutation.mutate(id)
  }

  const handleDragStart = (event) => {
    const { active } = event
    setActiveId(active.id)
    
    // Check if it's a column or ticket
    if (active.data.current?.type === 'column') {
      setActiveColumnId(active.id)
    }
  }

  const handleDragEnd = (event) => {
    const { active, over } = event
    
    if (!over) {
      setActiveId(null)
      setActiveColumnId(null)
      return
    }

    // Handle column reordering
    if (active.data.current?.type === 'column' && over.data.current?.type === 'column') {
      const oldIndex = columnOrder.indexOf(active.id)
      const newIndex = columnOrder.indexOf(over.id)
      
      if (oldIndex !== -1 && newIndex !== -1) {
        const newOrder = arrayMove(columnOrder, oldIndex, newIndex)
        setColumnOrder(newOrder)
        message.success('Đã thay đổi vị trí cột!')
      }
    }
    
    // Handle ticket status change
    if (active.data.current?.type === 'ticket') {
      const ticket = currentTickets.find(t => String(t.id) === String(active.id))
      if (ticket && ticket.status !== over.id) {
        // Cập nhật local state ngay lập tức
        const updatedTickets = currentTickets.map(t => 
          String(t.id) === String(active.id) ? { ...t, status: over.id } : t
        )
        setLocalTickets(updatedTickets)

        // Gọi API để cập nhật backend
        updateTicketMutation.mutate({
          id: active.id,
          status: over.id
        })
        
        message.success(`Đã chuyển ticket #${active.id} sang trạng thái ${over.id}!`)
      }
    }

    setActiveId(null)
    setActiveColumnId(null)
  }

  const handleTabChange = (key) => {
    setActiveTab(key)
    if (key === 'all') {
      setStatusFilter('')
    } else {
      setStatusFilter(key)
    }
  }

  // Group tickets by status for Kanban view
  const ticketsByStatus = useMemo(() => {
    if (!Array.isArray(currentTickets)) {
      return { open: [], pending: [], resolved: [], closed: [] }
    }
    
    const filtered = currentTickets.filter(ticket => {
      if (activeTab !== 'all' && ticket.status !== activeTab) return false
      return true
    })

    return {
      open: filtered.filter(t => t.status === 'open'),
      pending: filtered.filter(t => t.status === 'pending'),
      resolved: filtered.filter(t => t.status === 'resolved'),
      closed: filtered.filter(t => t.status === 'closed')
    }
  }, [currentTickets, activeTab])

  // Reset localTickets khi tickets từ API thay đổi
  useEffect(() => {
    if (Array.isArray(tickets)) {
      setLocalTickets(tickets)
    }
  }, [tickets])

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 8,
      },
    }),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  )

  const tabItems = [
    {
      key: 'all',
      label: (
        <span>
          <BarChartOutlined />
          Tất cả
          <Badge count={stats?.totalTickets || 0} style={{ marginLeft: 8 }} />
        </span>
      ),
    },
    {
      key: 'open',
      label: (
        <span>
          <ExclamationCircleOutlined />
          Đang mở
          <Badge count={stats?.openTickets || 0} style={{ marginLeft: 8 }} />
        </span>
      ),
    },
    {
      key: 'pending',
      label: (
        <span>
          <ClockCircleOutlined />
          Đang chờ
          <Badge count={stats?.pendingTickets || 0} style={{ marginLeft: 8 }} />
        </span>
      ),
    },
    {
      key: 'resolved',
      label: (
        <span>
          <CheckCircleOutlined />
          Đã giải quyết
          <Badge count={stats?.resolvedTickets || 0} style={{ marginLeft: 8 }} />
        </span>
      ),
    },
  ]

  const filterItems = [
    {
      key: 'status',
      label: 'Trạng thái',
      children: (
        <Select
          placeholder="Chọn trạng thái"
          allowClear
          value={statusFilter}
          onChange={setStatusFilter}
          style={{ width: '100%' }}
        >
          <Option value="open">Đang mở</Option>
          <Option value="pending">Đang chờ</Option>
          <Option value="resolved">Đã giải quyết</Option>
          <Option value="closed">Đã đóng</Option>
        </Select>
      )
    },
    {
      key: 'priority',
      label: 'Độ ưu tiên',
      children: (
        <Select
          placeholder="Chọn độ ưu tiên"
          allowClear
          value={priorityFilter}
          onChange={setPriorityFilter}
          style={{ width: '100%' }}
        >
          <Option value="low">Thấp</Option>
          <Option value="medium">Trung bình</Option>
          <Option value="high">Cao</Option>
          <Option value="urgent">Khẩn cấp</Option>
        </Select>
      )
    },
    {
      key: 'assigned',
      label: 'Người được giao',
      children: (
        <Select
          placeholder="Chọn người được giao"
          allowClear
          value={assignedFilter}
          onChange={setAssignedFilter}
          style={{ width: '100%' }}
        >
          <Option value="agent1">Agent 1</Option>
          <Option value="agent2">Agent 2</Option>
          <Option value="agent3">Agent 3</Option>
        </Select>
      )
    },
    {
      key: 'date',
      label: 'Khoảng thời gian',
      children: (
        <RangePicker style={{ width: '100%' }} />
      )
    }
  ]

  const activeTicket = activeId ? currentTickets.find(t => String(t.id) === String(activeId)) : null

  return (
    <div className="tickets-page">
      <div className="page-header">
        <div className="header-left">
          <Title level={2}>Tickets</Title>
          <Text type="secondary">Quản lý và theo dõi tickets</Text>
        </div>
        <Space>
          <Button icon={<ReloadOutlined />} onClick={() => refetch()}>
            Làm mới
          </Button>
          <Button icon={<ExportOutlined />}>
            Xuất
          </Button>
          <Button icon={<ImportOutlined />}>
            Nhập
          </Button>
          <Button type="primary" icon={<PlusOutlined />} onClick={handleCreateNew}>
            Tạo mới
          </Button>
        </Space>
      </div>

      {/* Statistics Cards */}
      <Row gutter={[16, 16]} className="stats-row">
        <Col xs={24} sm={12} lg={6}>
          <Card className="stat-card">
            <Statistic
              title="Tổng tickets"
              value={stats?.totalTickets || 0}
              prefix={<BarChartOutlined />}
              valueStyle={{ color: '#1890ff' }}
            />
            <Progress 
              percent={100} 
              showInfo={false} 
              strokeColor="#1890ff"
              size="small"
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <Card className="stat-card">
            <Statistic
              title="Đang mở"
              value={stats?.openTickets || 0}
              prefix={<ExclamationCircleOutlined />}
              valueStyle={{ color: '#faad14' }}
            />
            <Progress 
              percent={((stats?.openTickets || 0) / (stats?.totalTickets || 1)) * 100} 
              showInfo={false} 
              strokeColor="#faad14"
              size="small"
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <Card className="stat-card">
            <Statistic
              title="Đang chờ"
              value={stats?.pendingTickets || 0}
              prefix={<ClockCircleOutlined />}
              valueStyle={{ color: '#722ed1' }}
            />
            <Progress 
              percent={((stats?.pendingTickets || 0) / (stats?.totalTickets || 1)) * 100} 
              showInfo={false} 
              strokeColor="#722ed1"
              size="small"
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <Card className="stat-card">
            <Statistic
              title="Đã giải quyết"
              value={stats?.resolvedTickets || 0}
              prefix={<CheckCircleOutlined />}
              valueStyle={{ color: '#52c41a' }}
            />
            <Progress 
              percent={((stats?.resolvedTickets || 0) / (stats?.totalTickets || 1)) * 100} 
              showInfo={false} 
              strokeColor="#52c41a"
              size="small"
            />
          </Card>
        </Col>
      </Row>

      {/* Search and Filter Bar */}
      <Card className="search-filter-card">
        <Row gutter={[16, 16]} align="middle">
          <Col xs={24} sm={12} md={8}>
            <Search
              placeholder="Tìm kiếm tickets..."
              allowClear
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
              onSearch={setSearchText}
              size="large"
            />
          </Col>
          <Col xs={24} sm={12} md={4}>
            <Button 
              icon={<FilterOutlined />} 
              onClick={() => setIsFilterDrawerVisible(true)}
              size="large"
              block
            >
              Bộ lọc
            </Button>
          </Col>
          <Col xs={24} sm={12} md={4}>
            <Select
              value={viewMode}
              onChange={setViewMode}
              size="large"
              style={{ width: '100%' }}
            >
              <Option value="kanban">
                <AppstoreOutlined /> Kanban
              </Option>
              <Option value="table">
                <TableOutlined /> Bảng
              </Option>
            </Select>
          </Col>
          <Col xs={24} sm={12} md={8}>
            <Tabs 
              activeKey={activeTab} 
              onChange={handleTabChange} 
              items={tabItems}
              size="small"
            />
          </Col>
        </Row>
      </Card>

      {/* Main Content */}
      <Card className="main-content-card">
        {isLoading ? (
          <div className="loading-container">
            <Spin size="large" />
          </div>
        ) : viewMode === 'kanban' ? (
          <DndContext
            sensors={sensors}
            collisionDetection={closestCenter}
            onDragStart={handleDragStart}
            onDragEnd={handleDragEnd}
          >
            <div className="kanban-board">
              <SortableContext items={columnOrder} strategy={horizontalListSortingStrategy}>
                <Row gutter={[16, 16]}>
                  {orderedColumns.map(column => (
                    <Col xs={24} lg={6} key={column.id}>
                      <KanbanColumn
                        column={column}
                        tickets={ticketsByStatus[column.status]}
                        onView={handleView}
                        onEdit={handleEdit}
                        onDelete={handleDelete}
                      />
                    </Col>
                  ))}
                </Row>
              </SortableContext>
            </div>
            
            <DragOverlay>
              {activeTicket ? (
                <TicketCard
                  ticket={activeTicket}
                  onView={handleView}
                  onEdit={handleEdit}
                  onDelete={handleDelete}
                  isOverlay={true}
                />
              ) : null}
            </DragOverlay>
          </DndContext>
        ) : (
          <div className="table-view">
            <Empty description="Chế độ bảng đang được phát triển" />
          </div>
        )}
      </Card>

      {/* Filter Drawer */}
      <Drawer
        title="Bộ lọc nâng cao"
        placement="right"
        onClose={() => setIsFilterDrawerVisible(false)}
        open={isFilterDrawerVisible}
        width={400}
      >
        <List
          dataSource={filterItems}
          renderItem={(item) => (
            <List.Item>
              <List.Item.Meta
                title={item.label}
                description={item.children}
              />
            </List.Item>
          )}
        />
        <Divider />
        <Space style={{ width: '100%' }} direction="vertical">
          <Button type="primary" block>
            Áp dụng bộ lọc
          </Button>
          <Button block onClick={() => {
            setStatusFilter('')
            setPriorityFilter('')
            setAssignedFilter('')
            setDateRange([])
          }}>
            Xóa tất cả
          </Button>
        </Space>
      </Drawer>
    </div>
  )
}

export default Tickets
