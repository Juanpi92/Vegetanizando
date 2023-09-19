import React, { useEffect, useState } from "react";
import { Chart } from "react-google-charts";
import { useSelector } from "react-redux";
import axios from "axios";

const ProductSales = () => {
  const [data, setData] = useState(null);
  const state = useSelector((state) => state);
  const { user } = state.user;
  let options = {
    title: "Top 5 Produtos mais vendidos na plataforma",
    fontSize: 16,
    legend: { position: "bottom" },
  };

  useEffect(() => {
    //Get the data for the chart
    (async () => {
      const options = {
        method: "GET",
        url: "https://vegetanizando-api.vercel.app/statistic/top_product",
        headers: {
          "auth-token": user.token,
        },
      };

      let response = await axios.request(options);
      if (response.data.length > 0) {
        let colors = ["#b87333", "#dc3912", "#00a884", "#ffd700", "#e5e4e2"];
        let dataColumn = response.data.map((item, index) => [
          item.productName,
          item.totalSold,
          colors[index],
        ]);
        dataColumn = [["Produto", "Vendas", { role: "style" }], ...dataColumn];
        setData(dataColumn);
      } else {
        setData(null);
      }
    })();
  }, []);

  return (
    <>
      {data ? (
        <Chart
          chartType="ColumnChart"
          width="80%"
          height="400px"
          data={data}
          options={options}
        />
      ) : <h1>Sem resultados...</h1>}
    </>
  );
};

export default ProductSales;
