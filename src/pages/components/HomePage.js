import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Container, Row, Col, Button } from "reactstrap";
import { FaBookmark, FaHeart, FaUser } from "react-icons/fa";

const HomePage = () => {
  return (
    <div
      className="d-flex justify-content-center align-items-center"
      style={{ backgroundColor: "#F8F9FA" }}
    >
      <Container>
        {/* Logo */}
        <Row className="mb-3">
          <Col className="d-flex align-items-center">
            <img
              src="/images/hicon.jpg"
              alt="Designluch Logo"
              className="rounded-circle"
              style={{ width: "50px", height: "50px" }}
            />
            <h6 className="px-3">Designluch</h6>
          </Col>
        </Row>

        {/* Title */}
        <Row className="mb-2">
          <Col>
            <h1 className="h2 fw-bold text-dark">
              Crypto Trading Platform - Web Application [Pro]
            </h1>
          </Col>
        </Row>

        {/* Meta Information */}
        <Row className="mb-4">
          {/* <Col>
            <p className="text-muted small mb-0">
              Design file •{" "}
              <span role="img" aria-label="heart">
                ❤️
              </span>{" "}
              165 • 734 users
            </p>
          </Col> */}
          <Col>
            <p className="text-muted">
              Design file • <FaHeart className="icon-transparent" /> 165 •{" "}
              <FaUser className="icon-transparent" /> 734 users
            </p>
          </Col>
        </Row>

        {/* Buttons */}
        <Row className="align-items-center g-3 mb-3">
          {/* Buy Button */}
          <Col xs="auto">
            <Button
              color="primary"
              style={{
                padding: "10px 25px",
                fontWeight: "bold",
                borderRadius: "8px",
              }}
            >
              Buy $4
            </Button>
          </Col>

          {/* Icon Button 1 */}
          <Col xs="auto">
            <Button
              outline
              style={{
                padding: "10px 15px",
                borderRadius: "8px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <FaHeart />
            </Button>
          </Col>

          {/* Icon Button 2 */}
          <Col xs="auto">
            <Button
              outline
              style={{
                padding: "10px 15px",
                borderRadius: "8px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <FaBookmark />
            </Button>
          </Col>
        </Row>

        {/* Free Preview Text */}
        <Row>
          <Col>
            <p className="text-muted mb-0">Get free preview</p>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default HomePage;
