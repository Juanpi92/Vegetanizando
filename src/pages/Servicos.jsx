import React from "react";
import './Servicos.css'

const Servicos = () => {
  return (
    <>
      <div className="servicos">
        <div className="title_principal">
          <p>Serviços</p>
        </div>
        <div className="servicos__bloco">
          <div className="servicos__entrega">
            <h2>Entrega:</h2>
            <p>Com o nosso serviço de entrega você pode comer em nosso restaurante ou na sua casa!!!</p>
          </div>
          <div className="servicos__preco">
            <div className="servicos__distancia">
              <h3>Até 3km:</h3>
              <p>Quem estiver nas proximidades de 3m não paga a entrega</p>
            </div>
            <div className="servicos__distancia">
              <h3>3km-5km:</h3>
              <p>Quem estiver dentre 3km e 5km paga R$ 8,00 de entrega</p>
            </div>
            <div className="servicos__distancia">
              <h3>5km-7km:</h3>
              <p>Quem estiver dentre 3km e 5km paga R$ 10,00 de entrega</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Servicos;