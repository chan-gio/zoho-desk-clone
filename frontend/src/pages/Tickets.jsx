import React, { useState, useCallback, Fragment, useEffect } from 'react';
import {
  DndContext,
  DragOverlay,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  rectIntersection,
} from '@dnd-kit/core';
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  horizontalListSortingStrategy,
} from '@dnd-kit/sortable';
import { PlusOutlined } from '@ant-design/icons';
import { Button, message, Spin, Card, Tag } from 'antd';
import './Tickets.scss';

// Import components
import { 
  TicketColumn as SortableColumn,
  TicketModal as TicketDetailModal,
  updateColumnOrder,
} from '../components/tickets';

// Import hooks
import { 
  useColumns, 
  useColumnTickets, 
  useCreateTicket, 
  useUpdateTicket, 
  useDeleteTicket,
  useMoveTicketToColumn,
  useReorderTicketsInColumn
} from '../hooks';

// Component to load tickets for each column with reload capability
const ColumnWithTickets = ({ 
  column, 
  onAddTicket, 
  isDragOver, 
  activeTicketId, 
  dragOverTicket, 
  activeColumnId, 
  dragOverColumnPosition, 
  onOpenTicketModal, 
  onTicketMenuClick, 
  dragStartedGlobally 
}) => {
  const { data: ticketsData, isLoading: ticketsLoading, refetch } = useColumnTickets(column.id);
  
  // Xử lý cấu trúc API tickets
  let tickets = [];
  if (ticketsData?.data) {
    // API trả về data là array trực tiếp
    tickets = Array.isArray(ticketsData.data) ? ticketsData.data : [];
  } else if (ticketsData?.tickets) {
    // Fallback nếu có field tickets
    tickets = ticketsData.tickets;
  }

  // Custom handlers that reload this column after operations
  const handleAddTicket = async (columnId, title) => {
    await onAddTicket(columnId, title);
    // Reload tickets for this column after creating
    refetch();
  };

  const handleTicketMenuClick = async (action, ticket) => {
    await onTicketMenuClick(action, ticket);
    // Reload tickets for this column after any operation
    refetch();
  };

  const handleSaveTicket = async (updatedTicket) => {
    // This will be handled by the parent component
    // We just need to reload after the operation
    refetch();
  };
  
  return (
    <div className="column-wrapper">
      <SortableColumn
        column={column}
        tickets={tickets}
        onAddTicket={handleAddTicket}
        isDragOver={isDragOver}
        activeTicketId={activeTicketId}
        dragOverTicket={dragOverTicket}
        activeColumnId={activeColumnId}
        dragOverColumnPosition={dragOverColumnPosition}
        onOpenTicketModal={onOpenTicketModal}
        onTicketMenuClick={handleTicketMenuClick}
        dragStartedGlobally={dragStartedGlobally}
        isLoading={ticketsLoading}
      />
    </div>
  );
};

// Main Tickets Component
const Tickets = () => {
  // API hooks
  const { data: columnsData, isLoading: columnsLoading, error: columnsError } = useColumns();
  const createTicketMutation = useCreateTicket();
  const updateTicketMutation = useUpdateTicket();
  const deleteTicketMutation = useDeleteTicket();

  // Local state
  const [columns, setColumns] = useState([]);
  const [activeId, setActiveId] = useState(null);
  const [activeType, setActiveType] = useState(null);
  const [dragOverColumn, setDragOverColumn] = useState(null);
  const [dragOverTicket, setDragOverTicket] = useState(null);
  const [dragOverColumnPosition, setDragOverColumnPosition] = useState(null);
  const [draggingTicket, setDraggingTicket] = useState(null);
  const [dragOverPosition, setDragOverPosition] = useState(null); // 'before' | 'after' | null
  
  // Modal states
  const [selectedTicket, setSelectedTicket] = useState(null);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [dragStartedGlobally, setDragStartedGlobally] = useState(false);

  // Load columns data
  useEffect(() => {
    if (columnsData?.data) {
      // API trả về data là array trực tiếp
      const columnsWithTickets = columnsData.data.map(column => ({
        ...column,
        title: column.name, // Map name to title for compatibility
        tickets: [] // Will be loaded separately for each column
      }));
      setColumns(columnsWithTickets);
    }
  }, [columnsData]);

  // Cấu hình sensors - loại bỏ delay để drag ngay lập tức
  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 8, // Chỉ cần di chuyển 8px là kích hoạt drag
      },
    }),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const handleDragStart = useCallback((event) => {
    console.log('🎯 Drag Start:', event.active.id, event.active.data.current);
    setActiveId(event.active.id);
    setDragStartedGlobally(true);
    
    // Determine type based on data or by checking if it's in columns array
    const dragData = event.active.data.current;
    if (dragData?.type) {
      console.log('🎯 Setting activeType from data:', dragData.type);
      setActiveType(dragData.type);
      
      // Store the dragging ticket data
      if (dragData.type === 'ticket' && dragData.ticket) {
        setDraggingTicket(dragData.ticket);
      }
    } else {
      // Fallback: check if it's a column
      const isColumn = columns.some(col => col.id === event.active.id);
      const type = isColumn ? 'column' : 'ticket';
      console.log('🎯 Setting activeType from fallback:', type);
      setActiveType(type);
    }
    
    setDragOverColumn(null);
    setDragOverTicket(null);
    setDragOverColumnPosition(null);
    setDragOverPosition(null);
  }, [columns]);

  const handleDragOver = useCallback((event) => {
    const { active, over } = event;
    if (!over) {
      setDragOverTicket(null);
      setDragOverColumn(null);
      setDragOverColumnPosition(null);
      setDragOverPosition(null);
      return;
    }

    const activeId = active.id;
    const overId = over.id;
    const overRect = over.rect;
    const activeRect = active.rect;

    console.log('🎯 Drag Over:', activeId, 'over:', overId, 'activeType:', activeType);

    if (activeType === 'column') {
      const overColumnIndex = columns.findIndex(col => col.id === overId);
      if (overColumnIndex !== -1) {
        setDragOverColumnPosition(overId);
      }
      return;
    }

    if (activeType === 'ticket') {
      // Reset states
      setDragOverTicket(null);
      setDragOverColumn(null);
      setDragOverPosition(null);
      
      // Check if we're over a column directly
      const isOverColumn = columns.some(col => col.id === overId);
      
      if (isOverColumn) {
        console.log('🎯 Over column:', overId);
        setDragOverColumn(overId);
        setDragOverTicket(`${overId}-drop-zone`);
        return;
      }
      
      // Check if we're over a ticket
      if (overId.includes('-drop-zone')) {
        // This is a drop zone placeholder
        setDragOverTicket(overId);
        const columnId = overId.replace('-drop-zone', '');
        setDragOverColumn(columnId);
        return;
      }
      
      // We're over another ticket
      if (typeof overId === 'string' && !overId.includes('-drop-zone')) {
        console.log('🎯 Over ticket:', overId);
        
        // Calculate if we should drop before or after this ticket
        if (overRect && activeRect) {
          const overCenterY = overRect.top + overRect.height / 2;
          const activeCenterY = activeRect.top + activeRect.height / 2;
          
          if (activeCenterY < overCenterY) {
            // Drop before this ticket
            setDragOverTicket(overId);
            setDragOverPosition('before');
          } else {
            // Drop after this ticket
            setDragOverTicket(overId);
            setDragOverPosition('after');
          }
        } else {
          setDragOverTicket(overId);
          setDragOverPosition('after');
        }
      }
    }
  }, [activeType, columns]);

  const moveTicketToColumnMutation = useMoveTicketToColumn();
  const reorderTicketsMutation = useReorderTicketsInColumn();

  const handleDragEnd = useCallback(async (event) => {
    const { active, over } = event;
    console.log('🎯 Drag End:', active.id, 'over:', over?.id);
    
    setActiveId(null);
    setActiveType(null);
    setDragOverColumn(null);
    setDragOverTicket(null);
    setDragOverColumnPosition(null);
    setDraggingTicket(null);
    setDragStartedGlobally(false);
    setDragOverPosition(null);

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
      try {
        // Get the active ticket's current column from the drag data
        const activeTicketData = active.data.current;
        const activeColumnId = activeTicketData?.ticket?.columnId;
        
        console.log('🎯 Active ticket data:', activeTicketData);
        console.log('🎯 Active column ID:', activeColumnId);
        
        if (!activeColumnId) {
          console.error('Could not find active ticket column');
          return;
        }

        let targetColumnId = activeColumnId;
        let afterId = null;

        // Determine target based on what we're dropping on
        if (overId.includes('-drop-zone')) {
          // Dropping on a drop zone (empty column area)
          targetColumnId = overId.replace('-drop-zone', '');
          afterId = null; // Add to end of column
          console.log('🎯 Dropping on drop zone:', targetColumnId);
        } else if (columns.some(col => col.id === overId)) {
          // Dropping directly on a column
          targetColumnId = overId;
          afterId = null; // Add to end of column
          console.log('🎯 Dropping on column:', targetColumnId);
        } else {
          // Dropping on another ticket
          const targetTicketId = overId;
          
          // Determine target column by finding which column contains this ticket
          const targetColumn = columns.find(col => 
            col.tickets && col.tickets.some(ticket => String(ticket.id) === String(targetTicketId))
          );
          
          if (targetColumn) {
            targetColumnId = targetColumn.id;
          } else {
            // Fallback: assume same column
            targetColumnId = activeColumnId;
          }
          
          // Set afterId based on drag position
          if (dragOverPosition === 'before') {
            // For "before" position, we need to find the ticket that comes before the target
            // Since we don't have full ticket list, we'll let backend handle this
            afterId = null; // Backend will position it before the target ticket
          } else {
            // Drop after this ticket
            afterId = targetTicketId;
          }
          
          console.log('🎯 Dropping on ticket:', targetTicketId, 'position:', dragOverPosition, 'afterId:', afterId, 'targetColumn:', targetColumnId);
        }

        if (activeColumnId === targetColumnId) {
          // Same column - reorder tickets within column
          console.log('🎯 Reordering within same column, afterId:', afterId);
          
          await reorderTicketsMutation.mutateAsync({
            columnId: activeColumnId,
            ticketId: activeId,
            afterId: afterId
          });
        } else {
          // Different columns - move ticket to another column
          console.log('🎯 Moving to different column:', targetColumnId, 'afterId:', afterId);
          
          await moveTicketToColumnMutation.mutateAsync({
            ticketId: activeId,
            fromColumnId: activeColumnId,
            toColumnId: targetColumnId,
            afterId: afterId
          });
        }
      } catch (error) {
        console.error('Error handling drag end:', error);
        message.error('Failed to move ticket. Please try again.');
      }
    }
  }, [activeType, columns, moveTicketToColumnMutation, reorderTicketsMutation, dragOverPosition]);

  const handleAddTicket = async (columnId, title = 'New Ticket') => {
    try {
      const targetColumn = columns.find(col => col.id === columnId);
      if (!targetColumn) return;

      const ticketData = {
        title: title,
        description: 'Click to edit description',
        priority: 'medium',
        columnId: columnId,
        status: targetColumn.name || 'To Do',
        order: 1 // Default order
      };

      const result = await createTicketMutation.mutateAsync(ticketData);
      
      if (result?.data) {
        message.success('Ticket created successfully!');
        // Column will be reloaded by ColumnWithTickets component
      }
    } catch (error) {
      console.error('Error creating ticket:', error);
      message.error('Failed to create ticket. Please try again.');
    }
  };

  // Modal handlers
  const handleOpenTicketModal = (ticket) => {
    setSelectedTicket(ticket);
    setIsModalVisible(true);
  };

  const handleCloseModal = () => {
    setIsModalVisible(false);
    setSelectedTicket(null);
  };

  const handleSaveTicket = async (updatedTicket) => {
    try {
      const result = await updateTicketMutation.mutateAsync({
        id: updatedTicket.id,
        data: updatedTicket
      });
      
      if (result?.data) {
        message.success('Ticket updated successfully!');
        // The specific column will be reloaded by its ColumnWithTickets component
      }
    } catch (error) {
      console.error('Error updating ticket:', error);
      message.error('Failed to update ticket. Please try again.');
    }
  };

  const handleTicketMenuClick = async (action, ticket) => {
    switch (action) {
      case 'edit':
        handleOpenTicketModal(ticket);
        break;
      case 'duplicate':
        try {
          const ticketData = {
            title: `${ticket.title} (Copy)`,
            description: ticket.description || 'Click to edit description',
            priority: ticket.priority || 'medium',
            columnId: ticket.columnId,
            status: ticket.status || 'To Do',
            order: ticket.order || 1
          };
          
          const result = await createTicketMutation.mutateAsync(ticketData);
          
          if (result?.data) {
            message.success('Ticket duplicated successfully!');
            // Column will be reloaded by ColumnWithTickets component
          }
        } catch (error) {
          console.error('Error duplicating ticket:', error);
          message.error('Failed to duplicate ticket. Please try again.');
        }
        break;
      case 'delete':
        try {
          await deleteTicketMutation.mutateAsync(ticket.id);
          message.success('Ticket deleted successfully!');
          // Column will be reloaded by ColumnWithTickets component
        } catch (error) {
          console.error('Error deleting ticket:', error);
          message.error('Failed to delete ticket. Please try again.');
        }
        break;
      default:
        break;
    }
  };

  // Show loading state
  if (columnsLoading) {
    return (
      <div className="tickets-page">
        <div className="loading-container">
          <Spin size="large" />
        </div>
      </div>
    );
  }

  // Show error state
  if (columnsError) {
    return (
      <div className="tickets-page">
        <div className="error-container">
          <h2>Error loading tickets</h2>
          <p>{columnsError.message || 'Something went wrong. Please try again.'}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="tickets-page">
      <div className="tickets-header">
        <h1>Tickets</h1>
      </div>

      <DndContext
        sensors={sensors}
        collisionDetection={rectIntersection}
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
                  <div className="column-placeholder">
                    Drop column here
                  </div>
                )}
                
                {/* Only show column if it's not being dragged */}
                {column.id !== (activeType === 'column' ? activeId : null) && (
                  <ColumnWithTickets
                    column={column}
                    onAddTicket={handleAddTicket}
                    isDragOver={dragOverColumn === column.id}
                    activeTicketId={activeType === 'ticket' ? String(activeId) : null}
                    dragOverTicket={dragOverTicket}
                    activeColumnId={activeType === 'column' ? activeId : null}
                    dragOverColumnPosition={dragOverColumnPosition}
                    onOpenTicketModal={handleOpenTicketModal}
                    onTicketMenuClick={handleTicketMenuClick}
                    dragStartedGlobally={dragStartedGlobally}
                  />
                )}
              </Fragment>
            ))}
            
            {/* Show column placeholder at the end if dragging and no specific target */}
            {activeType === 'column' && activeId && !dragOverColumnPosition && (
              <div className="column-placeholder">
                Drop column here
              </div>
            )}
          </SortableContext>
        </div>

        <DragOverlay>
          {activeId && activeType === 'ticket' && draggingTicket ? (
            <div className="ticket drag-overlay">
              <Card size="small" className="ticket-card" style={{ 
                boxShadow: '0 8px 24px rgba(0, 0, 0, 0.15)',
                backgroundColor: 'white',
                border: '2px solid #1890ff',
                borderRadius: '8px',
                width: '260px',
                transform: 'rotate(5deg)',
                opacity: 0.9
              }}>
                <div className="ticket-header">
                  <h4 className="ticket-title" style={{
                    fontSize: '14px',
                    fontWeight: '500',
                    margin: '0 0 8px 0'
                  }}>
                    {draggingTicket.title}
                  </h4>
                </div>
                <p className="ticket-description" style={{
                  fontSize: '12px',
                  color: '#666',
                  margin: '0 0 8px 0'
                }}>
                  {draggingTicket.description}
                </p>
                {draggingTicket.tags && draggingTicket.tags.length > 0 && (
                  <div className="ticket-tags" style={{ marginBottom: '8px' }}>
                    {draggingTicket.tags.map(tag => (
                      <Tag key={tag} size="small">{tag}</Tag>
                    ))}
                  </div>
                )}
              </Card>
            </div>
          ) : activeId && activeType === 'column' ? (
            <div className="column drag-overlay" style={{ 
              width: '280px',
              backgroundColor: 'white',
              border: '1px solid #d9d9d9',
              borderRadius: '12px',
              boxShadow: '0 8px 24px rgba(0, 0, 0, 0.15)',
              transform: 'rotate(5deg)',
              opacity: 0.9
            }}>
              <div className="column-header" style={{ 
                backgroundColor: 'white',
                padding: '16px',
                borderRadius: '12px 12px 0 0',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center'
              }}>
                <h3 style={{ margin: 0, fontSize: '16px', fontWeight: '600' }}>Dragging Column</h3>
              </div>
            </div>
          ) : null}
        </DragOverlay>
      </DndContext>

      {/* Ticket Detail Modal */}
      <TicketDetailModal
        ticket={selectedTicket}
        visible={isModalVisible}
        onClose={handleCloseModal}
        onSave={handleSaveTicket}
      />
    </div>
  );
};

export default Tickets;