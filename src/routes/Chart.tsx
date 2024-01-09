import { useQuery } from "react-query";
import { fetchCoinHistory } from "../api";
import ApexChart from "react-apexcharts";
import { useState } from "react";
import styled from "styled-components";
import { useRecoilValue } from "recoil";
import { isDarkAtom } from "../atoms";

const ChartBox = styled.div`
  border: 2px solid ${(props) => props.theme.boxColor};
  border-radius: 10px;
`;

const ButtonBox = styled.div`
  *zoom: 1;
  margin: 5px;
  &::before {
    content: "";
    display: block;
    clear: both;
  }
  &::after {
    content: "";
    display: block;
    clear: both;
  }
`;

const ChartChangeButton = styled.svg`
  float: right;
  width: 20px;
  height: 20px;

  cursor: pointer;
  &:hover {
    cursor: pointer;
  }
`;

interface ICharProps {
  coinId: string;
}

interface IHistorical {
  time_open: number;
  time_close: number;
  open: string;
  high: string;
  low: string;
  close: string;
  volume: string;
  market_cap: number;
}

function formatDate(date: Date) {
  var d = new Date(date),
    month = "" + (d.getMonth() + 1),
    day = "" + d.getDate(),
    year = d.getFullYear();

  if (month.length < 2) month = "0" + month;
  if (day.length < 2) day = "0" + day;

  return [year, month, day].join("-");
}

function Chart({ coinId }: ICharProps) {
  const { isLoading, data } = useQuery<IHistorical[]>(["price", coinId], () => fetchCoinHistory(coinId), {
    refetchInterval: 600000,
  });

  const [chartType, setChartType] = useState("line");

  const isDark = useRecoilValue(isDarkAtom);

  var onClickCandleButton = () => {
    setChartType("candlestick");
  };
  var onClickLineButton = () => {
    setChartType("line");
  };

  return (
    <div>
      {isLoading ? (
        "Loading chart..."
      ) : (
        <ChartBox>
          <ButtonBox>
            {chartType !== "candlestick" ? (
              <ChartChangeButton
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                onClick={onClickCandleButton}
              >
                <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
                <g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g>
                <g id="SVGRepo_iconCarrier">
                  {" "}
                  <path d="M8 3V6" stroke="#55efc4" strokeWidth="2" strokeLinecap="round"></path>{" "}
                  <path d="M8 14V17" stroke="#55efc4" strokeWidth="2" strokeLinecap="round"></path>{" "}
                  <rect x="6" y="6" width="4" height="8" rx="0.8" stroke="#55efc4" strokeWidth="2"></rect>{" "}
                  <path d="M16 7V12" stroke="#55efc4" strokeWidth="2" strokeLinecap="round"></path>{" "}
                  <path d="M16 17V20" stroke="#55efc4" strokeWidth="2" strokeLinecap="round"></path>{" "}
                  <rect x="14" y="12" width="4" height="5" rx="0.8" stroke="#55efc4" strokeWidth="2"></rect>{" "}
                </g>
              </ChartChangeButton>
            ) : null}
            {chartType !== "line" ? (
              <ChartChangeButton
                fill="#55efc4"
                viewBox="-3 0 32 32"
                version="1.1"
                xmlns="http://www.w3.org/2000/svg"
                onClick={onClickLineButton}
              >
                <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
                <g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g>
                <g id="SVGRepo_iconCarrier">
                  <path d="M23.36 9.32c-1.32 0-2.36 1.080-2.36 2.36 0 0.28 0.040 0.56 0.12 0.8l-4.8 4.080c-0.32-0.2-0.72-0.28-1.16-0.28s-0.88 0.12-1.24 0.36l-2.72-2.2c0.080-0.24 0.12-0.44 0.12-0.72 0-1.32-1.080-2.36-2.36-2.36-1.32 0-2.36 1.080-2.36 2.36 0 0.36 0.080 0.68 0.2 0.96l-3.44 3.44c-0.28-0.12-0.64-0.2-0.96-0.2-1.32 0-2.36 1.080-2.36 2.36 0 1.32 1.080 2.36 2.36 2.36s2.36-1.080 2.36-2.36c0-0.36-0.080-0.68-0.2-0.96l3.44-3.44c0.28 0.12 0.64 0.2 0.96 0.2 0.44 0 0.88-0.12 1.24-0.36l2.76 2.12c-0.080 0.24-0.080 0.44-0.080 0.72 0 1.32 1.080 2.36 2.36 2.36s2.36-1.080 2.36-2.36c0-0.28-0.040-0.56-0.12-0.8l4.8-4.080c0.32 0.2 0.72 0.28 1.16 0.28 1.32 0 2.36-1.080 2.36-2.36-0.040-1.2-1.16-2.28-2.44-2.28zM2.36 21c-0.36 0-0.68-0.32-0.68-0.68 0-0.4 0.32-0.68 0.68-0.68s0.68 0.32 0.68 0.68c0 0.36-0.28 0.68-0.68 0.68zM8.24 13.76c0-0.4 0.32-0.68 0.68-0.68s0.68 0.32 0.68 0.68-0.32 0.68-0.68 0.68c-0.36 0-0.68-0.32-0.68-0.68zM15.2 19.28c-0.4 0-0.68-0.32-0.68-0.68s0.32-0.68 0.68-0.68 0.68 0.32 0.68 0.68c-0.040 0.4-0.28 0.68-0.68 0.68zM23.36 12.36c-0.36 0-0.68-0.32-0.68-0.68 0-0.4 0.32-0.68 0.68-0.68 0.4 0 0.68 0.32 0.68 0.68 0 0.4-0.32 0.68-0.68 0.68z"></path>{" "}
                </g>
              </ChartChangeButton>
            ) : null}
          </ButtonBox>
          {chartType === "line" ? (
            <ApexChart
              type="line"
              series={[{ name: "price", data: data?.map((price) => Number(price.close)) ?? [] }]}
              options={{
                theme: { mode: isDark ? "dark" : "light" },
                chart: { height: 500, width: 500, toolbar: { show: false }, background: "transparent" },
                grid: { show: false },
                xaxis: {
                  labels: { show: false },
                  axisTicks: { show: false },
                  axisBorder: { show: false },
                  categories: data?.map((price) => formatDate(new Date(price.time_close * 1000))),
                },
                yaxis: { labels: { show: false } },
                stroke: { curve: "smooth", width: 3 },
                fill: { type: "gradient", gradient: { gradientToColors: ["#74b9ff"], stops: [0, 100] } },
                colors: ["#ff7675"],
                tooltip: { y: { formatter: (value) => `$${value.toFixed(2)}` } },
              }}
            />
          ) : null}
          {chartType === "candlestick" ? (
            <ApexChart
              type="candlestick"
              series={[
                {
                  name: "price",
                  data:
                    data?.map((price) => ({
                      x: price.time_close * 1000,
                      y: [Number(price.open), Number(price.high), Number(price.low), Number(price.close)],
                    })) ?? [],
                },
              ]}
              options={{
                theme: { mode: isDark ? "dark" : "light" },
                chart: { height: 500, width: 500, toolbar: { show: false }, background: "transparent" },
                grid: { show: false },
                xaxis: {
                  labels: { show: false },
                  axisTicks: { show: false },
                  axisBorder: { show: false },
                  categories: data?.map((price) => formatDate(new Date(price.time_close * 1000))),
                },
                yaxis: { labels: { show: false } },
                stroke: { curve: "smooth" },
                tooltip: { y: { formatter: (value) => `$${value.toFixed(2)}` } },
                plotOptions: {
                  candlestick: {
                    colors: {
                      upward: "#74b9ff",
                      downward: "#ff7675",
                    },
                  },
                },
              }}
            />
          ) : null}
        </ChartBox>
      )}
    </div>
  );
}

export default Chart;
