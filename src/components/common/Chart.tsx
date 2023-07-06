import { useTheme } from '@mui/material';
import React from 'react'
import { Label, Line, LineChart, ResponsiveContainer, XAxis, YAxis } from 'recharts'

type Props = {
  data: Array<{
    x: string,
    y: number
  }>
}

const Chart: React.FC<Props> = ({ data }) => {
  const theme = useTheme();

  return (
      <ResponsiveContainer>
        <LineChart
          data={data}
          margin={{
            top: 16,
            right: 16,
            bottom: 0,
            left: 24,
          }}
        >
          <XAxis
            dataKey="x"
            stroke={theme.palette.text.secondary}
            style={theme.typography.body2}
          />
          <YAxis
            stroke={theme.palette.text.secondary}
            style={theme.typography.body2}
          >
            <Label
              angle={270}
              position="left"
              style={{
                textAnchor: 'middle',
                fill: theme.palette.text.primary,
                ...theme.typography.body1,
              }}
            >
              Sales ($)
            </Label>
          </YAxis>
          <Line
            isAnimationActive={false}
            type="monotone"
            dataKey="y"
            stroke={theme.palette.primary.main}
            dot={false}
          />
        </LineChart>
      </ResponsiveContainer>
  )
}

export default Chart