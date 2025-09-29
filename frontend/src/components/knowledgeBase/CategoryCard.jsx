import React from 'react';
import { Card, Tag, Space, Typography, Tooltip, Button } from 'antd';
import { 
  FolderOutlined, 
  BookOutlined, 
  EyeOutlined,
  CalendarOutlined,
  RightOutlined,
  StarOutlined
} from '@ant-design/icons';
import { formatDistanceToNow } from 'date-fns';

const { Text } = Typography;

const CategoryCard = ({ category, onClick, onSelect, isSelected }) => {
  const handleClick = () => {
    if (onClick) {
      onClick(category.id);
    }
  };

  const handleSelect = (e) => {
    e.stopPropagation();
    if (onSelect) {
      onSelect(category.id);
    }
  };

  const formatDate = (date) => {
    try {
      return formatDistanceToNow(new Date(date), { addSuffix: true });
    } catch {
      return 'Unknown';
    }
  };

  return (
    <Card
      hoverable
      className={`category-card ${isSelected ? 'selected' : ''}`}
      onClick={handleClick}
      cover={
        <div className="category-header">
          <div className="category-icon">
            {category.icon ? (
              <img 
                src={category.icon} 
                alt={category.name}
                className="icon-image"
              />
            ) : (
              <FolderOutlined className="default-icon" />
            )}
          </div>
          <div className="category-actions">
            <Button 
              type="text" 
              icon={<RightOutlined />}
              className="view-button"
              onClick={(e) => {
                e.stopPropagation();
                handleClick();
              }}
            />
          </div>
        </div>
      }
    >
      <div className="category-content">
        {/* Category Name */}
        <div className="category-title">
          <Text strong className="title-text">
            {category.name}
          </Text>
        </div>

        {/* Description */}
        {category.description && (
          <div className="category-description">
            <Text className="description-text">
              {category.description.length > 60 
                ? category.description.substring(0, 60) + '...' 
                : category.description
              }
            </Text>
          </div>
        )}

        {/* Stats */}
        <div className="category-stats">
          <Space split={<span className="divider">•</span>}>
            <Tooltip title="Number of articles">
              <Space size={4}>
                <BookOutlined />
                <Text className="stat-text">
                  {category.articleCount || 0}
                </Text>
              </Space>
            </Tooltip>
            
            {category.totalViews && (
              <Tooltip title="Total views">
                <Space size={4}>
                  <EyeOutlined />
                  <Text className="stat-text">
                    {category.totalViews}
                  </Text>
                </Space>
              </Tooltip>
            )}
          </Space>
        </div>

        {/* Tags */}
        {category.tags && category.tags.length > 0 && (
          <div className="category-tags">
            <Space wrap>
              {category.tags.slice(0, 2).map((tag, index) => (
                <Tag key={index} size="small" className="tag">
                  {tag}
                </Tag>
              ))}
              {category.tags.length > 2 && (
                <Tag size="small" className="more-tag">
                  +{category.tags.length - 2}
                </Tag>
              )}
            </Space>
          </div>
        )}

        {/* Footer */}
        <div className="category-footer">
          <Space>
            <Text className="date-text">
              <CalendarOutlined /> Updated {formatDate(category.updatedAt || category.createdAt)}
            </Text>
          </Space>
        </div>

        {/* Select Button */}
        <div className="category-actions">
          <Button 
            className={`select-button ${isSelected ? 'selected' : ''}`}
            onClick={handleSelect}
            size="small"
            block
          >
            {isSelected ? (
              <Space>
                <StarOutlined />
                Selected
              </Space>
            ) : (
              'Select Category'
            )}
          </Button>
        </div>
      </div>
    </Card>
  );
};

export default CategoryCard;
