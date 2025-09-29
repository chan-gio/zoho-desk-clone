import React, { useState } from 'react';
import { 
  Card, 
  Typography, 
  Tag, 
  Rate, 
  Avatar, 
  Space, 
  Button, 
  Divider, 
  Spin, 
  message,
  Row,
  Col,
  List,
  Input,
  Tooltip
} from 'antd';
import { 
  LikeOutlined, 
  DislikeOutlined,
  CommentOutlined,
  ShareAltOutlined,
  EyeOutlined,
  CalendarOutlined,
  UserOutlined,
  ArrowLeftOutlined,
  EditOutlined,
  DeleteOutlined,
  StarOutlined
} from '@ant-design/icons';
import { useParams, useNavigate } from 'react-router-dom';
import { formatDistanceToNow } from 'date-fns';

// Import hooks
import { 
  useArticle, 
  useArticleComments, 
  useArticleRatings,
  useIncrementArticleViews,
  useRateArticle,
  useAddArticleComment
} from '../hooks/useKnowledgeBase';

import './ArticleDetail.scss';

const { Title, Paragraph, Text } = Typography;
const { TextArea } = Input;

const ArticleDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  
  // State
  const [newComment, setNewComment] = useState('');
  const [userRating, setUserRating] = useState(0);
  const [isSubmittingComment, setIsSubmittingComment] = useState(false);

  // API hooks
  const { data: article, isLoading: articleLoading } = useArticle(id);
  const { data: commentsData, isLoading: commentsLoading } = useArticleComments(id);
  const { data: ratingsData } = useArticleRatings(id);
  const incrementViewsMutation = useIncrementArticleViews();
  const rateArticleMutation = useRateArticle();
  const addCommentMutation = useAddArticleComment();

  // Process data
  const comments = commentsData?.data || commentsData || [];
  const ratings = ratingsData?.data || ratingsData || [];

  // Handlers
  const handleBack = () => {
    navigate('/knowledge-base');
  };

  const handleRate = (rating) => {
    setUserRating(rating);
    rateArticleMutation.mutate(
      { id, rating },
      {
        onSuccess: () => {
          message.success('Thank you for your rating!');
        },
        onError: () => {
          message.error('Failed to submit rating. Please try again.');
        }
      }
    );
  };

  const handleSubmitComment = async () => {
    if (!newComment.trim()) {
      message.warning('Please enter a comment');
      return;
    }

    setIsSubmittingComment(true);
    try {
      await addCommentMutation.mutateAsync({
        id,
        commentData: {
          content: newComment.trim(),
          author: 'Current User', // This should come from auth context
          authorId: 'current-user-id'
        }
      });
      
      setNewComment('');
      message.success('Comment added successfully!');
    } catch (error) {
      message.error('Failed to add comment. Please try again.');
    } finally {
      setIsSubmittingComment(false);
    }
  };

  const handleLike = () => {
    // Implement like functionality
    message.info('Like functionality coming soon!');
  };

  const handleShare = () => {
    // Implement share functionality
    if (navigator.share) {
      navigator.share({
        title: article?.title,
        text: article?.description,
        url: window.location.href
      });
    } else {
      navigator.clipboard.writeText(window.location.href);
      message.success('Link copied to clipboard!');
    }
  };

  const handleBookmark = () => {
    // Implement bookmark functionality
    message.info('Bookmark functionality coming soon!');
  };

  const handleEdit = () => {
    navigate(`/knowledge-base/articles/${id}/edit`);
  };

  const handleDelete = () => {
    // Implement delete functionality
    message.info('Delete functionality coming soon!');
  };

  // Increment views on mount
  React.useEffect(() => {
    if (article && id) {
      incrementViewsMutation.mutate(id);
    }
  }, [article, id]);

  const formatDate = (date) => {
    try {
      return formatDistanceToNow(new Date(date), { addSuffix: true });
    } catch {
      return 'Unknown';
    }
  };

  if (articleLoading) {
    return (
      <div className="article-detail-loading">
        <Spin size="large" />
      </div>
    );
  }

  if (!article) {
    return (
      <div className="article-detail-error">
        <Title level={3}>Article not found</Title>
        <Button onClick={handleBack}>Back to Knowledge Base</Button>
      </div>
    );
  }

  return (
    <div className="article-detail-page">
      {/* Header */}
      <div className="article-header">
        <Button 
          icon={<ArrowLeftOutlined />} 
          onClick={handleBack}
          className="back-button"
        >
          Back to Knowledge Base
        </Button>
        
        <div className="article-actions">
          <Space>
            <Button icon={<EditOutlined />} onClick={handleEdit}>
              Edit
            </Button>
            <Button icon={<DeleteOutlined />} danger onClick={handleDelete}>
              Delete
            </Button>
          </Space>
        </div>
      </div>

      <Row gutter={[24, 24]}>
        {/* Main Content */}
        <Col xs={24} lg={16}>
          <Card className="article-content-card">
            {/* Article Meta */}
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
                {article.tags && article.tags.map(tag => (
                  <Tag key={tag} color="purple" className="tag">
                    {tag}
                  </Tag>
                ))}
              </Space>
            </div>

            {/* Title */}
            <Title level={1} className="article-title">
              {article.title}
            </Title>

            {/* Author and Date */}
            <div className="article-author-info">
              <Space>
                <Avatar 
                  size="large" 
                  icon={<UserOutlined />}
                  src={article.author?.avatar}
                />
                <div>
                  <Text strong className="author-name">
                    {article.author?.name || article.author || 'Unknown Author'}
                  </Text>
                  <br />
                  <Text className="publish-date">
                    <CalendarOutlined /> Published {formatDate(article.createdAt)}
                    {article.updatedAt !== article.createdAt && (
                      <span> • Updated {formatDate(article.updatedAt)}</span>
                    )}
                  </Text>
                </div>
              </Space>
            </div>

            {/* Featured Image */}
            {article.featuredImage && (
              <div className="article-featured-image">
                <img 
                  src={article.featuredImage} 
                  alt={article.title}
                  className="featured-image"
                />
              </div>
            )}

            {/* Content */}
            <div className="article-content">
              <Paragraph className="article-description">
                {article.description}
              </Paragraph>
              
              <div 
                className="article-body"
                dangerouslySetInnerHTML={{ __html: article.content }}
              />
            </div>

            {/* Actions */}
            <Divider />
            <div className="article-actions">
              <Space>
                <Button 
                  icon={<LikeOutlined />} 
                  onClick={handleLike}
                  className="action-button"
                >
                  Like ({article.likes || 0})
                </Button>
                <Button 
                  icon={<ShareAltOutlined />} 
                  onClick={handleShare}
                  className="action-button"
                >
                  Share
                </Button>
                <Button 
                  icon={<StarOutlined />} 
                  onClick={handleBookmark}
                  className="action-button"
                >
                  Bookmark
                </Button>
              </Space>
            </div>
          </Card>

          {/* Comments Section */}
          <Card title="Comments" className="comments-card">
            {/* Add Comment */}
            <div className="add-comment">
              <TextArea
                placeholder="Write a comment..."
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
                rows={4}
                className="comment-input"
              />
              <div className="comment-actions">
                <Button 
                  type="primary" 
                  onClick={handleSubmitComment}
                  loading={isSubmittingComment}
                  disabled={!newComment.trim()}
                >
                  Post Comment
                </Button>
              </div>
            </div>

            <Divider />

            {/* Comments List */}
            {commentsLoading ? (
              <div className="loading-center">
                <Spin />
              </div>
            ) : comments.length > 0 ? (
              <List
                dataSource={comments}
                renderItem={(comment) => (
                  <div className="comment-item">
                    <div className="comment-header">
                      <Space>
                        <Avatar 
                          size="small" 
                          icon={<UserOutlined />} 
                          src={comment.author?.avatar} 
                        />
                        <div className="comment-author">
                          <Text strong>{comment.author?.name || comment.author}</Text>
                          <Text type="secondary" className="comment-date">
                            <Tooltip title={comment.createdAt}>
                              {formatDate(comment.createdAt)}
                            </Tooltip>
                          </Text>
                        </div>
                      </Space>
                    </div>
                    <div className="comment-content">
                      <Paragraph className="comment-text">
                        {comment.content}
                      </Paragraph>
                    </div>
                    <div className="comment-actions">
                      <Space>
                        <Button 
                          type="text" 
                          size="small" 
                          icon={<LikeOutlined />}
                          className="comment-action-btn"
                        >
                          {comment.likes || 0}
                        </Button>
                        <Button 
                          type="text" 
                          size="small"
                          className="comment-action-btn"
                        >
                          Reply
                        </Button>
                      </Space>
                    </div>
                  </div>
                )}
              />
            ) : (
              <div className="no-comments">
                <Text type="secondary">No comments yet. Be the first to comment!</Text>
              </div>
            )}
          </Card>
        </Col>

        {/* Sidebar */}
        <Col xs={24} lg={8}>
          {/* Rating */}
          <Card title="Rate this article" className="rating-card">
            <div className="rating-section">
              <Rate 
                value={userRating} 
                onChange={handleRate}
                className="rating-stars"
              />
              <Text className="rating-text">
                {ratings.length > 0 ? (
                  <>
                    Average: {ratings.reduce((sum, r) => sum + r.rating, 0) / ratings.length} 
                    ({ratings.length} rating{ratings.length !== 1 ? 's' : ''})
                  </>
                ) : (
                  'No ratings yet'
                )}
              </Text>
            </div>
          </Card>

          {/* Article Stats */}
          <Card title="Article Stats" className="stats-card">
            <div className="stats-list">
              <div className="stat-item">
                <EyeOutlined className="stat-icon" />
                <span className="stat-label">Views</span>
                <span className="stat-value">{article.views || 0}</span>
              </div>
              <div className="stat-item">
                <LikeOutlined className="stat-icon" />
                <span className="stat-label">Likes</span>
                <span className="stat-value">{article.likes || 0}</span>
              </div>
              <div className="stat-item">
                <CommentOutlined className="stat-icon" />
                <span className="stat-label">Comments</span>
                <span className="stat-value">{comments.length}</span>
              </div>
            </div>
          </Card>

          {/* Related Articles */}
          {article.relatedArticles && article.relatedArticles.length > 0 && (
            <Card title="Related Articles" className="related-card">
              <List
                dataSource={article.relatedArticles}
                renderItem={(relatedArticle) => (
                  <List.Item>
                    <List.Item.Meta
                      title={
                        <a href={`/knowledge-base/articles/${relatedArticle.id}`}>
                          {relatedArticle.title}
                        </a>
                      }
                      description={relatedArticle.description}
                    />
                  </List.Item>
                )}
              />
            </Card>
          )}
        </Col>
      </Row>
    </div>
  );
};

export default ArticleDetail;
