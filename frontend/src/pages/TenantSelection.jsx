import React, { useState } from 'react'
import { 
  Card, 
  Typography, 
  Avatar, 
  message,
  Spin,
  Alert,
  List
} from 'antd'
import { 
  TeamOutlined,
  GlobalOutlined
} from '@ant-design/icons'
import { useNavigate } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { useUserTenants, useSelectTenant } from '../hooks/useAuth'
import './TenantSelection.scss'

const { Title, Text } = Typography

const TenantSelection = () => {
  const { t } = useTranslation()
  const navigate = useNavigate()
  const [loading, setLoading] = useState(false)

  // Sử dụng hooks để lấy tenants của user
  const { 
    data: tenantsData, 
    isLoading: tenantsLoading, 
    error: tenantsError 
  } = useUserTenants()

  const selectTenantMutation = useSelectTenant()

  // Extract tenants từ response data
  const tenants = tenantsData?.data?.tenants || []

  const handleSelectTenant = async (tenant) => {
    setLoading(true)
    try {
      // Sử dụng API selectTenant để cập nhật JWT với tenantId
      await selectTenantMutation.mutateAsync(tenant.id)
      
      message.success(`Đã chọn tenant: ${tenant.name}`)
      navigate('/dashboard')
    } catch (error) {
      message.error(error.response?.data?.message || 'Có lỗi xảy ra khi chọn tenant!')
    } finally {
      setLoading(false)
    }
  }



  // Hiển thị loading state
  if (tenantsLoading) {
    return (
      <div className="tenant-selection-page">
        <div className="tenant-container">
          <div style={{ textAlign: 'center', padding: '50px' }}>
            <Spin size="large" />
            <div style={{ marginTop: '16px' }}>
              <Text>Đang tải danh sách tenants...</Text>
            </div>
          </div>
        </div>
      </div>
    )
  }

  // Hiển thị error state
  if (tenantsError) {
    return (
      <div className="tenant-selection-page">
        <div className="tenant-container">
          <Alert
            message="Lỗi tải dữ liệu"
            description={tenantsError.response?.data?.message || 'Không thể tải danh sách tenants. Vui lòng thử lại.'}
            type="error"
            showIcon
            style={{ marginBottom: '24px' }}
          />
        </div>
      </div>
    )
  }

  return (
    <div className="tenant-selection-page" style={{ 
      display: 'flex', 
      justifyContent: 'center', 
      alignItems: 'center', 
      minHeight: '100vh',
      padding: '20px'
    }}>
      <div style={{ width: '100%', maxWidth: '600px' }}>
        <div style={{ textAlign: 'center', marginBottom: '40px' }}>
          <Title level={2}>Chọn Tenant</Title>
          <Text type="secondary">
            Chọn tenant bạn muốn truy cập
          </Text>
        </div>

        <List
          dataSource={tenants}
          renderItem={(tenant) => (
            <List.Item>
              <Card 
                hoverable
                onClick={() => handleSelectTenant(tenant)}
                loading={loading}
                style={{ width: '100%', cursor: 'pointer' }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                  <Avatar size={48} style={{ backgroundColor: '#1890ff' }}>
                    {tenant.logo || '🏢'}
                  </Avatar>
                  <div style={{ flex: 1 }}>
                    <Title level={4} style={{ margin: 0 }}>
                      {tenant.name}
                    </Title>
                    <Text type="secondary">
                      {tenant.domain || `${tenant.name.toLowerCase()}.zohodesk.com`}
                    </Text>
                    <div style={{ marginTop: '8px', display: 'flex', gap: '16px' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                        <TeamOutlined />
                        <Text strong>{tenant._count?.users || 0}</Text>
                        <Text type="secondary">Users</Text>
                      </div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                        <GlobalOutlined />
                        <Text strong>{tenant._count?.tickets || 0}</Text>
                        <Text type="secondary">Tickets</Text>
                      </div>
                    </div>
                  </div>
                </div>
              </Card>
            </List.Item>
          )}
        />

        {tenants.length === 0 && (
          <div style={{ textAlign: 'center', padding: '40px' }}>
            <Text type="secondary">Không có tenant nào</Text>
          </div>
        )}
      </div>
    </div>
  )
}

export default TenantSelection
