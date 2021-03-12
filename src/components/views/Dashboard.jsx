import React from 'react';
import { Col, Button, FormGroup, Label, Input, FormText } from 'reactstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../../App.css';
import axios from 'axios';

export default class Dashboard extends React.Component {
  state = {
    name: '',
    email: '',
    id: '',
    iat: '',
    editing: false,
  };

  componentDidMount = () => {
    document.title = 'msw keeposted: User Dashboard';
  };

  componentDidUpdate = (prevProps) => {
    if (this.props.user !== prevProps.user) {
      this.setState({
        name: this.props.user.name,
        email: this.props.user.username,
        id: this.props.user.id,
        iat: this.props.user.iat,
      });
    }
  };

  handleForm = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };

  handleEdit = () => {
    this.setState({
      editing: true,
    });
  };

  handleReset = () => {
    this.setState({
      editing: false,
    });
  };

  handleSubmit = async () => {
    const { name, email, id } = this.state;
    const baseUrl = 'https://7000-ivory-rattlesnake-glx98tol.ws-us03.gitpod.io';
    /// Send to collection 'POST DETAILS'
    try {
      await axios({
        method: 'put',
        url: `${baseUrl}/user/update`,
        data: {
          id: id,
          name: name,
          email: email,
        },
      });
      localStorage.removeItem('token');
      window.location = '/login';
    } catch (e) {
      const errors = 'Username is already taken';
      return errors;
    }
  };

  render() {
    const { name, email, id, iat, editing } = this.state;
    const date = new Date(iat * 1000);
    return (
      <Col>
        <h1>Dashboard</h1>
        <FormGroup>
          <Label for="id">User ID</Label>
          <Input type="text" name="id" value={id} disabled />
        </FormGroup>
        <FormGroup>
          <Label for="iat">Date of Registration</Label>
          <Input type="text" name="iat" value={date} disabled />
        </FormGroup>
        <FormGroup>
          <Label for="name">Name</Label>
          <Input
            onChange={this.handleForm}
            type="text"
            name="name"
            placeholder="Enter your name"
            value={name}
            disabled={!editing ? true : false}
          />
        </FormGroup>
        <FormGroup>
          <Label for="email">Username</Label>
          <Input
            onChange={this.handleForm}
            type="email"
            name="email"
            placeholder="Enter a valid email"
            value={email}
            disabled={!editing ? true : false}
          />
        </FormGroup>

        {!editing && (
          <Button color="primary" className="mt-1" onClick={this.handleEdit}>
            Edit
          </Button>
        )}
        {!editing && (
          <Button
            color="danger"
            className="mt-1 mx-2"
            onClick={this.handleEdit}
          >
            Delete
          </Button>
        )}
        {editing && (
          <Button color="primary" className="mt-1" onClick={this.handleSubmit}>
            Update
          </Button>
        )}
        {editing && (
          <Button
            color="danger"
            className="mx-2 mt-1"
            onClick={this.handleReset}
          >
            Reset
          </Button>
        )}
        {editing && (
          <FormText color="muted" className="mt-2">
            You will need to re-login after updating your details.
          </FormText>
        )}
      </Col>
    );
  }
}
