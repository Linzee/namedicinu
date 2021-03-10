import React, { Component } from "react";
import { Container, Row, Col} from 'react-bootstrap';
import { Link } from "gatsby";
import { FormattedMessage } from 'react-intl';

export default class footer extends Component {
  render() {
    return (
      <div className="site-footer" id="footer">
        <Container>
          <Row>
            <Col md={12} className="p-3">
              <p class="float-right">
                <Link to="/#home">
                  <FormattedMessage id="footer.back_to_top" defaultMessage="Back to top" />
                </Link>
              </p>
              <p>© {this.props.siteName} {new Date().getFullYear()}</p>
            </Col>
          </Row>
        </Container>
      </div>
    );
  }
}
