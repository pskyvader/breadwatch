import { Stack } from "@fluentui/react";
import { Toggle } from "@fluentui/react/lib/Toggle";
import { FontSizes, FontWeights } from "@fluentui/theme";
import { walkTrue, walkFalse } from "../API/logs";

const WALK = "walk";

const stackItemStyles = {
	root: {
		alignItems: "center",
		display: "flex",
		justifyContent: "center",
	},
};

const toggle = async (element, on, setLogs) => {
	let response;
	if (element === WALK) {
		response = on ? await walkFalse() : await walkTrue();
	}
	if (response.error) {
		return false;
	}
	setLogs(response);
};

const ButtonToggle = ({ element, logs, setLogs }) => {
	const on = (logs && logs[element]) || false;
	return (
		<Stack.Item grow={1} styles={stackItemStyles}>
			<Stack styles={stackItemStyles}>
				<div
					style={{
						fontSize: FontSizes.size16,
						fontWeight: FontWeights.regular,
					}}
				>
					{element}
				</div>

				<Toggle
					label={`toggle ${element}`}
					checked={on}
					onText="On"
					offText="Off"
					onChange={async () => toggle(element, on, setLogs)}
				/>
			</Stack>
		</Stack.Item>
	);
};

export { ButtonToggle, WALK };
