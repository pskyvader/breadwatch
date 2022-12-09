import { Stack } from "@fluentui/react";
import { IconButton } from "@fluentui/react/lib/Button";
import { FontSizes, FontWeights } from "@fluentui/theme";
import getColor from "../utils/getColor";
import { BREAD, CAKE, COOKIE, FRUIT, VEGETABLE } from "../constants";

import {
	addBread,
	addCake,
	addCookie,
	addFruit,
	addVegetable,
	removeBread,
	removeCake,
	removeCookie,
	removeFruit,
	removeVegetable,
} from "../API/logs";

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
	if (element === FRUIT) {
		action = addFruit(date);
	}
	if (element === VEGETABLE) {
		action = addVegetable(date);
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
	if (element === FRUIT) {
		action = removeFruit(date);
	}
	if (element === VEGETABLE) {
		action = removeVegetable(date);
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
