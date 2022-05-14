import { LineChart } from "@fluentui/react-charting";
import { Stack, Shimmer, DefaultPalette } from "@fluentui/react";

import { Depths, DefaultSpacing, NeutralColors } from "@fluentui/theme";
import { useState, useEffect } from "react";

import { getAllLogs } from "../API/logs";


const parseData = (data,field) => {
	const dataArray = data.map((element) => {
		return {
			x: new Date(element.date),
			y: element[field],
		};
	});
	console.log("dataArray", dataArray);
	return dataArray;
};

// functional component for statistics
const Statistics = () => {
	const [dataset, setDataset] = useState(null);
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
	const data1 = parseData(dataset,"bread");
	const data2 = parseData(dataset,"cookie");
	const data3 = parseData(dataset,"cake");

	const data4 = {
		chartTitle: "Line Chart",
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
            culture={window.navigator.language}
            data={data4}
            legendsOverflowText={'Overflow Items'}
            yMinValue={0}
            yMaxValue={20}
			height={600}
			width={600}
            // margins={margins}
            allowMultipleShapesForPoints={true}
          />
				{/* <LineChart
					data={data4}
					strokeWidth={4}
					tickFormat={"%m/%d"}
					height={600}
					width={600}
					hideLegend={false}
					showXAxisLablesTooltip
				/> */}
			</Stack>
		</div>
	);
};

export default Statistics;
