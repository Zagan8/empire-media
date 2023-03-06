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
  },
};
