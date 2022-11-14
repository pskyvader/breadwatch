import { DefaultPalette } from "@fluentui/theme";

const BREAD = "bread";
const COOKIE = "cookie";
const CAKE = "cake";

const dangerList = {};
dangerList[BREAD] = 8;
dangerList[COOKIE] = 4;
dangerList[CAKE] = 2;

const warningList = {};
warningList[BREAD] = 6;
warningList[COOKIE] = 2;
warningList[CAKE] = 1;

const SuccessList = {};
SuccessList[BREAD] = 2;
SuccessList[COOKIE] = 0;
SuccessList[CAKE] = 0;

const colorList = {
	normal: DefaultPalette.neutralPrimary,
	success: DefaultPalette.green,
	warning: DefaultPalette.yellow,
	danger: DefaultPalette.red,
};

const getColor = (element, value) => {
	value = parseInt(value);
	if (value > dangerList[element]) {
		return colorList.danger;
	}
	if (value > warningList[element]) {
		return colorList.warning;
	}
	if (value > SuccessList[element]) {
		return colorList.success;
	}
	return colorList.normal;
};

export default getColor;
