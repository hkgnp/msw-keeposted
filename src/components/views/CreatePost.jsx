import React from 'react';
import { Button, FormGroup, Label, Input, FormText, Col } from 'reactstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../../App.css';
import ValidatePost from '../general/ValidatePost';
import loadingImage from '../../rolling.svg';

export default class CreatePost extends React.Component {
  state = {
    title: '',
    categories: [],
    description: '',
    location: {
      address1: '',
      address2: '',
      postalcode: '',
    },
    file: '',
    errors: '',
    username: '',
    loadingIcon: false,
  };

  componentDidMount = () => {
    document.title = 'msw keeposted: Contribute Resource';
  };

  componentDidUpdate = (prevProps) => {
    if (this.props.user !== prevProps.user) {
      this.setState({
        username: this.props.user.username,
        userId: this.props.user.id,
      });
    }
  };

  handleForm = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };

  handleCategory = (e) => {
    let selectedCategories = e.target.selectedOptions;
    let categoriesArr = [];
    for (let c of selectedCategories) {
      categoriesArr.push(c.value);
    }

    this.setState({
      categories: categoriesArr,
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
    const {
      title,
      categories,
      description,
      file,
      username,
      userId,
    } = this.state;
    const { address1, address2, postalcode } = this.state.location;

    this.setState({
      loadingIcon: true,
    });

    const errors = await ValidatePost({
      userId,
      username,
      title,
      categories,
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
      this.props.history.push('/posts');
    }
  };

  render() {
    const {
      username,
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
        <FormText color="muted" style={{ textAlign: 'right' }}>
          *Only registered users can contribute posts.
        </FormText>
        <FormGroup>
          {username && (
            <FormText color="muted">
              You must <a href="login">log in</a> to contribute a resource. If
              you do not have an account, please{' '}
              <a href="/signup">click here</a> to sign up!
            </FormText>
          )}
          <Label for="contributor">Contributor</Label>
          <Input
            type="text"
            name="username"
            value={this.state.username}
            disabled
          />
          {username && (
            <div className="alert-sm alert-danger p-2">{username}</div>
          )}
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
          {title && <div className="alert-sm alert-danger p-2">{title}</div>}
        </FormGroup>
        <FormGroup>
          <Label for="category">Categories</Label>
          <Input
            onChange={this.handleCategory}
            type="select"
            name="categories"
            value={this.state.categories}
            multiple
          >
            <option value="Donations">Donations</option>
            <option value="Jobs">Jobs</option>
            <option value="Long-term care">Long-term Care</option>
            <option value="Misc">Miscellaneous</option>
          </Input>
          {category && (
            <div className="alert-sm alert-danger p-2">{category}</div>
          )}
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
          {description && (
            <div className="alert-sm alert-danger p-2">{description}</div>
          )}
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
          {address1 && (
            <div className="alert-sm alert-danger p-2">{address1}</div>
          )}
          <Input
            onChange={this.handleLocation}
            type="text"
            name="address2"
            placeholder="Address Line 2"
            value={this.state.location.address2}
          />
          {address2 && (
            <div className="alert-sm alert-danger p-2">{address2}</div>
          )}
          <Input
            onChange={this.handleLocation}
            type="text"
            name="postalcode"
            placeholder="Postal Code"
            value={this.state.location.postalcode}
          />
          {postalcode && (
            <div className="alert-sm alert-danger p-2">{postalcode}</div>
          )}
        </FormGroup>
        <FormGroup>
          <Label for="mediafile">Upload a picture</Label>
          <Input
            type="file"
            name="file"
            id="mediafile"
            onChange={this.handleForm}
            value={this.state.file}
          />
          {file && <div className="alert-sm alert-danger p-2">{file}</div>}
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
        &nbsp;&nbsp;
        {this.state.loadingIcon && (
          <img
            src={loadingImage}
            alt="loading..."
            style={{ height: '2rem', marginTop: '-18px' }}
          />
        )}
      </Col>
    );
  }
}
