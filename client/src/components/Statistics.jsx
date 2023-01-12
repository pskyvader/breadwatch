import { LineChart, AreaChart } from "@fluentui/react-charting";
import { Stack, Shimmer, DefaultPalette } from "@fluentui/react";
import { DefaultButton, PrimaryButton } from "@fluentui/react/lib/Button";
import { Dropdown } from "@fluentui/react/lib/Dropdown";

import { Depths, DefaultSpacing, NeutralColors } from "@fluentui/theme";
import { useState, useEffect, useMemo } from "react";
import { BREAD, COOKIE, CAKE, FRUIT, VEGETABLE } from "../constants";

import { getAllLogs } from "../API/logs";
import debounce from "../utils/debounce";
import getWeekYear from "../utils/getWeekYear";

const _DAYLY_ = "dayly";
const _WEEKLY_ = "weekly";
const _MONTHLY_ = "monthly";

const products = [BREAD, COOKIE, CAKE, FRUIT, VEGETABLE];

const filterData = (data, date = null) => {
	if (!date || date.key === null) return data;
	const currentDate = new Date();
	if (date.key === "year") {
		currentDate.setFullYear(currentDate.getFullYear() - 1);
	}
	if (date.key === "month") {
		currentDate.setMonth(currentDate.getMonth() - 1);
	}
	if (date.key === "week") {
		currentDate.setDate(currentDate.getDate() - 1);
	}

	const filteredData = data.filter((element) => {
		const parsedDate = new Date(element.date);
		return parsedDate > currentDate;
	});
	return filteredData;
};

const groupData = (data, frequency) => {
	if (frequency === _DAYLY_) {
		return data;
	}
	const groupedData = data.reduce((previous, element) => {
		const parsedDate = new Date(element.date);
		if (frequency === _WEEKLY_) {
			const week =
				parsedDate.getFullYear() + "-" + getWeekYear(parsedDate);
			if (!previous[week]) {
				previous[week] = [];
			}
			previous[week].push(element);
			return previous;
		}
		if (frequency === _MONTHLY_) {
			const month =
				parsedDate.getFullYear() + "-" + parsedDate.getMonth();
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
					prev[product] = (prev[product] || 0) + e[product]; //total     / element.length;
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
	const [filterDate, setFilterDate] = useState(null);

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

	const handleFilterDate = (_event, newFilterDate) => {
		if (newFilterDate !== filterDate) {
			setFilterDate(newFilterDate);
		}
	};

	const chartData = useMemo(() => {
		if (dataset === null) {
			return null;
		}
		const filteredData = filterData(dataset, filterDate);
		const groupedData = groupData(filteredData, frequency);
		const proccessedData = processData(groupedData, frequency);
		const dataBread = parseData(proccessedData, BREAD);
		const dataCookie = parseData(proccessedData, COOKIE);
		const dataCake = parseData(proccessedData, CAKE);
		const dataFruit = parseData(proccessedData, FRUIT);
		const dataVegetable = parseData(proccessedData, VEGETABLE);

		return {
			chartTitle: "Last month",
			lineChartData: [
				{
					data: dataBread,
					legend: BREAD,
					color: DefaultPalette.blue,
				},
				{
					data: dataCookie,
					legend: COOKIE,
					color: DefaultPalette.green,
				},
				{
					data: dataCake,
					legend: CAKE,
					color: DefaultPalette.red,
				},
				{
					data: dataFruit,
					legend: CAKE,
					color: DefaultPalette.magenta,
				},
				{
					data: dataVegetable,
					legend: CAKE,
					color: DefaultPalette.orange,
				},
			],
		};
	}, [dataset, frequency, filterDate]);

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
	const textStyles = {
		display: "flex",
		alignItems: "center",
		justifyContent: "left",
		marginRight: DefaultSpacing.l1,
		marginTop: DefaultSpacing.l1,
	};

	const FilterDateOptions = [
		{ key: "all", text: "All" },
		{ key: "year", text: "Last Year" },
		{ key: "month", text: "Last Month" },
		{ key: "week", text: "Last Week" },
	];

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
				<Stack
					horizontal
					disableShrink
					wrap
					grow={1}
					// style={textStyles}
				>
					<DefaultButton
						style={textStyles}
						checked={frequency === _DAYLY_}
						onClick={() => handleFrequency(_DAYLY_)}
					>
						{_DAYLY_}
					</DefaultButton>
					<DefaultButton
						style={textStyles}
						checked={frequency === _WEEKLY_}
						onClick={() => handleFrequency(_WEEKLY_)}
					>
						{_WEEKLY_}
					</DefaultButton>
					<DefaultButton
						style={textStyles}
						checked={frequency === _MONTHLY_}
						onClick={() => handleFrequency(_MONTHLY_)}
					>
						{_MONTHLY_}
					</DefaultButton>
				</Stack>

				<Stack
					horizontal
					disableShrink
					wrap
					grow={1}
					// style={textStyles}
				>
					<Dropdown
						label="Filter From Date"
						selectedKey={filterDate ? filterDate.key : undefined}
						placeholder="Select an option"
						onChange={handleFilterDate}
						options={FilterDateOptions}
					/>
				</Stack>

				<Stack
					horizontal
					disableShrink
					// wrap
					grow={1}
				>
					<PrimaryButton
						style={textStyles}
						checked={chartTipe === 1}
						onClick={() => setChartTipe(1)}
					>
						Unique Values
					</PrimaryButton>
					<PrimaryButton
						style={textStyles}
						checked={chartTipe === 2}
						onClick={() => setChartTipe(2)}
					>
						Accumulated Values
					</PrimaryButton>
				</Stack>
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
