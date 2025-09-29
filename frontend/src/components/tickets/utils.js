// Utility functions for managing order
export const updateColumnOrder = (columns) => {
  return columns.map((column, index) => ({
    ...column,
    order: index + 1
  }));
};

export const updateTicketOrder = (tickets, columnId) => {
  return tickets.map((ticket, index) => ({
    ...ticket,
    columnId,
    order: index + 1
  }));
};

export const getNextTicketOrder = (column) => {
  return column.tickets.length + 1;
};

// Function to sort tickets by order
export const sortTicketsByOrder = (tickets) => {
  return [...tickets].sort((a, b) => a.order - b.order);
};
