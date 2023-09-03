import "./Home.css";
import { useSelector } from "react-redux";
import MealCard from "../components/MealCard";
import { Link } from "react-router-dom";
import PlanCard from "../components/PlanCard";

const Home = ({ meal_plan }) => {
  const state = useSelector((state) => state);
  const { products } = state.shopping;

  return (
    <>
      <main className="home-container">
        <SectionNav title={"Planos Alimentares"} />
        {meal_plan &&
          <div className="menu-container">
            {meal_plan.map((item, key) => (
              <PlanCard
                key={key}
                src={item.url}
                title={item.name}
                includes={item.includes}
              />
            ))}
          </div>
        }
        <SectionNav title={"Melhores Opções"} />
        <div className="menu-container">
          {products.map((producto) => (
            <MealCard
              key={producto.id}
              data={producto}
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
