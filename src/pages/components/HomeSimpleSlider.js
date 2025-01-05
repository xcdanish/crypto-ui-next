import React from "react";
import Slider from "react-slick";
import Image from "next/image"; // For optimized image rendering in Next.js

function HomeSimpleSlider() {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  return (
    <div className="slider-container">
      <Slider {...settings}>
        {/* Replace the text with images */}
        <div>
          <Image
            src="/images/1.png" // Replace with the correct path to your images
            alt="Slide 1"
            width={1920}
            height={1080}
            layout="responsive"
          />
        </div>
        <div>
          <Image
            src="/images/2.png"
            alt="Slide 2"
            width={1920}
            height={1080}
            layout="responsive"
          />
        </div>
        <div>
          <Image
            src="/images/3.png"
            alt="Slide 3"
            width={1920}
            height={1080}
            layout="responsive"
          />
        </div>
        <div>
          <Image
            src="/images/4.png"
            alt="Slide 4"
            width={1920}
            height={1080}
            layout="responsive"
          />
        </div>
      </Slider>
    </div>
  );
}

export default HomeSimpleSlider;
