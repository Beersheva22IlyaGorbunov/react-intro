import {
  Box,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  SelectChangeEvent,
} from "@mui/material";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import React, { useState } from "react";
import ChartPoint from "../../model/ChartPoint";
import StatisticsInterval from "../../model/StatisticsInterval";
import {
  getOccurenciesInArr,
} from "../../utils/statistics";
import StatisticsBarChart from "./StatisticsBarChart";

type Props = {
  data: any[];
  statisticsField: string;
  stepArr: number[];
  defaultStep: number;
};

function fillEmptyIntervals(arr: StatisticsInterval[], step: number) {
  if (arr.length < 2) {
    return arr;
  }
  const min = arr[0].min;
  const max = arr[arr.length - 1].max;
  let current = min;
  const emptyArr = Array.from({ length: (max - min) / step }).map(
    (__, index) => {
      const obj = {
        id: index,
        min: current,
        max: current + step,
        amount: 0,
      };
      current += step;
      return obj;
    }
  );
  return emptyArr.map((emptyElem) => {
    const foundElem = arr.find((elem) => elem.min === emptyElem.min);
    return foundElem ?? emptyElem;
  });
}


const columns: GridColDef[] = [
  {
    field: "min",
    headerName: "Min",
    type: "number",
    align: "center",
    headerAlign: "center",
    flex: 1,
  },
  {
    field: "max",
    headerName: "Max",
    type: "number",
    align: "center",
    headerAlign: "center",
    flex: 1,
  },
  {
    field: "amount",
    headerName: "Amount",
    type: "number",
    align: "center",
    headerAlign: "center",
    flex: 1,
  },
];

const Statistics: React.FC<Props> = ({
  data,
  statisticsField,
  stepArr,
  defaultStep,
}) => {
  const [stepVal, setStepVal] = useState<string>(`${defaultStep}`);
  const step: number = +stepVal;

  const handleChange = (event: SelectChangeEvent) => {
    setStepVal(event.target.value as string);
  };

  const statistics = getOccurenciesInArr(data, statisticsField, step);

  function getChartData(): ChartPoint[] {
    const filledStatistics = fillEmptyIntervals(statistics, step);
    const chartData: ChartPoint[] = filledStatistics.map((point: StatisticsInterval) => ({
      name: `${point.min} - ${point.max}`,
      value: point.amount,
    }));
    return chartData;
  }

  return (
    <>
      <FormControl sx={{ mb: 2, width: 150 }}>
        <InputLabel id="demo-simple-select-label">Step</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={stepVal}
          label="Step"
          onChange={handleChange}
        >
          {stepArr.map((step) => (
            <MenuItem key={step} value={step}>{step}</MenuItem>
          ))}
        </Select>
      </FormControl>
      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <Paper
            sx={{
              p: 2,
              display: "flex",
              flexDirection: "column",
            }}
          >
            <Box sx={{ height: "55vh" }}>
              <DataGrid
                loading={statistics.length === 0}
                columns={columns}
                rows={statistics}
              />
            </Box>
          </Paper>
        </Grid>
        <Grid item xs={12} md={6}>
          <Paper
            sx={{
              py: 2,
              display: "flex",
              flexDirection: "column",
              height: 240,
            }}
          >
            <StatisticsBarChart data={getChartData()} />
          </Paper>
        </Grid>
      </Grid>
    </>
  );
};

export default Statistics;
