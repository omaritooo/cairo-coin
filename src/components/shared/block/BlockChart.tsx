import {
  ResponsiveContainer,
  AreaChart,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  Area,
} from "recharts";
import { HistorySlot } from "src/services/types/history";

export const BlockChart = ({
  data,
  intervals,
}: {
  data: HistorySlot[];
  intervals: number;
}) => {
  console.log("Block Chart mounted");
  console.log(intervals);
  return (
    <ResponsiveContainer
      className="px-4 overflow-scroll "
      height={350}
      minWidth={600}
      width="100%"
    >
      <AreaChart
        data={data}
        margin={{
          top: 5,
          right: 50,
          left: 50,
        }}
      >
        <defs>
          <linearGradient id="colorUv" x1="0" x2="0" y1="0" y2="1">
            <stop offset="5%" stopColor="#8884d8" stopOpacity={0.8} />
            <stop offset="95%" stopColor="#8884d8" stopOpacity={0} />
          </linearGradient>
          <linearGradient id="colorPv" x1="0" x2="0" y1="0" y2="1">
            <stop offset="5%" stopColor="#82ca9d" stopOpacity={0.8} />
            <stop offset="95%" stopColor="#82ca9d" stopOpacity={0} />
          </linearGradient>
        </defs>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis
          dataKey="Time"
          interval={intervals}
          minTickGap={5}
          // padding="gap"
          tickCount={1}
          tickMargin={15}
          tickSize={1}
        />
        <YAxis
          domain={([dataMin, dataMax]) => {
            const absMax = Math.floor(dataMax + 1);
            const absMin = Math.floor(dataMin - 1);
            return [absMin, absMax];
          }}
          tickMargin={5}
          type="number"
        />

        <Tooltip />
        <Legend />

        <Area
          dataKey="Value"
          fill="url(#colorPv)"
          fillOpacity={1}
          stroke="#8884d8"
          type="monotone"
        />

        {/* <Line dataKey="uv" stroke="#82ca9d" type="monotone" /> */}
      </AreaChart>
    </ResponsiveContainer>
  );
};
