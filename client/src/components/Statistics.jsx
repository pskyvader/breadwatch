import { LineChart } from "@fluentui/react-charting";
import { DefaultPalette } from "@fluentui/react";

const data = {
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
	return (
		<LineChart
			data={data}
			strokeWidth={4}
			tickFormat={"%m/%d"}
			height={300}
			width={600}
		/>
	);
};

export default Statistics;
