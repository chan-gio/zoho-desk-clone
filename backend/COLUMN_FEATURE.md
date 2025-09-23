# Tính năng Column và Drag & Drop cho Tickets

## Tổng quan

Tính năng này cho phép tổ chức tickets theo các cột (columns) và hỗ trợ kéo thả (drag & drop) để di chuyển tickets giữa các cột và sắp xếp lại thứ tự.

## Cấu trúc Database

### Bảng Column
- `id`: ID duy nhất của column
- `name`: Tên column (ví dụ: "To Do", "In Progress", "Done")
- `description`: Mô tả column
- `order`: Thứ tự hiển thị của column
- `color`: Màu hex cho column (ví dụ: #FF5733)
- `isDefault`: Column mặc định
- `tenantId`: ID của tenant sở hữu column

### Bảng Ticket (đã cập nhật)
- `order`: Thứ tự trong column
- `columnId`: ID của column chứa ticket này

## API Endpoints

### Column Management

#### Tạo column mới
```http
POST /api/columns
Authorization: Bearer <token>
Content-Type: application/json

{
  "name": "In Progress",
  "description": "Tickets đang được xử lý",
  "color": "#4ECDC4",
  "isDefault": false
}
```

#### Lấy tất cả columns của tenant
```http
GET /api/columns
Authorization: Bearer <token>
```

#### Lấy column theo ID
```http
GET /api/columns/:id
Authorization: Bearer <token>
```

#### Cập nhật column
```http
PUT /api/columns/:id
Authorization: Bearer <token>
Content-Type: application/json

{
  "name": "Updated Name",
  "color": "#FF5733",
  "order": 2
}
```

#### Xóa column
```http
DELETE /api/columns/:id
Authorization: Bearer <token>
```

### Drag & Drop Operations

#### Di chuyển ticket sang column khác
```http
PUT /api/columns/move-ticket
Authorization: Bearer <token>
Content-Type: application/json

{
  "ticketId": "ticket-uuid",
  "fromColumnId": "source-column-uuid",
  "toColumnId": "target-column-uuid",
  "newOrder": 3
}
```

#### Sắp xếp lại thứ tự tickets trong column
```http
PUT /api/columns/reorder-tickets
Authorization: Bearer <token>
Content-Type: application/json

{
  "columnId": "column-uuid",
  "ticketOrders": [
    { "ticketId": "ticket-1-uuid", "order": 1 },
    { "ticketId": "ticket-2-uuid", "order": 2 },
    { "ticketId": "ticket-3-uuid", "order": 3 }
  ]
}
```

#### Sắp xếp lại thứ tự các columns
```http
PUT /api/columns/reorder
Authorization: Bearer <token>
Content-Type: application/json

{
  "columnOrders": [
    { "id": "column-1-uuid", "order": 1 },
    { "id": "column-2-uuid", "order": 2 },
    { "id": "column-3-uuid", "order": 3 }
  ]
}
```

### Utility Endpoints

#### Khởi tạo columns mặc định
```http
POST /api/columns/initialize-defaults
Authorization: Bearer <token>
```

Tạo 4 columns mặc định:
- To Do (màu đỏ)
- In Progress (màu xanh lá)
- Review (màu xanh dương)
- Done (màu xanh nhạt)

#### Lấy tickets trong column
```http
GET /api/columns/:columnId/tickets
Authorization: Bearer <token>
```

## Cách sử dụng trong Frontend

### 1. Khởi tạo columns mặc định
Khi user đăng nhập lần đầu, gọi API để khởi tạo columns mặc định.

### 2. Hiển thị Kanban Board
- Lấy danh sách columns và tickets
- Hiển thị theo thứ tự `order`
- Mỗi column hiển thị tickets theo thứ tự `order`

### 3. Implement Drag & Drop
- Sử dụng thư viện như `react-beautiful-dnd` hoặc `@dnd-kit/core`
- Khi kéo thả, gọi API tương ứng để cập nhật database
- Cập nhật UI ngay lập tức (optimistic update)

### 4. Real-time Updates
- Sử dụng WebSocket để cập nhật real-time khi có thay đổi
- Broadcast thay đổi đến tất cả users trong tenant

## Ví dụ Frontend Code (React)

```typescript
// Component Kanban Board
const KanbanBoard = () => {
  const [columns, setColumns] = useState([]);
  const [tickets, setTickets] = useState([]);

  // Lấy dữ liệu columns và tickets
  useEffect(() => {
    fetchColumns();
  }, []);

  const fetchColumns = async () => {
    const response = await fetch('/api/columns', {
      headers: { 'Authorization': `Bearer ${token}` }
    });
    const data = await response.json();
    setColumns(data.data);
  };

  // Xử lý kéo thả ticket
  const handleDragEnd = async (result) => {
    if (!result.destination) return;

    const { draggableId, source, destination } = result;
    
    // Cập nhật UI ngay lập tức
    const newTickets = Array.from(tickets);
    const [movedTicket] = newTickets.splice(source.index, 1);
    newTickets.splice(destination.index, 0, movedTicket);
    setTickets(newTickets);

    // Gọi API để cập nhật database
    await fetch('/api/columns/move-ticket', {
      method: 'PUT',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        ticketId: draggableId,
        fromColumnId: source.droppableId,
        toColumnId: destination.droppableId,
        newOrder: destination.index + 1
      })
    });
  };

  return (
    <DragDropContext onDragEnd={handleDragEnd}>
      <div className="kanban-board">
        {columns.map(column => (
          <Column key={column.id} column={column} />
        ))}
      </div>
    </DragDropContext>
  );
};
```

## Lưu ý quan trọng

1. **Transaction Safety**: Tất cả operations đều sử dụng database transactions để đảm bảo tính nhất quán
2. **Order Management**: Hệ thống tự động quản lý thứ tự khi di chuyển tickets
3. **Default Column**: Không thể xóa column mặc định
4. **Tenant Isolation**: Mỗi tenant có bộ columns riêng biệt
5. **Real-time Sync**: Sử dụng WebSocket để đồng bộ thay đổi giữa các users

## Migration

Database đã được cập nhật với:
- Thêm cột `order` và `columnId` vào bảng `Ticket`
- Tạo bảng `Column` mới
- Thêm các indexes cần thiết cho performance

Chạy migration:
```bash
npx prisma migrate dev --name add-column-and-order-to-tickets
```
