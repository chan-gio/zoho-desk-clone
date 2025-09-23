import React, { useState, useCallback, Fragment } from 'react';
import {
  DndContext,
  DragOverlay,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  useDroppable,
} from '@dnd-kit/core';
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
  horizontalListSortingStrategy,
} from '@dnd-kit/sortable';
import {
  useSortable,
} from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { PlusOutlined, MoreOutlined, UserOutlined, ClockCircleOutlined } from '@ant-design/icons';
import { Button, Card, Dropdown, Menu, Tag, Avatar, Tooltip } from 'antd';
import './Tickets.scss';

// Mock data with order structure
const initialColumns = [
  {
    id: 'todo',
    title: 'To Do',
    color: '#8B5CF6',
    order: 1,
    tickets: [
      {
        id: '1',
        title: 'Fix login issue',
        description: 'Users cannot login with Google account',
        priority: 'high',
        assignee: 'John Doe',
        dueDate: '2024-01-15',
        tags: ['bug', 'auth'],
        columnId: 'todo',
        order: 1
      },
      {
        id: '2',
        title: 'Update documentation',
        description: 'Update API documentation for new endpoints',
        priority: 'medium',
        assignee: 'Jane Smith',
        dueDate: '2024-01-20',
        tags: ['documentation'],
        columnId: 'todo',
        order: 2
      }
    ]
  },
  {
    id: 'in-progress',
    title: 'In Progress',
    color: '#3B82F6',
    order: 2,
    tickets: [
      {
        id: '3',
        title: 'Implement dark mode',
        description: 'Add dark mode toggle to the application',
        priority: 'high',
        assignee: 'Mike Johnson',
        dueDate: '2024-01-18',
        tags: ['feature', 'ui'],
        columnId: 'in-progress',
        order: 1
      }
    ]
  },
  {
    id: 'review',
    title: 'Review',
    color: '#F59E0B',
    order: 3,
    tickets: [
      {
        id: '4',
        title: 'Code review for payment module',
        description: 'Review the new payment integration code',
        priority: 'medium',
        assignee: 'Sarah Wilson',
        dueDate: '2024-01-22',
        tags: ['review', 'payment'],
        columnId: 'review',
        order: 1
      }
    ]
  },
  {
    id: 'done',
    title: 'Done',
    color: '#10B981',
    order: 4,
    tickets: [
      {
        id: '5',
        title: 'Setup CI/CD pipeline',
        description: 'Configure automated deployment pipeline',
        priority: 'high',
        assignee: 'Alex Brown',
        dueDate: '2024-01-10',
        tags: ['devops', 'ci-cd'],
        columnId: 'done',
        order: 1
      }
    ]
  }
];

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

// Utility functions for managing order
const updateColumnOrder = (columns) => {
  return columns.map((column, index) => ({
    ...column,
    order: index + 1
  }));
};

const updateTicketOrder = (tickets, columnId) => {
  return tickets.map((ticket, index) => ({
    ...ticket,
    columnId,
    order: index + 1
  }));
};

const getNextTicketOrder = (column) => {
  return column.tickets.length + 1;
};

// Debug function to get all tickets with order info
const getAllTicketsWithOrder = (columns) => {
  return columns.flatMap(column => 
    column.tickets.map(ticket => ({
      id: ticket.id,
      title: ticket.title,
      columnId: ticket.columnId,
      order: ticket.order,
      columnTitle: column.title
    }))
  );
};

// Function to sort tickets by order
const sortTicketsByOrder = (tickets) => {
  return [...tickets].sort((a, b) => a.order - b.order);
};

// Sortable Column Component
const SortableColumn = ({ column, tickets, onAddTicket, isDragOver, activeTicketId, dragOverTicket, activeColumnId, dragOverColumnPosition }) => {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ 
    id: column.id,
    data: {
      type: 'column',
      column: column
    }
  });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.3 : 1,
  };

  const sortedTickets = sortTicketsByOrder(tickets);

  // Function to render ticket placeholder
  const renderTicketPlaceholder = () => {
    if (!activeTicketId) return null;
    
    return (
      <div className="ticket-placeholder" style={{ 
        height: '100px', 
        margin: '8px 0',
        backgroundColor: '#f0f0f0',
        border: '2px dashed #d9d9d9',
        borderRadius: '8px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        color: '#999',
        fontSize: '14px'
      }}>
        Drop here
      </div>
    );
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...attributes}
      className={`column ${isDragOver ? 'drag-over' : ''}`}
      // Không đặt listeners ở đây để tránh conflict với ticket drag
    >
      <div 
        className="column-header" 
        style={{ 
          borderTopColor: column.color,
          cursor: 'grab',
          userSelect: 'none'
        }}
        {...listeners} // Chỉ cho phép kéo từ header
      >
        <h3>{column.title}</h3>
        <span className="ticket-count">{tickets.length}</span>
        <Button
          type="text"
          icon={<PlusOutlined />}
          onClick={(e) => {
            e.stopPropagation();
            onAddTicket(column.id);
          }}
          className="add-ticket-btn"
          style={{ pointerEvents: 'auto' }}
        />
      </div>
      <div className="column-content">
        <SortableContext 
          items={sortedTickets.map(ticket => ticket.id)} 
          strategy={verticalListSortingStrategy}
        >
          {/* Show placeholder at the beginning if dragging over empty column */}
          {activeTicketId && dragOverTicket === `${column.id}-end` && sortedTickets.length === 0 && (
            renderTicketPlaceholder()
          )}
          
          {sortedTickets.map((ticket, index) => (
            <Fragment key={ticket.id}>
              {/* Show placeholder before target ticket (not for same ticket being dragged) */}
              {activeTicketId && dragOverTicket === ticket.id && activeTicketId !== ticket.id && (
                renderTicketPlaceholder()
              )}
              
              {/* Only show ticket if it's not being dragged */}
              {ticket.id !== activeTicketId && (
                <SortableTicket ticket={ticket} />
              )}
            </Fragment>
          ))}
          
          {/* Show placeholder at the end if dragging over column header or last position */}
          {activeTicketId && dragOverTicket === `${column.id}-end` && sortedTickets.length > 0 && (
            renderTicketPlaceholder()
          )}
        </SortableContext>
      </div>
    </div>
  );
};

// Sortable Ticket Component
const SortableTicket = ({ ticket }) => {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ 
    id: ticket.id,
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

  const menu = (
    <Menu>
      <Menu.Item key="edit">Edit</Menu.Item>
      <Menu.Item key="duplicate">Duplicate</Menu.Item>
      <Menu.Item key="delete" danger>Delete</Menu.Item>
    </Menu>
  );

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      className="ticket"
    >
      <Card size="small" className="ticket-card">
        <div className="ticket-header">
          <h4 className="ticket-title">{ticket.title}</h4>
          <Dropdown overlay={menu} trigger={['click']}>
            <Button 
              type="text" 
              icon={<MoreOutlined />} 
              size="small" 
              style={{ pointerEvents: 'auto' }}
              onClick={(e) => e.stopPropagation()}
            />
          </Dropdown>
        </div>
        <p className="ticket-description">{ticket.description}</p>
        <div className="ticket-tags">
          {ticket.tags.map(tag => (
            <Tag key={tag} size="small">{tag}</Tag>
          ))}
        </div>
        <div className="ticket-footer">
          <div className="ticket-meta">
            <Tag color={priorityColors[ticket.priority]} size="small">
              {priorityLabels[ticket.priority]}
            </Tag>
            <div className="assignee">
              <Avatar size="small" icon={<UserOutlined />} />
              <span>{ticket.assignee}</span>
            </div>
          </div>
          <div className="ticket-due-date">
            <ClockCircleOutlined />
            <span>{ticket.dueDate}</span>
          </div>
        </div>
      </Card>
    </div>
  );
};

// Main Tickets Component
const Tickets = () => {
  const [columns, setColumns] = useState(initialColumns);
  const [activeId, setActiveId] = useState(null);
  const [activeType, setActiveType] = useState(null);
  const [dragOverColumn, setDragOverColumn] = useState(null);
  const [dragOverTicket, setDragOverTicket] = useState(null);
  const [dragOverColumnPosition, setDragOverColumnPosition] = useState(null);

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 8,
      },
    }),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const handleDragStart = useCallback((event) => {
    setActiveId(event.active.id);
    
    // Determine type based on data or by checking if it's in columns array
    const dragData = event.active.data.current;
    if (dragData?.type) {
      setActiveType(dragData.type);
    } else {
      // Fallback: check if it's a column
      const isColumn = columns.some(col => col.id === event.active.id);
      setActiveType(isColumn ? 'column' : 'ticket');
    }
    
    setDragOverColumn(null);
    setDragOverTicket(null);
    setDragOverColumnPosition(null);
  }, [columns]);

  const handleDragOver = useCallback((event) => {
    const { active, over } = event;
    if (!over) {
      setDragOverTicket(null);
      setDragOverColumn(null);
      setDragOverColumnPosition(null);
      return;
    }

    const activeId = active.id;
    const overId = over.id;

    if (activeType === 'column') {
      // Handle column drag over
      const overColumnIndex = columns.findIndex(col => col.id === overId);
      if (overColumnIndex !== -1) {
        setDragOverColumnPosition(overId);
      }
      return;
    }

    if (activeType === 'ticket') {
      // Find the active and over containers
      const activeContainer = findContainer(activeId);
      const overContainer = findContainer(overId);

      if (!activeContainer || !overContainer) {
        setDragOverTicket(null);
        setDragOverColumn(null);
        return;
      }

      // Check if we're dragging over a column header (not a ticket)
      const isOverColumn = columns.some(col => col.id === overId);
      
      if (isOverColumn) {
        // Dragging over column header - show placeholder at the end
        setDragOverColumn(overContainer);
        setDragOverTicket(`${overContainer}-end`);
      } else {
        // Dragging over a ticket - show placeholder before that ticket
        if (overContainer !== activeContainer) {
          setDragOverColumn(overContainer);
        } else {
          setDragOverColumn(null);
        }
        setDragOverTicket(overId);
      }
    }
  }, [activeType, columns]);

  const handleDragEnd = useCallback((event) => {
    const { active, over } = event;
    setActiveId(null);
    setActiveType(null);
    setDragOverColumn(null);
    setDragOverTicket(null);
    setDragOverColumnPosition(null);

    if (!over) return;

    const activeId = active.id;
    const overId = over.id;

    // Handle column reordering
    if (activeType === 'column') {
      setColumns(prev => {
        const oldIndex = prev.findIndex(col => col.id === activeId);
        const newIndex = prev.findIndex(col => col.id === overId);
        if (oldIndex !== -1 && newIndex !== -1 && oldIndex !== newIndex) {
          const reorderedColumns = arrayMove(prev, oldIndex, newIndex);
          return updateColumnOrder(reorderedColumns);
        }
        return prev;
      });
      return;
    }

    // Handle ticket reordering
    if (activeType === 'ticket') {
      const activeContainer = findContainer(activeId);
      const overContainer = findContainer(overId);

      if (!activeContainer || !overContainer) return;

      setColumns(prev => {
        const newColumns = prev.map(col => ({ ...col, tickets: [...col.tickets] }));
        const activeColumn = newColumns.find(col => col.id === activeContainer);
        const overColumn = newColumns.find(col => col.id === overContainer);

        if (!activeColumn || !overColumn) return prev;

        const activeIndex = activeColumn.tickets.findIndex(ticket => ticket.id === activeId);
        if (activeIndex === -1) return prev;

        // If moving within the same column
        if (activeContainer === overContainer) {
          const overIndex = activeColumn.tickets.findIndex(ticket => ticket.id === overId);
          
          console.log('Same column move:', { 
            activeId, 
            overId, 
            activeIndex, 
            overIndex,
            ticketsLength: activeColumn.tickets.length 
          });

          if (overIndex !== -1 && activeIndex !== overIndex) {
            // Reorder tickets using arrayMove for consistent behavior
            activeColumn.tickets = arrayMove(activeColumn.tickets, activeIndex, overIndex);
            // Update order after reordering
            activeColumn.tickets = updateTicketOrder(activeColumn.tickets, activeContainer);
            console.log('Reordered tickets:', activeColumn.tickets.map(t => ({ id: t.id, order: t.order, title: t.title })));
          } else if (overId === `${activeContainer}-end` || columns.some(col => col.id === overId)) {
            // Moving to the end of the column
            const [movedTicket] = activeColumn.tickets.splice(activeIndex, 1);
            activeColumn.tickets.push(movedTicket);
            activeColumn.tickets = updateTicketOrder(activeColumn.tickets, activeContainer);
            console.log('Moved to end:', activeColumn.tickets.map(t => ({ id: t.id, order: t.order, title: t.title })));
          }
        } else {
          // Moving between different columns
          const [movedTicket] = activeColumn.tickets.splice(activeIndex, 1);
          movedTicket.columnId = overContainer;
          
          // Find the correct position in the target column
          const overIndex = overColumn.tickets.findIndex(ticket => ticket.id === overId);
          if (overIndex !== -1) {
            // Insert at the position of the target ticket
            overColumn.tickets.splice(overIndex, 0, movedTicket);
          } else {
            // Add to the end if dropping on column header or empty space
            overColumn.tickets.push(movedTicket);
          }
          
          // Update order for both columns
          activeColumn.tickets = updateTicketOrder(activeColumn.tickets, activeContainer);
          overColumn.tickets = updateTicketOrder(overColumn.tickets, overContainer);
          
          console.log('Cross-column move:', { 
            from: activeContainer, 
            to: overContainer, 
            ticketId: activeId 
          });
        }

        return newColumns;
      });
    }
  }, [activeType]);

  const findContainer = (id) => {
    // Check if it's a column
    if (columns.some(col => col.id === id)) {
      return id;
    }
    // Find which column contains this ticket
    return columns.find(col => 
      col.tickets.some(ticket => ticket.id === id)
    )?.id;
  };

  const handleAddTicket = (columnId) => {
    const targetColumn = columns.find(col => col.id === columnId);
    if (!targetColumn) return;

    const newTicket = {
      id: `ticket-${Date.now()}`,
      title: 'New Ticket',
      description: 'Click to edit description',
      priority: 'medium',
      assignee: 'Unassigned',
      dueDate: '2024-01-30',
      tags: ['new'],
      columnId: columnId,
      order: getNextTicketOrder(targetColumn)
    };

    setColumns(prev => 
      prev.map(col => 
        col.id === columnId 
          ? { ...col, tickets: [...col.tickets, newTicket] }
          : col
      )
    );
  };

  const renderDragOverlay = () => {
    if (!activeId) return null;

    if (activeType === 'column') {
      const column = columns.find(col => col.id === activeId);
      if (!column) return null;
      
      const columnTickets = column.tickets;
      const sortedTickets = sortTicketsByOrder(columnTickets);
      
      return (
        <div className="column drag-overlay" style={{ 
          width: '280px',
          backgroundColor: 'white',
          border: '1px solid #d9d9d9',
          borderRadius: '8px',
          boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)',
        }}>
          <div className="column-header" style={{ borderTopColor: column.color }}>
            <h3>{column.title}</h3>
            <span className="ticket-count">{column.tickets.length}</span>
            <Button
              type="text"
              icon={<PlusOutlined />}
              className="add-ticket-btn"
            />
          </div>
          <div className="column-content" style={{ maxHeight: '400px', overflow: 'hidden' }}>
            {sortedTickets.slice(0, 3).map(ticket => (
              <div key={ticket.id} className="ticket" style={{ opacity: 0.8 }}>
                <Card size="small" className="ticket-card">
                  <div className="ticket-header">
                    <h4 className="ticket-title">{ticket.title}</h4>
                  </div>
                  <p className="ticket-description" style={{ 
                    fontSize: '12px',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                    whiteSpace: 'nowrap'
                  }}>
                    {ticket.description}
                  </p>
                </Card>
              </div>
            ))}
            {sortedTickets.length > 3 && (
              <div style={{ 
                textAlign: 'center', 
                padding: '8px', 
                color: '#999',
                fontSize: '12px'
              }}>
                +{sortedTickets.length - 3} more tickets
              </div>
            )}
          </div>
        </div>
      );
    }

    const ticket = columns
      .flatMap(col => col.tickets)
      .find(ticket => ticket.id === activeId);
    
    if (!ticket) return null;

    return (
      <div className="ticket drag-overlay">
        <Card size="small" className="ticket-card" style={{ 
          boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)',
        }}>
          <div className="ticket-header">
            <h4 className="ticket-title">{ticket.title}</h4>
          </div>
          <p className="ticket-description">{ticket.description}</p>
          <div className="ticket-tags">
            {ticket.tags.map(tag => (
              <Tag key={tag} size="small">{tag}</Tag>
            ))}
          </div>
        </Card>
      </div>
    );
  };

  // Debug: Log current order
  console.log('Current tickets order:', getAllTicketsWithOrder(columns));

  return (
    <div className="tickets-page">
      <div className="tickets-header">
        <h1>Tickets</h1>
        <div className="tickets-actions">
          <Button type="primary" icon={<PlusOutlined />}>
            Add Ticket
          </Button>
        </div>
      </div>

      <DndContext
        sensors={sensors}
        collisionDetection={closestCenter}
        onDragStart={handleDragStart}
        onDragOver={handleDragOver}
        onDragEnd={handleDragEnd}
      >
        <div className="tickets-board">
          <SortableContext items={columns.map(col => col.id)} strategy={horizontalListSortingStrategy}>
            {columns.map((column, index) => (
              <Fragment key={column.id}>
                {/* Show column placeholder before target column (not for same column being dragged) */}
                {activeType === 'column' && activeId && dragOverColumnPosition === column.id && activeId !== column.id && (
                  <div className="column-placeholder" style={{
                    width: '280px',
                    minHeight: '200px',
                    margin: '0 8px',
                    backgroundColor: '#f0f0f0',
                    border: '2px dashed #d9d9d9',
                    borderRadius: '12px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: '#999',
                    fontSize: '16px',
                    fontWeight: '500'
                  }}>
                    Drop column here
                  </div>
                )}
                
                {/* Only show column if it's not being dragged */}
                {column.id !== (activeType === 'column' ? activeId : null) && (
                  <SortableColumn
                    column={column}
                    tickets={column.tickets}
                    onAddTicket={handleAddTicket}
                    isDragOver={dragOverColumn === column.id}
                    activeTicketId={activeType === 'ticket' ? activeId : null}
                    dragOverTicket={dragOverTicket}
                    activeColumnId={activeType === 'column' ? activeId : null}
                    dragOverColumnPosition={dragOverColumnPosition}
                  />
                )}
              </Fragment>
            ))}
            
            {/* Show column placeholder at the end if dragging and no specific target */}
            {activeType === 'column' && activeId && !dragOverColumnPosition && (
              <div className="column-placeholder" style={{
                width: '280px',
                minHeight: '200px',
                margin: '0 8px',
                backgroundColor: '#f0f0f0',
                border: '2px dashed #d9d9d9',
                borderRadius: '12px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#999',
                fontSize: '16px',
                fontWeight: '500'
              }}>
                Drop column here
              </div>
            )}
          </SortableContext>
        </div>

        <DragOverlay>
          {renderDragOverlay()}
        </DragOverlay>
      </DndContext>
    </div>
  );
};

export default Tickets;