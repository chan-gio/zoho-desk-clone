import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { workflowService } from '../services/workflowService'

// Query keys
export const workflowKeys = {
  all: ['workflows'],
  lists: () => [...workflowKeys.all, 'list'],
  list: (filters) => [...workflowKeys.lists(), { filters }],
  details: () => [...workflowKeys.all, 'detail'],
  detail: (id) => [...workflowKeys.details(), id],
  runs: (workflowId) => [...workflowKeys.all, 'runs', workflowId],
  run: (workflowId, runId) => [...workflowKeys.all, 'run', workflowId, runId],
  triggers: () => [...workflowKeys.all, 'triggers'],
  actions: () => [...workflowKeys.all, 'actions'],
  conditions: () => [...workflowKeys.all, 'conditions'],
  stats: (id) => [...workflowKeys.all, 'stats', id],
  popular: () => [...workflowKeys.all, 'popular'],
}

// Custom hooks for workflows
export const useWorkflows = (params = {}) => {
  return useQuery({
    queryKey: workflowKeys.list(params),
    queryFn: () => workflowService.getWorkflows(params),
    staleTime: 5 * 60 * 1000, // 5 minutes
  })
}

export const useWorkflow = (id) => {
  return useQuery({
    queryKey: workflowKeys.detail(id),
    queryFn: () => workflowService.getWorkflowById(id),
    enabled: !!id,
    staleTime: 5 * 60 * 1000,
  })
}

export const useWorkflowRuns = (workflowId, params = {}) => {
  return useQuery({
    queryKey: [...workflowKeys.runs(workflowId), params],
    queryFn: () => workflowService.getWorkflowRuns(workflowId, params),
    enabled: !!workflowId,
    staleTime: 2 * 60 * 1000, // 2 minutes
  })
}

export const useWorkflowRun = (workflowId, runId) => {
  return useQuery({
    queryKey: workflowKeys.run(workflowId, runId),
    queryFn: () => workflowService.getWorkflowRunById(workflowId, runId),
    enabled: !!workflowId && !!runId,
    staleTime: 1 * 60 * 1000, // 1 minute
  })
}

export const useWorkflowTriggers = () => {
  return useQuery({
    queryKey: workflowKeys.triggers(),
    queryFn: workflowService.getTriggers,
    staleTime: 10 * 60 * 1000, // 10 minutes
  })
}

export const useWorkflowActions = () => {
  return useQuery({
    queryKey: workflowKeys.actions(),
    queryFn: workflowService.getActions,
    staleTime: 10 * 60 * 1000, // 10 minutes
  })
}

export const useWorkflowConditions = () => {
  return useQuery({
    queryKey: workflowKeys.conditions(),
    queryFn: workflowService.getConditions,
    staleTime: 10 * 60 * 1000, // 10 minutes
  })
}

export const useWorkflowStats = (id) => {
  return useQuery({
    queryKey: workflowKeys.stats(id),
    queryFn: () => workflowService.getWorkflowStats(id),
    enabled: !!id,
    staleTime: 5 * 60 * 1000, // 5 minutes
  })
}

export const usePopularWorkflows = (params = {}) => {
  return useQuery({
    queryKey: [...workflowKeys.popular(), params],
    queryFn: () => workflowService.getPopularWorkflows(params),
    staleTime: 10 * 60 * 1000, // 10 minutes
  })
}

// Mutations
export const useCreateWorkflow = () => {
  const queryClient = useQueryClient()
  
  return useMutation({
    mutationFn: workflowService.createWorkflow,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: workflowKeys.lists() })
      queryClient.invalidateQueries({ queryKey: workflowKeys.popular() })
    },
    onError: (error) => {
      console.error('Create workflow failed:', error)
    },
  })
}

export const useUpdateWorkflow = () => {
  const queryClient = useQueryClient()
  
  return useMutation({
    mutationFn: ({ id, data }) => workflowService.updateWorkflow(id, data),
    onSuccess: (data, variables) => {
      queryClient.invalidateQueries({ queryKey: workflowKeys.lists() })
      queryClient.setQueryData(workflowKeys.detail(variables.id), data)
    },
    onError: (error) => {
      console.error('Update workflow failed:', error)
    },
  })
}

export const useDeleteWorkflow = () => {
  const queryClient = useQueryClient()
  
  return useMutation({
    mutationFn: workflowService.deleteWorkflow,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: workflowKeys.lists() })
      queryClient.invalidateQueries({ queryKey: workflowKeys.popular() })
    },
    onError: (error) => {
      console.error('Delete workflow failed:', error)
    },
  })
}

export const useActivateWorkflow = () => {
  const queryClient = useQueryClient()
  
  return useMutation({
    mutationFn: workflowService.activateWorkflow,
    onSuccess: (data, variables) => {
      queryClient.invalidateQueries({ queryKey: workflowKeys.lists() })
      queryClient.setQueryData(workflowKeys.detail(variables), data)
    },
    onError: (error) => {
      console.error('Activate workflow failed:', error)
    },
  })
}

export const useDeactivateWorkflow = () => {
  const queryClient = useQueryClient()
  
  return useMutation({
    mutationFn: workflowService.deactivateWorkflow,
    onSuccess: (data, variables) => {
      queryClient.invalidateQueries({ queryKey: workflowKeys.lists() })
      queryClient.setQueryData(workflowKeys.detail(variables), data)
    },
    onError: (error) => {
      console.error('Deactivate workflow failed:', error)
    },
  })
}

export const useRunWorkflow = () => {
  const queryClient = useQueryClient()
  
  return useMutation({
    mutationFn: ({ workflowId, ticketId, triggerData }) => 
      workflowService.runWorkflow(workflowId, ticketId, triggerData),
    onSuccess: (data, variables) => {
      queryClient.invalidateQueries({ queryKey: workflowKeys.runs(variables.workflowId) })
      queryClient.invalidateQueries({ queryKey: workflowKeys.stats(variables.workflowId) })
    },
    onError: (error) => {
      console.error('Run workflow failed:', error)
    },
  })
}

export const useStopWorkflowRun = () => {
  const queryClient = useQueryClient()
  
  return useMutation({
    mutationFn: ({ workflowId, runId }) => 
      workflowService.stopWorkflowRun(workflowId, runId),
    onSuccess: (data, variables) => {
      queryClient.invalidateQueries({ queryKey: workflowKeys.runs(variables.workflowId) })
      queryClient.invalidateQueries({ queryKey: workflowKeys.run(variables.workflowId, variables.runId) })
    },
    onError: (error) => {
      console.error('Stop workflow run failed:', error)
    },
  })
}

export const useTestWorkflow = () => {
  return useMutation({
    mutationFn: ({ workflowData, testData }) => 
      workflowService.testWorkflow(workflowData, testData),
    onError: (error) => {
      console.error('Test workflow failed:', error)
    },
  })
}

export const useCloneWorkflow = () => {
  const queryClient = useQueryClient()
  
  return useMutation({
    mutationFn: ({ id, newName }) => workflowService.cloneWorkflow(id, newName),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: workflowKeys.lists() })
    },
    onError: (error) => {
      console.error('Clone workflow failed:', error)
    },
  })
}

export const useExportWorkflow = () => {
  return useMutation({
    mutationFn: workflowService.exportWorkflow,
    onError: (error) => {
      console.error('Export workflow failed:', error)
    },
  })
}

export const useImportWorkflow = () => {
  const queryClient = useQueryClient()
  
  return useMutation({
    mutationFn: workflowService.importWorkflow,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: workflowKeys.lists() })
    },
    onError: (error) => {
      console.error('Import workflow failed:', error)
    },
  })
}
