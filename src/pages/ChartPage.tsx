import { AgCharts } from "ag-charts-react";
import { useEffect, useState } from "react";
import { fetchChartData } from "../services/api";
import { ChartData } from "../types";
import {
  AgCartesianAxisOptions,
  AgCartesianSeriesOptions,
} from "ag-charts-community";

const ChartPage = () => {
  const [chartData, setChartData] = useState<ChartData[]>([]);

  useEffect(() => {
    const getData = async () => {
      const data = await fetchChartData();
      // Transform data to numerical values
      const transformedData = data.map((item: ChartData) => ({
        Week: item.Week,
        gmDollars: parseFloat(item["GM Dollars"].replace(/[$,]/g, "")),
        gmPercentage: parseFloat(item["GM %"].replace("%", "")),
      }));
      setChartData(transformedData);
    };
    getData();
  }, []);

  const options = {
    title: {
      text: "Gross Margin",
    },
    zoom: {
      enabled: true,
      enableScrolling: true,
      enablePanning: true,
      enableAxisDragging: true,
      enableDoubleClickToReset: true,
    },
    data: chartData,
    series: [
      {
        type: "bar",
        xKey: "Week",
        yKey: "gmDollars",
        yName: "GM Dollars",
      },
      {
        type: "line",
        xKey: "Week",
        yKey: "gmPercentage",
        yName: "GM %",
        yAxisKey: "percentageAxis",
      },
    ] as AgCartesianSeriesOptions[],
    axes: [
      {
        type: "category",
        position: "bottom",
        title: {
          text: "Week",
        },
        rotation: 95,
        interval: 0,
        label: {
          minSpacing: 1,
        },
        tick: {
          maxSpacing: 10, // Adjust this value as needed
        },
      },
      {
        type: "number",
        position: "left",
        keys: ["gmDollars"],
      },
      {
        type: "number",
        position: "right",
        keys: ["gmPercentage"],
        max: 100,
        min: 0,
      },
    ] as AgCartesianAxisOptions[],
  };

  return (
    <div className="w-full text-white py-6 h-full">
      <div className="overflow-auto h-[calc(100%-80px)]">
        <AgCharts
          className="overflow-auto h-full bg-[#1c2231]"
          options={options}
        />
      </div>
    </div>
  );
};

export default ChartPage;
