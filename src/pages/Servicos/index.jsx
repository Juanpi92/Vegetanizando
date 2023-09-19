import React, { useEffect, useState } from "react";
import "./styles.css";
import CustomSection from "./CustomSection";
import { services } from "../../utils/services.json";
import ServicoCard from "./CustomSection/ServicoCard";
import { motion } from 'framer-motion';

export default function Servicos() {
  const [data, setData] = useState(null);

  useEffect(() => {
    setData(services[0]);
  }, []);

  return (
    <motion.main
      className="servicos-container">
      <h1 className="servicos-title">
        Por que escolher os serviços Vegetanizando?
      </h1>
      <section className="shotcuts-container">
        {services.map((item) => (
          <ServicoCard
            opacity={item.id * 0.5}
            key={item.id}
            onPress={() => setData(services[item.id])}
            title={item.name}
            description={item.desc}
            icon={item.icon}
          />
        ))}
      </section>
      {data && <CustomSection data={data} />}
    </motion.main>
  );
}
