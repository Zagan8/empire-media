import React, { useEffect, useState } from "react";
import { Card, Tabs } from "antd";
import type { TabsProps } from "antd";
import Chart from "../chart/chart";
import HistoryTable from "../history/history";
import StockService, { ChartDataItem } from "../../services/stock-service";
import { TimeSteps, timeStepsMap } from "../../helpers/time-steps-map";

const HomePage: React.FC = () => {
  const [chartData, setChartData] = useState<ChartDataItem[]>([]);
  const [timeStep, setTimeStep] = useState(TimeSteps.OneMinute);
  const handleTimeStepChange = (timeStep: TimeSteps) => {
    setTimeStep(timeStep);
  };

  useEffect(() => {
    const init = async () => {
      const timeStepItem = timeStepsMap[timeStep as TimeSteps];

      const chartData = await StockService.getStocks(
        timeStepItem.period,
        timeStepItem.timeFrame.start,
        timeStepItem.timeFrame.end
      );

      setChartData(chartData);
    };

    init();
  }, [timeStep]);

  const items: TabsProps["items"] = [
    {
      key: "chart",
      label: `Chart`,
      children: <Chart timeStep={timeStep} chartData={chartData} />,
    },
    {
      key: "history",
      label: `History`,
      children: <HistoryTable chartData={chartData} />,
    },
  ];

  const timeStepOptions: TabsProps["items"] = [
    {
      key: "1-minute",
      label: `1 Minute`,
    },
    {
      key: "5-minutes",
      label: `5 Minutes`,
    },
    {
      key: "1-hour",
      label: `1 Hour`,
    },
    {
      key: "1-week",
      label: `1 Week`,
    },
  ];

  return (
    <>
      <Card className="home-card">
        <Tabs
          defaultValue={timeStep}
          items={timeStepOptions}
          onChange={(e) => handleTimeStepChange(e as TimeSteps)}
        />
        <Tabs defaultActiveKey="1" items={items} />
      </Card>
    </>
  );
};

export default HomePage;
