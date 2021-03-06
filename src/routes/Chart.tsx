import { useQuery } from "react-query";
import { fetchCoinHistory } from "./api";
import ApexChart from "react-apexcharts";
import { useEffect, useState } from "react";
import { useRecoilValue } from "recoil";
import { isDarkAtom } from "../atoms";

interface IChartProps {
  coinId: string;
}

interface IHistoricalData {
  time_open: Date;
  time_close: Date;
  open: number;
  high: number;
  low: number;
  close: number;
  volume: number;
  market_cap: number;
}
function Chart({ coinId }: IChartProps) {
  const isDark = useRecoilValue(isDarkAtom);

  const { isLoading, data } = useQuery<IHistoricalData[]>(
    "coinHistory",
    () => fetchCoinHistory(coinId),
    {
      refetchInterval: 10000,
    }
  );
  return (
    <>
      {isLoading ? (
        "Loading Chart..."
      ) : (
        <ApexChart
          type="candlestick"
          series={[
            {
              data: data?.map((e) => {
                return {
                  x: new Date(e.time_close),
                  y: [
                    Math.floor(e.open),
                    Math.floor(e.high),
                    Math.floor(e.low),
                    Math.floor(e.close),
                  ],
                };
              }),
            },
          ]}
          options={{
            theme: {
              mode: isDark ? "light" : "dark",
            },
            chart: {
              height: 500,
              width: 1000,
              background: "transparent",
              toolbar: {
                show: false,
              },
            },
            yaxis: {
              tooltip: {
                enabled: true,
              },
            },
            xaxis: {
              type: "datetime",
            },
            grid: {
              show: false,
            },
          }}
        />
      )}
    </>
  );
}

export default Chart;
