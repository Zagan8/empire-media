import dayjs from "dayjs";
export enum TimeSteps {
  OneMinute = "1-minute",
  FiveMinutes = "5-minutes",
  OneHour = "1-hour",
  OneWeek = "1-week",
}

const lastDay = dayjs().add(-1, "day").format("MM/DD/YYYY");
const today = dayjs().format("MM/DD/YYYY");

export const timeStepsMap = {
  [TimeSteps.OneMinute]: {
    timeFrame: {
      start: lastDay,
      end: today,
    },
    period: "1",
    format: (date: string) => dayjs(date).format("HH:mm"),
  },
  [TimeSteps.FiveMinutes]: {
    timeFrame: {
      start: lastDay,
      end: today,
    },
    period: "5",
    format: (date: string) => dayjs(date).format("HH:mm"),
  },
  [TimeSteps.OneHour]: {
    timeFrame: {
      start: lastDay,
      end: today,
    },
    period: "60",
    format: (date: string) => dayjs(date).format("HH:mm"),
  },
  [TimeSteps.OneWeek]: {
    timeFrame: {
      start: dayjs().add(-30, "day").format("MM/DD/YYYY"),
      end: today,
    },
    period: "10080",
    format: (date: string) => dayjs(date).format("MM/DD/YYYY"),
  },
};
