import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import { GeneratePage } from "./pages/generate";
import { PromptPage } from "./pages/prompt";
import StreamTest from "./pages/sreamtest";
import { Background } from "./components/background/background";


function App() {
	return (
		<Background>
			<BrowserRouter>
				
				<Routes>
					<Route path="/generate" element={<GeneratePage />} />
					<Route path="/prompt" element={<PromptPage />} />
					<Route path="/" element={<StreamTest />} />
				</Routes>
			</BrowserRouter>
		</Background>
	);
}
export default App;
