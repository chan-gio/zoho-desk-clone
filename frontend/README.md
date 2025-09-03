# Zoho Desk Clone - Frontend

Giao diện web giống Zoho Desk được xây dựng với React, Ant Design, và SCSS.

## 🚀 Tính năng

- **Dashboard**: Thống kê tổng quan về tickets và hiệu suất
- **Quản lý Tickets**: Xem, tạo, sửa, xóa tickets với bộ lọc mạnh mẽ
- **Quản lý Khách hàng**: Quản lý thông tin khách hàng
- **Báo cáo**: Thống kê và báo cáo hiệu suất
- **Cài đặt**: Cấu hình hệ thống và tài khoản cá nhân
- **Responsive Design**: Tối ưu cho mobile, tablet và desktop
- **Lazy Loading**: Tải trang theo yêu cầu để tối ưu hiệu suất

## 🛠️ Công nghệ sử dụng

- **React 18**: Framework chính
- **Ant Design**: UI Component Library
- **React Router DOM**: Routing với lazy loading
- **Axios**: HTTP client
- **React Query**: Data fetching và caching
- **SCSS**: Styling với variables và mixins
- **Vite**: Build tool

## 📦 Cài đặt

```bash
# Cài đặt dependencies
npm install

# Chạy development server
npm run dev

# Build cho production
npm run build

# Preview build
npm run preview
```

## 🏗️ Cấu trúc thư mục

```
src/
├── components/          # Các component tái sử dụng
│   ├── Header.jsx      # Header với search và user menu
│   ├── Sidebar.jsx     # Sidebar navigation
│   └── Footer.jsx      # Footer
├── layouts/            # Layout components
│   └── MainLayout.jsx  # Layout chính
├── pages/              # Các trang chính
│   ├── Dashboard.jsx   # Trang dashboard
│   ├── Tickets.jsx     # Quản lý tickets
│   ├── Customers.jsx   # Quản lý khách hàng
│   ├── Reports.jsx     # Báo cáo
│   └── Settings.jsx    # Cài đặt
├── services/           # API services
│   ├── api.js         # Axios configuration
│   ├── ticketService.js
│   ├── customerService.js
│   └── reportService.js
├── styles/             # SCSS files
│   ├── variables.scss  # Biến SCSS
│   └── mixins.scss     # Mixins SCSS
└── hooks/              # Custom hooks (nếu có)
```

## 🎨 Thiết kế

### Màu sắc chính
- **Primary**: #1890ff (Xanh dương)
- **Success**: #52c41a (Xanh lá)
- **Warning**: #faad14 (Vàng)
- **Error**: #ff4d4f (Đỏ)

### Layout
- **Header**: Cố định ở trên với search và user menu
- **Sidebar**: Navigation menu có thể thu gọn
- **Content**: Khu vực nội dung chính
- **Footer**: Thông tin liên hệ và links

## 🔧 Cấu hình

### Environment Variables
Tạo file `.env` trong thư mục gốc:

```env
REACT_APP_API_URL=http://localhost:3001/api
REACT_APP_NAME=Zoho Desk Clone
REACT_APP_VERSION=1.0.0
```

### API Integration
- Sử dụng Axios với interceptors cho authentication
- React Query để cache và quản lý state
- Mock data được cung cấp cho development

## 📱 Responsive Design

- **Mobile** (< 768px): Layout dọc, sidebar ẩn
- **Tablet** (768px - 992px): Layout linh hoạt
- **Desktop** (> 992px): Layout đầy đủ

## 🚀 Deployment

```bash
# Build production
npm run build

# Deploy dist/ folder lên server
```

## 📝 Ghi chú

- Tất cả components sử dụng Ant Design
- SCSS được tổ chức theo BEM methodology
- Lazy loading được áp dụng cho tất cả routes
- Mock data được sử dụng khi API chưa sẵn sàng
- Responsive design được tối ưu cho tất cả thiết bị

## 🤝 Đóng góp

1. Fork repository
2. Tạo feature branch
3. Commit changes
4. Push to branch
5. Tạo Pull Request

## 📄 License

MIT License
