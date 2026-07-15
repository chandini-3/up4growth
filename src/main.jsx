import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import './index.css'
import App from './App.jsx'
import Blog from './Blog'
import WorkshopTopics from './WorkshopTopics.jsx'
import WorkshopTopicPage from './WorkshopTopicPage.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/workshops/topics" element={<WorkshopTopics />} />
        <Route path="/workshops/topics/:slug" element={<WorkshopTopicPage />} />
        <Route path="/blog" element={<Blog />} />
        <Route path="/blog/:slug" element={<Blog />} />
      </Routes>
    </BrowserRouter>
  </StrictMode>,
)
