import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'

// 样式
import 'uno.css'
import 'nprogress/nprogress.css'
import '@/assets/css/scrollbar.less'

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
)
