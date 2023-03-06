import { Card, Col, Row, Skeleton, Statistic } from "antd";
import { useStock } from "../../hooks/use-stock";
import { useEffect, useRef } from "react";
import { ArrowDownOutlined, ArrowUpOutlined } from "@ant-design/icons";
import dayjs from "dayjs";

const StockInfo = () => {
  const cardRef = useRef<HTMLDivElement>(null);
  const { message, isReady, isPositive } = useStock();

  useEffect(() => {
    if (isReady && message && cardRef.current) {
      cardRef.current.classList.add(
        "active",
        isPositive ? "positive" : "negative"
      );

      let timer = setTimeout(() => {
        cardRef.current?.classList.remove(
          "active",
          isPositive ? "positive" : "negative"
        );
      }, 1000);

      return () => clearTimeout(timer);
    }
  }, [message, isReady, isPositive]);

  if (!isReady || !message) {
    return <Skeleton active={true} />;
  }

  const { last, change, percentChange, lastUpdate } = message;

  const isPositiveChange = change > 0;

  return (
    <Card ref={cardRef} title="APPL">
      <Row justify={"center"}>
        <Col span={6}>
          <Statistic
            className="stock-price"
            title="Last"
            value={last}
            precision={2}
            prefix={
              isPositiveChange ? (
                <ArrowUpOutlined className="positive" />
              ) : (
                <ArrowDownOutlined className="negative" />
              )
            }
            suffix=""
          />
        </Col>
        <Col span={6}>
          <Statistic
            title="Change"
            value={change}
            precision={2}
            prefix={isPositiveChange ? "+" : "-"}
            valueStyle={{ color: isPositiveChange ? "green" : "red" }}
            suffix={`(${isPositiveChange ? "+" : "-"}${percentChange.toFixed(
              2
            )}%)`}
          />
        </Col>
        <Col span={6}>
          <Statistic
            title="Last Update"
            value={dayjs(lastUpdate).format("DD/MM/YYYY hh:mm:ss")}
            precision={2}
          />
        </Col>
      </Row>
    </Card>
  );
};

export default StockInfo;
