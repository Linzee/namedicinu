import React, { Component } from "react";
import { Container, Row, Col } from 'react-bootstrap';
import Img from "gatsby-image";
import { FormattedMessage } from 'react-intl';

import Markdown from "./markdown";

export default class Lecturers extends Component {
  render() {
    const { site, lecturers } = this.props;
    return (
      <Container className="lecturers">
        <Row>
          <Col md={8} className="p-3 text-justify">
            <h2 id="Lecturers">
              <FormattedMessage id="title.lecturers" defaultMessage="Lecturers" />
            </h2>
            <Markdown value={site.lecturersDescription} />
          </Col>
        </Row>
        {lecturers.edges.map((item, index) => {
          const photo_col = (
            <Col md={4} className="col-photo">
              <div className="square">
                <div className="circle-img-half-border">
                  <Img
                    fluid={item.node.photo.fluid}
                  />
                </div>
              </div>
            </Col>
          )
          return (
            <Row className="p-3 justify-content-center">
              {index % 2 === 0 && photo_col}
              <Col md={8}>
                <h3>
                  {item.node.name}
                </h3>
                {
                  item.node.designation &&
                  <p className="designation">{item.node.designation}</p>
                }
                <div className="text-justify">
                  <Markdown value={item.node.description} className="text-justify" />
                </div>
              </Col>
              {index % 2 === 1 && photo_col}
            </Row>
          );
        })}
      </Container>
    );
  }
}
