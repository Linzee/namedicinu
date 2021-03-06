import React, { useState } from "react";
import { useForm } from '@formspree/react';
import { AnchorLink } from "gatsby-plugin-anchor-links";
import { Row, Col, Form, Button, OverlayTrigger, Tooltip, Alert } from 'react-bootstrap';
import { useIntl, FormattedMessage } from 'react-intl';
import { pixelTrackRegister } from '../fb-pixel';

import { fixNbsp, isCode } from '../common';

function RegisterForm({ productTitle, showCourseSelector, onChangeNumCourses, codeDiscount, onChangeCodeDiscount, faculties, locale }) {
  const intl = useIntl();
  const [formState, handleSubmit] = useForm("register");
  const [state, setState] = useState(
    {
      country: "cz",
      biology: false,
      chemistry: false,
      physics: false,
    }
  );
  const update = (key, value) => {
    let newState = Object.assign({}, state);
    newState[key] = value;
    if(key === "country" && value === "sk") {
      newState.physics = 0;
    }
    setState(newState);
    onChangeNumCourses(newState.biology + newState.chemistry + newState.physics);
  };

  const onSubmit = (event) => {
    pixelTrackRegister();
    handleSubmit(event);
  }

  if (formState.succeeded) {
    return (
      <div className="form-sent d-flex flex-column justify-content-center">
        <div className="bg-circle-container">
          <div className="bg-circle">
          </div>
        </div>
        <h3>
          <FormattedMessage id="register.sent.title" defaultMessage="Thank you for signing up!" />
        </h3>
        <p>
          <FormattedMessage id="register.sent.message" defaultMessage="We will contact you shortly." />
        </p>
      </div>
    );

  } else {
    const submitDisabled = formState.submitting
      || (showCourseSelector && !(state.biology || state.chemistry || state.physics));

    return (
      <Form onSubmit={onSubmit}>
        <input type="hidden" name="_language" value={locale} />
        <input type="text" name="_gotcha" style={{display: "none"}} />

        <input type="hidden" name="product" value={productTitle} />

        {formState.errors.map((error, index) => {
          return (
            <Alert key={index} variant="danger">
              {error.field} {error.message}
            </Alert>
          )
        })}
        <Form.Row>
          <Form.Group as={Col} controlId="registerEmail">
            <FormattedMessage id="register.email" defaultMessage="Email">
              {(l_email) => (
                <>
                  <Form.Label>
                    {l_email} *
                  </Form.Label>
                  <Form.Control require="true" name="email" type="email" />
                </>
              )}
            </FormattedMessage>
          </Form.Group>
          <Form.Group as={Col} controlId="registerName">
            <FormattedMessage id="register.name" defaultMessage="Name">
              {(l_name) => (
                <>
                  <Form.Label>
                    {l_name} *
                  </Form.Label>
                  <Form.Control require="true" name="name" type="input" />
                </>
              )}
            </FormattedMessage>
          </Form.Group>
        </Form.Row>

        <Form.Row>
          <Form.Group as={Col} controlId="registerPreferredTime">
            <FormattedMessage id="register.preferred_time" defaultMessage="Preferred time">
              {(l_preferred_time) => (
                <>
                  <Form.Label>
                    {l_preferred_time}
                  </Form.Label>
                  <Form.Control name="preferred_time" as="select">
                    <option value=""></option>
                    <FormattedMessage id="register.preferred_time.morning" defaultMessage="Morning">
                      {(o) => <option value={o}>{o}</option>}
                    </FormattedMessage>
                    <FormattedMessage id="register.preferred_time.afternoon" defaultMessage="Afternoon">
                      {(o) => <option value={o}>{o}</option>}
                    </FormattedMessage>
                  </Form.Control>
                </>
              )}
            </FormattedMessage>
          </Form.Group>
          <Form.Group as={Col} controlId="registerPreferredeDay">
            <FormattedMessage id="register.preferred_day" defaultMessage="Preferred day">
              {(l_preferred_day) => (
                <>
                  <Form.Label>
                    {l_preferred_day}
                  </Form.Label>
                  <Form.Control name="preferred_day" as="select">
                    <option value=""></option>
                    <FormattedMessage id="register.preferred_day.workday" defaultMessage="Workday">
                      {(o) => <option value={o}>{o}</option>}
                    </FormattedMessage>
                    <FormattedMessage id="register.preferred_day.weekend" defaultMessage="Weekend">
                      {(o) => <option value={o}>{o}</option>}
                    </FormattedMessage>
                  </Form.Control>
                </>
              )}
            </FormattedMessage>
          </Form.Group>
        </Form.Row>

        <Form.Group controlId="registerFaculty">
          <FormattedMessage id="register.faculty" defaultMessage="Faculty">
            {(l_faculty) => (
              <>
                <Form.Label>
                  {l_faculty}
                </Form.Label>
                <AnchorLink to={`/faculties/#Quiz`} className="float-right">
                  <FormattedMessage id="register.faculty.help" defaultMessage="Do you need help with selection?" />
                </AnchorLink>
                <Form.Control
                  name="faculty"
                  as="select"
                  onChange={event => {
                    update("country", event.target.querySelector("[value='"+event.target.value+"']").getAttribute("data-country"))
                  }}
                >
                  <option value=""></option>
                  {faculties.edges.map((item, index) => {
                    return (
                      <option key={index} value={fixNbsp(item.node.title)} data-country={item.node.country}>
                        {fixNbsp(item.node.title)}
                      </option>
                    );
                  })}
                </Form.Control>
              </>
            )}
          </FormattedMessage>
        </Form.Group>

        {
          showCourseSelector && (
            <Form.Group controlId="registerCourses">
              <FormattedMessage id="register.courses" defaultMessage="Courses">
                {(l_courses) => (
                  <>
                    <Form.Label>
                      {l_courses}
                    </Form.Label>
                    <Row>
                      <Col xs={4}>
                        <FormattedMessage id="register.course.biology" defaultMessage="Biology">
                          {(label) => (
                            <div className="switch-bg">
                              <Form.Check
                                label={label}
                                type="switch"
                                id="biology"
                                checked={state.biology}
                                onChange={event => update("biology", event.target.checked)}
                              />
                            </div>
                          )}
                        </FormattedMessage>
                      </Col>
                      <Col xs={4}>
                        <FormattedMessage id="register.course.chemistry" defaultMessage="Chemistry">
                          {(label) => (
                            <div className="switch-bg">
                              <Form.Check
                                label={label}
                                type="switch"
                                id="chemistry"
                                checked={state.chemistry}
                                onChange={event => update("chemistry", event.target.checked)}
                              />
                            </div>
                          )}
                        </FormattedMessage>
                      </Col>
                      <Col xs={4}>
                        <FormattedMessage id="register.course.physics" defaultMessage="Physics">
                          {(label) => (
                            <div className="switch-bg">
                              <Form.Check
                                label={label}
                                type="switch"
                                id="physics"
                                disabled={state.country === "sk"}
                                checked={state.physics}
                                onChange={event => update("physics", event.target.checked)}
                              />
                            </div>
                          )}
                        </FormattedMessage>
                      </Col>
                      <input type="hidden" name="courses" value={[
                        (state.biology ? intl.formatMessage({id: "register.course.biology"}) : ""),
                        (state.chemistry ? intl.formatMessage({id: "register.course.chemistry"}) : ""),
                        (state.physics ? intl.formatMessage({id: "register.course.physics"}) : ""),
                      ].filter(Boolean).join(", ")} />
                    </Row>
                  </>
                )}
              </FormattedMessage>
            </Form.Group>
          )
        }

        <Form.Group controlId="registerReference" className="position-relative">
          <FormattedMessage id="register.reference" defaultMessage="Reference">
            {(l_reference) => (
              <>
                <Form.Label>
                  {l_reference}&nbsp;
                  <OverlayTrigger
                    placement="bottom"
                    overlay={
                      <Tooltip id="tooltip-reference">
                        <FormattedMessage id="register.reference.help" defaultMessage="E.g., Facebook" />
                      </Tooltip>
                    }
                  >
                    <i className="fa fa-question-circle help" />
                  </OverlayTrigger>
                </Form.Label>
                <Form.Control onChange={(e) => onChangeCodeDiscount(isCode(e.target.value))} name="reference" type="input" />
                {
                  codeDiscount &&
                  <div className="code-discount"><em>-10%</em></div>
                }
              </>
            )}
          </FormattedMessage>
        </Form.Group>

        <Form.Row>
          <Col md={12} className="text-justify">
            <Form.Text>
              <FormattedMessage id="register.consent" />
            </Form.Text>
          </Col>
          <Col md={12} className="text-right">
            <Button variant="primary" type="submit" size="lg" disabled={submitDisabled}>
              <FormattedMessage id="register.submit" defaultMessage="Submit" />
            </Button>
          </Col>
        </Form.Row>

      </Form>
    );
  }
}

export default RegisterForm;
