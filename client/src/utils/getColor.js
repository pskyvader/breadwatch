import { DefaultPalette } from "@fluentui/theme";

const BREAD = "bread";
const CAKE = "cake";
const COOKIE = "cookie";

const warningList = {};
warningList[BREAD] = 6;
warningList[CAKE] = 2;
warningList[COOKIE] = 1;

const dangerList = {};
dangerList[BREAD] = 8;
dangerList[CAKE] = 4;
dangerList[COOKIE] = 2;

const colorList = {
	normal: DefaultPalette.neutralPrimary,
	warning: DefaultPalette.yellow,
	danger: DefaultPalette.red,
};

const getColor = (element, value) => {
	if (value > dangerList[element]) {
		return colorList.danger;
	}
	if (value > warningList[element]) {
		return colorList.warning;
	}
	return colorList.normal;
};

export default getColor;
