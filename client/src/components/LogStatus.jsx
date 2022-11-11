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
import { Stack, Shimmer } from "@fluentui/react";
import { getLogs } from "../API/logs";
import getColor from "../utils/getColor";
const stackItemStyles = {
	root: { alignItems: "center", display: "flex", justifyContent: "center" },
};
const LogStatus = ({ children, date = Date.now() }) => {
	const [logs, setLogs] = useState(null);
	useEffect(() => {
		setLogs(null);
		getLogs(date).then((response) => {
			if (response.error) {
				return false;
			}
			setLogs(response);
		});
	}, [setLogs, date]);

	const childrenWithProps = Children.map(children, (child) => {
		if (isValidElement(child)) {
			return cloneElement(child, { logs, setLogs, date });
		}
		return child;
	});
	if (logs === null) {
		return (
			<div>
				<Shimmer style={{ padding: 2 }} />
				<Shimmer style={{ padding: 2 }} width="75%" />
				<Shimmer style={{ padding: 2 }} width="50%" />
			</div>
		);
	}
	return (
		<div>
			<Stack
				style={{
					padding: DefaultSpacing.l2,
					boxShadow: Depths.depth4,
					background: NeutralColors.white,
				}}
			>
				<Stack style={{ marginBottom: DefaultSpacing.l2 }}>
					<Stack.Item grow={1} styles={stackItemStyles}>
						<div
							style={{
								fontSize: FontSizes.size24,
								fontWeight: FontWeights.semibold,
							}}
						>
							{logs &&
								new Date(
									logs.date + " 00:00:00"
								).toDateString()}
						</div>
					</Stack.Item>
				</Stack>
				<Stack horizontal>
					<Stack.Item grow={1} styles={stackItemStyles}>
						<div
							style={{
								fontSize: FontSizes.size16,
								fontWeight: FontWeights.semibold,
								color: getColor("bread", logs.bread),
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
								color: getColor("cookie", logs.cookie),
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
								color: getColor("cake", logs.cake),
							}}
						>
							Cake: {logs && logs.cake}
						</div>
					</Stack.Item>
					<Stack.Item grow={1} styles={stackItemStyles}>
						<div
							style={{
								fontSize: FontSizes.size16,
								fontWeight: FontWeights.semibold,
							}}
						>
							Walk: {logs && logs.walk ? "Yes" : "No"}
						</div>
					</Stack.Item>
				</Stack>
			</Stack>
			<Stack
				horizontal
				style={{
					marginTop: DefaultSpacing.l2,
					padding: DefaultSpacing.l2,
					boxShadow: Depths.depth4,
					background: NeutralColors.white,
				}}
			>
				{childrenWithProps}
			</Stack>
		</div>
	);
};
export default LogStatus;
