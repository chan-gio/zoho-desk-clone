import React, { Fragment, useState } from 'react';
import { Button, Input, Spin } from 'antd';
import { PlusOutlined, CheckOutlined, CloseOutlined } from '@ant-design/icons';
import { useSortable } from '@dnd-kit/sortable';
import { SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import SortableTicket from './TicketCard';
import './TicketColumn.scss';

// Function to sort tickets by order
const sortTicketsByOrder = (tickets) => {
  return [...tickets].sort((a, b) => a.order - b.order);
};

const SortableColumn = ({ 
  column, 
  tickets, 
  onAddTicket, 
  isDragOver, 
  activeTicketId, 
  dragOverTicket, 
  activeColumnId, 
  dragOverColumnPosition, 
  onOpenTicketModal, 
  onTicketMenuClick, 
  dragStartedGlobally,
  isLoading = false
}) => {
  const [isAddingTicket, setIsAddingTicket] = useState(false);
  const [newTicketTitle, setNewTicketTitle] = useState('');
  const [addTicketPosition, setAddTicketPosition] = useState('bottom'); // 'top' or 'bottom'

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

  // Handle adding new ticket from header
  const handleAddTicketFromHeader = () => {
    setIsAddingTicket(true);
    setNewTicketTitle('');
    setAddTicketPosition('top');
  };

  // Handle adding new ticket from bottom button
  const handleAddTicketFromBottom = () => {
    setIsAddingTicket(true);
    setNewTicketTitle('');
    setAddTicketPosition('bottom');
  };

  const handleSaveNewTicket = () => {
    if (newTicketTitle.trim()) {
      onAddTicket(column.id, newTicketTitle.trim());
      setIsAddingTicket(false);
      setNewTicketTitle('');
      setAddTicketPosition('bottom');
    }
  };

  const handleCancelAddTicket = () => {
    setIsAddingTicket(false);
    setNewTicketTitle('');
    setAddTicketPosition('bottom');
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSaveNewTicket();
    } else if (e.key === 'Escape') {
      handleCancelAddTicket();
    }
  };

  // Function to render ticket placeholder
  const renderTicketPlaceholder = () => {
    if (!activeTicketId) return null;
    
    return (
      <div className="ticket-placeholder">
        Drop here
      </div>
    );
  };

  // Function to render add ticket input
  const renderAddTicketInput = () => {
    if (!isAddingTicket) return null;

    return (
      <div className="add-ticket-input">
        <Input
          value={newTicketTitle}
          onChange={(e) => setNewTicketTitle(e.target.value)}
          onKeyDown={handleKeyPress}
          placeholder="Enter ticket title..."
          autoFocus
          className="ticket-input-field"
        />
        <div className="ticket-input-actions">
          <Button
            type="text"
            size="small"
            icon={<CheckOutlined />}
            onClick={handleSaveNewTicket}
            disabled={!newTicketTitle.trim()}
          />
          <Button
            type="text"
            size="small"
            icon={<CloseOutlined />}
            onClick={handleCancelAddTicket}
          />
        </div>
      </div>
    );
  };

  // Function to render add ticket button
  const renderAddTicketButton = () => {
    if (isAddingTicket) return null;

    return (
      <div 
        className="add-ticket-button" 
        onClick={handleAddTicketFromBottom}
      >
        <PlusOutlined />
        <span>Add a ticket</span>
      </div>
    );
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...attributes}
      className={`column ${isDragOver ? 'drag-over' : ''}`}
    >
      <div 
        className="column-header" 
        style={{ 
          borderTopColor: column.color,
          borderTop: `4px solid ${column.color}`
        }}
        {...listeners}
      >
        <h3 className="column-title">{column.title}</h3>
        <div className="column-header-actions">
          <span className="ticket-count">
            {tickets.length}
          </span>
          <Button
            type="text"
            icon={<PlusOutlined />}
            onClick={(e) => {
              e.stopPropagation();
              handleAddTicketFromHeader();
            }}
            className="add-ticket-header-btn"
            size="small"
          />
        </div>
      </div>
      
      <div className="column-content">
        {isLoading ? (
          <div className="column-loading">
            <Spin size="small" />
          </div>
        ) : (
          <>
            <SortableContext 
              items={sortedTickets.map(ticket => ticket.id)} 
              strategy={verticalListSortingStrategy}
            >
              {/* Add ticket input at the top when adding from header */}
              {addTicketPosition === 'top' && renderAddTicketInput()}
              
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
                  
                  {/* Temporarily show all tickets to debug */}
                  <SortableTicket 
                    ticket={ticket} 
                    onOpenModal={onOpenTicketModal}
                    onMenuClick={onTicketMenuClick}
                    dragStartedGlobally={dragStartedGlobally}
                  />
                  
                  {/* Debug logging */}
                  {activeTicketId && console.log('🎫 TicketColumn - activeTicketId:', activeTicketId, 'ticket.id:', ticket.id, 'show:', String(ticket.id) !== String(activeTicketId))}
                </Fragment>
              ))}
              
              {/* Show placeholder at the end if dragging over column header or last position */}
              {activeTicketId && dragOverTicket === `${column.id}-end` && sortedTickets.length > 0 && (
                renderTicketPlaceholder()
              )}
            </SortableContext>
            
            {/* Add ticket input at the bottom when adding from bottom button */}
            {addTicketPosition === 'bottom' && renderAddTicketInput()}
            
            {/* Add ticket button at the bottom */}
            {renderAddTicketButton()}
          </>
        )}
      </div>
    </div>
  );
};

export default SortableColumn;
