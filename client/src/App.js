import { ButtonAddRemove } from "./components/ButtonAddRemove";
import logo from "./logo.svg";
import "./App.css";

function App() {
	return (
		<div className="App">
			<ButtonAddRemove element="Bread" />
			<ButtonAddRemove element="Cookie" />
			<ButtonAddRemove element="Cake" />
		</div>
	);
}

export default App;
