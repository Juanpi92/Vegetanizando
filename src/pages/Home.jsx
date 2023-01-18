import "./Home.css";
import ProductCard from "../components/ProductCard";
import { useSelector } from "react-redux";

const Home = () => {
  const state = useSelector((state) => state);
  const { products } = state.shopping;
  return (
    <>
      <div className="container_principal">
        <h1> Nosso Cardapio</h1>
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
