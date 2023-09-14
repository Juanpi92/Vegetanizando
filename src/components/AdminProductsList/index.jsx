import React, { useContext, useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import "./styles.css";
import {
  AddBusinessOutlined,
  SearchOutlined,
  EditNoteOutlined,
  ClearOutlined,
} from "@mui/icons-material";
import { delProduct } from "../../reducer/shoopingReducer";
import { AppContext } from "../../contexts/AppContext";

const AdminProductsList = ({ setDataToEdit }) => {
  const state = useSelector((state) => state);
  const { products } = state.shopping;
  const [productToShow, setProductToShow] = useState(null);

  useEffect(() => {
    setProductToShow(products);
  }, [products]);

  return (
    <>
      <ProductsActionBar
        setProductToShow={setProductToShow}
        product={products}
      />
      <div className="admin-product-list-container">
        <table className="table-product-content">
          <thead>
            <tr>
              <th>Nome</th>
              <th>Tipo</th>
              <th>Porção</th>
              <th>Valor</th>
              <th>Ações</th>
            </tr>
          </thead>
          <tbody className="admin-compras-content">
            {productToShow &&
              productToShow.map((product) => (
                <ProductListItem
                  product={product}
                  key={product.id}
                  setDataToEdit={setDataToEdit}
                />
              ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default AdminProductsList;

const ProductsActionBar = ({ product, setProductToShow }) => {
  const { setShowProductModal, setIsAddProduct } = useContext(AppContext);
  const search = useRef(null);
  const handelSearch = () => {
    let filtered = product.filter((item) =>
      item.name.toLowerCase().includes(search.current.value.toLowerCase())
    );
    setProductToShow(filtered);
  };

  return (
    <div className="products-action-bar-container">
      <div className="products-search-content">
        <span>Buscar Produtos:</span>
        <input type="text" className="search-input" ref={search} />
        <SearchOutlined
          className="search-input-icon"
          onClick={() => {
            handelSearch();
          }}
        />
      </div>
      <button
        onClick={() => {
          setShowProductModal(true);
          setIsAddProduct(true);
        }}
        className="button_principal add-product-btn"
      >
        Adicionar produto
        <AddBusinessOutlined />
      </button>
    </div>
  );
};

const ProductListItem = ({ product, setDataToEdit }) => {
  let { id, name, type, portion, price, src } = product;
  const state = useSelector((state) => state);
  const userAdmin = state.user;
  const dispatch = useDispatch();
  const handleDelete = async (id) => {
    try {
      const options = {
        method: "DELETE",
        url: `https://vegetanizando-api.vercel.app/product/${id}`,
        headers: {
          "Content-Type": "application/json",
          "auth-token": userAdmin.user.token,
        },
      };

      // await axios.request(options);
      dispatch(delProduct(id));
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <tr>
      <td>{name}</td>
      <td>{type}</td>
      <td>{portion}</td>
      <td>R$ {price}</td>
      <td className="option">
        <EditNoteOutlined
          className="option_icon"
          onClick={() => {
            setDataToEdit(product);
          }}
        />
        <ClearOutlined
          className="delete_icon"
          onClick={() => {
            handleDelete(id);
          }}
        />
      </td>
    </tr>
  );
};
