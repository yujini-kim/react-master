import { useQuery } from "@tanstack/react-query";
import ApexChart from "react-apexcharts";
import { fetchCoinHistory } from "./api";

interface IHistorical {
  prices: [number, number][];
}
interface ChartProps {
  coinId: string;
}
function Chart({ coinId }: ChartProps) {
  const { isLoading, data } = useQuery<IHistorical>({
    queryKey: ["ohlcv", coinId],
    queryFn: () => fetchCoinHistory(coinId),
  });
  return (
    <div>
      {isLoading ? (
        "Loading chart..."
      ) : (
        <ApexChart
          type="line"
          series={[
            {
              name: "Price",
              data: data?.prices.map((price) => price[1]) ?? [],
            },
          ]}
          options={{
            theme: {
              mode: "dark",
            },
            chart: {
              height: 300,
              width: 500,
              toolbar: {
                show: false,
              },
              background: "transparent",
            },
            grid: { show: false },
            stroke: {
              curve: "smooth",
              width: 4,
            },
            yaxis: {
              show: false,
            },
            xaxis: {
              axisBorder: { show: true },
              axisTicks: { show: true },
              labels: {
                show: true,
                formatter: (value) =>
                  new Date(Number(value))
                    .toLocaleDateString("en-GB", {
                      day: "2-digit",
                      month: "short",
                    })
                    .replace(" ", ". "),
              },
              type: "datetime",
              categories: data?.prices.map(([timestamp]) => timestamp) ?? [],
            },
            fill: {
              type: "gradient",
              gradient: { gradientToColors: ["#0be881"], stops: [0, 100] },
            },
            colors: ["#0fbcf9"],
            tooltip: {
              y: {
                formatter: (value) => `$${value.toFixed(2)}`,
              },
            },
          }}
        />
      )}
    </div>
  );
}

export default Chart;
