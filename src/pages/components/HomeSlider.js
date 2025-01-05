import React from "react";
import Slider from "react-slick";
import Image from "next/image";
import styles from "../../styles/HomeSlider.module.css"; // Custom CSS module for styling

const HomeSlider = () => {
  const settings = {
    customPaging: function (i) {
      return (
        <div className={styles.customThumbnailWrapper}>
          <Image
            src={`/images/${i + 1}.png`}
            alt={`Thumbnail ${i + 1}`}
            width={60}
            height={40}
            className={styles.customThumbnail}
          />
        </div>
      );
    },
    dots: true,
    dotsClass: `slick-dots ${styles.customDots}`,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  return (
    <div className={styles.sliderContainer}>
      <Slider {...settings}>
        <div>
          <Image
            src="/images/1.png"
            alt="Slide 1"
            width={1920}
            height={900}
            layout="responsive"
          />
        </div>
        <div>
          <Image
            src="/images/2.png"
            alt="Slide 2"
            width={1920}
            height={900}
            layout="responsive"
          />
        </div>
        <div>
          <Image
            src="/images/3.png"
            alt="Slide 3"
            width={1920}
            height={900}
            layout="responsive"
          />
        </div>
        <div>
          <Image
            src="/images/4.png"
            alt="Slide 4"
            width={1920}
            height={900}
            layout="responsive"
          />
        </div>
      </Slider>
    </div>
  );
};

export default HomeSlider;
