import request from "./request";

export const getLogs = (date = "", date2 = "") => {
	const url = `/log/get/${date}${date2 !== "" ? "/" : ""}${date2}`;
	return request(url);
};
export const getAllLogs = () => {
	const url = `/log/get/all`;
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

export const addFruit = (date = "") => {
	const url = `/fruit/add/${date}`;
	return request(url);
};
export const removeFruit = (date = "") => {
	const url = `/fruit/remove/${date}`;
	return request(url);
};

export const addVegetable = (date = "") => {
	const url = `/vegetable/add/${date}`;
	return request(url);
};
export const removeVegetable = (date = "") => {
	const url = `/vegetable/remove/${date}`;
	return request(url);
};

export const walkTrue = (date = "") => {
	const url = `/walk/true/${date}`;
	return request(url);
};
export const walkFalse = (date = "") => {
	const url = `/walk/false/${date}`;
	return request(url);
};
