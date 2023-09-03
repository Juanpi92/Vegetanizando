import "./Home.css";
import { useSelector } from "react-redux";
import MealCard from "../components/MealCard";
import { Link } from "react-router-dom";
import { meal_plans } from '../utils/meal_plans.json'
import PlanCard from "../components/PlanCard";

const Home = () => {
  const state = useSelector((state) => state);
  const { products } = state.shopping;

  return (
    <>
      <main className="home-container">
        <SectionNav title={"Planos Alimentares"} />
        <div className="menu-container">
          {meal_plans.map((item) => (
            <PlanCard
              key={item.id}
              src={item.image}
              title={item.name}
              includes={item.includes}
            />
          ))}
        </div>
        <SectionNav title={"Melhores Opções"} />
        <div className="menu-container">
          {products.map((producto) => (
            <MealCard
              key={producto.id}
              image={producto.src}
              name={producto.name}
              size={producto.portion}
              price={producto.price}
            />
          ))}
        </div>
      </main>
    </>
  );
};

export default Home;

const SectionNav = ({ title, location }) => {
  return (
    <nav className="section-nav-container">
      <p className="section-nav-title">{title}</p>
      <Link to={location} className="section-nav-link">Ver mais</Link>
    </nav>
  )
}
