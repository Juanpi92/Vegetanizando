import React, { useState } from "react";
import "./styles.css";

const IMAGE_SRC =
  "https://vegetanizando.s3.sa-east-1.amazonaws.com/tortadenozes.webp?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=AKIAXQ5AT5RSNXDI3YN2%2F20230908%2Fsa-east-1%2Fs3%2Faws4_request&X-Amz-Date=20230908T153536Z&X-Amz-Expires=518400&X-Amz-Signature=1e5498cda118825425ecef2fa6b3f858cb5061f9a85515f300bfefb8331b2756&X-Amz-SignedHeaders=host&x-id=GetObject";

export default function AddProduct() {
  const [ imagePreview, setImagePreview ] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(e.target.name.value);
  };
  
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setImagePreview(imageUrl);
    }
  };

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
      </div>
      <input className="form-name-item" type="text" name="name" />
      <input className="form-portion-item" type="text" />
      <div className="form-align-content">
        <input className="form-price-item" type="number" />
        <select className="form-select-content" name="" id="">
          <option value="food">Comida</option>
          <option value="drink">Bebida</option>
        </select>
      </div>
      <input className="form-btn" type="submit" value="Enviar" />
    </form>
  );
}
