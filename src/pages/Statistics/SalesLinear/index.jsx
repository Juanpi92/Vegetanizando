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
      if (response.data.length > 0) {
        let dataLine = response.data.map((item) => [
          `${item.month}/${item.year}`,
          item.total,
        ]);
        dataLine = [["Linha do tempo", "Ciclo de Compras"], ...dataLine];
        setData(dataLine);
      } else {
        setData(null);
      }
    })();
  }, []);
  
  let options = {
    chart: {
      title: "Resumo de Vendas Gerais (últimos 12 mêses)",
    },
    fontSize: 16,
    legend: { position: "left" },
  };

  return (
    <>
      {data ? (
        <Chart
          chartType="Line"
          width="100%"
          height="400px"
          data={data}
          options={options}
        />
      ) : <h1>Sem resultados...</h1>}
    </>
  );
};

export default SalesLinear;
