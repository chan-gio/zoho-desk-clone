import React from 'react';
import { Button, Card, Space, Typography } from 'antd';
import { BookOutlined, ArrowRightOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';

const { Title, Paragraph } = Typography;

const KnowledgeBaseTest = () => {
  const navigate = useNavigate();

  return (
    <div style={{ padding: '40px', textAlign: 'center' }}>
      <Card style={{ maxWidth: 600, margin: '0 auto' }}>
        <Space direction="vertical" size="large" style={{ width: '100%' }}>
          <BookOutlined style={{ fontSize: '64px', color: '#1890ff' }} />
          
          <Title level={2}>Knowledge Base Ready!</Title>
          
          <Paragraph>
            Knowledge Base đã được tích hợp thành công vào hệ thống. 
            Bạn có thể truy cập từ sidebar hoặc click vào button bên dưới.
          </Paragraph>
          
          <Space>
            <Button 
              type="primary" 
              size="large"
              icon={<BookOutlined />}
              onClick={() => navigate('/knowledge-base')}
            >
              Truy cập Knowledge Base
            </Button>
            
            <Button 
              size="large"
              icon={<ArrowRightOutlined />}
              onClick={() => navigate('/dashboard')}
            >
              Về Dashboard
            </Button>
          </Space>
          
          <div style={{ marginTop: '20px', fontSize: '14px', color: '#666' }}>
            <p><strong>Routes đã thêm:</strong></p>
            <ul style={{ textAlign: 'left', display: 'inline-block' }}>
              <li>/knowledge-base - Trang chính Knowledge Base</li>
              <li>/knowledge-base/articles/:id - Chi tiết bài viết</li>
            </ul>
          </div>
        </Space>
      </Card>
    </div>
  );
};

export default KnowledgeBaseTest;
