import React from "react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, ResponsiveContainer, Tooltip } from 'recharts';
import ChartPoint from "../../model/ChartPoint";

type Props = {
  data: ChartPoint[]
}

const StatisticsBarChart: React.FC<Props> = ({ data }) => (
  <ResponsiveContainer width="100%" height="100%">
    <BarChart
      data={data}
      margin={{
        top: 5,
        right: 30,
        left: -20,
        bottom: 5,
      }}
    >
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis dataKey="name" />
      <YAxis />
      <Tooltip />
      <Bar dataKey="value" fill="#8884d8" />
    </BarChart>
  </ResponsiveContainer>
)

export default StatisticsBarChart;
