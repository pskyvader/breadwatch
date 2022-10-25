import { LineChart, AreaChart } from "@fluentui/react-charting";
import { Stack, Shimmer, DefaultPalette } from "@fluentui/react";
import { DefaultButton, PrimaryButton } from "@fluentui/react/lib/Button";

import { Depths, DefaultSpacing, NeutralColors } from "@fluentui/theme";
import { useState, useEffect, useMemo } from "react";

import { getAllLogs } from "../API/logs";
import debounce from "../utils/debounce";
import getWeekYear from "../utils/getWeekYear";

const _DAYLY_ = "dayly";
const _WEEKLY_ = "weekly";
const _MONTHLY_ = "monthly";

const products = ["bread", "cookie", "cake"];

const groupData = (data, frequency) => {
	if (frequency === _DAYLY_) {
		return data;
	}
	const groupedData = data.reduce((previous, element) => {
		const parsedDate = new Date(element.date);
		if (frequency === _WEEKLY_) {
			const week = getWeekYear(parsedDate);
			if (!previous[week]) {
				previous[week] = [];
			}
			previous[week].push(element);
			return previous;
		}
		if (frequency === _MONTHLY_) {
			const month = parsedDate.getMonth();
			if (!previous[month]) {
				previous[month] = [];
			}
			previous[month].push(element);
			return previous;
		}
		return undefined;
	}, {});

	return groupedData;
};

const processData = (groupedData, frequency) => {
	if (frequency === _DAYLY_) {
		return groupedData;
	}
	const proccessedData = [];
	for (const key in groupedData) {
		if (Object.hasOwnProperty.call(groupedData, key)) {
			const element = groupedData[key];
			const proccessedElement = element.reduce((prev, e) => {
				if (!prev.date) {
					prev.date = e.date;
				}
				for (const product of products) {
					prev[product] =
						(prev[product] || 0) + e[product] / element.length;
				}
				return prev;
			}, {});
			proccessedData.push(proccessedElement);
		}
	}

	return proccessedData;
};

const parseData = (data, field) => {
	return data.map((element) => {
		return {
			x: new Date(element.date),
			y: element[field],
			xAxisCalloutData: element.date,
			yAxisCalloutData: element[field],
		};
	});
};

const handleResize = (width, height, margins) => {
	const size = { w: width, h: height };
	if (window.innerWidth !== width) {
		size.w = Math.max(
			window.innerWidth -
				margins.left -
				margins.right -
				parseInt(DefaultSpacing.l2) * 4,
			300
		);
	}
	if (window.innerHeight !== height) {
		size.h = Math.max(
			window.innerHeight -
				margins.top -
				margins.bottom -
				parseInt(DefaultSpacing.l2) * 10,
			300
		);
	}
	return size;
};
// functional component for statistics
const Statistics = () => {
	const [dataset, setDataset] = useState(null);
	const [height, setHeight] = useState(null);
	const [width, setWidth] = useState(null);
	const [frequency, setFrequency] = useState(_DAYLY_);
	const [chartTipe, setChartTipe] = useState(1);

	const margins = useMemo(
		() => ({ left: 35, top: 20, bottom: 35, right: 20 }),
		[]
	);
	useEffect(() => {
		setDataset(null);
		getAllLogs().then((response) => {
			if (response.error) {
				return false;
			}
			setDataset(response);
		});

		const setResize = debounce(() => {
			const { w, h } = handleResize(width, height, margins);
			if (w !== width) {
				setWidth(w);
			}
			if (h !== height) {
				setHeight(h);
			}
		}, 500);

		window.addEventListener("resize", setResize);
		if (width === null || height === null) {
			setResize();
		}
		return () => {
			window.removeEventListener("resize", setResize);
		};
	}, [setDataset, width, height, margins]);

	const handleFrequency = (newFrequency) => {
		if (newFrequency !== frequency) {
			setFrequency(newFrequency);
		}
	};

	const chartData = useMemo(() => {
		if (dataset === null) {
			return null;
		}
		const groupedData = groupData(dataset, frequency);
		const proccessedData = processData(groupedData, frequency);
		const data1 = parseData(proccessedData, "bread");
		const data2 = parseData(proccessedData, "cookie");
		const data3 = parseData(proccessedData, "cake");

		return {
			chartTitle: "Last month",
			lineChartData: [
				{
					data: data1,
					legend: "Bread",
					color: DefaultPalette.blue,
				},
				{
					data: data2,
					legend: "Cookie",
					color: DefaultPalette.green,
				},
				{
					data: data3,
					legend: "Cake",
					color: DefaultPalette.red,
				},
			],
		};
	}, [dataset, frequency]);

	if (dataset === null) {
		return (
			<div>
				<Shimmer style={{ padding: 2 }} />
				<Shimmer style={{ padding: 2 }} width="75%" />
				<Shimmer style={{ padding: 2 }} width="50%" />
			</div>
		);
	}

	const rootStyle = {
		// width: width + margins.left + margins.right,
		// height: height + margins.top + margins.bottom,
		// width: width,
		height: height,
	};

	return (
		<div>
			<Stack
				horizontal
				style={
					{
						// paddingTop: DefaultSpacing.l1,
						// paddingBottom: DefaultSpacing.l2,
					}
				}
				disableShrink
				wrap
			>
				<Stack.Item
					grow={1}
					style={{
						justifyContent: "left",
						paddingTop: DefaultSpacing.l1,
					}}
				>
					<DefaultButton
						checked={frequency === _DAYLY_}
						onClick={() => handleFrequency(_DAYLY_)}
					>
						{_DAYLY_}
					</DefaultButton>
				</Stack.Item>
				<Stack.Item
					grow={1}
					style={{
						justifyContent: "left",
						paddingTop: DefaultSpacing.l1,
					}}
				>
					<DefaultButton
						checked={frequency === _WEEKLY_}
						onClick={() => handleFrequency(_WEEKLY_)}
					>
						{_WEEKLY_}
					</DefaultButton>
				</Stack.Item>
				<Stack.Item
					grow={1}
					style={{
						justifyContent: "left",
						paddingTop: DefaultSpacing.l1,
						paddingRight: DefaultSpacing.l1,
					}}
				>
					<DefaultButton
						checked={frequency === _MONTHLY_}
						onClick={() => handleFrequency(_MONTHLY_)}
					>
						{_MONTHLY_}
					</DefaultButton>
				</Stack.Item>
				<Stack.Item
					grow={1}
					style={{
						justifyContent: "right",
						paddingTop: DefaultSpacing.l1,
					}}
				>
					<PrimaryButton
						checked={chartTipe === 1}
						onClick={() => setChartTipe(1)}
					>
						Unique Values
					</PrimaryButton>
				</Stack.Item>
				<Stack.Item
					grow={1}
					style={{
						justifyContent: "right",
						paddingTop: DefaultSpacing.l1,
					}}
				>
					<PrimaryButton
						checked={chartTipe === 2}
						onClick={() => setChartTipe(2)}
					>
						Accumulated Values
					</PrimaryButton>
				</Stack.Item>
			</Stack>
			<Stack
				style={{
					padding: DefaultSpacing.l2,
					marginTop: DefaultSpacing.l2,
					boxShadow: Depths.depth4,
					background: NeutralColors.white,
				}}
			>
				{/* Bread: blue,Cookie:gree, Cake: red */}
				<div style={rootStyle}>
					{chartTipe === 1 && (
						<LineChart
							height={height}
							width={width}
							data={chartData}
							tickFormat={"%m/%d"}
							margins={margins}
							allowMultipleShapesForPoints={true}
							xAxisTickCount={10}
						/>
					)}
					{chartTipe === 2 && (
						<AreaChart
							height={height}
							width={width}
							data={chartData}
							tickFormat={"%m/%d"}
							margins={margins}
						/>
					)}
				</div>
			</Stack>
		</div>
	);
};

export default Statistics;
