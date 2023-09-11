import React, { useEffect, useState } from "react";
import { Chart } from "react-google-charts";
import { useSelector } from "react-redux";
import axios from "axios";

const ProductQuantity = () => {
  const [data, setData] = useState(null);
  const state = useSelector((state) => state);
  const { user } = state.user;

  useEffect(() => {
    //Get the data for the chart
    (async () => {
      const options = {
        method: "GET",
        url: "https://vegetanizando-api.vercel.app/statistic/product_type",
        headers: {
          "auth-token": user.token,
        },
      };

      let response = await axios.request(options);
      let dataPie = [
        ["Produto", "Cantidade"],
        [response.data[0]._id, response.data[0].count],
        [response.data[1]._id, response.data[1].count],
      ];
      setData(dataPie);
    })();
  }, []);
  let options = {
    title: "Cantidad de Produtos",
    legend: { position: "bottom" },
  };

  return (
    <>
      {data && (
        <Chart
          chartType="PieChart"
          data={data}
          options={options}
          width={"80%"}
          height={"400px"}
        />
      )}
    </>
  );
};

export default ProductQuantity;
