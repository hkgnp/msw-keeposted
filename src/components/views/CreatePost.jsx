import React from 'react';
import { Button, FormGroup, Label, Input, FormText, Col } from 'reactstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../../App.css';
import ValidatePost from '../general/ValidatePost';

export default class CreatePost extends React.Component {
  state = {
    title: '',
    category: '',
    description: '',
    location: {
      address1: '',
      address2: '',
      postalcode: '',
    },
    file: '',
    errors: '',
    username: '',
  };

  componentDidMount = () => {
    document.title = 'msw keeposted: Contribute Resource';
  };

  componentDidUpdate = (prevProps) => {
    if (this.props.user !== prevProps.user) {
      this.setState({
        username: this.props.user.username,
      });
    }
  };

  handleForm = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };

  handleLocation = (e) => {
    this.setState({
      location: {
        ...this.state.location,
        [e.target.name]: e.target.value,
      },
    });
  };

  handleReset = () => {
    this.setState({
      title: '',
      category: '',
      description: '',
      location: {
        address1: '',
        address2: '',
        postalcode: '',
      },
      file: '',
    });
  };

  handleSubmit = async (e) => {
    e.preventDefault();
    const { title, category, description, file, username } = this.state;
    const { address1, address2, postalcode } = this.state.location;

    const errors = await ValidatePost({
      username,
      title,
      category,
      description,
      address1,
      address2,
      postalcode,
      file,
    });

    if (errors) {
      this.setState({
        errors: errors,
      });
    } else {
      this.setState({
        errors: '',
      });
      window.location.href = '/posts';
    }
  };

  render() {
    const {
      title,
      category,
      description,
      address1,
      address2,
      postalcode,
      file,
    } = this.state.errors;

    return (
      <Col>
        <h1>Contribute Resource</h1>
        <FormGroup>
          <Label for="contributor">Contributor</Label>
          <Input
            type="text"
            name="username"
            value={this.state.username}
            disabled
          />
        </FormGroup>
        <FormGroup>
          <Label for="title">Title</Label>
          <Input
            onChange={this.handleForm}
            type="text"
            name="title"
            placeholder="What is this resource about?"
            value={this.state.title}
          />
          {title ? (
            <div className="alert-sm alert-danger p-2">{title}</div>
          ) : null}
        </FormGroup>
        <FormGroup>
          <Label for="category">Category</Label>
          <Input
            onChange={this.handleForm}
            type="select"
            name="category"
            value={this.state.category}
          >
            <option>Select a category</option>
            <option value="donations">Donations</option>
            <option value="jobs">Jobs</option>
            <option value="long-term care">Long-term Care</option>
            <option value="misc">Miscellaneous</option>
          </Input>
          {category ? (
            <div className="alert-sm alert-danger p-2">{category}</div>
          ) : null}
        </FormGroup>
        <FormGroup>
          <Label for="description">Description</Label>
          <Input
            onChange={this.handleForm}
            type="textarea"
            name="description"
            rows="6"
            placeholder="Make it as descriptive as possible!"
            value={this.state.description}
          />
          {description ? (
            <div className="alert-sm alert-danger p-2">{description}</div>
          ) : null}
        </FormGroup>
        <FormGroup>
          <Label for="location">Location</Label>
          <Input
            onChange={this.handleLocation}
            type="text"
            name="address1"
            placeholder="Address Line 1"
            value={this.state.location.address1}
          />
          {address1 ? (
            <div className="alert-sm alert-danger p-2">{address1}</div>
          ) : null}
          <Input
            onChange={this.handleLocation}
            type="text"
            name="address2"
            placeholder="Address Line 2"
            value={this.state.location.address2}
          />
          {address2 ? (
            <div className="alert-sm alert-danger p-2">{address2}</div>
          ) : null}
          <Input
            onChange={this.handleLocation}
            type="text"
            name="postalcode"
            placeholder="Postal Code"
            value={this.state.location.postalcode}
          />
          {postalcode ? (
            <div className="alert-sm alert-danger p-2">{postalcode}</div>
          ) : null}
        </FormGroup>
        <FormGroup>
          <Label for="file">Upload a picture</Label>
          <Input
            type="file"
            name="file"
            id="mediafile"
            onChange={this.handleForm}
            value={this.state.file}
          />
          {file ? (
            <div className="alert-sm alert-danger p-2">{file}</div>
          ) : null}
          <FormText color="muted">
            This is some placeholder block-level help text for the above input.
            It's a bit lighter and easily wraps to a new line.
          </FormText>
        </FormGroup>
        <Button
          type="submit"
          className="mb-3"
          color="primary"
          onClick={this.handleSubmit}
        >
          Submit
        </Button>
        <Button color="danger" className="mx-2 mb-3" onClick={this.handleReset}>
          Reset
        </Button>
      </Col>
    );
  }
}
