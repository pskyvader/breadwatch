import {
	useState,
	useEffect,
	Children,
	isValidElement,
	cloneElement,
} from "react";
import {
	FontSizes,
	FontWeights,
	Depths,
	DefaultSpacing,
	NeutralColors,
} from "@fluentui/theme";
import { getLogs } from "../API/logs";

const LogStatus = ({ children }) => {
	const [logs, setLogs] = useState(null);

	useEffect(() => {
		getLogs().then((response) => {
			if (response.error) {
				return false;
			}
			setLogs(response);
		});
	}, [setLogs]);

	const childrenWithProps = Children.map(children, (child) => {
		if (isValidElement(child)) {
			return cloneElement(child, { logs, setLogs });
		}
		return child;
	});

	return (
		<div
			class="ms-Grid"
			style={{
				padding: DefaultSpacing.l2,
				margin: DefaultSpacing.l2,
				boxShadow: Depths.depth4,
				background: NeutralColors.white,
			}}
		>
			<div class="ms-Grid-row">
				<div
					style={{
						fontSize: FontSizes.size24,
						fontWeight: FontWeights.bold,
					}}
					class=" ms-Grid-col ms-sm12"
				>
					Date: {logs && logs.date}
				</div>
			</div>
			<div class="ms-Grid-row">
				<div
					style={{
						fontSize: FontSizes.size16,
						fontWeight: FontWeights.semibold,
					}}
					class="ms-Grid-col ms-sm4"
				>
					Bread: {logs && logs.bread}
				</div>
				<div
					style={{
						fontSize: FontSizes.size16,
						fontWeight: FontWeights.semibold,
					}}
					class="ms-Grid-col ms-sm4"
				>
					Cookie: {logs && logs.cookie}
				</div>
				<div
					style={{
						fontSize: FontSizes.size16,
						fontWeight: FontWeights.semibold,
					}}
					class="ms-Grid-col ms-sm4"
				>
					Cake: {logs && logs.cake}
				</div>
			</div>
			<div class="children">{childrenWithProps}</div>
		</div>
	);
};

export default LogStatus;
