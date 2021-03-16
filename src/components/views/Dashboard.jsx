import React from 'react';
import { Col, Button, FormGroup, Label, Input, FormText } from 'reactstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../../App.css';
import axios from 'axios';
import { Table } from 'reactstrap';
import DashboardTable from '../general/DashboardTable';
import loadingImage from '../../rolling.svg';

export default class Dashboard extends React.Component {
  state = {
    name: '',
    email: '',
    id: '',
    iat: '',
    editing: false,
    loadUserContributions: false,
    userContributions: [],
  };

  getuserContributions = async () => {
    let searchByUser = { username: this.state.email };
    let response = await axios.post(
      'https://quiet-gorge-29042.herokuapp.com/resource-by-user',
      searchByUser
    );
    this.setState({
      userContributions: response.data,
      loadUserContributions: true,
    });
  };

  componentDidMount = () => {
    document.title = 'msw keeposted: User Dashboard';
  };

  componentDidUpdate = async (prevProps) => {
    if (this.props.user !== prevProps.user) {
      this.setState({
        name: this.props.user.name,
        email: this.props.user.username,
        id: this.props.user.id,
        iat: this.props.user.iat,
      });
    }
    this.getuserContributions();
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
    const baseUrl = 'https://quiet-gorge-29042.herokuapp.com';
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
    const {
      name,
      email,
      id,
      iat,
      editing,
      userContributions,
      loadUserContributions,
    } = this.state;
    const date = new Date(iat * 1000);

    if (loadUserContributions === false) {
      return <img src={loadingImage} alt="loading..." />;
    } else {
      return (
        <Col>
          <h1>Dashboard</h1>
          <h4>Number of contributions: {userContributions.length}</h4>
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
            <Button
              color="primary"
              className="mt-1"
              onClick={this.handleSubmit}
            >
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
          <h4 className="mt-5">Contribution History:</h4>
          <Table responsive striped>
            <thead className="thead-dark">
              <tr>
                <th>Title</th>
                <th>Categories</th>
                <th>Description</th>
                <th>Address</th>
                <th>Postal Code</th>
              </tr>
            </thead>
            <tbody>
              {userContributions.map((p) => (
                <DashboardTable
                  key={p._id}
                  title={p.title}
                  categories={p.categories}
                  description={p.description}
                  address1={p.location.address1}
                  address2={p.location.address2}
                  postalcode={p.location.postalcode}
                />
              ))}
            </tbody>
          </Table>
        </Col>
      );
    }
  }
}
