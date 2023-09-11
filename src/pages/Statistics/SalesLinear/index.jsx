import React, { useEffect, useState } from "react";
import { Chart } from "react-google-charts";
import { useSelector } from "react-redux";
import axios from "axios";

const SalesLinear = () => {
  const [data, setData] = useState(null);
  const state = useSelector((state) => state);
  const { user } = state.user;

  useEffect(() => {
    //Get the data for the chart
    (async () => {
      const options = {
        method: "GET",
        url: "https://vegetanizando-api.vercel.app/statistic/purchases_by_month",
        headers: {
          "auth-token": user.token,
        },
      };

      let response = await axios.request(options);
      let dataLine = [
        ["Date", "Total de ingresos"],
        [
          `${response.data[0].month}/${response.data[0].year}`,
          response.data[0].total,
        ],
        [
          `${response.data[1].month}/${response.data[1].year}`,
          response.data[1].total,
        ],
        [
          `${response.data[2].month}/${response.data[2].year}`,
          response.data[2].total,
        ],
        [
          `${response.data[3].month}/${response.data[3].year}`,
          response.data[3].total,
        ],
        [
          `${response.data[4].month}/${response.data[4].year}`,
          response.data[4].total,
        ],
        [
          `${response.data[5].month}/${response.data[5].year}`,
          response.data[5].total,
        ],
        [
          `${response.data[6].month}/${response.data[6].year}`,
          response.data[6].total,
        ],
        [
          `${response.data[7].month}/${response.data[7].year}`,
          response.data[7].total,
        ],
        [
          `${response.data[8].month}/${response.data[8].year}`,
          response.data[8].total,
        ],
        [
          `${response.data[9].month}/${response.data[9].year}`,
          response.data[9].total,
        ],
        [
          `${response.data[10].month}/${response.data[10].year}`,
          response.data[10].total,
        ],
        [
          `${response.data[11].month}/${response.data[11].year}`,
          response.data[11].total,
        ],
      ];
      setData(dataLine);
    })();
  }, []);
  let options = {
    chart: {
      title: "Vendas dos ultimos 12 meses",
    },
    legend: { position: "bottom" },
  };

  return (
    <>
      {data && (
        <Chart
          chartType="Line"
          width="100%"
          height="400px"
          data={data}
          style={{ position: "static" }}
          chartLanguage="pt-BR"
          options={options}
        />
      )}
    </>
  );
};

export default SalesLinear;
