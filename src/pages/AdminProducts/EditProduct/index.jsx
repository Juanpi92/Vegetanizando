import React, { useContext, useEffect, useRef, useState } from "react";
import "./styles.css";
import { AddAPhotoSharp } from "@mui/icons-material";
import { AppContext } from "../../../contexts/AppContext";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { actualizarItemProduct } from "../../../reducer/shoopingReducer";

export default function EditProduct({ dataToEdit }) {
  const [imagePreview, setImagePreview] = useState(null);
  const state = useSelector((state) => state);
  const { user } = state.user;
  const dispatch = useDispatch();
  const { setShowProductModal, setIsAddProduct, setLoader } =
    useContext(AppContext);
  const productForm = useRef(null);
  useEffect(() => {
    setImagePreview(dataToEdit.url);
    productForm.current.name.value = dataToEdit.name;
    productForm.current.portion.value = dataToEdit.portion;
    productForm.current.price.value = dataToEdit.price;
    productForm.current.type.value = dataToEdit.type;
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    // e.target.file.parentElement.firstElementChild.style.border = "none";
    e.target.name.style.borderColor = "#000000";
    e.target.portion.style.borderColor = "#000000";
    e.target.price.style.borderColor = "#000000";
    e.target.type.style.borderColor = "#000000";
    if (e.target.name.value === "") {
      e.target.name.style.borderColor = "red";
      return;
    }
    if (e.target.portion.value === "") {
      e.target.portion.style.borderColor = "red";
      return;
    }
    if (e.target.price.value === "") {
      e.target.price.style.borderColor = "red";
      return;
    }

    if (e.target.type.value === "") {
      e.target.type.style.borderColor = "red";
      return;
    }
    //here we do the form data and send to the backend
    try {
      let options;
      if (e.target.file.files.length === 0) {
        options = {
          method: "PATCH",
          url: `https://vegetanizando-api.vercel.app/product/${dataToEdit.id}`,
          headers: {
            "Content-Type": "application/json",
            "auth-token": user.token,
          },
          data: {
            name: e.target.name.value,
            portion: e.target.portion.value,
            price: e.target.price.value,
            type: e.target.type.value,
          },
        };
      } else {
        const product = new FormData();
        product.append("image", e.target.file.files[0]);
        product.append("name", e.target.name.value);
        product.append("portion", e.target.portion.value);
        product.append("price", e.target.price.value);
        product.append("type", e.target.type.value);
        options = {
          method: "PUT",
          url: `https://vegetanizando-api.vercel.app/product/${dataToEdit.id}`,
          headers: {
            "Content-Type":
              "multipart/form-data; boundary=---011000010111000001101001",
            "auth-token": user.token,
          },
          data: product,
        };
      }
      setShowProductModal(false);
      setIsAddProduct(false);
      setLoader(true);
      let newProduct = await axios.request(options);
      dispatch(
        actualizarItemProduct({ id: dataToEdit.id, ...newProduct.data })
      );
      setLoader(true);
      setLoader(false);
    } catch (error) {
      setLoader(false);
      alert("ocorreu um error");
      console.log(error);
    }
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
  };

  return (
    <form
      onSubmit={(e) => handleSubmit(e)}
      className="form-add-container"
      ref={productForm}
    >
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
        <input className="form-portion-item" type="text" name="portion" />
      </label>
      <div className="form-align-content">
        <label htmlFor="price" className="form-label">
          Preço
          <input
            className="form-price-item"
            name="price"
            type="number"
            step="0.01"
          />
        </label>
        <label htmlFor="" className="form-label">
          Tipo
          <select className="form-select-content" name="type" id="type">
            <option className="form-select-option" default value="">
              Selecione
            </option>
            <option className="form-select-option" value="food">
              Comida
            </option>
            <option className="form-select-option" value="drink">
              Bebida
            </option>
          </select>
        </label>
      </div>
      <div className="form-align-content">
        <input
          onClick={() => handleCancel()}
          className="form-btn"
          type="button"
          value="Cancelar"
        />
        <input className="form-btn" type="submit" value="Atualizar" />
      </div>
    </form>
  );
}
