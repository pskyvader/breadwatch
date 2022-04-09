import LogStatus from "./components/LogStatus";
import { ButtonAddRemove } from "./components/ButtonAddRemove";
import "./App.css";

function App() {
	return (
		<div className="App">
			<LogStatus>
				<ButtonAddRemove element="Bread" />
				<ButtonAddRemove element="Cookie" />
				<ButtonAddRemove element="Cake" />
			</LogStatus>
		</div>
	);
}

export default App;
