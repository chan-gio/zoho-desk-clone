import React, { useState, useMemo } from 'react';
import { 
  Row, 
  Col, 
  Card, 
  Input, 
  Button, 
  Tabs, 
  Tag, 
  Avatar, 
  Rate, 
  Spin, 
  Empty, 
  message,
  Space,
  Typography,
  Divider,
  Breadcrumb,
  Select,
  Dropdown,
  Menu
} from 'antd';
import { 
  SearchOutlined, 
  PlusOutlined, 
  BookOutlined, 
  FolderOutlined,
  EyeOutlined,
  LikeOutlined,
  CommentOutlined,
  CalendarOutlined,
  UserOutlined,
  FilterOutlined,
  MoreOutlined,
  EditOutlined,
  DeleteOutlined,
  ShareAltOutlined,
  StarOutlined,
  HomeOutlined
} from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';

// Import hooks
import { 
  useArticles, 
  useCategories, 
  useSearchArticles,
  usePopularArticles,
  useRecentArticles,
  useKnowledgeBaseStats
} from '../hooks/useKnowledgeBase';

// Import components
import ArticleCard from '../components/knowledgeBase/ArticleCard';
import CategoryCard from '../components/knowledgeBase/CategoryCard';
import SearchFilters from '../components/knowledgeBase/SearchFilters';

import './KnowledgeBase.scss';

const { Search } = Input;
const { Title, Text } = Typography;
const { TabPane } = Tabs;
const { Option } = Select;

const KnowledgeBase = () => {
  const navigate = useNavigate();
  
  // State
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [activeTab, setActiveTab] = useState('all');
  const [sortBy, setSortBy] = useState('recent');
  const [viewMode, setViewMode] = useState('grid'); // grid or list
  const [filters, setFilters] = useState({
    status: 'published',
    tags: [],
    dateRange: null
  });

  // API hooks
  const { data: articlesData, isLoading: articlesLoading } = useArticles({
    category: selectedCategory,
    sort: sortBy,
    ...filters
  });
  
  const { data: categoriesData, isLoading: categoriesLoading } = useCategories();
  const { data: searchResults, isLoading: searchLoading } = useSearchArticles(searchQuery);
  const { data: popularArticles } = usePopularArticles();
  const { data: recentArticles } = useRecentArticles();
  const { data: stats } = useKnowledgeBaseStats();

  // Process data
  const articles = articlesData?.data || articlesData || [];
  const categories = categoriesData?.data || categoriesData || [];
  const searchArticles = searchResults?.data || searchResults || [];

  // Filtered articles based on active tab
  const filteredArticles = useMemo(() => {
    switch (activeTab) {
      case 'search':
        return searchArticles;
      case 'popular':
        return popularArticles?.data || popularArticles || [];
      case 'recent':
        return recentArticles?.data || recentArticles || [];
      case 'all':
      default:
        return articles;
    }
  }, [activeTab, articles, searchArticles, popularArticles, recentArticles]);

  // Handlers
  const handleSearch = (value) => {
    setSearchQuery(value);
    if (value) {
      setActiveTab('search');
    } else {
      setActiveTab('all');
    }
  };

  const handleCategorySelect = (categoryId) => {
    setSelectedCategory(categoryId);
    setActiveTab('all');
  };

  const handleTabChange = (key) => {
    setActiveTab(key);
    if (key !== 'search') {
      setSearchQuery('');
    }
  };

  const handleCreateArticle = () => {
    navigate('/knowledge-base/create');
  };

  const handleViewArticle = (articleId) => {
    navigate(`/knowledge-base/articles/${articleId}`);
  };

  const handleViewCategory = (categoryId) => {
    navigate(`/knowledge-base/categories/${categoryId}`);
  };

  // Render functions
  const renderBreadcrumb = () => (
    <Breadcrumb className="kb-breadcrumb">
      <Breadcrumb.Item>
        <HomeOutlined /> Home
      </Breadcrumb.Item>
      <Breadcrumb.Item>Knowledge Base</Breadcrumb.Item>
      {selectedCategory && (
        <Breadcrumb.Item>
          {categories.find(c => c.id === selectedCategory)?.name || 'Category'}
        </Breadcrumb.Item>
      )}
    </Breadcrumb>
  );

  const renderHeader = () => (
    <div className="kb-header">
      <div className="header-content">
        <div className="header-left">
          <Title level={2} className="kb-title">
            <BookOutlined /> Knowledge Base
          </Title>
          <Text className="kb-subtitle">
            Find answers and share knowledge with your team
          </Text>
        </div>
        <div className="header-right">
          <Button 
            type="primary" 
            icon={<PlusOutlined />}
            onClick={handleCreateArticle}
            size="large"
            className="create-btn"
          >
            Create Article
          </Button>
        </div>
      </div>
    </div>
  );

  const renderSearchBar = () => (
    <div className="search-section">
      <Row gutter={[16, 16]} align="middle">
        <Col xs={24} md={16}>
          <Search
            placeholder="Search articles, categories, or topics..."
            allowClear
            enterButton={<SearchOutlined />}
            size="large"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onSearch={handleSearch}
            className="kb-search"
          />
        </Col>
        <Col xs={24} md={8}>
          <Space>
            <Select
              value={sortBy}
              onChange={setSortBy}
              size="large"
              className="sort-select"
            >
              <Option value="recent">Most Recent</Option>
              <Option value="popular">Most Popular</Option>
              <Option value="views">Most Viewed</Option>
              <Option value="rating">Highest Rated</Option>
            </Select>
            <Button.Group>
              <Button 
                icon={<FolderOutlined />}
                type={viewMode === 'grid' ? 'primary' : 'default'}
                onClick={() => setViewMode('grid')}
              />
              <Button 
                icon={<MoreOutlined />}
                type={viewMode === 'list' ? 'primary' : 'default'}
                onClick={() => setViewMode('list')}
              />
            </Button.Group>
          </Space>
        </Col>
      </Row>
    </div>
  );

  const renderCategories = () => (
    <Card 
      title={
        <Space>
          <FolderOutlined />
          Categories
          <Tag color="blue">{categories.length}</Tag>
        </Space>
      }
      className="categories-card"
      extra={
        <Button type="link" size="small">
          View All
        </Button>
      }
    >
      {categoriesLoading ? (
        <div className="loading-center">
          <Spin />
        </div>
      ) : categories.length > 0 ? (
        <Row gutter={[16, 16]}>
          {categories.slice(0, 6).map(category => (
            <Col xs={24} sm={12} md={8} lg={6} key={category.id}>
              <CategoryCard 
                category={category}
                onClick={() => handleViewCategory(category.id)}
                onSelect={() => handleCategorySelect(category.id)}
                isSelected={selectedCategory === category.id}
              />
            </Col>
          ))}
        </Row>
      ) : (
        <Empty description="No categories found" />
      )}
    </Card>
  );

  const renderArticles = () => (
    <Card 
      className="articles-card"
      title={
        <Space>
          <BookOutlined />
          {activeTab === 'search' && searchQuery ? `Search Results for "${searchQuery}"` :
           activeTab === 'popular' ? 'Popular Articles' :
           activeTab === 'recent' ? 'Recent Articles' :
           selectedCategory ? `Articles in ${categories.find(c => c.id === selectedCategory)?.name || 'Category'}` :
           'All Articles'}
          <Tag color="green">{filteredArticles.length}</Tag>
        </Space>
      }
      extra={
        <Space>
          <Text type="secondary">
            {filteredArticles.length} article{filteredArticles.length !== 1 ? 's' : ''}
          </Text>
          <SearchFilters 
            filters={filters}
            onFiltersChange={setFilters}
            categories={categories}
          />
        </Space>
      }
    >
      {articlesLoading || searchLoading ? (
        <div className="loading-center">
          <Spin size="large" />
        </div>
      ) : filteredArticles.length > 0 ? (
        <Row gutter={[16, 16]}>
          {filteredArticles.map(article => (
            <Col 
              xs={24} 
              sm={viewMode === 'list' ? 24 : 12} 
              lg={viewMode === 'list' ? 24 : 8} 
              xl={viewMode === 'list' ? 24 : 6} 
              key={article.id}
            >
              <ArticleCard 
                article={article}
                onClick={() => handleViewArticle(article.id)}
                viewMode={viewMode}
              />
            </Col>
          ))}
        </Row>
      ) : (
        <Empty 
          description={
            activeTab === 'search' ? 'No articles found matching your search' :
            'No articles found'
          }
        />
      )}
    </Card>
  );

  return (
    <div className="knowledge-base-page">
      {renderBreadcrumb()}
      {renderHeader()}
      {renderSearchBar()}

      <Tabs 
        activeKey={activeTab} 
        onChange={handleTabChange}
        className="kb-tabs"
        tabBarExtraContent={
          <Space>
            <Text type="secondary">
              {stats?.totalArticles || 0} articles • {stats?.totalCategories || 0} categories
            </Text>
          </Space>
        }
      >
        <TabPane tab="All Articles" key="all">
          <Row gutter={[24, 24]}>
            <Col xs={24} lg={6}>
              {renderCategories()}
            </Col>
            <Col xs={24} lg={18}>
              {renderArticles()}
            </Col>
          </Row>
        </TabPane>
        
        <TabPane tab="Popular" key="popular">
          {renderArticles()}
        </TabPane>
        
        <TabPane tab="Recent" key="recent">
          {renderArticles()}
        </TabPane>
        
        {searchQuery && (
          <TabPane tab="Search Results" key="search">
            {renderArticles()}
          </TabPane>
        )}
      </Tabs>
    </div>
  );
};

export default KnowledgeBase;
