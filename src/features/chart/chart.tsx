import React from "react";
import {
  CategoryScale,
  Chart as ChartJS,
  ChartOptions,
  Filler,
  Legend,
  LinearScale,
  LineElement,
  PointElement,
  Title,
  Tooltip,
} from "chart.js";
import { Line } from "react-chartjs-2";
import dayjs from "dayjs";
import { TimeSteps, timeStepsMap } from "../../helpers/time-steps-map";
import { ChartDataItem } from "../../services/stock-service";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Filler,
  Legend
);

interface Props {
  chartData: ChartDataItem[];

  timeStep: TimeSteps;
}

const Chart: React.FC<Props> = ({ chartData, timeStep }) => {
  const labels = chartData.map((data) =>
    dayjs(data.Date).format(
      timeStep === TimeSteps.OneWeek ? "DD/MM/YYYY" : "HH:mm"
    )
  );

  const options: ChartOptions = {
    maintainAspectRatio: false,
    scales: {
      x: {
        ticks: {
          callback: function (xLabel, index) {
            const currentItem = chartData[xLabel as number];
            const currentDate = currentItem.Date;
            if (timeStep === TimeSteps.OneWeek) {
              return timeStepsMap[timeStep].format(currentDate);
            }
            return index % 3 === 0
              ? this.getLabelForValue(xLabel as number)
              : "";
          },
        },
      },
    },
    responsive: true,
    interaction: {
      mode: "index",
      intersect: false,
    },
    plugins: {
      legend: {
        position: "top" as const,
      },
    },
  };

  const data = {
    labels,
    datasets: [
      {
        fill: true,
        label: "AAPL NASDAQ",
        data: chartData.map((data) => data.Close),
        borderColor: "rgb(53, 162, 235)",
        backgroundColor: "rgba(53, 162, 235, 0.5)",
      },
    ],
  };

  //@ts-ignore
  return <Line height={500} options={options} data={data} />;
};

export default Chart;
