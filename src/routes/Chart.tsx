import { useQuery } from "react-query";
import { fetchCoinHistory } from "../api";
import ApexChart from "react-apexcharts";

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

function Chart({ coinId }: ICharProps) {
  const { isLoading, data } = useQuery<IHistorical[]>(["price", coinId], () => fetchCoinHistory(coinId), {
    refetchInterval: 600000,
  });

  return (
    <div>
      {isLoading ? (
        "Loading chart..."
      ) : (
        <ApexChart
          type="line"
          series={[{ name: "price", data: data?.map((price) => Number(price.close)) ?? [] }]}
          options={{
            theme: { mode: "dark" },
            chart: { height: 500, width: 500, toolbar: { show: false }, background: "transparent" },
            grid: { show: false },
            xaxis: {
              labels: { show: false },
              axisTicks: { show: false },
              axisBorder: { show: false },
              categories: data?.map((price) => new Date(price.time_close * 1000)),
            },
            yaxis: { labels: { show: false } },
            stroke: { curve: "smooth", width: 3 },
            fill: { type: "gradient", gradient: { gradientToColors: ["#55efc4"], stops: [0, 100] } },
            colors: ["#a29bfe"],
            tooltip: { y: { formatter: (value) => `$${value.toFixed(2)}` } },
          }}
        />
      )}
    </div>
  );
}

export default Chart;
