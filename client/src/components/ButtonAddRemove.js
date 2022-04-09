import { useState } from "react";
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
		<div className="btn-group">
			<div className="button-add">
				<button
					className="button-add__button"
					onClick={() => add(element, setLogs)}
				>
					<span className="button-add__icon">
						<i className="fas fa-plus"></i>
					</span>
					<span className="button-add__text">add {element}</span>
				</button>
			</div>
			<div>
				<div className="quantity">{quantity}</div>
			</div>
			<div className="button-remove">
				<button
					className="button-remove__button"
					onClick={() => remove(element, setLogs)}
				>
					<span className="button-remove__icon">
						<i className="fas fa-minus"></i>
					</span>
					<span className="button-remove__text">
						remove {element}
					</span>
				</button>
			</div>
		</div>
	);
};

export { ButtonAddRemove, BREAD, CAKE, COOKIE };
