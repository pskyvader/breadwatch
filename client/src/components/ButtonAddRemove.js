import { Stack } from "@fluentui/react";
import { IconButton } from "@fluentui/react/lib/Button";
import { FontSizes, FontWeights } from "@fluentui/theme";

import {
	addBread,
	addCake,
	addCookie,
	removeBread,
	removeCake,
	removeCookie,
} from "../API/logs";

const BREAD = "bread";
const CAKE = "cake";
const COOKIE = "cookie";

const stackItemStyles = {
	root: {
		alignItems: "center",
		display: "flex",
		justifyContent: "center",
	},
};

const add = async (element, setLogs,date) => {
	let response;
	if (element === BREAD) {
		response = await addBread(date);
	}
	if (element === CAKE) {
		response = await addCake(date);
	}
	if (element === COOKIE) {
		response = await addCookie(date);
	}
	if (response.error) {
		return false;
	}
	setLogs(response);
};

const remove = async (element, setLogs,date) => {
	let response;
	if (element === BREAD) {
		response = await removeBread(date);
	}
	if (element === CAKE) {
		response = await removeCake(date);
	}
	if (element === COOKIE) {
		response = await removeCookie(date);
	}
	if (response.error) {
		return false;
	}
	setLogs(response);
};

const ButtonAddRemove = ({ element, logs, setLogs,date=Date.now() }) => {
	const quantity = (logs && logs[element]) || 0;

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

				<div className="button-add">
					<IconButton
						iconProps={{ iconName: "Add" }}
						title={`add 1 ${element}`}
						ariaLabel={`add 1 ${element}`}
						onClick={async () => add(element, setLogs,date)}
					/>
				</div>

				<div>
					<div className="quantity">{quantity}</div>
				</div>
				<div className="button-remove">
					<IconButton
						iconProps={{ iconName: "Remove" }}
						title={`remove 1 ${element}`}
						ariaLabel={`remove 1 ${element}`}
						onClick={async () => remove(element, setLogs,date)}
					/>
				</div>
			</Stack>
		</Stack.Item>
	);
};

export { ButtonAddRemove, BREAD, CAKE, COOKIE };
