import LogStatus from "./components/LogStatus";
import {
	ButtonAddRemove,
	BREAD,
	CAKE,
	COOKIE,
} from "./components/ButtonAddRemove";
import "./App.css";
import { NeutralColors, DefaultSpacing, FontSizes,FontWeights } from "@fluentui/theme";

function App() {
	return (
		<div
			style={{
				backgroundColor: NeutralColors.gray10,
				padding: DefaultSpacing.l2,
				minHeight: "100vh",
			}}
		>
			<div
				style={{
					fontSize: FontSizes.size32,
					marginBottom: DefaultSpacing.l2,
					fontWeight: FontWeights.semibold,
				}}
			>
				BreadWatch
			</div>
			<LogStatus>
				<ButtonAddRemove element={BREAD} />
				<ButtonAddRemove element={COOKIE} />
				<ButtonAddRemove element={CAKE} />
			</LogStatus>
		</div>
	);
}

export default App;
