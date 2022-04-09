import {
	useState,
	useEffect,
	Children,
	isValidElement,
	cloneElement,
} from "react";
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
		<div className="parent">
			<div className="data">
				<span className="date">Date: {logs && logs.date}</span>
				<span className="bread">Bread: {logs && logs.bread}</span>
				<span className="cookie">Cookie: {logs && logs.cookie}</span>
				<span className="cake">Cake: {logs && logs.cake}</span>
			</div>
			<div className="children">{childrenWithProps}</div>
		</div>
	);
};

export default LogStatus;
