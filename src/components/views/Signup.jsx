import React from 'react';
import {
  Button,
  Form,
  FormGroup,
  Label,
  Input,
  FormText,
  Row,
  Col,
} from 'reactstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../../App.css';

export default class Signup extends React.Component {
  state = {
    username: '',
    email: '',
    password: '',
  };

  handleForm = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };

  render() {
    return (
      <Row style={{ display: 'flex' }}>
        <Col className="signup_instructions">
          <h1>Some instructions text</h1>
          <p>Sign up for an account to</p>
          <ul>
            <li>Post resources</li>
            <li>Keep track of bookmarked resources</li>
          </ul>
          <h1>We take your privacy seriously</h1>
          <p>We do not share your data with anyone.</p>
        </Col>
        {/* Sign Up Form */}
        <Col className="login_signup">
          <h1>Register</h1>
          <Form>
            <FormGroup>
              <Label for="username">Username</Label>
              <Input
                onChange={this.handleForm}
                type="username"
                name="username"
                placeholder="Enter a username"
              />
            </FormGroup>
            <FormGroup>
              <Label for="email">Email</Label>
              <Input
                onChange={this.handleForm}
                type="email"
                name="email"
                placeholder="Enter an email"
              />
            </FormGroup>
            <FormGroup>
              <Label for="password">Password</Label>
              <Input
                onChange={this.handleForm}
                type="password"
                name="password"
                placeholder="Enter a complex password"
              />
            </FormGroup>
            <FormText color="muted">
              This is some placeholder block-level help text for the above
              input. It's a bit lighter and easily wraps to a new line.
            </FormText>
            <Button color="primary">Submit</Button>
          </Form>
        </Col>
      </Row>
    );
  }
}
