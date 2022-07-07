import * as React from "react";
import { LineChart } from "@fluentui/react-charting";
import { Stack, Shimmer, DefaultPalette } from "@fluentui/react";

import { Depths, DefaultSpacing, NeutralColors } from "@fluentui/theme";
import { useState, useEffect } from "react";

import { getAllLogs } from "../API/logs";

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

// functional component for statistics
const Statistics = () => {
	const [dataset, setDataset] = useState(null);
	const [height, setHeight] = useState(null);
	const [width, setWidth] = useState(null);
	useEffect(() => {
		setDataset(null);
		getAllLogs().then((response) => {
			if (response.error) {
				return false;
			}
			setDataset(response);
		});
	}, [setDataset]);

	if (dataset === null) {
		return (
			<div>
				<Shimmer style={{ padding: 2 }} />
				<Shimmer style={{ padding: 2 }} width="75%" />
				<Shimmer style={{ padding: 2 }} width="50%" />
			</div>
		);
	}
	const data1 = parseData(dataset, "bread");
	const data2 = parseData(dataset, "cookie");
	const data3 = parseData(dataset, "cake");

	const data4 = {
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

	const margins = { left: 35, top: 20, bottom: 35, right: 20 };

	// const rootStyle = { width: `600px`, height: `300px` };
	const handleResize = () => {
		if (window.innerWidth !== width) {
			setWidth(window.innerWidth);
		}
		if (window.innerHeight !== height) {
			setHeight(Math.max(window.innerHeight, 300));
		}
	};
	window.addEventListener("resize", handleResize);

	return (
		<div>
			<Stack
				style={{
					padding: DefaultSpacing.l2,
					marginTop: DefaultSpacing.l2,
					boxShadow: Depths.depth4,
					background: NeutralColors.white,
				}}
			>
				Bread: blue,Cookie:gree, Cake: red
				<LineChart
					height={height}
					// height={300}
					width={width}
					data={data4}
					tickFormat={"%m/%d"}
					margins={margins}
					allowMultipleShapesForPoints={true}
					xAxisTickCount={10}
				/>
			</Stack>
		</div>
	);
};

export default Statistics;
