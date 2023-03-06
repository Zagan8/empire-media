import dayjs from "dayjs";
export enum TimeSteps {
  OneMinute = "1-minute",
  FiveMinutes = "5-minutes",
  OneHour = "1-hour",
  OneWeek = "1-week",
}
export const timeStepsMap = {
  [TimeSteps.OneMinute]: {
    timeFrame:
      dayjs().add(-3, "day").format("MM/DD/YYYY") +
      "&EndTime=" +
      dayjs().format("MM/DD/YYYY") +
      "%" +
      dayjs().format("YYYY") +
      ":59",
    period: "1",
    format: (date: string) => dayjs(date).format("HH:mm"),
  },
  [TimeSteps.FiveMinutes]: {
    timeFrame:
      dayjs().add(-3, "day").format("MM/DD/YYYY") +
      "&EndTime=" +
      dayjs().format("MM/DD/YYYY") +
      "%" +
      dayjs().format("YYYY") +
      ":59",
    period: "5",
    format: (date: string) => dayjs(date).format("HH:mm"),
  },
  [TimeSteps.OneHour]: {
    timeFrame:
      dayjs().add(-3, "day").format("MM/DD/YYYY") +
      "&EndTime=" +
      dayjs().format("MM/DD/YYYY") +
      "%" +
      dayjs().format("YYYY") +
      ":59",
    period: "60",
    format: (date: string) => dayjs(date).format("HH:mm"),
  },
  [TimeSteps.OneWeek]: {
    timeFrame:
      dayjs().add(-30, "day").format("MM/DD/YYYY") +
      "&EndTime=" +
      dayjs().format("MM/DD/YYYY") +
      "%" +
      dayjs().format("YYYY") +
      ":59",
    period: "10080",
    format: (date: string) => dayjs(date).format("MM/DD/YYYY"),
  },
};
