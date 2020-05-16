import React, { Component } from 'react'
import { Form, Row, Col, Button, Jumbotron, Container } from 'react-bootstrap';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { login } from '../actions/SecurityActions';
import classnames from 'classnames';

class Login extends Component {
  constructor() {
    super();
    this.state = {
      username: "",
      password: "",
      errors: {}
    }
    this.onChangeHandler = this.onChangeHandler.bind(this);
    this.onSubmitHandler = this.onSubmitHandler.bind(this);
  }

  componentDidMount = () => {
    if (this.props.security.isValidToken) {
      this.props.history.push("/schedule");
    }
  };

  componentWillReceiveProps = nextProps => {
    if (nextProps.security.isValidToken) {
      window.location.href = "/schedule";
    }
  };

  onChangeHandler = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  onSubmitHandler = event => {
    event.preventDefault();
    const loginRequest = {
      username: this.state.username,
      password: this.state.password
    }
    this.props.login(loginRequest);
  };

  render() {
    const { errors } = this.props;

    return (
      <Row style={{ padding: "10px", paddingTop: "100px" }}>
        <Col md={3}></Col>
        <Col md={6}>
          <Jumbotron>
            <Container style={{ padding: "10px", paddingLeft: "220px" }}>
              <img src="/diuIcon.png" height="120px" alt="login logo" />
            </Container>
            <Form onSubmit={this.onSubmitHandler}>
              <Form.Group as={Row}>
                <Form.Label column sm={2}>Email</Form.Label>
                <Col sm={10}>
                  <Form.Control
                    className={classnames(
                      "form-control from-control-lg",
                      { "is-invalid": errors.username }
                    )}
                    name="username"
                    type="email"
                    placeholder="Email"
                    value={this.state.username}
                    onChange={this.onChangeHandler}
                  />
                  {errors.username && (
                    <div className="invalid-feedback">
                      {errors.username}
                    </div>
                  )}
                </Col>
              </Form.Group>

              <Form.Group as={Row}>
                <Form.Label column sm={2}>Password</Form.Label>
                <Col sm={10}>
                  <Form.Control
                    className={classnames(
                      "form-control from-control-lg",
                      { "is-invalid": errors.password }
                    )}
                    name="password"
                    type="password"
                    placeholder="Password"
                    value={this.state.password}
                    onChange={this.onChangeHandler}
                  />
                  {errors.password && (
                    <div className="invalid-feedback">
                      {errors.password}
                    </div>
                  )}
                </Col>
              </Form.Group>

              <Row>
                <Col md={5}></Col>
                <Form.Group className="col-md-7">
                  <Button
                    size="sm"
                    variant="primary"
                    type="submit"
                  >Login</Button>
                </Form.Group>
              </Row>
            </Form>
          </Jumbotron>
        </Col>
      </Row>
    )
  }
}

Login.propTypes = {
  security: PropTypes.object.isRequired,
  login: PropTypes.func.isRequired,
  errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  errors: state.errors,
  security: state.security
});

export default connect(
  mapStateToProps,
  { login }
)(Login);
