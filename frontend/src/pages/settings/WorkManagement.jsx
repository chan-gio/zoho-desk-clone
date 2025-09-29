import React, { useState } from 'react'
import { 
  Box, 
  Paper, 
  Typography, 
  Tabs, 
  Tab, 
  Card,
  CardContent,
  Divider
} from '@mui/material'
import { 
  usePriorities, 
  useCreatePriority, 
  useUpdatePriority, 
  useDeletePriority,
  useStatuses,
  useCreateStatus,
  useUpdateStatus,
  useDeleteStatus
} from '../../hooks'
import PriorityManagement from './PriorityManagement'
import StatusManagement from './StatusManagement'

function TabPanel({ children, value, index, ...other }) {
  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`work-tabpanel-${index}`}
      aria-labelledby={`work-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          {children}
        </Box>
      )}
    </div>
  )
}

const WorkManagement = () => {
  const [activeTab, setActiveTab] = useState(0)

  const handleTabChange = (event, newValue) => {
    setActiveTab(newValue)
  }

  return (
    <Box>
      {/* Header */}
      <Box sx={{ mb: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom sx={{ 
          fontWeight: 600,
          color: 'primary.main',
          display: 'flex',
          alignItems: 'center',
          gap: 2
        }}>
          Công việc
        </Typography>
        <Typography variant="body1" color="text.secondary" sx={{ mb: 2 }}>
          Quản lý các mức độ ưu tiên và trạng thái công việc
        </Typography>
        <Divider />
      </Box>

      {/* Main Content */}
      <Paper elevation={2} sx={{ borderRadius: 2, overflow: 'hidden' }}>
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <Tabs 
            value={activeTab} 
            onChange={handleTabChange}
            aria-label="work management tabs"
            sx={{
              px: 3,
              '& .MuiTab-root': {
                textTransform: 'none',
                fontSize: '16px',
                fontWeight: 500,
                minHeight: 64,
                px: 3
              }
            }}
          >
            <Tab 
              label="Quản lý Priority" 
              id="work-tab-0"
              aria-controls="work-tabpanel-0"
            />
            <Tab 
              label="Quản lý Status" 
              id="work-tab-1"
              aria-controls="work-tabpanel-1"
            />
          </Tabs>
        </Box>

        <TabPanel value={activeTab} index={0}>
          <PriorityManagement />
        </TabPanel>
        
        <TabPanel value={activeTab} index={1}>
          <StatusManagement />
        </TabPanel>
      </Paper>
    </Box>
  )
}

export default WorkManagement
