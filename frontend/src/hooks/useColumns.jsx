import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { columnService } from '../services/columnService'

// Query keys
export const columnKeys = {
  all: ['columns'],
  lists: () => [...columnKeys.all, 'list'],
  list: (filters) => [...columnKeys.lists(), { filters }],
  details: () => [...columnKeys.all, 'detail'],
  detail: (id) => [...columnKeys.details(), id],
  tickets: (columnId) => [...columnKeys.all, 'tickets', columnId],
  settings: (id) => [...columnKeys.all, 'settings', id],
  stats: (id) => [...columnKeys.all, 'stats', id],
  activity: (id) => [...columnKeys.all, 'activity', id],
  archived: () => [...columnKeys.all, 'archived'],
  hierarchy: () => [...columnKeys.all, 'hierarchy'],
}

// Custom hooks for columns
export const useColumns = (params = {}) => {
  return useQuery({
    queryKey: columnKeys.list(params),
    queryFn: () => columnService.getColumnsByTenant(params),
    staleTime: 5 * 60 * 1000, // 5 minutes
  })
}

export const useColumn = (id) => {
  return useQuery({
    queryKey: columnKeys.detail(id),
    queryFn: () => columnService.getColumnById(id),
    enabled: !!id,
    staleTime: 5 * 60 * 1000,
  })
}

export const useColumnTickets = (columnId, params = {}) => {
  return useQuery({
    queryKey: [...columnKeys.tickets(columnId), params],
    queryFn: () => columnService.getTicketsByColumn(columnId, params),
    enabled: !!columnId,
    staleTime: 2 * 60 * 1000, // 2 minutes
  })
}

export const useColumnSettings = (id) => {
  return useQuery({
    queryKey: columnKeys.settings(id),
    queryFn: () => columnService.getColumnSettings(id),
    enabled: !!id,
    staleTime: 10 * 60 * 1000, // 10 minutes
  })
}

export const useColumnStats = (id) => {
  return useQuery({
    queryKey: columnKeys.stats(id),
    queryFn: () => columnService.getColumnStats(id),
    enabled: !!id,
    staleTime: 5 * 60 * 1000, // 5 minutes
  })
}

export const useColumnActivity = (id, params = {}) => {
  return useQuery({
    queryKey: [...columnKeys.activity(id), params],
    queryFn: () => columnService.getColumnActivity(id, params),
    enabled: !!id,
    staleTime: 2 * 60 * 1000, // 2 minutes
  })
}

export const useArchivedColumns = (params = {}) => {
  return useQuery({
    queryKey: [...columnKeys.archived(), params],
    queryFn: () => columnService.getArchivedColumns(params),
    staleTime: 10 * 60 * 1000, // 10 minutes
  })
}

export const useColumnHierarchy = () => {
  return useQuery({
    queryKey: columnKeys.hierarchy(),
    queryFn: columnService.getDepartmentHierarchy,
    staleTime: 10 * 60 * 1000, // 10 minutes
  })
}

// Mutations
export const useInitializeDefaultColumns = () => {
  const queryClient = useQueryClient()
  
  return useMutation({
    mutationFn: columnService.initializeDefaultColumns,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: columnKeys.lists() })
      queryClient.invalidateQueries({ queryKey: columnKeys.hierarchy() })
    },
    onError: (error) => {
      console.error('Initialize default columns failed:', error)
    },
  })
}

export const useCreateColumn = () => {
  const queryClient = useQueryClient()
  
  return useMutation({
    mutationFn: columnService.createColumn,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: columnKeys.lists() })
      queryClient.invalidateQueries({ queryKey: columnKeys.hierarchy() })
    },
    onError: (error) => {
      console.error('Create column failed:', error)
    },
  })
}

export const useUpdateColumn = () => {
  const queryClient = useQueryClient()
  
  return useMutation({
    mutationFn: ({ id, data }) => columnService.updateColumn(id, data),
    onSuccess: (data, variables) => {
      queryClient.invalidateQueries({ queryKey: columnKeys.lists() })
      queryClient.setQueryData(columnKeys.detail(variables.id), data)
    },
    onError: (error) => {
      console.error('Update column failed:', error)
    },
  })
}

export const useDeleteColumn = () => {
  const queryClient = useQueryClient()
  
  return useMutation({
    mutationFn: columnService.deleteColumn,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: columnKeys.lists() })
      queryClient.invalidateQueries({ queryKey: columnKeys.hierarchy() })
    },
    onError: (error) => {
      console.error('Delete column failed:', error)
    },
  })
}

export const useReorderColumns = () => {
  const queryClient = useQueryClient()
  
  return useMutation({
    mutationFn: columnService.reorderColumns,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: columnKeys.lists() })
      queryClient.invalidateQueries({ queryKey: columnKeys.hierarchy() })
    },
    onError: (error) => {
      console.error('Reorder columns failed:', error)
    },
  })
}

export const useMoveTicketToColumn = () => {
  const queryClient = useQueryClient()
  
  return useMutation({
    mutationFn: ({ ticketId, fromColumnId, toColumnId, position }) => 
      columnService.moveTicketToColumn(ticketId, fromColumnId, toColumnId, position),
    onSuccess: (data, variables) => {
      // Invalidate both source and destination column tickets
      queryClient.invalidateQueries({ queryKey: columnKeys.tickets(variables.fromColumnId) })
      queryClient.invalidateQueries({ queryKey: columnKeys.tickets(variables.toColumnId) })
      queryClient.invalidateQueries({ queryKey: columnKeys.stats(variables.fromColumnId) })
      queryClient.invalidateQueries({ queryKey: columnKeys.stats(variables.toColumnId) })
      queryClient.invalidateQueries({ queryKey: columnKeys.activity(variables.fromColumnId) })
      queryClient.invalidateQueries({ queryKey: columnKeys.activity(variables.toColumnId) })
    },
    onError: (error) => {
      console.error('Move ticket to column failed:', error)
    },
  })
}

export const useReorderTicketsInColumn = () => {
  const queryClient = useQueryClient()
  
  return useMutation({
    mutationFn: ({ columnId, ticketOrder }) => 
      columnService.reorderTicketsInColumn(columnId, ticketOrder),
    onSuccess: (data, variables) => {
      queryClient.invalidateQueries({ queryKey: columnKeys.tickets(variables.columnId) })
      queryClient.invalidateQueries({ queryKey: columnKeys.activity(variables.columnId) })
    },
    onError: (error) => {
      console.error('Reorder tickets in column failed:', error)
    },
  })
}

export const useUpdateColumnSettings = () => {
  const queryClient = useQueryClient()
  
  return useMutation({
    mutationFn: ({ id, settings }) => columnService.updateColumnSettings(id, settings),
    onSuccess: (data, variables) => {
      queryClient.setQueryData(columnKeys.settings(variables.id), data)
      queryClient.invalidateQueries({ queryKey: columnKeys.detail(variables.id) })
    },
    onError: (error) => {
      console.error('Update column settings failed:', error)
    },
  })
}

export const useCloneColumn = () => {
  const queryClient = useQueryClient()
  
  return useMutation({
    mutationFn: ({ id, newName }) => columnService.cloneColumn(id, newName),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: columnKeys.lists() })
    },
    onError: (error) => {
      console.error('Clone column failed:', error)
    },
  })
}

export const useArchiveColumn = () => {
  const queryClient = useQueryClient()
  
  return useMutation({
    mutationFn: columnService.archiveColumn,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: columnKeys.lists() })
      queryClient.invalidateQueries({ queryKey: columnKeys.archived() })
    },
    onError: (error) => {
      console.error('Archive column failed:', error)
    },
  })
}

export const useRestoreColumn = () => {
  const queryClient = useQueryClient()
  
  return useMutation({
    mutationFn: columnService.restoreColumn,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: columnKeys.lists() })
      queryClient.invalidateQueries({ queryKey: columnKeys.archived() })
    },
    onError: (error) => {
      console.error('Restore column failed:', error)
    },
  })
}

export const useMoveMultipleTickets = () => {
  const queryClient = useQueryClient()
  
  return useMutation({
    mutationFn: ({ ticketIds, fromColumnId, toColumnId }) => 
      columnService.moveMultipleTickets(ticketIds, fromColumnId, toColumnId),
    onSuccess: (data, variables) => {
      // Invalidate both source and destination column tickets
      queryClient.invalidateQueries({ queryKey: columnKeys.tickets(variables.fromColumnId) })
      queryClient.invalidateQueries({ queryKey: columnKeys.tickets(variables.toColumnId) })
      queryClient.invalidateQueries({ queryKey: columnKeys.stats(variables.fromColumnId) })
      queryClient.invalidateQueries({ queryKey: columnKeys.stats(variables.toColumnId) })
      queryClient.invalidateQueries({ queryKey: columnKeys.activity(variables.fromColumnId) })
      queryClient.invalidateQueries({ queryKey: columnKeys.activity(variables.toColumnId) })
    },
    onError: (error) => {
      console.error('Move multiple tickets failed:', error)
    },
  })
}

export const useUpdateMultipleColumns = () => {
  const queryClient = useQueryClient()
  
  return useMutation({
    mutationFn: columnService.updateMultipleColumns,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: columnKeys.lists() })
    },
    onError: (error) => {
      console.error('Update multiple columns failed:', error)
    },
  })
}
