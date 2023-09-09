import Slider from "react-slick";
import "./styles.css";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";

function NextArrow({ width, onClick }) {
  return (
    <ArrowForwardIosIcon
      style={{ display: width > 768 ? "block" : "none" }}
      onClick={onClick}
      className="arrow-next-align"
    />
  );
}

function PrevArrow({ width, onClick }) {
  return (
    <ArrowBackIosIcon
      style={{ display: width > 768 ? "block" : "none" }}
      onClick={onClick}
      className="arrow-prev-align"
    />
  );
}

export default function Carousel({ children, dimension }) {
  const settings = {
    dots: true,
    infinite: false,
    slidesToShow: 4.1,
    slidesToScroll: 1,
    initialSlide: 0,
    responsive: carousel.breakpoint,
    nextArrow: <NextArrow width={dimension} />,
    prevArrow: <PrevArrow width={dimension} />,
  };

  return (
    <Slider {...settings} className="slider-container">
      {children}
    </Slider>
  );
}

const carousel = {
  breakpoint: [
    {
      breakpoint: 1024,
      settings: {
        slidesToShow: 3,
        slidesToScroll: 3,
        infinite: false,
        dots: true,
      },
    },
    {
      breakpoint: 600,
      settings: {
        slidesToShow: 1.9,
        slidesToScroll: 2,
        initialSlide: 2,
      },
    },
    {
      breakpoint: 480,
      settings: {
        slidesToShow: 1.3,
        slidesToScroll: 1,
      },
    },
  ],

  styles: {
    position: "absolute",
    marginLeft: "5rem",
    zIndex: "90",
  },
};
