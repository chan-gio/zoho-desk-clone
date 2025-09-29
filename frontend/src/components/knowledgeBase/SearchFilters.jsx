import React from 'react';
import { Button, Dropdown, Menu, Space, Tag } from 'antd';
import { FilterOutlined, DownOutlined } from '@ant-design/icons';

const SearchFilters = ({ filters, onFiltersChange, categories }) => {
  const handleStatusChange = (status) => {
    onFiltersChange({
      ...filters,
      status: status === filters.status ? null : status
    });
  };

  const handleTagToggle = (tag) => {
    const currentTags = filters.tags || [];
    const newTags = currentTags.includes(tag)
      ? currentTags.filter(t => t !== tag)
      : [...currentTags, tag];
    
    onFiltersChange({
      ...filters,
      tags: newTags
    });
  };

  const statusMenu = (
    <Menu>
      <Menu.Item 
        key="all"
        onClick={() => handleStatusChange(null)}
        className={!filters.status ? 'selected' : ''}
      >
        All Status
      </Menu.Item>
      <Menu.Item 
        key="published"
        onClick={() => handleStatusChange('published')}
        className={filters.status === 'published' ? 'selected' : ''}
      >
        Published
      </Menu.Item>
      <Menu.Item 
        key="draft"
        onClick={() => handleStatusChange('draft')}
        className={filters.status === 'draft' ? 'selected' : ''}
      >
        Draft
      </Menu.Item>
      <Menu.Item 
        key="archived"
        onClick={() => handleStatusChange('archived')}
        className={filters.status === 'archived' ? 'selected' : ''}
      >
        Archived
      </Menu.Item>
    </Menu>
  );

  const categoryMenu = (
    <Menu>
      <Menu.Item 
        key="all"
        onClick={() => onFiltersChange({ ...filters, category: null })}
        className={!filters.category ? 'selected' : ''}
      >
        All Categories
      </Menu.Item>
      {categories.map(category => (
        <Menu.Item 
          key={category.id}
          onClick={() => onFiltersChange({ ...filters, category: category.id })}
          className={filters.category === category.id ? 'selected' : ''}
        >
          {category.name}
        </Menu.Item>
      ))}
    </Menu>
  );

  const getActiveFiltersCount = () => {
    let count = 0;
    if (filters.status) count++;
    if (filters.category) count++;
    if (filters.tags && filters.tags.length > 0) count++;
    if (filters.dateRange) count++;
    return count;
  };

  const activeFiltersCount = getActiveFiltersCount();

  return (
    <Space wrap>
      {/* Status Filter */}
      <Dropdown overlay={statusMenu} trigger={['click']}>
        <Button>
          Status <DownOutlined />
        </Button>
      </Dropdown>

      {/* Category Filter */}
      <Dropdown overlay={categoryMenu} trigger={['click']}>
        <Button>
          Category <DownOutlined />
        </Button>
      </Dropdown>

      {/* Active Filters */}
      {activeFiltersCount > 0 && (
        <Space wrap>
          {filters.status && (
            <Tag 
              closable 
              onClose={() => handleStatusChange(null)}
              color="blue"
            >
              Status: {filters.status}
            </Tag>
          )}
          
          {filters.category && (
            <Tag 
              closable 
              onClose={() => onFiltersChange({ ...filters, category: null })}
              color="green"
            >
              Category: {categories.find(c => c.id === filters.category)?.name || 'Unknown'}
            </Tag>
          )}
          
          {filters.tags && filters.tags.map(tag => (
            <Tag 
              key={tag}
              closable 
              onClose={() => handleTagToggle(tag)}
              color="purple"
            >
              {tag}
            </Tag>
          ))}
        </Space>
      )}

      {/* Clear All */}
      {activeFiltersCount > 0 && (
        <Button 
          type="link" 
          onClick={() => onFiltersChange({ status: null, category: null, tags: [], dateRange: null })}
        >
          Clear All
        </Button>
      )}
    </Space>
  );
};

export default SearchFilters;
