/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { Area, AreaChart, CartesianGrid, XAxis, YAxis } from "recharts";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { WeatherHourly } from "@/types/apiTypes";
import Image from "next/image";
import type { JSXElementConstructor, ReactElement } from "react";

export const description = "An area chart with gradient fill";

const chartConfig = {
  degrees: {
    label: "Degrees",
    color: "var(--chart-2)",
  },
} satisfies ChartConfig;

interface ChartDataBottom {
  // top: { time: string; icon: string; temperature: number };
  top: string;
  hour: string;
  degrees: number;
}

function TopTick(
  props: any
): ReactElement<SVGElement, string | JSXElementConstructor<any>> {
  const { x, y, payload } = props;
  // payload.value содержит строку вида "10:00 | https://openweathermap.org/img/wn/02d@2x.png | 33"
  if (!payload || typeof payload.value !== "string") {
    return <g />;
  }
  const [time, iconUrl, temp] = payload.value.split(" | ");
  console.log(props);
  return (
    <g transform={`translate(${x},${y})`}>
      <foreignObject
        x={props.index === 7 ? -30 : -20}
        y={-60}
        width={40}
        height={100}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <span style={{ color: "#fff", fontSize: 12 }}>{time}</span>
          <Image
            src={iconUrl}
            alt=""
            width={32}
            height={32}
            style={{ width: 32, height: 32 }}
          />
          <span style={{ color: "#fff", fontSize: 14 }}>{temp}°</span>
        </div>
      </foreignObject>
    </g>
  );
}

export function WeatherGraph({
  hourly,
  condition,
}: {
  hourly: WeatherHourly[];
  condition: string;
}) {
  // Prepare chart data
  const chartData: ChartDataBottom[] = hourly.slice(0, 8).map((h) => ({
    top: `${
      h.time
    } | ${`https://openweathermap.org/img/wn/${h.icon}@2x.png`} | ${
      h.temperature
    }`,
    // top: {
    //   time: h.time,
    //   icon: `https://openweathermap.org/img/wn/${h.icon}@2x.png`,
    //   temperature: h.temperature,
    // },
    hour: h.time,
    degrees: h.temperature,
  }));

  // Find min and max temperature
  const temps = chartData.map((d) => d.degrees);
  const minTemp = Math.min(...temps);
  const maxTemp = Math.max(...temps);

  const yMin = Math.min(0, minTemp);
  const yMax = maxTemp + (maxTemp % 2 === 0 ? 10 : 10);

  return (
    <Card className={`card-bg card-bg-${condition.toLowerCase()}`}>
      <CardHeader>
        <CardTitle>Temperature Chart for 24h</CardTitle>
      </CardHeader>
      <CardContent className="w-full">
        <ChartContainer
          config={chartConfig}
          className="min-h-[380px] h-[380px] w-full"
        >
          <AreaChart accessibilityLayer data={chartData}>
            <CartesianGrid
              strokeDasharray="5 5"
              stroke="rgba(255,255,255,0.1)"
            />
            Hourly temperature
            {/* Нижняя ось X */}
            <XAxis
              dataKey="hour"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              tickFormatter={(value) => value}
              tick={{ style: { fill: "#fff" } }}
              orientation="bottom"
            />
            {/* Верхняя ось X с кастомным отображением top */}
            <XAxis
              dataKey="top"
              xAxisId="top"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              tick={(props) => TopTick(props)}
              interval={0}
              height={75}
              orientation="top"
            />
            <YAxis
              domain={[yMin, yMax]}
              tickLine={false}
              axisLine={false}
              tickMargin={32}
              allowDecimals={true}
              tickFormatter={(value) => `${value}°`}
              tick={{ style: { fill: "#fff" } }}
            />
            <ChartTooltip cursor={false} content={<ChartTooltipContent />} />
            <defs>
              <linearGradient id="fillDegrees" x1="0" y1="0" x2="0" y2="1">
                <stop
                  offset="5%"
                  stopColor="var(--color-degrees)"
                  stopOpacity={0.8}
                />
                <stop
                  offset="95%"
                  stopColor="var(--color-degrees)"
                  stopOpacity={0}
                />
              </linearGradient>
            </defs>
            <Area
              dataKey="degrees"
              type="natural"
              fill="url(#fillDegrees)"
              fillOpacity={0.4}
              stroke="var(--color-degrees)"
              stackId="a"
            />
          </AreaChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
