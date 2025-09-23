import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { customerService } from '../services/customerService'

// Query keys
export const customerKeys = {
  all: ['customers'],
  lists: () => [...customerKeys.all, 'list'],
  list: (filters) => [...customerKeys.lists(), { filters }],
  details: () => [...customerKeys.all, 'detail'],
  detail: (id) => [...customerKeys.details(), id],
  tickets: (customerId) => [...customerKeys.all, 'tickets', customerId],
  stats: (customerId) => [...customerKeys.all, 'stats', customerId],
  notes: (customerId) => [...customerKeys.all, 'notes', customerId],
  activity: (customerId) => [...customerKeys.all, 'activity', customerId],
  vip: () => [...customerKeys.all, 'vip'],
  search: (query) => [...customerKeys.all, 'search', query],
}

// Custom hooks for customers
export const useCustomers = (params = {}) => {
  return useQuery({
    queryKey: customerKeys.list(params),
    queryFn: () => customerService.getCustomers(params),
    staleTime: 5 * 60 * 1000, // 5 minutes
  })
}

export const useCustomer = (id) => {
  return useQuery({
    queryKey: customerKeys.detail(id),
    queryFn: () => customerService.getCustomerById(id),
    enabled: !!id,
    staleTime: 5 * 60 * 1000,
  })
}

export const useCustomerTickets = (customerId, params = {}) => {
  return useQuery({
    queryKey: [...customerKeys.tickets(customerId), params],
    queryFn: () => customerService.getCustomerTickets(customerId, params),
    enabled: !!customerId,
    staleTime: 2 * 60 * 1000, // 2 minutes
  })
}

export const useCustomerStats = (customerId) => {
  return useQuery({
    queryKey: customerKeys.stats(customerId),
    queryFn: () => customerService.getCustomerStats(customerId),
    enabled: !!customerId,
    staleTime: 5 * 60 * 1000, // 5 minutes
  })
}

export const useCustomerNotes = (customerId) => {
  return useQuery({
    queryKey: customerKeys.notes(customerId),
    queryFn: () => customerService.getCustomerNotes(customerId),
    enabled: !!customerId,
    staleTime: 2 * 60 * 1000, // 2 minutes
  })
}

export const useCustomerActivity = (customerId, params = {}) => {
  return useQuery({
    queryKey: [...customerKeys.activity(customerId), params],
    queryFn: () => customerService.getCustomerActivity(customerId, params),
    enabled: !!customerId,
    staleTime: 2 * 60 * 1000, // 2 minutes
  })
}

export const useVipCustomers = () => {
  return useQuery({
    queryKey: customerKeys.vip(),
    queryFn: customerService.getVipCustomers,
    staleTime: 10 * 60 * 1000, // 10 minutes
  })
}

export const useSearchCustomers = (query, params = {}) => {
  return useQuery({
    queryKey: customerKeys.search(query),
    queryFn: () => customerService.searchCustomers(query, params),
    enabled: !!query && query.length > 2,
    staleTime: 1 * 60 * 1000, // 1 minute
  })
}

// Mutations
export const useCreateCustomer = () => {
  const queryClient = useQueryClient()
  
  return useMutation({
    mutationFn: customerService.createCustomer,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: customerKeys.lists() })
      queryClient.invalidateQueries({ queryKey: customerKeys.vip() })
    },
    onError: (error) => {
      console.error('Create customer failed:', error)
    },
  })
}

export const useUpdateCustomer = () => {
  const queryClient = useQueryClient()
  
  return useMutation({
    mutationFn: ({ id, data }) => customerService.updateCustomer(id, data),
    onSuccess: (data, variables) => {
      queryClient.invalidateQueries({ queryKey: customerKeys.lists() })
      queryClient.setQueryData(customerKeys.detail(variables.id), data)
      queryClient.invalidateQueries({ queryKey: customerKeys.vip() })
    },
    onError: (error) => {
      console.error('Update customer failed:', error)
    },
  })
}

export const useDeleteCustomer = () => {
  const queryClient = useQueryClient()
  
  return useMutation({
    mutationFn: customerService.deleteCustomer,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: customerKeys.lists() })
      queryClient.invalidateQueries({ queryKey: customerKeys.vip() })
    },
    onError: (error) => {
      console.error('Delete customer failed:', error)
    },
  })
}

export const useUpdateCustomerStatus = () => {
  const queryClient = useQueryClient()
  
  return useMutation({
    mutationFn: ({ id, status }) => customerService.updateCustomerStatus(id, status),
    onSuccess: (data, variables) => {
      queryClient.invalidateQueries({ queryKey: customerKeys.lists() })
      queryClient.setQueryData(customerKeys.detail(variables.id), data)
      queryClient.invalidateQueries({ queryKey: customerKeys.vip() })
    },
    onError: (error) => {
      console.error('Update customer status failed:', error)
    },
  })
}

export const useAddCustomerNote = () => {
  const queryClient = useQueryClient()
  
  return useMutation({
    mutationFn: ({ customerId, note }) => customerService.addCustomerNote(customerId, note),
    onSuccess: (data, variables) => {
      queryClient.invalidateQueries({ queryKey: customerKeys.notes(variables.customerId) })
      queryClient.invalidateQueries({ queryKey: customerKeys.activity(variables.customerId) })
    },
    onError: (error) => {
      console.error('Add customer note failed:', error)
    },
  })
}

export const useUploadCustomerAvatar = () => {
  const queryClient = useQueryClient()
  
  return useMutation({
    mutationFn: ({ customerId, file, onProgress }) => 
      customerService.uploadCustomerAvatar(customerId, file, onProgress),
    onSuccess: (data, variables) => {
      queryClient.invalidateQueries({ queryKey: customerKeys.detail(variables.customerId) })
      queryClient.invalidateQueries({ queryKey: customerKeys.lists() })
    },
    onError: (error) => {
      console.error('Upload customer avatar failed:', error)
    },
  })
}

export const useUpdateCustomerContact = () => {
  const queryClient = useQueryClient()
  
  return useMutation({
    mutationFn: ({ customerId, contactData }) => 
      customerService.updateCustomerContact(customerId, contactData),
    onSuccess: (data, variables) => {
      queryClient.invalidateQueries({ queryKey: customerKeys.detail(variables.customerId) })
      queryClient.invalidateQueries({ queryKey: customerKeys.lists() })
      queryClient.invalidateQueries({ queryKey: customerKeys.activity(variables.customerId) })
    },
    onError: (error) => {
      console.error('Update customer contact failed:', error)
    },
  })
}
