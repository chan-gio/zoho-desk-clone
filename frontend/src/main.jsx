import { StrictMode, useState, useEffect } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ConfigProvider } from 'antd'
import viVN from 'antd/locale/vi_VN'
import enUS from 'antd/locale/en_US'
import App from './App.jsx'
import './index.css'
import 'antd/dist/reset.css'
import './i18n'

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 1,
      refetchOnWindowFocus: false,
    },
  },
})

// Component để xử lý việc thay đổi ngôn ngữ
const AppWithLocale = () => {
  const [locale, setLocale] = useState(() => {
    const savedLanguage = localStorage.getItem('i18nextLng') || 'vi'
    return savedLanguage === 'en' ? enUS : viVN
  })

  useEffect(() => {
    const handleLanguageChange = () => {
      const currentLanguage = localStorage.getItem('i18nextLng') || 'vi'
      setLocale(currentLanguage === 'en' ? enUS : viVN)
    }

    // Listen for language changes
    window.addEventListener('languageChanged', handleLanguageChange)
    
    // Also listen for storage changes (when language is changed in another tab)
    window.addEventListener('storage', (e) => {
      if (e.key === 'i18nextLng') {
        handleLanguageChange()
      }
    })

    return () => {
      window.removeEventListener('languageChanged', handleLanguageChange)
      window.removeEventListener('storage', handleLanguageChange)
    }
  }, [])

  return (
    <ConfigProvider locale={locale}>
      <App />
    </ConfigProvider>
  )
}

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <AppWithLocale />
      </BrowserRouter>
    </QueryClientProvider>
  </StrictMode>,
)
