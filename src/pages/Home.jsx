import "./Home.css";
import { useSelector } from "react-redux";
import MealCard from "../components/MealCard";
import { Link } from "react-router-dom";
import PlanCard from "../components/PlanCard";
import SkeletonCard from "../components/SkeletonCard";
import { useContext, useEffect, useState } from "react";
import { AppContext } from "../contexts/AppContext";

const Home = ({ meal_plan }) => {
  const state = useSelector((state) => state);
  const { products } = state.shopping;
  const [plan, setPlan] = useState([]);
  const { windowSize, handleWidthDimension, setActiveDesktopCart } = useContext(AppContext);

  useEffect(() => {
    if (meal_plan) {
      setPlan(meal_plan)
    }
  }, [meal_plan]);

  useEffect(() => {
    handleWidthDimension()
  }, []);

  useEffect(() => {
    if(windowSize >= 1280){
      setActiveDesktopCart(true);
    }else {
      setActiveDesktopCart(false);
    }
  }, [windowSize])

  return (
    <>
      <main className="home-container">
        <SectionNav title={"Planos Alimentares"} />
        <div className="menu-container">
          {
            plan.length > 0 ?
              plan.map((item, key) => (
                <PlanCard
                  key={key}
                  src={item.url}
                  title={item.name}
                  includes={item.includes}
                />
              ))
              :
              <SkeletonFeedback variant={"plan"} />
          }
        </div>
        <SectionNav title={"Melhores Opções"} />
        <div className="menu-container ">
          {
            products.length > 0 ?
              products.map((producto, key) => (
                <MealCard
                  key={key}
                  data={producto}
                />
              ))
              :
              <SkeletonFeedback variant={"products"} />
          }
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

const SkeletonFeedback = ({ variant }) => {
  return (
    <>
      <SkeletonCard variant={variant} />
      <SkeletonCard variant={variant} />
      <SkeletonCard variant={variant} />
      <SkeletonCard variant={variant} />
      <SkeletonCard variant={variant} />
      <SkeletonCard variant={variant} />
      <SkeletonCard variant={variant} />
      <SkeletonCard variant={variant} />
      <SkeletonCard variant={variant} />
    </>
  )
}