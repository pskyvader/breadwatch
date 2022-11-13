import { DefaultPalette } from "@fluentui/theme";

const BREAD = "bread";
const CAKE = "cake";
const COOKIE = "cookie";

const dangerList = {};
dangerList[BREAD] = 8;
dangerList[CAKE] = 4;
dangerList[COOKIE] = 2;

const warningList = {};
warningList[BREAD] = 6;
warningList[CAKE] = 2;
warningList[COOKIE] = 1;

const SuccessList = {};
dangerList[BREAD] = 2;
dangerList[CAKE] = 0;
dangerList[COOKIE] = 0;

const colorList = {
	normal: DefaultPalette.neutralPrimary,
	success: DefaultPalette.green,
	warning: DefaultPalette.yellow,
	danger: DefaultPalette.red,
};

const getColor = (element, value) => {
	value = parseFloat(value);
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
