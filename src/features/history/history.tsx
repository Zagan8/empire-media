import React from "react";
import { Table } from "antd";
import type { ColumnsType } from "antd/es/table";
import { ChartDataItem } from "../../services/stock-service";
import classNames from "classnames";

import "./history.scss";

const columns: ColumnsType<ChartDataItem> = [
  {
    title: "Date",
    dataIndex: "Date",
    sorter: (a, b) => new Date(a.Date).getTime() - new Date(b.Date).getTime(),
  },
  {
    title: "High",
    dataIndex: "High",
    defaultSortOrder: "descend",
    sorter: (a, b) => a.High - b.High,
  },
  {
    title: "Low",
    dataIndex: "Low",
    sorter: (a, b) => a.Low - b.Low,
  },
  {
    title: "Open",
    dataIndex: "Open",
    sorter: (a, b) => a.Open - b.Open,
  },
  {
    title: "Close",
    dataIndex: "Close",
    sorter: (a, b) => a.Close - b.Close,
  },
  {
    title: "%Change",
    dataIndex: "change",
    sorter: (a, b) => {
      const aChange = ((a.Close - a.Open) / a.Close) * 100;
      const bChange = ((b.Close - b.Open) / b.Close) * 100;

      return aChange - bChange;
    },
    render: (_, record) => {
      return (
        <span
          className={classNames("change-percent", {
            positive: record.Close > record.Open,
            negative: record.Close < record.Open,
          })}
        >
          {calculateDiff(record.Close, record.Open)}
        </span>
      );
    },
  },
];

const calculateDiff = (newPrice: number, oldPrice: number) => {
  return (((newPrice - oldPrice) / oldPrice) * 100).toFixed(2) + "%";
};

interface Props {
  chartData: ChartDataItem[];
}
const HistoryTable: React.FC<Props> = ({ chartData }) => {
  return (
    <Table
      pagination={{ pageSize: 8 }}
      rowKey="Date"
      className="history-table"
      columns={columns}
      dataSource={chartData}
    />
  );
};

export default HistoryTable;
