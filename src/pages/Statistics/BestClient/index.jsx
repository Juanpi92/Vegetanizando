import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import axios from "axios";

const BestClient = () => {
  const [data, setData] = useState(null);
  const state = useSelector((state) => state);
  const { user } = state.user;
  useEffect(() => {
    (async () => {
      const options = {
        method: "GET",
        url: "https://vegetanizando-api.vercel.app/statistic/top_customer",
        headers: {
          "auth-token": user.token,
        },
      };

      let response = await axios.request(options);

      setData(response.data);
    })();
  }, []);

  return (
    <>
      {data && (
        <div>
          <div>
            {data[0].user}--{data[0].celphone}
            --{data[0].totalSpent}
          </div>
          <div>
            {data[1].user}--{data[1].celphone}
            --{data[1].totalSpent}
          </div>
          <div>
            {data[2].user}--{data[2].celphone}
            --{data[2].totalSpent}
          </div>
        </div>
      )}
    </>
  );
};

export default BestClient;
