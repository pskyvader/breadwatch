import { DefaultPalette } from "@fluentui/theme";
import { BREAD, COOKIE, CAKE, FRUIT, VEGETABLE } from "../constants";

const dangerList = {};
dangerList[BREAD] = 8;
dangerList[COOKIE] = 4;
dangerList[CAKE] = 2;
dangerList[FRUIT] = 15;
dangerList[VEGETABLE] = 20;

const warningList = {};
warningList[BREAD] = 6;
warningList[COOKIE] = 2;
warningList[CAKE] = 1;
warningList[FRUIT] = 10;
warningList[VEGETABLE] = 15;

const SuccessList = {};
SuccessList[BREAD] = 2;
SuccessList[COOKIE] = 0;
SuccessList[CAKE] = 0;
SuccessList[FRUIT] = 4;
SuccessList[VEGETABLE] = 6;

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
