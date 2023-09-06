import React, { useEffect, useState } from "react";
import "./styles.css";
import CustomSection from "../../components/CustomSection";
import { services } from "../../utils/services.json";
import ServicoCard from "../../components/ServicoCard";
import { CheckCircleOutline } from "@mui/icons-material";

export default function Servicos() {
  const [data, setData] = useState(null);

  useEffect(() => {
    setData(services[0]);
  }, []);

  return (
    <main className="servicos-container">
      <h1 className="servicos-title">
        Por que escolher os serviços Vegetanizando?
      </h1>
      <section className="shotcuts-container">
        {services.map((item, key) => (
          <ServicoCard
            key={key}
            onPress={() => setData(services[key])}
            title={item.name}
            description={item.desc}
            icon={item.icon}
          />
        ))}
      </section>
      {data && <CustomSection data={data} />}
    </main>
  );
}
