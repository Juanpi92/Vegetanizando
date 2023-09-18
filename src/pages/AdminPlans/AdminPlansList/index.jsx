import React, { useContext, useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import "./styles.css";
import {
  AddBusinessOutlined,
  SearchOutlined,
  EditNoteOutlined,
  ClearOutlined,
} from "@mui/icons-material";
import { delProduct } from "../../../reducer/shoopingReducer";
import { AppContext } from "../../../contexts/AppContext";
import axios from "axios";

const AdminPlansList = ({ setDataToEdit }) => {
  const state = useSelector((state) => state);
  const { plans } = state.plans;
  const [plansToShow, setPlansToShow] = useState(null);

  useEffect(() => {
    setPlansToShow(plans);
  }, [plans]);

  return (
    <>
      <PlansActionBar setPlansToShow={setPlansToShow} plans={plans} />
      <div className="admin-product-list-container">
        <table className="table-product-content">
          <thead>
            <tr>
              <th>Nome</th>
              <th colspan="3">descripção</th>
              <th>Ações</th>
            </tr>
          </thead>
          <tbody className="admin-compras-content">
            {plansToShow &&
              plansToShow.map((plans) => (
                <PlansListItem
                  plans={plans}
                  key={plans._id}
                  setDataToEdit={setDataToEdit}
                />
              ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default AdminPlansList;

const PlansActionBar = ({ plans, setPlansToShow }) => {
  const { setShowProductModal, setIsAddProduct } = useContext(AppContext);
  const search = useRef(null);
  const handelSearch = () => {
    let filtered = plans.filter((item) =>
      item.name.toLowerCase().includes(search.current.value.toLowerCase())
    );
    setPlansToShow(filtered);
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
        Adicionar Plan
        <AddBusinessOutlined />
      </button>
    </div>
  );
};

const PlansListItem = ({ plans, setDataToEdit }) => {
  const { setShowProductModal, setIsAddProduct, setLoader } =
    useContext(AppContext);
  console.log(plans);
  const { name, includes } = plans;

  const state = useSelector((state) => state);
  const userAdmin = state.user;
  const dispatch = useDispatch();

  const handleDelete = async (id) => {
    /*
    try {
      const options = {
        method: "DELETE",
        url: `https://vegetanizando-api.vercel.app/product/${id}`,
        headers: {
          "Content-Type": "application/json",
          "auth-token": userAdmin.user.token,
        },
      };
      setLoader(true);
      await axios.request(options);
      dispatch(delProduct(id));
      setLoader(false);
    } catch (error) {
      setLoader(false);
      alert("Ocurreu um error");
    }*/
  };
  return (
    <tr>
      <td>{name}</td>
      <td>{includes[0]}</td>
      <td>{includes[1]}</td>
      <td>{includes[2]}</td>
      <td className="option">
        <EditNoteOutlined
          className="option_icon"
          onClick={() => {
            /*
            setDataToEdit(product);
            setShowProductModal(true);
            setIsAddProduct(false);*/
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
