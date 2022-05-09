import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import {
	NeutralColors,
	DefaultSpacing,
	FontSizes,
	FontWeights,
} from "@fluentui/theme";
import Home from "./pages/Home";
import Header from "./pages/Header";

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
      </Route>
	  
	  <Route path="*">Not found </Route>
    </Routes>
  </BrowserRouter>

	);
}

export default App;
