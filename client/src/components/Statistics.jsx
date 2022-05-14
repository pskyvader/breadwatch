import { LineChart } from "@fluentui/react-charting";
import { Stack, Shimmer, DefaultPalette } from "@fluentui/react";

import { Depths, DefaultSpacing, NeutralColors } from "@fluentui/theme";
import { useState, useEffect } from "react";

import { getAllLogs } from "../API/logs";

const data2 = {
	chartTitle: "Line Chart",
	lineChartData: [
		{
			data: [
				{
					x: 10,
					y: 24,
					xAxisCalloutData: "2018/01/01",
					yAxisCalloutData: "24%",
				},
				{
					x: 20,
					y: 4,
					xAxisCalloutData: "2018/01/01",
					yAxisCalloutData: "24%",
				},
				{
					x: 30,
					y: 20,
					xAxisCalloutData: "2018/01/01",
					yAxisCalloutData: "24%",
				},
				{
					x: 40,
					y: 10,
					xAxisCalloutData: "2018/01/01",
					yAxisCalloutData: "24%",
				},
				{
					x: 50,
					y: 20,
					xAxisCalloutData: "2018/01/01",
					yAxisCalloutData: "24%",
				},
			],
			legend: "One",
			color: DefaultPalette.blue,
		},
	],
};

// functional component for statistics
const Statistics = (props) => {
	const [dataset, setDataset] = useState(null);

	useEffect(() => {
		console.log(dataset);
		setDataset(null);
		getAllLogs().then((response) => {
			if (response.error) {
				return false;
			}
            console.log("response", response);
			setDataset(response);
		});
	}, [setDataset, dataset]);

	if (dataset === null) {
		return (
			<div>
				<Shimmer style={{ padding: 2 }} />
				<Shimmer style={{ padding: 2 }} width="75%" />
				<Shimmer style={{ padding: 2 }} width="50%" />
			</div>
		);
	}
	console.log(dataset);
    return <div> data</div>;
	return (
		<div>
			<Stack
				style={{
					padding: DefaultSpacing.l2,
					boxShadow: Depths.depth4,
					background: NeutralColors.white,
				}}
			>
				<LineChart
					data={dataset}
					strokeWidth={4}
					tickFormat={"%m/%d"}
					height={300}
					width={600}
				/>
			</Stack>
		</div>
	);
};

export default Statistics;
