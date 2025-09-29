import React from 'react';
import { Card, Button, Tag, Avatar, Dropdown } from 'antd';
import { MoreOutlined, UserOutlined, ClockCircleOutlined, EditOutlined, CopyOutlined, DeleteOutlined } from '@ant-design/icons';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';

const priorityColors = {
  low: '#52C41A',
  medium: '#FAAD14',
  high: '#FF4D4F'
};

const priorityLabels = {
  low: 'Low',
  medium: 'Medium',
  high: 'High'
};

const SortableTicket = ({ ticket, onOpenModal, onMenuClick, dragStartedGlobally }) => {
  const clickStartTimeRef = React.useRef(null);
  const clickStartPosRef = React.useRef(null);
  
  console.log('🎫 TicketCard - ticket:', ticket.id, ticket.title, 'columnId:', ticket.columnId);
  
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ 
    id: String(ticket.id), // Ensure ID is string
    data: {
      type: 'ticket',
      ticket: ticket
    }
  });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
  };

  // Handle mouse/touch events để track click intent
  const handleMouseDown = (e) => {
    if (e.target.closest('.ant-dropdown-trigger')) {
      return;
    }
    
    clickStartTimeRef.current = Date.now();
    clickStartPosRef.current = { x: e.clientX, y: e.clientY };
  };

  const handleTouchStart = (e) => {
    if (e.target.closest('.ant-dropdown-trigger')) {
      return;
    }
    
    const touch = e.touches[0];
    clickStartTimeRef.current = Date.now();
    clickStartPosRef.current = { x: touch.clientX, y: touch.clientY };
  };

  const handleClick = (e) => {
    // Không xử lý nếu click vào dropdown
    if (e.target.closest('.ant-dropdown-trigger')) {
      return;
    }

    // Không xử lý nếu có drag global hoặc đang drag ticket này
    if (dragStartedGlobally || isDragging) {
      return;
    }

    // Kiểm tra thời gian và khoảng cách di chuyển
    const clickTime = Date.now() - (clickStartTimeRef.current || 0);
    const currentPos = { x: e.clientX, y: e.clientY };
    const startPos = clickStartPosRef.current || currentPos;
    
    const distance = Math.sqrt(
      Math.pow(currentPos.x - startPos.x, 2) + 
      Math.pow(currentPos.y - startPos.y, 2)
    );

    // Chỉ mở modal nếu click nhanh và không di chuyển xa
    if (clickTime < 300 && distance < 5) {
      onOpenModal(ticket);
    }
  };

  const menu = [
    {
      key: 'edit',
      icon: <EditOutlined />,
      label: 'Edit',
      onClick: () => onMenuClick('edit', ticket)
    },
    {
      key: 'duplicate',
      icon: <CopyOutlined />,
      label: 'Duplicate',
      onClick: () => onMenuClick('duplicate', ticket)
    },
    {
      key: 'delete',
      icon: <DeleteOutlined />,
      label: 'Delete',
      danger: true,
      onClick: () => onMenuClick('delete', ticket)
    }
  ];

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...attributes}
      className="ticket"
    >
      <Card 
        size="small" 
        className={`ticket-card ${isDragging ? 'dragging' : ''}`}
        onClick={handleClick}
        onMouseDown={handleMouseDown}
        onTouchStart={handleTouchStart}
        {...listeners}
      >
        <div className="ticket-header">
          <h4 className="ticket-title">
            {ticket.title}
          </h4>
          <Dropdown 
            menu={{ items: menu }}
            trigger={['click']}
            placement="bottomRight"
          >
            <Button 
              type="text" 
              icon={<MoreOutlined />} 
              size="small"
              className="ticket-menu-btn"
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
              }}
            />
          </Dropdown>
        </div>
        
        <div>
          <p className="ticket-description">
            {ticket.description}
          </p>
          <div className="ticket-tags">
            {ticket.tags && ticket.tags.length > 0 ? ticket.tags.map(tag => (
              <Tag key={tag} size="small">{tag}</Tag>
            )) : null}
          </div>
          <div className="ticket-footer">
            <div className="ticket-meta">
              <Tag color={priorityColors[ticket.priority]} size="small">
                {priorityLabels[ticket.priority]}
              </Tag>
              <div className="assignee">
                <Avatar size="small" icon={<UserOutlined />} />
                <span>{ticket.assignee?.username || ticket.assignee || 'Unassigned'}</span>
              </div>
            </div>
            <div className="ticket-due-date">
              <ClockCircleOutlined />
              <span>{ticket.dueDate || new Date(ticket.createdAt).toLocaleDateString()}</span>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default SortableTicket;
