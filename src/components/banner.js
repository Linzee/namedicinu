import React, { Component } from "react";
import { Container, Row, Col } from 'react-bootstrap';
import Img from "gatsby-image";

import Markdown from "./markdown";
import Socials from "./socials"

export default class Banner extends Component {
  shouldComponentUpdate() {
    return false; // static component
  }
  
  render() {
    const { site } = this.props;
    return (
      <div className="banner">
        <Container>
          <Row className="justify-content-between">
            <Col md={5} className="p-3 d-flex flex-column align-items-stretch justify-content-center">
              <h1>{site.siteName}</h1>

              <h2>
                {site.bannerSubtitle}
              </h2>

              <Markdown value={site.bannerDescription} />

              <Socials facebook={site.facebook} instagram={site.instagram} email={site.email} />
            </Col>
            <Col md={6} className="p-3 d-flex flex-column align-items-stretch justify-content-center">
              <div className="bg-circle-container">
                <div className="bg-circle bg-2" />
              </div>
              <Img
                fluid={site.bannerImage.fluid}
                className="banner-image"
              />
            </Col>
          </Row>
        </Container>
      </div>
    );
  }
}
