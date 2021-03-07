import React from 'react';
import { Button, Form, FormGroup, Label, Input, FormText } from 'reactstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

export default class CreatePost extends React.Component {
  state = {
    title: '',
    category: '',
    description: '',
    location: '',
    file: '',
  };

  handleForm = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };

  render() {
    return (
      <React.Fragment>
        <h1>Contribute Resource</h1>
        <Form>
          <FormGroup>
            <Label for="title">Title</Label>
            <Input
              type="text"
              name="title"
              placeholder="What is this resource about?"
            />
          </FormGroup>
          <FormGroup>
            <Label for="category">Category</Label>
            <Input type="select" name="category">
              <option>Donations</option>
              <option>Jobs</option>
              <option>Long-term Care</option>
              <option>Miscellaneous</option>
            </Input>
          </FormGroup>
          <FormGroup>
            <Label for="description">Description</Label>
            <Input
              type="textarea"
              name="description"
              rows="6"
              placeholder="Make it as descriptive as possible!"
            />
          </FormGroup>
          <FormGroup>
            <Label for="location">Location</Label>
            <Input
              type="text"
              name="location"
              placeholder="Key in the postal code"
            />
          </FormGroup>
          <FormGroup>
            <Label for="exampleFile">File</Label>
            <Input type="file" name="file" />
            <FormText color="muted">
              This is some placeholder block-level help text for the above
              input. It's a bit lighter and easily wraps to a new line.
            </FormText>
          </FormGroup>
          <Button color="primary">Submit</Button>
        </Form>
      </React.Fragment>
    );
  }
}
