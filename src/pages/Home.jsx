import "./Home.css";
import ProductCard from "../components/ProductCard";
import { useSelector } from "react-redux";

const Home = () => {
  const state = useSelector((state) => state);
  const { products } = state.shopping;
  return (
    <>
      <div className="container_principal">
        <div className="title_principal">
          <p>Nosso Cardapio</p>
        </div>
        <div className="container">
          {products.map((producto) => (
            <ProductCard data={producto} key={producto.id} />
          ))}
        </div>
      </div>
    </>
  );
};

export default Home;
