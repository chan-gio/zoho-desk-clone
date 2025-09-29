import React from 'react';
import { Card, Tag, Rate, Avatar, Space, Typography, Tooltip, Button, Dropdown, Menu } from 'antd';
import { 
  EyeOutlined, 
  LikeOutlined, 
  CommentOutlined, 
  CalendarOutlined,
  UserOutlined,
  BookOutlined,
  MoreOutlined,
  EditOutlined,
  DeleteOutlined,
  ShareAltOutlined,
  StarOutlined,
  StarFilled
} from '@ant-design/icons';
import { formatDistanceToNow } from 'date-fns';

const { Text, Paragraph } = Typography;

const ArticleCard = ({ article, onClick, viewMode = 'grid' }) => {
  const handleClick = () => {
    if (onClick) {
      onClick(article.id);
    }
  };

  const handleMenuClick = (e) => {
    e.stopPropagation();
    // Handle menu actions
  };

  const formatDate = (date) => {
    try {
      return formatDistanceToNow(new Date(date), { addSuffix: true });
    } catch {
      return 'Unknown';
    }
  };

  const truncateText = (text, maxLength = 120) => {
    if (!text) return '';
    return text.length > maxLength ? text.substring(0, maxLength) + '...' : text;
  };

  const menu = (
    <Menu onClick={handleMenuClick}>
      <Menu.Item key="edit" icon={<EditOutlined />}>
        Edit Article
      </Menu.Item>
      <Menu.Item key="share" icon={<ShareAltOutlined />}>
        Share Article
      </Menu.Item>
      <Menu.Item key="bookmark" icon={<StarOutlined />}>
        Bookmark
      </Menu.Item>
      <Menu.Divider />
      <Menu.Item key="delete" icon={<DeleteOutlined />} danger>
        Delete Article
      </Menu.Item>
    </Menu>
  );

  if (viewMode === 'list') {
    return (
      <Card
        hoverable
        className="article-card list-view"
        onClick={handleClick}
        actions={[
          <Tooltip title={`${article.views || 0} views`}>
            <Space>
              <EyeOutlined />
              <span>{article.views || 0}</span>
            </Space>
          </Tooltip>,
          <Tooltip title={`${article.likes || 0} likes`}>
            <Space>
              <LikeOutlined />
              <span>{article.likes || 0}</span>
            </Space>
          </Tooltip>,
          <Tooltip title={`${article.comments || 0} comments`}>
            <Space>
              <CommentOutlined />
              <span>{article.comments || 0}</span>
            </Space>
          </Tooltip>
        ]}
      >
        <div className="article-content list-content">
          <div className="article-header">
            <div className="article-meta">
              <Space wrap>
                {article.category && (
                  <Tag color="blue" className="category-tag">
                    {article.category.name || article.category}
                  </Tag>
                )}
                {article.status && (
                  <Tag 
                    color={article.status === 'published' ? 'green' : 'orange'}
                    className="status-tag"
                  >
                    {article.status}
                  </Tag>
                )}
                {article.tags && article.tags.slice(0, 2).map(tag => (
                  <Tag key={tag} color="purple" className="tag">
                    {tag}
                  </Tag>
                ))}
              </Space>
            </div>
            <Dropdown overlay={menu} trigger={['click']}>
              <Button 
                type="text" 
                icon={<MoreOutlined />} 
                className="article-menu"
                onClick={(e) => e.stopPropagation()}
              />
            </Dropdown>
          </div>

          <div className="article-body">
            <div className="article-title">
              <Text strong className="title-text">
                {article.title}
              </Text>
            </div>

            <div className="article-description">
              <Paragraph 
                ellipsis={{ rows: 2, expandable: false }}
                className="description-text"
              >
                {truncateText(article.description || article.content, 200)}
              </Paragraph>
            </div>

            <div className="article-footer">
              <Space>
                <Avatar 
                  size="small" 
                  icon={<UserOutlined />}
                  src={article.author?.avatar}
                />
                <Text className="author-text">
                  {article.author?.name || article.author || 'Unknown'}
                </Text>
                <Text className="date-text">
                  <CalendarOutlined /> {formatDate(article.updatedAt || article.createdAt)}
                </Text>
                {article.averageRating && (
                  <Space>
                    <Rate 
                      disabled 
                      value={article.averageRating} 
                      allowHalf 
                      className="rating-stars"
                    />
                    <Text className="rating-text">
                      ({article.ratingCount || 0})
                    </Text>
                  </Space>
                )}
              </Space>
            </div>
          </div>
        </div>
      </Card>
    );
  }

  // Grid view (default)
  return (
    <Card
      hoverable
      className="article-card grid-view"
      onClick={handleClick}
      cover={
        article.featuredImage ? (
          <div className="article-cover">
            <img 
              src={article.featuredImage} 
              alt={article.title}
              className="cover-image"
            />
            <div className="cover-overlay">
              <Dropdown overlay={menu} trigger={['click']}>
                <Button 
                  type="text" 
                  icon={<MoreOutlined />} 
                  className="cover-menu"
                  onClick={(e) => e.stopPropagation()}
                />
              </Dropdown>
            </div>
          </div>
        ) : (
          <div className="article-cover-placeholder">
            <BookOutlined className="placeholder-icon" />
            <div className="cover-overlay">
              <Dropdown overlay={menu} trigger={['click']}>
                <Button 
                  type="text" 
                  icon={<MoreOutlined />} 
                  className="cover-menu"
                  onClick={(e) => e.stopPropagation()}
                />
              </Dropdown>
            </div>
          </div>
        )
      }
      actions={[
        <Tooltip title={`${article.views || 0} views`}>
          <Space>
            <EyeOutlined />
            <span>{article.views || 0}</span>
          </Space>
        </Tooltip>,
        <Tooltip title={`${article.likes || 0} likes`}>
          <Space>
            <LikeOutlined />
            <span>{article.likes || 0}</span>
          </Space>
        </Tooltip>,
        <Tooltip title={`${article.comments || 0} comments`}>
          <Space>
            <CommentOutlined />
            <span>{article.comments || 0}</span>
          </Space>
        </Tooltip>
      ]}
    >
      <div className="article-content">
        {/* Category and Status */}
        <div className="article-meta">
          <Space wrap>
            {article.category && (
              <Tag color="blue" className="category-tag">
                {article.category.name || article.category}
              </Tag>
            )}
            {article.status && (
              <Tag 
                color={article.status === 'published' ? 'green' : 'orange'}
                className="status-tag"
              >
                {article.status}
              </Tag>
            )}
            {article.tags && article.tags.length > 0 && (
              <Tag color="purple" className="tags-tag">
                {article.tags.length} tag{article.tags.length !== 1 ? 's' : ''}
              </Tag>
            )}
          </Space>
        </div>

        {/* Title */}
        <div className="article-title">
          <Text strong className="title-text">
            {article.title}
          </Text>
        </div>

        {/* Description */}
        <div className="article-description">
          <Paragraph 
            ellipsis={{ rows: 2, expandable: false }}
            className="description-text"
          >
            {truncateText(article.description || article.content)}
          </Paragraph>
        </div>

        {/* Rating */}
        {article.averageRating && (
          <div className="article-rating">
            <Rate 
              disabled 
              value={article.averageRating} 
              allowHalf 
              className="rating-stars"
            />
            <Text className="rating-text">
              ({article.ratingCount || 0} rating{article.ratingCount !== 1 ? 's' : ''})
            </Text>
          </div>
        )}

        {/* Author and Date */}
        <div className="article-footer">
          <Space>
            <Avatar 
              size="small" 
              icon={<UserOutlined />}
              src={article.author?.avatar}
            />
            <Text className="author-text">
              {article.author?.name || article.author || 'Unknown'}
            </Text>
            <Text className="date-text">
              <CalendarOutlined /> {formatDate(article.updatedAt || article.createdAt)}
            </Text>
          </Space>
        </div>
      </div>
    </Card>
  );
};

export default ArticleCard;
