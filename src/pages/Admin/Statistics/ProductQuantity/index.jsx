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
      console.log()
      let dataPie = [
        ["Produto", "Quantidade"],
        [response.data[0]._id.replace(response.data[0]._id, 'Comida'), response.data[0].count],
        [response.data[0]._id.replace(response.data[0]._id, 'Bebida'), response.data[1].count],
      ];
      setData(dataPie);
    })();
  }, []);
  let options = {
    title: "Resumo dos Produtos disponibilizados na plataforma:",
    legend: { position: "left" },
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
