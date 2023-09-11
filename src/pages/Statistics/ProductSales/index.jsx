import React, { useEffect, useState } from "react";
import { Chart } from "react-google-charts";
import { useSelector } from "react-redux";
import axios from "axios";

const ProductSales = () => {
  const [data, setData] = useState(null);
  const state = useSelector((state) => state);
  const { user } = state.user;
  let options = {
    title: "Top 5 Produtos mais vendidos",
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
      let dataColumn = [
        ["Produto", "Vendas", { role: "style" }],
        [response.data[0].productName, response.data[0].totalSold, "#b87333"],
        [response.data[1].productName, response.data[1].totalSold, "#dc3912"],
        [response.data[2].productName, response.data[2].totalSold, "#00a884"],
        [response.data[3].productName, response.data[3].totalSold, "#ffd700"],
        [response.data[4].productName, response.data[4].totalSold, "#e5e4e2"],
      ];
      setData(dataColumn);
    })();
  }, []);

  return (
    <>
      {data && (
        <Chart
          chartType="ColumnChart"
          width="80%"
          height="400px"
          data={data}
          options={options}
        />
      )}
    </>
  );
};

export default ProductSales;
