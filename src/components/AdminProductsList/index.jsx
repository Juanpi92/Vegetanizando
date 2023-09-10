import React, { useRef, useState } from "react";
import { useSelector } from "react-redux";
import CartItemProductAdmin from "../CartItemProductAdmin";
import ModalProductAdmin from "../ModalProductAdmin";
import './styles.css'
import { AddBusinessOutlined, SearchOutlined } from "@mui/icons-material";

const AdminProductsList = ({ setDataToEdit }) => {
  const state = useSelector((state) => state);
  const { products } = state.shopping;
  const $ModalProductAdmin = useRef();
  const [srcImagen, SetSrcImagen] = useState();

  return (
    <>
      <ProductsActionBar />
      <div className="admin-product-list-container">
        <div className="admin-product-content">
          <ul className="admin-list-header">
            <li>Nome</li>
            <li>Tipo</li>
            <li>Porção</li>
            <li>Valor</li>
            <li>Ações</li>
          </ul>
          <ul className="admin-list-content">
            {products.map((product) => (
              <ProductListItem
                product={product}
                key={product.id}
              />
            ))}
          </ul>
        </div>
      </div >
      <ModalProductAdmin
        $ModalProductAdmin={$ModalProductAdmin}
        srcImagen={srcImagen}
      />
    </>
  );
};

export default AdminProductsList;

const ProductsActionBar = () => {
  return (
    <div className="products-action-bar-container">
      <div className="products-search-content">
        <span>Buscar Produtos:</span>
        <input type="text" className="search-input" />
        <SearchOutlined />
      </div>
      <button className="button_principal add-product-btn">
        Adicionar produto
        <AddBusinessOutlined />
      </button>
    </div>
  )
}

const ProductListItem = ({ product }) => {
  let { id, name, type, portion, price, src } = product;

  return (
    <li className="product-list-item">
      <span>{name}</span>
      <span>{type}</span>
      <span>{portion}</span>
      <span>R$ {price}</span>
      <span>AÇÃO</span>
    </li>
  )
}