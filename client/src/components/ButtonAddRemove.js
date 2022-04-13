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

const add = (element, setLogs) => {
	if (element === BREAD) {
		addBread().then((response) => {
			if (response.error) {
				return false;
			}
			setLogs(response);
		});
	}
	if (element === CAKE) {
		addCake().then((response) => {
			if (response.error) {
				return false;
			}
			setLogs(response);
		});
	}
	if (element === COOKIE) {
		addCookie().then((response) => {
			if (response.error) {
				return false;
			}
			setLogs(response);
		});
	}
};

const remove = (element, setLogs) => {
	if (element === BREAD) {
		removeBread().then((response) => {
			if (response.error) {
				return false;
			}
			setLogs(response);
		});
	}
	if (element === CAKE) {
		removeCake().then((response) => {
			if (response.error) {
				return false;
			}
			setLogs(response);
		});
	}
	if (element === COOKIE) {
		removeCookie().then((response) => {
			if (response.error) {
				return false;
			}
			setLogs(response);
		});
	}
};

const ButtonAddRemove = ({ element, logs, setLogs }) => {
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
						onClick={() => add(element, setLogs)}
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
						onClick={() => remove(element, setLogs)}
					/>
				</div>
			</Stack>
		</Stack.Item>
	);
};

export { ButtonAddRemove, BREAD, CAKE, COOKIE };
