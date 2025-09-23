import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { knowledgeBaseService } from '../services/knowledgeBaseService'

// Query keys
export const knowledgeBaseKeys = {
  all: ['knowledgeBase'],
  articles: () => [...knowledgeBaseKeys.all, 'articles'],
  articleList: (filters) => [...knowledgeBaseKeys.articles(), 'list', filters],
  article: (id) => [...knowledgeBaseKeys.articles(), 'detail', id],
  categories: () => [...knowledgeBaseKeys.all, 'categories'],
  categoryList: (filters) => [...knowledgeBaseKeys.categories(), 'list', filters],
  category: (id) => [...knowledgeBaseKeys.categories(), 'detail', id],
  search: (query) => [...knowledgeBaseKeys.all, 'search', query],
  popular: () => [...knowledgeBaseKeys.articles(), 'popular'],
  recent: () => [...knowledgeBaseKeys.articles(), 'recent'],
  byCategory: (categoryId) => [...knowledgeBaseKeys.articles(), 'byCategory', categoryId],
  ratings: (articleId) => [...knowledgeBaseKeys.articles(), 'ratings', articleId],
  comments: (articleId) => [...knowledgeBaseKeys.articles(), 'comments', articleId],
  attachments: (articleId) => [...knowledgeBaseKeys.articles(), 'attachments', articleId],
  stats: () => [...knowledgeBaseKeys.all, 'stats'],
}

// Custom hooks for knowledge base
export const useArticles = (params = {}) => {
  return useQuery({
    queryKey: knowledgeBaseKeys.articleList(params),
    queryFn: () => knowledgeBaseService.getArticles(params),
    staleTime: 5 * 60 * 1000, // 5 minutes
  })
}

export const useArticle = (id) => {
  return useQuery({
    queryKey: knowledgeBaseKeys.article(id),
    queryFn: () => knowledgeBaseService.getArticleById(id),
    enabled: !!id,
    staleTime: 5 * 60 * 1000,
  })
}

export const useCategories = (params = {}) => {
  return useQuery({
    queryKey: knowledgeBaseKeys.categoryList(params),
    queryFn: () => knowledgeBaseService.getCategories(params),
    staleTime: 10 * 60 * 1000, // 10 minutes
  })
}

export const useCategory = (id) => {
  return useQuery({
    queryKey: knowledgeBaseKeys.category(id),
    queryFn: () => knowledgeBaseService.getCategoryById(id),
    enabled: !!id,
    staleTime: 10 * 60 * 1000,
  })
}

export const useSearchArticles = (query, params = {}) => {
  return useQuery({
    queryKey: knowledgeBaseKeys.search(query),
    queryFn: () => knowledgeBaseService.searchArticles(query, params),
    enabled: !!query && query.length > 2,
    staleTime: 1 * 60 * 1000, // 1 minute
  })
}

export const useSearchCategories = (query, params = {}) => {
  return useQuery({
    queryKey: [...knowledgeBaseKeys.search(query), 'categories'],
    queryFn: () => knowledgeBaseService.searchCategories(query, params),
    enabled: !!query && query.length > 2,
    staleTime: 1 * 60 * 1000, // 1 minute
  })
}

export const usePopularArticles = (params = {}) => {
  return useQuery({
    queryKey: [...knowledgeBaseKeys.popular(), params],
    queryFn: () => knowledgeBaseService.getPopularArticles(params),
    staleTime: 10 * 60 * 1000, // 10 minutes
  })
}

export const useRecentArticles = (params = {}) => {
  return useQuery({
    queryKey: [...knowledgeBaseKeys.recent(), params],
    queryFn: () => knowledgeBaseService.getRecentArticles(params),
    staleTime: 5 * 60 * 1000, // 5 minutes
  })
}

export const useArticlesByCategory = (categoryId, params = {}) => {
  return useQuery({
    queryKey: [...knowledgeBaseKeys.byCategory(categoryId), params],
    queryFn: () => knowledgeBaseService.getArticlesByCategory(categoryId, params),
    enabled: !!categoryId,
    staleTime: 5 * 60 * 1000,
  })
}

export const useArticleRatings = (articleId) => {
  return useQuery({
    queryKey: knowledgeBaseKeys.ratings(articleId),
    queryFn: () => knowledgeBaseService.getArticleRatings(articleId),
    enabled: !!articleId,
    staleTime: 5 * 60 * 1000,
  })
}

export const useArticleComments = (articleId, params = {}) => {
  return useQuery({
    queryKey: [...knowledgeBaseKeys.comments(articleId), params],
    queryFn: () => knowledgeBaseService.getArticleComments(articleId, params),
    enabled: !!articleId,
    staleTime: 2 * 60 * 1000, // 2 minutes
  })
}

export const useArticleAttachments = (articleId) => {
  return useQuery({
    queryKey: knowledgeBaseKeys.attachments(articleId),
    queryFn: () => knowledgeBaseService.getArticleAttachments(articleId),
    enabled: !!articleId,
    staleTime: 10 * 60 * 1000, // 10 minutes
  })
}

export const useKnowledgeBaseStats = () => {
  return useQuery({
    queryKey: knowledgeBaseKeys.stats(),
    queryFn: knowledgeBaseService.getKnowledgeBaseStats,
    staleTime: 10 * 60 * 1000, // 10 minutes
  })
}

// Mutations
export const useCreateArticle = () => {
  const queryClient = useQueryClient()
  
  return useMutation({
    mutationFn: knowledgeBaseService.createArticle,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: knowledgeBaseKeys.articles() })
      queryClient.invalidateQueries({ queryKey: knowledgeBaseKeys.stats() })
    },
    onError: (error) => {
      console.error('Create article failed:', error)
    },
  })
}

export const useUpdateArticle = () => {
  const queryClient = useQueryClient()
  
  return useMutation({
    mutationFn: ({ id, data }) => knowledgeBaseService.updateArticle(id, data),
    onSuccess: (data, variables) => {
      queryClient.invalidateQueries({ queryKey: knowledgeBaseKeys.articles() })
      queryClient.setQueryData(knowledgeBaseKeys.article(variables.id), data)
    },
    onError: (error) => {
      console.error('Update article failed:', error)
    },
  })
}

export const useDeleteArticle = () => {
  const queryClient = useQueryClient()
  
  return useMutation({
    mutationFn: knowledgeBaseService.deleteArticle,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: knowledgeBaseKeys.articles() })
      queryClient.invalidateQueries({ queryKey: knowledgeBaseKeys.stats() })
    },
    onError: (error) => {
      console.error('Delete article failed:', error)
    },
  })
}

export const useCreateCategory = () => {
  const queryClient = useQueryClient()
  
  return useMutation({
    mutationFn: knowledgeBaseService.createCategory,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: knowledgeBaseKeys.categories() })
    },
    onError: (error) => {
      console.error('Create category failed:', error)
    },
  })
}

export const useUpdateCategory = () => {
  const queryClient = useQueryClient()
  
  return useMutation({
    mutationFn: ({ id, data }) => knowledgeBaseService.updateCategory(id, data),
    onSuccess: (data, variables) => {
      queryClient.invalidateQueries({ queryKey: knowledgeBaseKeys.categories() })
      queryClient.setQueryData(knowledgeBaseKeys.category(variables.id), data)
    },
    onError: (error) => {
      console.error('Update category failed:', error)
    },
  })
}

export const useDeleteCategory = () => {
  const queryClient = useQueryClient()
  
  return useMutation({
    mutationFn: knowledgeBaseService.deleteCategory,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: knowledgeBaseKeys.categories() })
    },
    onError: (error) => {
      console.error('Delete category failed:', error)
    },
  })
}

export const useIncrementArticleViews = () => {
  const queryClient = useQueryClient()
  
  return useMutation({
    mutationFn: knowledgeBaseService.incrementArticleViews,
    onSuccess: (data, variables) => {
      queryClient.invalidateQueries({ queryKey: knowledgeBaseKeys.article(variables) })
      queryClient.invalidateQueries({ queryKey: knowledgeBaseKeys.popular() })
    },
    onError: (error) => {
      console.error('Increment article views failed:', error)
    },
  })
}

export const useRateArticle = () => {
  const queryClient = useQueryClient()
  
  return useMutation({
    mutationFn: ({ id, rating }) => knowledgeBaseService.rateArticle(id, rating),
    onSuccess: (data, variables) => {
      queryClient.invalidateQueries({ queryKey: knowledgeBaseKeys.ratings(variables.id) })
      queryClient.invalidateQueries({ queryKey: knowledgeBaseKeys.article(variables.id) })
    },
    onError: (error) => {
      console.error('Rate article failed:', error)
    },
  })
}

export const useAddArticleComment = () => {
  const queryClient = useQueryClient()
  
  return useMutation({
    mutationFn: ({ id, commentData }) => 
      knowledgeBaseService.addArticleComment(id, commentData),
    onSuccess: (data, variables) => {
      queryClient.invalidateQueries({ queryKey: knowledgeBaseKeys.comments(variables.id) })
    },
    onError: (error) => {
      console.error('Add article comment failed:', error)
    },
  })
}

export const useUploadArticleAttachment = () => {
  const queryClient = useQueryClient()
  
  return useMutation({
    mutationFn: ({ id, file, onProgress }) => 
      knowledgeBaseService.uploadArticleAttachment(id, file, onProgress),
    onSuccess: (data, variables) => {
      queryClient.invalidateQueries({ queryKey: knowledgeBaseKeys.attachments(variables.id) })
      queryClient.invalidateQueries({ queryKey: knowledgeBaseKeys.article(variables.id) })
    },
    onError: (error) => {
      console.error('Upload article attachment failed:', error)
    },
  })
}

export const useDownloadArticleAttachment = () => {
  return useMutation({
    mutationFn: ({ articleId, attachmentId, filename }) => 
      knowledgeBaseService.downloadAttachment(articleId, attachmentId, filename),
    onError: (error) => {
      console.error('Download article attachment failed:', error)
    },
  })
}
