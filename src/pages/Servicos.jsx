import React from "react";
import './Servicos.css'

const Servicos = () => {
  return (
    <>
      <div className="container_principal">
        <div className=" servicos">
          <div className="title_principal">
              <p>Serviços</p>
          </div>
          <div className="servicos__bloco">
            <div className="servicos__entrega">
              <h2>Entrega</h2>
              <p>Com o nosso serviço de entrega você pode comer em nosso restaurante ou na sua casa</p>
            </div>
            <div className="servicos__preco">
              <h2>Até 3km:</h2>
              <p>Quem estiver nas proximidades de 3km não paga entrega</p>
            </div>
            <div className="servicos__preco">
              <h2>3km-5km:</h2>
              <p>Quem estiver entre 3km e 5km paga R$ 8,00 de entrega</p>
            </div>
            <div className="servicos__preco">
              <h2>5km-7km:</h2>
              <p>Quem estiver entre 5km e 7km paga R$ 10,00 de entrega</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Servicos;