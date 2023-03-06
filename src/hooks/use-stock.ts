import { useEffect, useState } from "react";
import useWebSocket from "react-use-websocket";

export interface SocketMessageResponse {
  last: number;
  change: number;
  percentChange: number;
  lastUpdate: string;
}

const WS_URL = "wss://wstest.fxempire.com?token=btctothemoon";
export const useStock = () => {
  const [message, setMessages] = useState<SocketMessageResponse>({
    last: 0,
    change: 0,
    percentChange: 0,
    lastUpdate: new Date().toISOString(),
  });
  const [isPositive, setPositive] = useState(false);

  const onMessage = (event: MessageEvent) => {
    const newMessage = JSON.parse(event.data);

    const stockInfo = newMessage["s-aapl"];

    const isPositiveChange = stockInfo.last > message.last;

    setMessages(stockInfo);
    setPositive(isPositiveChange);
  };

  const { readyState, sendJsonMessage } = useWebSocket(WS_URL, {
    onOpen: () => {
      console.log("webSocket connected");
    },
    onMessage,
  });

  useEffect(() => {
    sendJsonMessage({ type: "SUBSCRIBE", instruments: ["s-aapl"] });
  }, [sendJsonMessage]);

  return {
    message,
    isReady: readyState === 1,
    isPositive,
  };
};
