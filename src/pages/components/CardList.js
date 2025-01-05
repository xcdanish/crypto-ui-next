import React from "react";
import { Card, CardImg, CardBody, CardTitle } from "reactstrap";

const CardList = () => {
  // Sample data for the cards
  const cards = [
    {
      title: "iOS 18 Interface Builder: Quick Start UI Kit for ...",
      image: "/images/cover3.png", // Replace with the actual image path
    },
    {
      title: "Material You Design Library [Pro]",
      image: "/images/cover2.png", // Replace with the actual image path
    },
    {
      title: "Instagram: Bold Templates for Influential Posts",
      image: "/images/cover1.png", // Replace with the actual image path
    },
  ];

  return (
    <div>
      <h5>More by this creator</h5>
      <div
        className="d-flex flex-wrap justify-content-between"
        style={{ gap: "15px" }} // Adjust spacing between cards
      >
        {cards.map((card, index) => (
          <Card
            key={index}
            style={{
              width: "30%", // Adjust card width to fit within the row
              borderRadius: "8px",
              overflow: "hidden",
              border: 0,
            }}
          >
            <CardImg
              top
              width="100%"
              src={card.image}
              alt={card.title}
              style={{ objectFit: "cover", height: "150px" }} // Adjust image height
            />
            <CardBody>
              <CardTitle
                tag="h6"
                style={{
                  fontSize: "16px",
                  fontWeight: "500",
                  color: "#333", // Adjust text color
                  textOverflow: "ellipsis",
                  whiteSpace: "nowrap",
                  overflow: "hidden",
                }}
              >
                {card.title}
              </CardTitle>
            </CardBody>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default CardList;
