import React, { useState, useEffect } from 'react'
import { 
  Card, 
  Form, 
  Input, 
  Select, 
  DatePicker, 
  Button, 
  Row, 
  Col, 
  Typography, 
  Space, 
  Upload, 
  message,
  Divider,
  Tag,
  AutoComplete,
  InputNumber
} from 'antd'
import { 
  SaveOutlined, 
  SendOutlined, 
  PaperClipOutlined, 
  UserOutlined,
  TagOutlined,
  CalendarOutlined,
  ExclamationCircleOutlined,
  InfoCircleOutlined
} from '@ant-design/icons'
import { useParams, useNavigate } from 'react-router-dom'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { useTranslation } from 'react-i18next'
import { ticketService } from '../services/ticketService'
import './TicketForm.scss'

const { TextArea } = Input
const { Option } = Select
const { Title, Text } = Typography
const { Dragger } = Upload

const TicketForm = () => {
  const { t } = useTranslation()
  const { id } = useParams()
  const navigate = useNavigate()
  const [form] = Form.useForm()
  const [tags, setTags] = useState([])
  const [newTag, setNewTag] = useState('')
  const [fileList, setFileList] = useState([])
  const queryClient = useQueryClient()
  const isEdit = Boolean(id)

  const { data: ticket, isLoading } = useQuery({
    queryKey: ['ticket', id],
    queryFn: () => ticketService.getTicketById(id),
    enabled: isEdit,
  })

  const { data: customers } = useQuery({
    queryKey: ['customers'],
    queryFn: () => ticketService.getCustomers(),
  })

  const { data: agents } = useQuery({
    queryKey: ['agents'],
    queryFn: () => ticketService.getAgents(),
  })

  const createTicketMutation = useMutation({
    mutationFn: ticketService.createTicket,
    onSuccess: () => {
      queryClient.invalidateQueries(['tickets'])
      message.success('Tạo ticket thành công!')
      navigate('/tickets')
    },
    onError: () => {
      message.error('Tạo ticket thất bại!')
    }
  })

  const updateTicketMutation = useMutation({
    mutationFn: ticketService.updateTicket,
    onSuccess: () => {
      queryClient.invalidateQueries(['tickets'])
      queryClient.invalidateQueries(['ticket', id])
      message.success('Cập nhật ticket thành công!')
      navigate(`/tickets/${id}`)
    },
    onError: () => {
      message.error('Cập nhật ticket thất bại!')
    }
  })

  useEffect(() => {
    if (ticket) {
      form.setFieldsValue(ticket)
      setTags(ticket.tags || [])
    }
  }, [ticket, form])

  const handleSubmit = (values) => {
    const ticketData = {
      ...values,
      tags,
      attachments: fileList.map(file => ({
        name: file.name,
        size: file.size,
        type: file.type,
        url: file.url || file.originFileObj
      }))
    }

    if (isEdit) {
      updateTicketMutation.mutate({ id, ...ticketData })
    } else {
      createTicketMutation.mutate(ticketData)
    }
  }

  const handleAddTag = () => {
    if (newTag && !tags.includes(newTag)) {
      setTags([...tags, newTag])
      setNewTag('')
    }
  }

  const handleRemoveTag = (tagToRemove) => {
    setTags(tags.filter(tag => tag !== tagToRemove))
  }

  const handleTagKeyPress = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault()
      handleAddTag()
    }
  }

  const uploadProps = {
    name: 'file',
    multiple: true,
    fileList,
    onChange: (info) => {
      setFileList(info.fileList)
    },
    beforeUpload: (file) => {
      const isLt10M = file.size / 1024 / 1024 < 10
      if (!isLt10M) {
        message.error('File phải nhỏ hơn 10MB!')
        return false
      }
      return false // Prevent auto upload
    },
  }

  const customerOptions = customers?.map(customer => ({
    value: customer.id,
    label: `${customer.name} (${customer.email})`
  })) || []

  const agentOptions = agents?.map(agent => ({
    value: agent.id,
    label: agent.name
  })) || []

  if (isLoading) {
    return <div className="loading-container">Loading...</div>
  }

  return (
    <div className="ticket-form-page">
      <div className="form-header">
        <Title level={2}>
          {isEdit ? 'Chỉnh sửa Ticket' : 'Tạo Ticket Mới'}
        </Title>
        <Text type="secondary">
          {isEdit ? 'Cập nhật thông tin ticket' : 'Điền thông tin để tạo ticket mới'}
        </Text>
      </div>

      <Card className="form-card">
        <Form
          form={form}
          layout="vertical"
          onFinish={handleSubmit}
          size="large"
        >
          <Row gutter={[24, 16]}>
            <Col span={24}>
              <Form.Item
                name="subject"
                label="Tiêu đề"
                rules={[{ required: true, message: 'Vui lòng nhập tiêu đề!' }]}
              >
                <Input 
                  placeholder="Nhập tiêu đề ticket"
                  prefix={<ExclamationCircleOutlined />}
                />
              </Form.Item>
            </Col>

            <Col span={24}>
              <Form.Item
                name="description"
                label="Mô tả chi tiết"
                rules={[{ required: true, message: 'Vui lòng nhập mô tả!' }]}
              >
                <TextArea 
                  rows={6}
                  placeholder="Mô tả chi tiết về vấn đề hoặc yêu cầu..."
                  showCount
                  maxLength={2000}
                />
              </Form.Item>
            </Col>

            <Col xs={24} sm={12}>
              <Form.Item
                name="customerId"
                label="Khách hàng"
                rules={[{ required: true, message: 'Vui lòng chọn khách hàng!' }]}
              >
                <AutoComplete
                  options={customerOptions}
                  placeholder="Tìm kiếm khách hàng..."
                  filterOption={(inputValue, option) =>
                    option.label.toLowerCase().includes(inputValue.toLowerCase())
                  }
                />
              </Form.Item>
            </Col>

            <Col xs={24} sm={12}>
              <Form.Item
                name="assignedTo"
                label="Giao cho"
              >
                <Select
                  placeholder="Chọn agent"
                  allowClear
                  showSearch
                  optionFilterProp="children"
                >
                  {agentOptions.map(agent => (
                    <Option key={agent.value} value={agent.value}>
                      {agent.label}
                    </Option>
                  ))}
                </Select>
              </Form.Item>
            </Col>

            <Col xs={24} sm={8}>
              <Form.Item
                name="priority"
                label="Độ ưu tiên"
                rules={[{ required: true, message: 'Vui lòng chọn độ ưu tiên!' }]}
                initialValue="medium"
              >
                <Select placeholder="Chọn độ ưu tiên">
                  <Option value="low">
                    <Tag color="green">Thấp</Tag>
                  </Option>
                  <Option value="medium">
                    <Tag color="orange">Trung bình</Tag>
                  </Option>
                  <Option value="high">
                    <Tag color="red">Cao</Tag>
                  </Option>
                  <Option value="urgent">
                    <Tag color="purple">Khẩn cấp</Tag>
                  </Option>
                </Select>
              </Form.Item>
            </Col>

            <Col xs={24} sm={8}>
              <Form.Item
                name="status"
                label="Trạng thái"
                rules={[{ required: true, message: 'Vui lòng chọn trạng thái!' }]}
                initialValue="open"
              >
                <Select placeholder="Chọn trạng thái">
                  <Option value="open">
                    <Tag color="blue">Mở</Tag>
                  </Option>
                  <Option value="pending">
                    <Tag color="orange">Đang chờ</Tag>
                  </Option>
                  <Option value="resolved">
                    <Tag color="green">Đã giải quyết</Tag>
                  </Option>
                  <Option value="closed">
                    <Tag color="gray">Đã đóng</Tag>
                  </Option>
                </Select>
              </Form.Item>
            </Col>

            <Col xs={24} sm={8}>
              <Form.Item
                name="category"
                label="Danh mục"
              >
                <Select placeholder="Chọn danh mục">
                  <Option value="Technical">Technical</Option>
                  <Option value="UI/UX">UI/UX</Option>
                  <Option value="Feature Request">Feature Request</Option>
                  <Option value="Payment">Payment</Option>
                  <Option value="Documentation">Documentation</Option>
                  <Option value="Integration">Integration</Option>
                  <Option value="Mobile">Mobile</Option>
                </Select>
              </Form.Item>
            </Col>

            <Col xs={24} sm={12}>
              <Form.Item
                name="subcategory"
                label="Danh mục con"
              >
                <Select placeholder="Chọn danh mục con">
                  <Option value="Authentication">Authentication</Option>
                  <Option value="Layout">Layout</Option>
                  <Option value="Export">Export</Option>
                  <Option value="Credit Card">Credit Card</Option>
                  <Option value="User Guide">User Guide</Option>
                  <Option value="API">API</Option>
                  <Option value="CRM">CRM</Option>
                  <Option value="File Upload">File Upload</Option>
                  <Option value="Theme">Theme</Option>
                  <Option value="Push Notification">Push Notification</Option>
                </Select>
              </Form.Item>
            </Col>

            <Col xs={24} sm={12}>
              <Form.Item
                name="dueDate"
                label="Hạn xử lý"
              >
                <DatePicker 
                  style={{ width: '100%' }}
                  placeholder="Chọn ngày hạn"
                  showTime
                />
              </Form.Item>
            </Col>

            <Col span={24}>
              <Form.Item label="Tags">
                <div className="tags-section">
                  <div className="tags-container">
                    {tags.map(tag => (
                      <Tag
                        key={tag}
                        closable
                        onClose={() => handleRemoveTag(tag)}
                        color="blue"
                      >
                        {tag}
                      </Tag>
                    ))}
                  </div>
                  <div className="add-tag">
                    <Input
                      value={newTag}
                      onChange={(e) => setNewTag(e.target.value)}
                      onKeyPress={handleTagKeyPress}
                      placeholder="Thêm tag..."
                      prefix={<TagOutlined />}
                      suffix={
                        <Button 
                          type="link" 
                          size="small"
                          onClick={handleAddTag}
                        >
                          Thêm
                        </Button>
                      }
                    />
                  </div>
                </div>
              </Form.Item>
            </Col>

            <Col span={24}>
              <Form.Item label="Tệp đính kèm">
                <Dragger {...uploadProps}>
                  <p className="ant-upload-drag-icon">
                    <PaperClipOutlined />
                  </p>
                  <p className="ant-upload-text">
                    Kéo thả file vào đây hoặc click để chọn
                  </p>
                  <p className="ant-upload-hint">
                    Hỗ trợ upload file đơn lẻ hoặc nhiều file. Kích thước tối đa 10MB mỗi file.
                  </p>
                </Dragger>
              </Form.Item>
            </Col>
          </Row>

          <Divider />

          <div className="form-actions">
            <Space>
              <Button onClick={() => navigate('/tickets')}>
                Hủy
              </Button>
              <Button 
                type="primary" 
                htmlType="submit"
                icon={<SaveOutlined />}
                loading={createTicketMutation.isPending || updateTicketMutation.isPending}
              >
                {isEdit ? 'Cập nhật' : 'Tạo Ticket'}
              </Button>
              {!isEdit && (
                <Button 
                  type="primary" 
                  htmlType="submit"
                  icon={<SendOutlined />}
                  loading={createTicketMutation.isPending}
                >
                  Tạo và Gửi
                </Button>
              )}
            </Space>
          </div>
        </Form>
      </Card>
    </div>
  )
}

export default TicketForm
