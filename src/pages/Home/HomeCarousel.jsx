import { useState } from "react";
import Carousel from "react-material-ui-carousel";
import { useMediaQuery, Container } from "@mui/material";


const images = [
  {
    src: "/images/logo_big.png",
    alt: "BabyBuddy",
  },
  {
    src: "/images/carouselsleep.png",
    alt: "Track their sleep",
  },
  {
    src: "/images/carouselfeed.png",
    alt: "Record feeding schedules",
  },
  {
    src: "/images/carouselmonitor.png",
    alt: "Monitor their growth",
  },
];


export default function HomeCarousel() {
  const [activeStep, setActiveStep] = useState(0);
  const isMobile = useMediaQuery("(max-width:600px)"); 

  const handleNext = () => {
    setActiveStep((prevActiveStep) =>
      prevActiveStep === images.length - 1 ? 0 : prevActiveStep + 1
    );
  };

  return (
    <Container maxWidth="xl" disableGutters>
    <Carousel
      autoPlay={true}
      animation="fade"
      interval={8000}
      duration={2000}
      navButtonsAlwaysVisible={false}
      next={handleNext}
      activeStep={activeStep}
      swipe={true}
      sx={{height: isMobile? "250px" : "580px", width:"100%"}}
    >
      {images.map((image, index) => (

          <img key={index} src={image.src} alt={image.alt} style={{objectFit: "cover", width: "100%", height: isMobile? "250px" : "650px"}} />

      ))}
    </Carousel>
    </Container>
  );
};



