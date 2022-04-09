import LogStatus from "./components/LogStatus";
import {
	ButtonAddRemove,
	BREAD,
	CAKE,
	COOKIE,
} from "./components/ButtonAddRemove";
import "./App.css";

function App() {
	return (
		<div className="App">
			<LogStatus>
				<ButtonAddRemove element={BREAD} />
				<ButtonAddRemove element={COOKIE} />
				<ButtonAddRemove element={CAKE} />
			</LogStatus>
		</div>
	);
}

export default App;
