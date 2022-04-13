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
import { Stack } from "@fluentui/react";
import { getLogs } from "../API/logs";

const stackItemStyles = {
	root: {
		alignItems: "center",
		display: "flex",
		justifyContent: "center",
	},
};

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
		<div>
			<Stack
				style={{
					padding: DefaultSpacing.l2,
					boxShadow: Depths.depth4,
					background: NeutralColors.white,
				}}
			>
				<Stack
					style={{
						marginBottom: DefaultSpacing.l2,
					}}
				>
					<Stack.Item grow={1} styles={stackItemStyles}>
						<div
							style={{
								fontSize: FontSizes.size24,
								fontWeight: FontWeights.semibold,
							}}
						>
							Date: {logs && logs.date}
						</div>
					</Stack.Item>
				</Stack>

				<Stack horizontal>
					<Stack.Item grow={1} styles={stackItemStyles}>
						<div
							style={{
								fontSize: FontSizes.size16,
								fontWeight: FontWeights.semibold,
							}}
						>
							Bread: {logs && logs.bread}
						</div>
					</Stack.Item>

					<Stack.Item grow={1} styles={stackItemStyles}>
						<div
							style={{
								fontSize: FontSizes.size16,
								fontWeight: FontWeights.semibold,
							}}
						>
							Cookie: {logs && logs.cookie}
						</div>
					</Stack.Item>

					<Stack.Item grow={1} styles={stackItemStyles}>
						<div
							style={{
								fontSize: FontSizes.size16,
								fontWeight: FontWeights.semibold,
							}}
						>
							Cake: {logs && logs.cake}
						</div>
					</Stack.Item>
				</Stack>
			</Stack>
			<Stack horizontal 
				style={{
					marginTop:DefaultSpacing.l2,
					padding: DefaultSpacing.l2,
					boxShadow: Depths.depth4,
					background: NeutralColors.white,
				}}>{childrenWithProps}</Stack>
		</div>
	);
};

export default LogStatus;
