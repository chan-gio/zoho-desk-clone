import React, { useState } from 'react'
import { 
  Box,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Chip,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  CircularProgress,
  Typography,
  Stack,
  Tooltip,
  Alert,
  Card,
  CardContent,
  CardHeader,
  Divider
} from '@mui/material'
import { 
  Add as AddIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
  Palette as PaletteIcon
} from '@mui/icons-material'
import { ChromePicker } from 'react-color'
import { 
  usePriorities, 
  useCreatePriority, 
  useUpdatePriority, 
  useDeletePriority 
} from '../../hooks'

const PriorityManagement = () => {
  const [isModalVisible, setIsModalVisible] = useState(false)
  const [editingPriority, setEditingPriority] = useState(null)
  const [formData, setFormData] = useState({
    name: '',
    color: '#1976d2',
    description: ''
  })
  const [showColorPicker, setShowColorPicker] = useState(false)

  // API hooks
  const { data: prioritiesData, isLoading, error } = usePriorities()
  const createPriorityMutation = useCreatePriority()
  const updatePriorityMutation = useUpdatePriority()
  const deletePriorityMutation = useDeletePriority()

  // Xử lý dữ liệu từ API
  const priorities = prioritiesData?.data || []

  const handleAdd = () => {
    setEditingPriority(null)
    setFormData({
      name: '',
      color: '#1976d2',
      description: ''
    })
    setIsModalVisible(true)
  }

  const handleEdit = (priority) => {
    setEditingPriority(priority)
    setFormData({
      name: priority.name,
      color: priority.color,
      description: priority.description || ''
    })
    setIsModalVisible(true)
  }

  const handleDelete = async (id) => {
    try {
      await deletePriorityMutation.mutateAsync(id)
    } catch (error) {
      console.error('Error deleting priority:', error)
    }
  }

  const handleSubmit = async () => {
    try {
      if (editingPriority) {
        await updatePriorityMutation.mutateAsync({
          id: editingPriority.id,
          data: formData
        })
      } else {
        await createPriorityMutation.mutateAsync(formData)
      }
      setIsModalVisible(false)
      setFormData({
        name: '',
        color: '#1976d2',
        description: ''
      })
    } catch (error) {
      console.error('Error saving priority:', error)
    }
  }

  const handleInputChange = (field) => (event) => {
    setFormData(prev => ({
      ...prev,
      [field]: event.target.value
    }))
  }

  const handleColorChange = (color) => {
    setFormData(prev => ({
      ...prev,
      color: color.hex
    }))
  }

  if (isLoading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="200px">
        <CircularProgress size={40} />
      </Box>
    )
  }

  if (error) {
    return (
      <Alert severity="error" sx={{ mb: 2 }}>
        Có lỗi xảy ra khi tải dữ liệu: {error.message}
      </Alert>
    )
  }

  return (
    <Box>
      {/* Header */}
      <Box sx={{ mb: 3, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Typography variant="h6" component="h2" sx={{ fontWeight: 600 }}>
          Danh sách Priority
        </Typography>
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={handleAdd}
          sx={{
            borderRadius: 2,
            textTransform: 'none',
            px: 3,
            py: 1
          }}
        >
          Thêm Priority
        </Button>
      </Box>

      {/* Table */}
      <TableContainer component={Paper} elevation={1} sx={{ borderRadius: 2 }}>
        <Table>
          <TableHead>
            <TableRow sx={{ backgroundColor: 'grey.50' }}>
              <TableCell sx={{ fontWeight: 600 }}>Tên</TableCell>
              <TableCell sx={{ fontWeight: 600 }}>Màu sắc</TableCell>
              <TableCell sx={{ fontWeight: 600 }}>Ngày tạo</TableCell>
              <TableCell sx={{ fontWeight: 600, textAlign: 'center' }}>Thao tác</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {priorities.map((priority) => (
              <TableRow 
                key={priority.id}
                hover
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              >
                <TableCell>
                  <Typography variant="body2" sx={{ fontWeight: 500 }}>
                    {priority.name}
                  </Typography>
                </TableCell>
                <TableCell>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <Box
                      sx={{
                        width: 20,
                        height: 20,
                        backgroundColor: priority.color,
                        borderRadius: 1,
                        border: '1px solid',
                        borderColor: 'grey.300'
                      }}
                    />
                    <Typography variant="body2" color="text.secondary">
                      {priority.color}
                    </Typography>
                  </Box>
                </TableCell>
                <TableCell>
                  <Typography variant="body2" color="text.secondary">
                    {new Date(priority.createdAt).toLocaleDateString('vi-VN')}
                  </Typography>
                </TableCell>
                <TableCell sx={{ textAlign: 'center' }}>
                  <Stack direction="row" spacing={1} justifyContent="center">
                    <Tooltip title="Chỉnh sửa">
                      <IconButton
                        size="small"
                        color="primary"
                        onClick={() => handleEdit(priority)}
                      >
                        <EditIcon fontSize="small" />
                      </IconButton>
                    </Tooltip>
                    <Tooltip title="Xóa">
                      <IconButton
                        size="small"
                        color="error"
                        onClick={() => handleDelete(priority.id)}
                      >
                        <DeleteIcon fontSize="small" />
                      </IconButton>
                    </Tooltip>
                  </Stack>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Empty State */}
      {priorities.length === 0 && (
        <Card sx={{ mt: 2 }}>
          <CardContent sx={{ textAlign: 'center', py: 4 }}>
            <Typography variant="h6" color="text.secondary" gutterBottom>
              Chưa có Priority nào
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
              Hãy tạo Priority đầu tiên để bắt đầu quản lý
            </Typography>
            <Button
              variant="outlined"
              startIcon={<AddIcon />}
              onClick={handleAdd}
              sx={{ textTransform: 'none' }}
            >
              Tạo Priority đầu tiên
            </Button>
          </CardContent>
        </Card>
      )}

      {/* Modal */}
      <Dialog 
        open={isModalVisible} 
        onClose={() => setIsModalVisible(false)}
        maxWidth="sm"
        fullWidth
        PaperProps={{
          sx: { borderRadius: 2 }
        }}
      >
        <DialogTitle sx={{ pb: 1 }}>
          <Typography variant="h6" sx={{ fontWeight: 600 }}>
            {editingPriority ? 'Chỉnh sửa Priority' : 'Thêm Priority mới'}
          </Typography>
        </DialogTitle>
        
        <Divider />
        
        <DialogContent sx={{ pt: 3 }}>
          <Stack spacing={3}>
            <TextField
              fullWidth
              label="Tên Priority"
              value={formData.name}
              onChange={handleInputChange('name')}
              variant="outlined"
              required
              sx={{
                '& .MuiOutlinedInput-root': {
                  borderRadius: 2
                }
              }}
            />

            <Box>
              <Typography variant="body2" sx={{ mb: 1, fontWeight: 500 }}>
                Màu sắc
              </Typography>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                <Box
                  sx={{
                    width: 40,
                    height: 40,
                    backgroundColor: formData.color,
                    borderRadius: 2,
                    border: '2px solid',
                    borderColor: 'grey.300',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}
                  onClick={() => setShowColorPicker(!showColorPicker)}
                >
                  <PaletteIcon sx={{ color: 'white', fontSize: 20 }} />
                </Box>
                <Typography variant="body2" color="text.secondary">
                  {formData.color}
                </Typography>
              </Box>
              
              {showColorPicker && (
                <Box sx={{ mt: 2 }}>
                  <ChromePicker
                    color={formData.color}
                    onChange={handleColorChange}
                  />
                </Box>
              )}
            </Box>
          </Stack>
        </DialogContent>

        <Divider />
        
        <DialogActions sx={{ p: 3 }}>
          <Button
            onClick={() => setIsModalVisible(false)}
            sx={{ textTransform: 'none', borderRadius: 2 }}
          >
            Hủy
          </Button>
          <Button
            onClick={handleSubmit}
            variant="contained"
            disabled={!formData.name.trim()}
            sx={{ textTransform: 'none', borderRadius: 2, px: 3 }}
          >
            {editingPriority ? 'Cập nhật' : 'Tạo'}
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  )
}

export default PriorityManagement
