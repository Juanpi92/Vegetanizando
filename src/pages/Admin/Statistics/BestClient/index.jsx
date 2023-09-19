import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import axios from "axios";
import '../style.css';
import { AssignmentIndSharp, EmojiEventsSharp, LocalFireDepartmentSharp, LocalPhoneSharp, WorkspacePremiumSharp } from "@mui/icons-material";

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
        <div className="best-client-container">
          <h3><LocalFireDepartmentSharp style={{ fontSize: 36, color: "crimson" }} /> Ranking de Clientes mais frequentes: </h3>
          {
            data.map((item, key) =>
              <BestClientCard key={key} data={item} index={key} animation={`${(key + 1) * 1500}ms`} />
            )
          }
        </div>
      )}
    </>
  );
};

export default BestClient;

const BestClientCard = ({ data, index, animation }) => {
  return (
    <div className="client-card-container" style={{ animation: `appears-card ${animation} ease-in-out normal` }}>
      <span className="client-index">
        {index + 1}º
      </span>
      <div className="client-align-info">
        <p className="client-username">
          <AssignmentIndSharp /> {data.user}
        </p>
        <p className="client-celphone">
          <LocalPhoneSharp /> {data.celphone.replace('+55', '')}
        </p>
      </div>
      <span className="client-total-spent">
        R${data.totalSpent.toFixed(2)}
        {index === 0 && <div><EmojiEventsSharp className="client-medal-icon"/></div>}
      </span>
    </div>
  )
}