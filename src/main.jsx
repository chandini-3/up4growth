import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import './index.css'
import App from './App.jsx'
import Blog from './Blog'
import WorkshopTopics from './WorkshopTopics.jsx'
import WorkshopTopicPage from './WorkshopTopicPage.jsx'
import Programs from './Programs.jsx'
import ProgramPage from './ProgramPage.jsx'
import Coaching from './Coaching.jsx'
import CoachingPage from './CoachingPage.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/workshops/topics" element={<WorkshopTopics />} />
        <Route path="/workshops/topics/:slug" element={<WorkshopTopicPage />} />
        <Route path="/programs" element={<Programs />} />
        <Route path="/programs/:slug" element={<ProgramPage />} />
        <Route path="/coaching" element={<Coaching />} />
        <Route path="/coaching/:slug" element={<CoachingPage />} />
        <Route path="/blog" element={<Blog />} />
        <Route path="/blog/:slug" element={<Blog />} />
      </Routes>
    </BrowserRouter>
  </StrictMode>,
)
