export interface Column {
  id: string;
  name: string;
  description?: string | null;
  order: number; // Thứ tự hiển thị của column
  color?: string | null; // Màu hex cho column (ví dụ: #FF5733)
  isDefault: boolean; // Column mặc định
  tenantId: string;
  createdAt: Date;
  updatedAt: Date;
  tickets?: any[]; // Tickets trong column
}

export interface CreateColumnInput {
  name: string;
  description?: string;
  color?: string;
  isDefault?: boolean;
  tenantId: string;
}

export interface UpdateColumnInput {
  name?: string;
  description?: string;
  order?: number; // Cập nhật thứ tự hiển thị
  color?: string;
  isDefault?: boolean;
}

export interface ColumnFilter {
  tenantId: string;
  isDefault?: boolean;
}

export interface MoveTicketInput {
  ticketId: string;
  fromColumnId?: string;
  toColumnId: string;
  newOrder: number; // Vị trí mới trong column đích
}

export interface ReorderTicketsInput {
  columnId: string;
  ticketOrders: Array<{
    ticketId: string;
    order: number;
  }>;
}
