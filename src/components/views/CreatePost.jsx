import React from 'react';
import { Button, Form, FormGroup, Label, Input, FormText } from 'reactstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

export default class CreatePost extends React.Component {
  render() {
    return (
      <React.Fragment>
        <h1>Contribute Resource</h1>
        <Form>
          <FormGroup>
            <Label for="exampleEmail">Title</Label>
            <Input
              type="text"
              name="title"
              placeholder="What is this resource about?"
            />
          </FormGroup>
          <FormGroup>
            <Label for="exampleSelect">Category</Label>
            <Input type="select" name="category">
              <option>1</option>
              <option>2</option>
              <option>3</option>
              <option>4</option>
              <option>5</option>
            </Input>
          </FormGroup>
          <FormGroup>
            <Label for="exampleText">Description</Label>
            <Input
              type="textarea"
              name="text"
              placeholder="Make it as descriptive as possible!"
            />
          </FormGroup>
          <FormGroup>
            <Label for="exampleEmail">Location</Label>
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
