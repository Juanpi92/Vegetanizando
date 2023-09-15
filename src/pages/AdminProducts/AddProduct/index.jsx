import React, { useContext, useState } from "react";
import "./styles.css";
import { AddAPhotoSharp } from "@mui/icons-material";
import { AppContext } from './../../../contexts/AppContext';

export default function AddProduct() {
  const [imagePreview, setImagePreview] = useState(null);
  const { setShowProductModal, onRequestShowAlert } = useContext(AppContext);

  const handleSubmit = (e) => {
    e.preventDefault();
    // our alert component receive variant, duration and message property inside a object. example below 
    onRequestShowAlert({ variant: "success", duration: 500, message: "Você cadastrou o produto com sucesso!"})
    // onRequestShowAlert({ variant: "denied", message: "Houve um problema ao cadastrar o produto!"})
    // onRequestShowAlert({ variant: "warning", message: "Atenção verifique o nome do produto!" })

    console.log(e.target.name.value);
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setImagePreview(imageUrl);
    }
  };

  const handleCancel = () => {
    setShowProductModal(false);
  }

  return (
    <form onSubmit={(e) => handleSubmit(e)} className="form-add-container">
      <div className="form-align-content">
        <img className="form-img-item" src={imagePreview} alt="" />
        <input
          accept="image/*"
          onChange={(e) => handleImageChange(e)}
          className="form-file-item"
          name="file"
          type="file"
        />
        <AddAPhotoSharp style={{ fontSize: 42 }} className="form-add-icon" />
      </div>
      <label htmlFor="name" className="form-label">
        Nome do Produto
        <input className="form-name-item" type="text" name="name" />
      </label>
      <label htmlFor="portion" className="form-label">
        Porção
        <input className="form-portion-item" type="text" />
      </label>
      <div className="form-align-content">
        <label htmlFor="price" className="form-label">
          Preço
          <input className="form-price-item" name="price" type="number" />
        </label>
        <label htmlFor="" className="form-label">
          Tipo
          <select className="form-select-content" name="" id="">
            <option className="form-select-option" defaultValue="">Selecione</option>
            <option className="form-select-option" value="food">Comida</option>
            <option className="form-select-option" value="drink">Bebida</option>
          </select>
        </label>
      </div>
      <div className="form-align-content">
        <input onClick={() => handleCancel()} className="form-btn" type="submit" value="Cancelar" />
        <input className="form-btn" type="submit" value="Cadastrar" />
      </div>
    </form>
  );
}
