import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { ticketService } from '../services/ticketService'

// Query keys
export const ticketKeys = {
  all: ['tickets'],
  lists: () => [...ticketKeys.all, 'list'],
  list: (filters) => [...ticketKeys.lists(), { filters }],
  details: () => [...ticketKeys.all, 'detail'],
  detail: (id) => [...ticketKeys.details(), id],
  comments: (ticketId) => [...ticketKeys.all, 'comments', ticketId],
  history: (ticketId) => [...ticketKeys.all, 'history', ticketId],
  attachments: (ticketId) => [...ticketKeys.all, 'attachments', ticketId],
  customers: () => [...ticketKeys.all, 'customers'],
  agents: () => [...ticketKeys.all, 'agents'],
  stats: () => [...ticketKeys.all, 'stats'],
  search: (query) => [...ticketKeys.all, 'search', query],
}

// Custom hooks for tickets
export const useTickets = (params = {}) => {
  return useQuery({
    queryKey: ticketKeys.list(params),
    queryFn: () => ticketService.getTickets(params),
    staleTime: 2 * 60 * 1000, // 2 minutes
  })
}

export const useTicket = (id) => {
  return useQuery({
    queryKey: ticketKeys.detail(id),
    queryFn: () => ticketService.getTicketById(id),
    enabled: !!id,
    staleTime: 2 * 60 * 1000,
  })
}

export const useTicketComments = (ticketId) => {
  return useQuery({
    queryKey: ticketKeys.comments(ticketId),
    queryFn: () => ticketService.getTicketComments(ticketId),
    enabled: !!ticketId,
    staleTime: 1 * 60 * 1000, // 1 minute
  })
}

export const useTicketHistory = (ticketId) => {
  return useQuery({
    queryKey: ticketKeys.history(ticketId),
    queryFn: () => ticketService.getTicketHistory(ticketId),
    enabled: !!ticketId,
    staleTime: 5 * 60 * 1000, // 5 minutes
  })
}

export const useTicketAttachments = (ticketId) => {
  return useQuery({
    queryKey: ticketKeys.attachments(ticketId),
    queryFn: () => ticketService.getTicketAttachments(ticketId),
    enabled: !!ticketId,
    staleTime: 10 * 60 * 1000, // 10 minutes
  })
}

export const useTicketCustomers = () => {
  return useQuery({
    queryKey: ticketKeys.customers(),
    queryFn: ticketService.getCustomers,
    staleTime: 10 * 60 * 1000, // 10 minutes
  })
}

export const useTicketAgents = () => {
  return useQuery({
    queryKey: ticketKeys.agents(),
    queryFn: ticketService.getAgents,
    staleTime: 10 * 60 * 1000, // 10 minutes
  })
}

export const useTicketStats = () => {
  return useQuery({
    queryKey: ticketKeys.stats(),
    queryFn: ticketService.getStats,
    staleTime: 5 * 60 * 1000, // 5 minutes
  })
}

export const useSearchTickets = (query, params = {}) => {
  return useQuery({
    queryKey: ticketKeys.search(query),
    queryFn: () => ticketService.searchTickets(query, params),
    enabled: !!query && query.length > 2,
    staleTime: 1 * 60 * 1000, // 1 minute
  })
}

// Mutations
export const useCreateTicket = () => {
  const queryClient = useQueryClient()
  
  return useMutation({
    mutationFn: ticketService.createTicket,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ticketKeys.lists() })
      queryClient.invalidateQueries({ queryKey: ticketKeys.stats() })
    },
    onError: (error) => {
      console.error('Create ticket failed:', error)
    },
  })
}

export const useUpdateTicket = () => {
  const queryClient = useQueryClient()
  
  return useMutation({
    mutationFn: ticketService.updateTicket,
    onSuccess: (data, variables) => {
      queryClient.invalidateQueries({ queryKey: ticketKeys.lists() })
      queryClient.setQueryData(ticketKeys.detail(variables.id), data)
      queryClient.invalidateQueries({ queryKey: ticketKeys.history(variables.id) })
    },
    onError: (error) => {
      console.error('Update ticket failed:', error)
    },
  })
}

export const useDeleteTicket = () => {
  const queryClient = useQueryClient()
  
  return useMutation({
    mutationFn: ticketService.deleteTicket,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ticketKeys.lists() })
      queryClient.invalidateQueries({ queryKey: ticketKeys.stats() })
    },
    onError: (error) => {
      console.error('Delete ticket failed:', error)
    },
  })
}

export const useAddComment = () => {
  const queryClient = useQueryClient()
  
  return useMutation({
    mutationFn: ticketService.addComment,
    onSuccess: (data, variables) => {
      queryClient.invalidateQueries({ queryKey: ticketKeys.comments(variables.ticketId) })
      queryClient.invalidateQueries({ queryKey: ticketKeys.history(variables.ticketId) })
      queryClient.invalidateQueries({ queryKey: ticketKeys.detail(variables.ticketId) })
    },
    onError: (error) => {
      console.error('Add comment failed:', error)
    },
  })
}

export const useAssignTicket = () => {
  const queryClient = useQueryClient()
  
  return useMutation({
    mutationFn: ticketService.assignTicket,
    onSuccess: (data, variables) => {
      queryClient.invalidateQueries({ queryKey: ticketKeys.detail(variables.ticketId) })
      queryClient.invalidateQueries({ queryKey: ticketKeys.history(variables.ticketId) })
      queryClient.invalidateQueries({ queryKey: ticketKeys.lists() })
    },
    onError: (error) => {
      console.error('Assign ticket failed:', error)
    },
  })
}

export const useUploadAttachment = () => {
  const queryClient = useQueryClient()
  
  return useMutation({
    mutationFn: ({ ticketId, file, onProgress }) => 
      ticketService.uploadAttachment(ticketId, file, onProgress),
    onSuccess: (data, variables) => {
      queryClient.invalidateQueries({ queryKey: ticketKeys.attachments(variables.ticketId) })
      queryClient.invalidateQueries({ queryKey: ticketKeys.detail(variables.ticketId) })
    },
    onError: (error) => {
      console.error('Upload attachment failed:', error)
    },
  })
}

export const useDownloadAttachment = () => {
  return useMutation({
    mutationFn: ({ ticketId, attachmentId, filename }) => 
      ticketService.downloadAttachment(ticketId, attachmentId, filename),
    onError: (error) => {
      console.error('Download attachment failed:', error)
    },
  })
}

export const useDeleteAttachment = () => {
  const queryClient = useQueryClient()
  
  return useMutation({
    mutationFn: ({ ticketId, attachmentId }) => 
      ticketService.deleteAttachment(ticketId, attachmentId),
    onSuccess: (data, variables) => {
      queryClient.invalidateQueries({ queryKey: ticketKeys.attachments(variables.ticketId) })
      queryClient.invalidateQueries({ queryKey: ticketKeys.detail(variables.ticketId) })
    },
    onError: (error) => {
      console.error('Delete attachment failed:', error)
    },
  })
}

export const useChangeTicketStatus = () => {
  const queryClient = useQueryClient()
  
  return useMutation({
    mutationFn: ({ ticketId, status, comment }) => 
      ticketService.changeTicketStatus(ticketId, status, comment),
    onSuccess: (data, variables) => {
      queryClient.invalidateQueries({ queryKey: ticketKeys.detail(variables.ticketId) })
      queryClient.invalidateQueries({ queryKey: ticketKeys.history(variables.ticketId) })
      queryClient.invalidateQueries({ queryKey: ticketKeys.lists() })
      queryClient.invalidateQueries({ queryKey: ticketKeys.stats() })
    },
    onError: (error) => {
      console.error('Change ticket status failed:', error)
    },
  })
}

export const useChangeTicketPriority = () => {
  const queryClient = useQueryClient()
  
  return useMutation({
    mutationFn: ({ ticketId, priority }) => 
      ticketService.changeTicketPriority(ticketId, priority),
    onSuccess: (data, variables) => {
      queryClient.invalidateQueries({ queryKey: ticketKeys.detail(variables.ticketId) })
      queryClient.invalidateQueries({ queryKey: ticketKeys.history(variables.ticketId) })
      queryClient.invalidateQueries({ queryKey: ticketKeys.lists() })
    },
    onError: (error) => {
      console.error('Change ticket priority failed:', error)
    },
  })
}

export const useAddTag = () => {
  const queryClient = useQueryClient()
  
  return useMutation({
    mutationFn: ({ ticketId, tag }) => ticketService.addTag(ticketId, tag),
    onSuccess: (data, variables) => {
      queryClient.invalidateQueries({ queryKey: ticketKeys.detail(variables.ticketId) })
      queryClient.invalidateQueries({ queryKey: ticketKeys.lists() })
    },
    onError: (error) => {
      console.error('Add tag failed:', error)
    },
  })
}

export const useRemoveTag = () => {
  const queryClient = useQueryClient()
  
  return useMutation({
    mutationFn: ({ ticketId, tag }) => ticketService.removeTag(ticketId, tag),
    onSuccess: (data, variables) => {
      queryClient.invalidateQueries({ queryKey: ticketKeys.detail(variables.ticketId) })
      queryClient.invalidateQueries({ queryKey: ticketKeys.lists() })
    },
    onError: (error) => {
      console.error('Remove tag failed:', error)
    },
  })
}
