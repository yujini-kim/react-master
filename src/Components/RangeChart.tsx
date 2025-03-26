import ApexChart from "react-apexcharts";
interface IPrice {
  low: number;
  high: number;
}
export default function RangeChart() {
  const lowprice = 10;
  const highprice = 10;

  return (
    <ApexChart
      type="rangeBar"
      series={[
        {
          name: "24h Range",
          data: [
            {
              x: "24h Range",
              y: [lowprice, highprice],
            },
          ],
        },
      ]}
      options={{
        chart: {
          height: 10,
          type: "rangeBar",
          toolbar: { show: false },
          background: "transparent",
        },
        plotOptions: {
          bar: {
            horizontal: true,
            barHeight: "60%",
            rangeBarGroupRows: false,
          },
        },
        xaxis: {
          labels: { show: false },
          axisTicks: { show: false },
          axisBorder: { show: false },
        },
        yaxis: {
          labels: { show: false },
        },
        grid: { show: false },
        fill: {
          type: "gradient",
          gradient: {
            shade: "light",
            type: "horizontal",
            gradientToColors: ["#00E396"],
            stops: [0, 100],
            colorStops: [
              {
                offset: 0,
                color: "#FFD700",
                opacity: 1,
              },
              {
                offset: 100,
                color: "#00E396",
                opacity: 1,
              },
            ],
          },
        },
        colors: ["#FFD700"],
        dataLabels: { enabled: false },
        tooltip: {
          enabled: false,
        },
      }}
    />
  );
}
