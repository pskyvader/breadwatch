import { Stack } from "@fluentui/react";
import { IconButton } from "@fluentui/react/lib/Button";
import { FontSizes, FontWeights } from "@fluentui/theme";
import getColor from "../utils/getColor";

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

const add = (element, setLogs, date) => {
	let action;
	if (element === BREAD) {
		action = addBread(date);
	}
	if (element === CAKE) {
		action = addCake(date);
	}
	if (element === COOKIE) {
		action = addCookie(date);
	}

	action.then((response) => {
		if (response.error) {
			return false;
		}
		setLogs(response);
	});
};

const remove = (element, setLogs, date) => {
	let action;
	if (element === BREAD) {
		action = removeBread(date);
	}
	if (element === CAKE) {
		action = removeCake(date);
	}
	if (element === COOKIE) {
		action = removeCookie(date);
	}

	action.then((response) => {
		if (response.error) {
			return false;
		}
		setLogs(response);
	});
};

const ButtonAddRemove = ({ element, logs, setLogs, date = Date.now() }) => {
	const quantity = (logs && logs[element]) || 0;
	const color = getColor(element, quantity);

	return (
		<Stack.Item grow={1} styles={stackItemStyles}>
			<Stack styles={stackItemStyles}>
				<div
					style={{
						fontSize: FontSizes.size16,
						fontWeight: FontWeights.regular,
						color: color,
					}}
				>
					{element}
				</div>
				<div className="button-add">
					<IconButton
						iconProps={{ iconName: "Add" }}
						title={`add 1 ${element}`}
						ariaLabel={`add 1 ${element}`}
						onClick={() => add(element, setLogs, date)}
					/>
				</div>
				<div>
					<div
						className="quantity"
						style={{
							color: color,
						}}
					>
						{quantity}
					</div>
				</div>
				<div className="button-remove">
					<IconButton
						iconProps={{ iconName: "Remove" }}
						title={`remove 1 ${element}`}
						ariaLabel={`remove 1 ${element}`}
						onClick={() => remove(element, setLogs, date)}
					/>
				</div>
			</Stack>
		</Stack.Item>
	);
};

export { ButtonAddRemove, BREAD, CAKE, COOKIE };
