import request from "./request";

export const getLogs = (date = "") => {
	const url = `/log/get/${date}`;
	return request(url);
};

export const addBread = (date = "") => {
	const url = `/bread/add/${date}`;
	return request(url);
};
export const removeBread = (date = "") => {
	const url = `/bread/remove/${date}`;
	return request(url);
};

export const addCookie = (date = "") => {
	const url = `/cookie/add/${date}`;
	return request(url);
};
export const removeCookie = (date = "") => {
	const url = `/cookie/remove/${date}`;
	return request(url);
};

export const addCake = (date = "") => {
	const url = `/cake/add/${date}`;
	return request(url);
};
export const removeCake = (date = "") => {
	const url = `/cake/remove/${date}`;
	return request(url);
};
