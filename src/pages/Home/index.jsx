import "./styles.css";
import { useSelector } from "react-redux";
import MealCard from "../../components/MealCard";
import { Link } from "react-router-dom";
import PlanCard from "../../components/PlanCard";
import SkeletonCard from "../../components/SkeletonCard";
import { useContext, useEffect } from "react";
import { AppContext } from "../../contexts/AppContext";
import Carousel from "../../components/Carousel";
import { motion } from 'framer-motion';

const Home = () => {
  const state = useSelector((state) => state);
  const { products } = state.shopping;
  const { plans } = state.plans;

  const { windowSize, handleWidthDimension, setActiveDesktopCart } =
    useContext(AppContext);

  useEffect(() => {
    handleWidthDimension();
  }, []);

  useEffect(() => {
    if (windowSize >= 1280) {
      setActiveDesktopCart(true);
    } else {
      setActiveDesktopCart(false);
    }
  }, [windowSize]);

  return (
    <motion.main
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ type: "spring", duration: 2 }}
      className="home-container">
      <SectionNav title={"Planos Alimentares"} />
      <div className="menu-container">
        {windowSize.width >= 768 ? (
          <Carousel dimension={windowSize.width}>
            {plans &&
              plans.map((item, key) => (
                <PlanCard
                  key={key}
                  src={item.url}
                  title={item.name}
                  includes={item.includes}
                />
              ))}
          </Carousel>
        ) : (
          plans &&
          plans.map((item, key) => (
            <PlanCard
              key={key}
              src={item.url}
              title={item.name}
              includes={item.includes}
            />
          ))
        )}
      </div>
      <SectionNav title={"Seleção de Bebidas Vegetanizando"} />
      <div className="menu-container ">
        {products.length > 0 ? (
          products
            .filter((item) => item.type === "drink")
            .map((producto, key) => <MealCard key={key} data={producto} />)
        ) : (
          <SkeletonFeedback variant={"products"} />
        )}
      </div>
      <SectionNav title={"Melhores Opções Veganos"} />
      <div className="menu-container ">
        {products.length > 0 ? (
          products
            .filter((item) => item.type === "food")
            .map((producto, key) => <MealCard key={key} data={producto} />)
        ) : (
          <SkeletonFeedback variant={"products"} />
        )}
      </div>
    </motion.main>
  );
};

export default Home;

const SectionNav = ({ title, location }) => {
  return (
    <nav className="section-nav-container">
      <p className="section-nav-title">{title}</p>
      <Link to={location} className="section-nav-link">
        Ver mais
      </Link>
    </nav>
  );
};

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
  );
};
