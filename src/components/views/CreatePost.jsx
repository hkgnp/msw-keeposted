import React from 'react';
import { Button, FormGroup, Label, Input, FormText } from 'reactstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';

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
  };

  componentDidMount = () => {
    document.title = 'msw keeposted: Contribute Resource';
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

  handleSubmit = async (req, res) => {
    const { title, category, description, location } = this.state;
    const baseUrl = 'https://7000-sapphire-vole-ebkuduij.ws-us03.gitpod.io';
    // Send to collection
    let postDetails = await axios({
      method: 'post',
      url: baseUrl + '/posts',
      data: {
        title: title,
        category: category,
        description: description,
        location: {
          address1: location.address1,
          address2: location.address2,
          postalcode: location.postalcode,
        },
      },
    });

    // Send to S3
    let postObjectId = await postDetails.data;
    const file = document.getElementById('file').files[0];
    // Make sure a file is selected
    if (!file) return;
    // Fetch the signed url
    const key = postObjectId;
    const response = await axios.get(
      `${baseUrl}/uploader/sign?key=${key}&type=${file.type}`
    );
    const url = response.data.url;
    try {
      // Attempt the upload
      const options = { headers: { 'Content-Type': file.type } };
      await axios.put(url, file, options);
    } catch (e) {
      alert(`Upload failed: ${e}`);
    }

    // Send S3 URL to collection 'MEDIA
    // - Include ObjectID of post-details
    // data: {media: "https://msw-keeposted-images.s3-ap-southeast-1.amazonaws.com/" + objectId + '_' + file.name}
    await axios({
      method: 'post',
      url: baseUrl + '/media',
      data: {
        postId: postObjectId,
        mediaUrl:
          'https://msw-keeposted-images.s3-ap-southeast-1.amazonaws.com/' +
          postObjectId,
      },
    });
  };

  render() {
    const { title, category, description, location } = this.state;
    return (
      <React.Fragment>
        <h1>Contribute Resource</h1>
        <FormGroup>
          <Label for="title">Title</Label>
          <Input
            onChange={this.handleForm}
            type="text"
            name="title"
            placeholder="What is this resource about?"
            value={title}
          />
        </FormGroup>
        <FormGroup>
          <Label for="category">Category</Label>
          <Input
            onChange={this.handleForm}
            type="select"
            name="category"
            value={category}
          >
            <option>Select a category</option>
            <option value="donations">Donations</option>
            <option value="jobs">Jobs</option>
            <option value="long-term care">Long-term Care</option>
            <option value="misc">Miscellaneous</option>
          </Input>
        </FormGroup>
        <FormGroup>
          <Label for="description">Description</Label>
          <Input
            onChange={this.handleForm}
            type="textarea"
            name="description"
            rows="6"
            placeholder="Make it as descriptive as possible!"
            value={description}
          />
        </FormGroup>
        <FormGroup>
          <Label for="location">Location</Label>
          <Input
            onChange={this.handleLocation}
            type="text"
            name="address1"
            placeholder="Address Line 1"
            value={location.address1}
          />
          <Input
            onChange={this.handleLocation}
            type="text"
            name="address2"
            placeholder="Address Line 2"
            value={location.address2}
          />
          <Input
            onChange={this.handleLocation}
            type="text"
            name="postalcode"
            placeholder="Postal Code"
            value={location.postalcode}
          />
        </FormGroup>
        <FormGroup>
          <Label for="file">Upload a picture (optional)</Label>
          <Input type="file" name="file" id="file" onChange={this.handleForm} />
          <FormText color="muted">
            This is some placeholder block-level help text for the above input.
            It's a bit lighter and easily wraps to a new line.
          </FormText>
        </FormGroup>
        <Button color="primary" onClick={this.handleSubmit}>
          Submit
        </Button>
      </React.Fragment>
    );
  }
}
