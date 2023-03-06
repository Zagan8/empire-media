import axios from "axios";
import dayjs from "dayjs";

const cache = new Map();

export interface ChartDataItem {
  Close: number;
  Date: string;
  High: number;
  Low: number;
  Open: number;
  StartDate: string;
  StartTime: string;
  Volume: number;
}

const StockService = {
  getStocks: async (period: string, startTime: string, endTime: string) => {
    const cacheKey = `${period}-${startTime}-${endTime}`;

    if (cache.has(cacheKey)) {
      return cache.get(cacheKey);
    }

    const result = await axios.get<ChartDataItem[]>(
      `https://test.fxempire.com/api/v1/en/stocks/chart/candles?Identifier=AAPL.XNAS&IdentifierType=Symbol&AdjustmentMethod=All&IncludeExtended=False&period=${period}&Precision=Minutes&StartTime=${startTime}&EndTime=${endTime}%${dayjs().format(
        "YYYY"
      )}:59&_fields=ChartBars.StartDate,ChartBars.High,ChartBars.Low,ChartBars.StartTime,ChartBars.Open,ChartBars.Close,ChartBars.Volume`
    );

    cache.set(cacheKey, result.data);

    return result.data;
  },
};

export default StockService;
