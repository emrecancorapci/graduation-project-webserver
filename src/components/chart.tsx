"use client";

import { type SensorShort } from "@/stores/chart-controller";
import { useState } from "react";
import {
  CartesianGrid,
  Label,
  Legend,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import ChartTooltip from "./ui/chart-tooltip";

interface ChartData {
  id: number;
  time: string;
  timeAxis: string;
  tp: number;
  hd: number;
  ph: number;
  gh: number;
  aq: number;
  lt: number;
}

interface Sensor {
  id: number;
  name: string;
  short: SensorShort;
  unit: string;
}

const strokes = [
  "#82ca9d",
  "#8884d8",
  "#823afd",
  "#f88488",
  "#c2ca5d",
  "#7ab4f8",
];

export default function Chart({
  data,
  sensors,
  visibleValues,
}: {
  data: ChartData[];
  sensors: Sensor[];
  visibleValues: Set<SensorShort>;
}) {
  const [chartState] = useState({
    chartMarigin: {
      top: 5,
      right: 30,
      left: 20,
      bottom: 20,
    },
    xAxisDomain: ["dataMin", "dataMax"],
    yAxisDomain: [0, "dataMax+5"],
  });

  return (
    <ResponsiveContainer>
      <LineChart
        width={1200}
        height={600}
        data={data}
        margin={chartState.chartMarigin}
      >
        <CartesianGrid fill="#222" opacity={0.2} />
        <XAxis domain={chartState.xAxisDomain} dataKey="timeAxis">
          <Label value="Time" position="insideBottom" offset={-10} />
        </XAxis>
        {/* @ts-expect-error Type defined incorrectly. It should be (number | string)[] but it is number[] | string[] */}
        <YAxis domain={chartState.yAxisDomain} />
        <Tooltip content={<ChartTooltip />} />
        <Legend verticalAlign="top" height={42} />

        {sensors.map((sensor, index) => (
          <Line
            key={sensor.id}
            type="monotone"
            hide={!visibleValues.has(sensor.short)}
            dataKey={sensor.short.toLowerCase()}
            name={sensor.name}
            stroke={strokes[index]}
            strokeWidth={2}
            unit={sensor.unit}
          />
        ))}
      </LineChart>
    </ResponsiveContainer>
  );
}
