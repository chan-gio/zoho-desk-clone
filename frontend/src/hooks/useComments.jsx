import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { commentService } from '../services/commentService'

// Query keys
export const commentKeys = {
  all: ['comments'],
  lists: () => [...commentKeys.all, 'list'],
  list: (filters) => [...commentKeys.lists(), { filters }],
  details: () => [...commentKeys.all, 'detail'],
  detail: (id) => [...commentKeys.details(), id],
  byTicket: (ticketId) => [...commentKeys.all, 'byTicket', ticketId],
  attachments: (commentId) => [...commentKeys.all, 'attachments', commentId],
  likes: (commentId) => [...commentKeys.all, 'likes', commentId],
}

// Custom hooks for comments
export const useComments = (params = {}) => {
  return useQuery({
    queryKey: commentKeys.list(params),
    queryFn: () => commentService.getComments(params),
    staleTime: 2 * 60 * 1000, // 2 minutes
  })
}

export const useComment = (id) => {
  return useQuery({
    queryKey: commentKeys.detail(id),
    queryFn: () => commentService.getCommentById(id),
    enabled: !!id,
    staleTime: 5 * 60 * 1000, // 5 minutes
  })
}

export const useCommentsByTicket = (ticketId, params = {}) => {
  return useQuery({
    queryKey: [...commentKeys.byTicket(ticketId), params],
    queryFn: () => commentService.getCommentsByTicket(ticketId, params),
    enabled: !!ticketId,
    staleTime: 1 * 60 * 1000, // 1 minute
  })
}

export const useCommentAttachments = (commentId) => {
  return useQuery({
    queryKey: commentKeys.attachments(commentId),
    queryFn: () => commentService.getCommentAttachments(commentId),
    enabled: !!commentId,
    staleTime: 10 * 60 * 1000, // 10 minutes
  })
}

export const useCommentLikes = (commentId) => {
  return useQuery({
    queryKey: commentKeys.likes(commentId),
    queryFn: () => commentService.getCommentLikes(commentId),
    enabled: !!commentId,
    staleTime: 2 * 60 * 1000, // 2 minutes
  })
}

// Mutations
export const useAddComment = () => {
  const queryClient = useQueryClient()
  
  return useMutation({
    mutationFn: commentService.addComment,
    onSuccess: (data, variables) => {
      queryClient.invalidateQueries({ queryKey: commentKeys.byTicket(variables.ticketId) })
      queryClient.invalidateQueries({ queryKey: commentKeys.lists() })
    },
    onError: (error) => {
      console.error('Add comment failed:', error)
    },
  })
}

export const useUpdateComment = () => {
  const queryClient = useQueryClient()
  
  return useMutation({
    mutationFn: ({ id, data }) => commentService.updateComment(id, data),
    onSuccess: (data, variables) => {
      queryClient.invalidateQueries({ queryKey: commentKeys.lists() })
      queryClient.setQueryData(commentKeys.detail(variables.id), data)
      // Invalidate ticket comments if we have ticketId
      if (data.ticketId) {
        queryClient.invalidateQueries({ queryKey: commentKeys.byTicket(data.ticketId) })
      }
    },
    onError: (error) => {
      console.error('Update comment failed:', error)
    },
  })
}

export const useDeleteComment = () => {
  const queryClient = useQueryClient()
  
  return useMutation({
    mutationFn: commentService.deleteComment,
    onSuccess: (data, variables) => {
      queryClient.invalidateQueries({ queryKey: commentKeys.lists() })
      queryClient.removeQueries({ queryKey: commentKeys.detail(variables) })
      // Invalidate ticket comments if we have ticketId
      if (data?.ticketId) {
        queryClient.invalidateQueries({ queryKey: commentKeys.byTicket(data.ticketId) })
      }
    },
    onError: (error) => {
      console.error('Delete comment failed:', error)
    },
  })
}

export const useUploadCommentAttachment = () => {
  const queryClient = useQueryClient()
  
  return useMutation({
    mutationFn: ({ commentId, file, onProgress }) => 
      commentService.uploadAttachment(commentId, file, onProgress),
    onSuccess: (data, variables) => {
      queryClient.invalidateQueries({ queryKey: commentKeys.attachments(variables.commentId) })
      queryClient.invalidateQueries({ queryKey: commentKeys.detail(variables.commentId) })
    },
    onError: (error) => {
      console.error('Upload comment attachment failed:', error)
    },
  })
}

export const useDownloadCommentAttachment = () => {
  return useMutation({
    mutationFn: ({ commentId, attachmentId, filename }) => 
      commentService.downloadAttachment(commentId, attachmentId, filename),
    onError: (error) => {
      console.error('Download comment attachment failed:', error)
    },
  })
}

export const useDeleteCommentAttachment = () => {
  const queryClient = useQueryClient()
  
  return useMutation({
    mutationFn: ({ commentId, attachmentId }) => 
      commentService.deleteAttachment(commentId, attachmentId),
    onSuccess: (data, variables) => {
      queryClient.invalidateQueries({ queryKey: commentKeys.attachments(variables.commentId) })
      queryClient.invalidateQueries({ queryKey: commentKeys.detail(variables.commentId) })
    },
    onError: (error) => {
      console.error('Delete comment attachment failed:', error)
    },
  })
}

export const useLikeComment = () => {
  const queryClient = useQueryClient()
  
  return useMutation({
    mutationFn: commentService.likeComment,
    onSuccess: (data, variables) => {
      queryClient.invalidateQueries({ queryKey: commentKeys.likes(variables) })
      queryClient.invalidateQueries({ queryKey: commentKeys.detail(variables) })
    },
    onError: (error) => {
      console.error('Like comment failed:', error)
    },
  })
}

export const useUnlikeComment = () => {
  const queryClient = useQueryClient()
  
  return useMutation({
    mutationFn: commentService.unlikeComment,
    onSuccess: (data, variables) => {
      queryClient.invalidateQueries({ queryKey: commentKeys.likes(variables) })
      queryClient.invalidateQueries({ queryKey: commentKeys.detail(variables) })
    },
    onError: (error) => {
      console.error('Unlike comment failed:', error)
    },
  })
}

export const useMarkCommentAsInternal = () => {
  const queryClient = useQueryClient()
  
  return useMutation({
    mutationFn: ({ id, isInternal }) => 
      commentService.markAsInternal(id, isInternal),
    onSuccess: (data, variables) => {
      queryClient.invalidateQueries({ queryKey: commentKeys.detail(variables.id) })
      queryClient.invalidateQueries({ queryKey: commentKeys.lists() })
    },
    onError: (error) => {
      console.error('Mark comment as internal failed:', error)
    },
  })
}

