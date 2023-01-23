import React, { useEffect, useRef, useState } from "react";
import "./FormAdminProductos.css";

const FormAdminProductos = ({ dataToEdit, setDataToEdit }) => {
  const $src_img = useRef();
  const $form = useRef();
  const [imagenFile, setImagenFile] = useState();

  useEffect(() => {
    if (dataToEdit) {
      setImagenFile(dataToEdit.src);
      $src_img.current.src = `.${dataToEdit.src}`;
      $form.current.name_product.value = dataToEdit.name;
      $form.current.portion_product.value = dataToEdit.portion;
      $form.current.price_product.value = dataToEdit.price;
    }
  }, [dataToEdit]);

  return (
    <div className="div_admin_product">
      <figure className="figure_product">
        <img src="" alt="" ref={$src_img} />
      </figure>
      <form className="form_product" ref={$form}>
        <label htmlFor="imagen">Escolha a Imagen</label>
        <br />
        <input
          type="file"
          accept="image/png, image/jpeg, image/webp"
          id="imagen"
          name="form_file"
        ></input>
        <br />
        <label htmlFor="name_product">Nome do Produto</label>
        <br />
        <input
          type="text"
          placeholder="nome do produto"
          id="name_product"
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
          min="0"
        />
        <br />
        <input
          type="button"
          className="button_principal"
          value="Cancelar"
          style={{ marginRight: "10px", backgroundColor: "red" }}
          onClick={() => {
            $form.current.reset();
            $src_img.current.src = "";
            setDataToEdit(null);
          }}
        />
        <input
          type="submit"
          className="button_principal"
          value={dataToEdit ? "Editar" : "Adicionar"}
        />
      </form>
    </div>
  );
};

export default FormAdminProductos;
