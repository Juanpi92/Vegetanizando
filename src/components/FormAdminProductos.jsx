import React from "react";
import "./FormAdminProductos.css";

const FormAdminProductos = () => {
  return (
    <div className="div_admin_product">
      <figure className="figure_product">
        <img src="" alt="" />
      </figure>
      <form className="form_product">
        <label htmlFor="imagen">Escolha a Imagen</label>
        <br />
        <input
          type="file"
          accept="image/png, image/jpeg, image/webp"
          id="imagen"
          required
        ></input>
        <br />
        <label htmlFor="">Nome do Produto</label>
        <br />
        <input
          type="text"
          id="name_product"
          placeholder="nome do produto"
          required
        />
        <br />
        <label htmlFor="portion_product">Porcion</label>
        <br />
        <input
          type="text"
          id="portion_product"
          placeholder="cantidade"
          required
        />
        <br />
        <label htmlFor="price_product">Preço</label>
        <br />
        <input
          type="number"
          id="price_product"
          placeholder="preço do produto"
          required
        />
        <br />
        <input type="submit" className="button_principal" value="Adicionar" />
      </form>
    </div>
  );
};

export default FormAdminProductos;
