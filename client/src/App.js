import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import Home from "./pages/Home";
import Header from "./pages/Header";
import Stats from "./pages/Stats";

function App() {
	return (
		<BrowserRouter>
			<Routes>
				<Route path="/" element={<Header />}>
					<Route index element={<Home />} />
					<Route path="date">
						<Route index element={<Home />} />
						<Route path=":date" element={<Home />} />
					</Route>
					<Route path="stats" element={<Stats />} />
				</Route>

				<Route path="*">Not found </Route>
			</Routes>
		</BrowserRouter>
	);
}

export default App;
