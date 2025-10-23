import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import { GeneratePage } from "./pages/generate";
import { PromptPage } from "./pages/prompt";
import { SigninPage } from "./pages/signin";
import { SignupPage } from "./pages/signup";
import Landing from "./pages/landing";
import ProfilePage from "./pages/profile";



function App() {
	return (
	
			<BrowserRouter>
				<Routes>
					<Route path="/" element={<Landing />} />
					<Route path="/profile" element={<ProfilePage />} />
					<Route path="/generate" element={<GeneratePage />} />
					<Route path="/prompt" element={<PromptPage />} />
					<Route path="/signin" element={<SigninPage />} />
					<Route path="/signup" element={<SignupPage />} />
				</Routes>
			</BrowserRouter>

	);
}
export default App;
