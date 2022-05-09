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

const toggle = async (element, on, setLogs,date) => {
	let response;
	if (element === WALK) {
		response = on ? await walkFalse(date) : await walkTrue(date);
	}
	if (response.error) {
		return false;
	}
	setLogs(response);
};

const ButtonToggle = ({ element, logs, setLogs,date=Date.Now() }) => {
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
					onChange={async () => toggle(element, on, setLogs,date)}
				/>
			</Stack>
		</Stack.Item>
	);
};

export { ButtonToggle, WALK };
