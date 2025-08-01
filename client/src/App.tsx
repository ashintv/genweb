
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css'
import { GeneratePage } from './pages/generate';
import { PromptPage } from './pages/prompt';
import StreamTest from './pages/sreamtest';


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/generate" element={<GeneratePage />} />
        <Route
          path="/prompt" element={<PromptPage />} />
        <Route
          path="/" element={<StreamTest />} />
      </Routes>

    </BrowserRouter>
  )
}
export default App
