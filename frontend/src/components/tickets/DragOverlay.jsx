import React from 'react';
import { Card, Tag } from 'antd';

// Function to sort tickets by order
const sortTicketsByOrder = (tickets) => {
  return [...tickets].sort((a, b) => a.order - b.order);
};

const DragOverlay = ({ activeId, activeType, columns }) => {
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
        borderRadius: '12px',
        boxShadow: '0 8px 24px rgba(0, 0, 0, 0.15)',
      }}>
        <div className="column-header" style={{ 
          borderTopColor: column.color,
          borderTop: `4px solid ${column.color}`,
          backgroundColor: 'white',
          padding: '16px',
          borderRadius: '12px 12px 0 0',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center'
        }}>
          <h3 style={{ margin: 0, fontSize: '16px', fontWeight: '600' }}>{column.title}</h3>
          <span className="ticket-count" style={{ 
            backgroundColor: '#f0f0f0', 
            padding: '2px 8px', 
            borderRadius: '12px',
            fontSize: '12px',
            fontWeight: '500'
          }}>
            {column.tickets.length}
          </span>
        </div>
        <div className="column-content" style={{ 
          padding: '16px',
          backgroundColor: '#fafafa',
          maxHeight: '400px', 
          overflow: 'hidden',
          borderRadius: '0 0 12px 12px'
        }}>
          {sortedTickets.slice(0, 3).map(ticket => (
            <div key={ticket.id} className="ticket" style={{ 
              opacity: 0.8,
              marginBottom: '8px'
            }}>
              <Card size="small" className="ticket-card" style={{
                backgroundColor: 'white',
                border: '1px solid #e8e8e8',
                borderRadius: '8px'
              }}>
                <div className="ticket-header">
                  <h4 className="ticket-title" style={{ 
                    fontSize: '14px',
                    fontWeight: '500',
                    margin: '0 0 8px 0'
                  }}>
                    {ticket.title}
                  </h4>
                </div>
                <p className="ticket-description" style={{ 
                  fontSize: '12px',
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                  whiteSpace: 'nowrap',
                  color: '#666',
                  margin: 0
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
        boxShadow: '0 8px 24px rgba(0, 0, 0, 0.15)',
        backgroundColor: 'white',
        border: '1px solid #e8e8e8',
        borderRadius: '8px',
        width: '260px'
      }}>
        <div className="ticket-header">
          <h4 className="ticket-title" style={{
            fontSize: '14px',
            fontWeight: '500',
            margin: '0 0 8px 0'
          }}>
            {ticket.title}
          </h4>
        </div>
        <p className="ticket-description" style={{
          fontSize: '12px',
          color: '#666',
          margin: '0 0 8px 0'
        }}>
          {ticket.description}
        </p>
        <div className="ticket-tags">
          {ticket.tags.map(tag => (
            <Tag key={tag} size="small">{tag}</Tag>
          ))}
        </div>
      </Card>
    </div>
  );
};

export default DragOverlay;
