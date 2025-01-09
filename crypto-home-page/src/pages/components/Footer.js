import React from 'react';
import { Container, Row, Col } from 'reactstrap';

const Footer = () => {
  return (
    <footer className="bg-light text-dark pt-4">
      <Container>
        {/* Top Section with Columns */}
        <Row>
          {/* Column 1 */}
          <Col md="3">
            <h6 className="fw-bold mb-3">Popular searches</h6>
            <ul className="list-unstyled">
              <li>Resume templates</li>
              <li>Mobile apps</li>
              <li>Presentation templates</li>
              <li>UI kits</li>
              <li>Calendar templates</li>
            </ul>
          </Col>

          {/* Column 2 */}
          <Col md="3">
            <h6 className="fw-bold mb-3">Most used</h6>
            <ul className="list-unstyled">
              <li>Material 3 Design Kit</li>
              <li>iOS 18 and iPadOS 18</li>
              <li>Figma auto layout playground</li>
              <li>Anima - Figma to React, HTML</li>
              <li>Ant Design Open Source</li>
            </ul>
          </Col>

          {/* Column 3 */}
          <Col md="3">
            <h6 className="fw-bold mb-3">Recommended categories</h6>
            <ul className="list-unstyled">
              <li>Instagram templates</li>
              <li>Workshop templates</li>
              <li>Data templates</li>
              <li>Laptop mockups</li>
              <li>Design inspirations</li>
            </ul>
          </Col>

          {/* Column 4 */}
          <Col md="3">
            <h6 className="fw-bold mb-3">Top categories</h6>
            <ul className="list-unstyled">
              <li>Design templates</li>
              <li>Libraries</li>
              <li>Icons</li>
              <li>Development</li>
              <li>Brainstorming</li>
            </ul>
          </Col>
        </Row>

        {/* Bottom Section */}
        <hr className="my-4" />
        <Row className="align-items-center">
          <Col md="6" className="text-center text-md-start">
            <strong>Figma</strong>
          </Col>
          <Col md="6" className="text-center text-md-end">
            <span>© 2024 Figma, Inc. </span>
            <a href="#" className="text-dark text-decoration-none mx-2">Site map</a>
            <a href="#" className="text-dark text-decoration-none mx-2">Community guidelines</a>
            <a href="#" className="text-dark text-decoration-none mx-2">Terms of service</a>
          </Col>
        </Row>
      </Container>
    </footer>
  );
};

export default Footer;
