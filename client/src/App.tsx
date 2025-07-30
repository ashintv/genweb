

import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css'
import { GeneratePage } from './pages/generate';
import { PromptPage } from './pages/prompt';


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/generate" element={<GeneratePage />} />
          <Route
          path="/prompt" element={<PromptPage />} />
      </Routes>
    </BrowserRouter>
  )
}
export default App
