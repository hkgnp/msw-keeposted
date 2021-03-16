import React from 'react';
import { Button, FormGroup, Label, Input, Col } from 'reactstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../../App.css';
import ValidateUser from '../general/ValidateUser';
import loadingImage from '../../rolling.svg';

export default class Signup extends React.Component {
  state = {
    name: '',
    email: '',
    password: '',
    errors: '',
    loaded: '',
  };

  componentDidMount = () => {
    document.title = 'msw keeposted: Register';
  };

  handleForm = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };

  handleSubmit = async (e) => {
    e.preventDefault();
    const { name, email, password } = this.state;
    const errors = await ValidateUser({ name, email, password });
    if (errors === 'Username is already taken') {
      this.setState({
        errors: {
          usernameTaken: errors,
        },
      });
    } else {
      this.setState({
        errors: errors,
      });
    }
  };

  handleReset = () => {
    this.setState({
      name: '',
      email: '',
      password: '',
    });
  };

  render() {
    // Destructure for validation function
    const { name, email, password, usernameTaken } = this.state.errors;

    return (
      <React.Fragment>
        <Col className="signup_instructions">
          <h1>We take your privacy seriously</h1>
          <p className="mt-4">
            We do not share your data with anyone. Under any circumstances
            whatsoever.
          </p>
          <p>
            We also hope that in return, you would take care of this platform,
            and contribute or edit resources constructively for the benefit of
            your other colleagues.
          </p>
          <p>
            If you have any question, please contact us at&nbsp;&nbsp;
            <a style={{ color: 'white' }} href="https://www.github.com/hkgnp">
              <i className="fab fa-github"> </i>
            </a>
          </p>
        </Col>
        {/* Sign Up Form */}
        <Col className="login_signup">
          <h1>Register</h1>

          <FormGroup>
            <Label for="name">Name</Label>
            <Input
              onChange={this.handleForm}
              type="text"
              name="name"
              placeholder="Enter your name"
              value={this.state.name}
            />
            {name ? (
              <div className="alert-sm alert-danger p-2">{name}</div>
            ) : null}
          </FormGroup>
          <FormGroup>
            <Label for="email">Username</Label>
            <Input
              onChange={this.handleForm}
              type="email"
              name="email"
              placeholder="Enter a valid email"
              value={this.state.email}
            />
            {email ? (
              <div className="alert-sm alert-danger p-2">{email}</div>
            ) : null}
            {usernameTaken ? (
              <div className="alert-sm alert-danger p-2">{usernameTaken}</div>
            ) : null}
          </FormGroup>
          <FormGroup>
            <Label for="password">Password</Label>
            <Input
              onChange={this.handleForm}
              type="password"
              name="password"
              placeholder="Enter a complex password"
              value={this.state.password}
            />
            {password ? (
              <div className="alert-sm alert-danger p-2">{password}</div>
            ) : null}
          </FormGroup>
          <Button color="primary" className="mt-2" onClick={this.handleSubmit}>
            Submit
          </Button>
          <Button
            color="danger"
            className="mx-2 mt-2"
            onClick={this.handleReset}
          >
            Reset
          </Button>
          {this.state.loaded === false && (
            <img
              src={loadingImage}
              style={{ height: '2rem' }}
              alt="loading..."
            />
          )}
        </Col>
      </React.Fragment>
    );
  }
}
